#!/usr/bin/env node

/**
 * 修复 Redis 键类型冲突问题
 * 专门处理 WRONGTYPE 错误
 */

const redis = require('../src/models/redis')
const logger = require('../src/utils/logger')

// 需要检查和修复的键模式
const PATTERNS_TO_FIX = [
  'usage:model:daily:*',
  'usage:model:monthly:*',
  'usage:model:hourly:*',
  'usage:platform:daily:*',
  'usage:platform:monthly:*',
  'usage:platform:hourly:*',
  'usage:platform:total:*'
]

async function fixWrongTypeKeys() {
  try {
    logger.info('🔧 开始修复 Redis 键类型冲突...')

    // 确保Redis连接
    if (!redis.isConnected) {
      logger.info('🔌 正在连接Redis...')
      await redis.connect()
    }

    const client = redis.getClientSafe()
    let totalFixed = 0
    let totalErrors = 0

    for (const pattern of PATTERNS_TO_FIX) {
      try {
        logger.info(`🔍 检查模式: ${pattern}`)

        const keys = await client.keys(pattern)

        if (keys.length === 0) {
          logger.info(`  ✅ 未找到匹配的键`)
          continue
        }

        logger.info(`  📊 找到 ${keys.length} 个键`)

        for (const key of keys) {
          try {
            // 获取键类型
            const type = await client.type(key)

            // 如果不是 hash 类型，需要修复
            if (type !== 'hash') {
              logger.warn(`  ⚠️  键 ${key} 类型错误: ${type}，需要修复`)

              // 备份旧值（如果可能）
              let oldValue = null
              try {
                if (type === 'string') {
                  oldValue = await client.get(key)
                } else if (type === 'list') {
                  oldValue = await client.lrange(key, 0, -1)
                } else if (type === 'set') {
                  oldValue = await client.smembers(key)
                }

                if (oldValue) {
                  logger.info(`    📦 备份旧值: ${JSON.stringify(oldValue).substring(0, 100)}...`)
                }
              } catch (e) {
                // 忽略备份错误
              }

              // 删除错误类型的键
              await client.del(key)
              logger.info(`    🗑️  删除错误类型的键: ${key}`)

              // 重新创建为正确的 hash 类型
              // 如果有旧值且是字符串类型（通常是费用值），保留它
              if (type === 'string' && oldValue !== null && oldValue !== '') {
                await client.hset(key, 'cost', oldValue)
                logger.info(`    ✅ 重建为 hash 类型并保留原值: ${key}, cost=${oldValue}`)
              } else {
                // 初始化为空的 hash
                await client.hset(key, 'cost', '0')
                logger.info(`    ✅ 重建为 hash 类型并初始化: ${key}, cost=0`)
              }

              totalFixed++
            }
          } catch (error) {
            logger.error(`  ❌ 处理键 ${key} 时出错:`, error.message)
            totalErrors++
          }
        }
      } catch (error) {
        logger.error(`❌ 处理模式 ${pattern} 时出错:`, error)
        totalErrors++
      }
    }

    logger.info('📊 修复统计:')
    logger.info(`  ✅ 修复的键: ${totalFixed} 个`)
    logger.info(`  ❌ 错误: ${totalErrors} 个`)

    if (totalFixed > 0) {
      logger.info('💡 建议: 修复完成后，历史统计数据会丢失，但新的统计会正常工作')
    }

    if (totalErrors === 0) {
      logger.info('🎉 修复完成，所有键类型都正确！')
    } else {
      logger.warn('⚠️  修复过程中有错误，请检查日志')
    }
  } catch (error) {
    logger.error('💥 修复失败:', error)
    throw error
  }
}

async function main() {
  try {
    // 执行修复
    await fixWrongTypeKeys()

    logger.info('✨ 修复脚本执行完成')
  } catch (error) {
    logger.error('💥 脚本执行失败:', error)
    process.exit(1)
  } finally {
    // 断开Redis连接
    if (redis.isConnected) {
      await redis.disconnect()
    }
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main()
}

module.exports = { fixWrongTypeKeys }
