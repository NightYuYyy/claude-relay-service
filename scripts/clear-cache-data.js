#!/usr/bin/env node

/**
 * 清除数据库缓存脚本
 * 保留 API Key 和账号信息，清除所有使用统计和缓存数据
 */

const redis = require('../src/models/redis')
const logger = require('../src/utils/logger')

// 需要清除的数据模式
const CACHE_PATTERNS = [
  // 使用统计相关
  'usage:*',
  'account_usage:*',
  'usage:platform:*',
  'usage:model:*',

  // 会话和限流相关
  'session:*',
  'sticky_session:*',
  'rate_limit:*',

  // 调度器状态
  'scheduler:*',
  'openai_scheduler:*',
  'gemini_scheduler:*',
  'unified_scheduler:*',

  // 系统缓存
  'system_info',
  'system_stats:*',
  'metrics:*',

  // 临时数据和锁
  'lock:*',
  'temp:*',
  'cache:*',

  // 日志和统计缓存
  'daily_stats:*',
  'monthly_stats:*',
  'hourly_stats:*'
]

// 需要保留的数据模式（用于确认不会误删）
const KEEP_PATTERNS = [
  'apikey:*',
  'claude_account:*',
  'gemini_account:*',
  'openai_account:*',
  'azure_openai_account:*',
  'bedrock_account:*',
  'openai_responses_account:*',
  'ccr_account:*',
  'admin:*',
  'admin_username:*',
  'user:*',
  'user_username:*',
  'account_group:*'
]

async function clearCacheData() {
  try {
    logger.info('🧹 开始清除数据库缓存数据...')

    // 确保Redis连接
    if (!redis.isConnected) {
      logger.info('🔌 正在连接Redis...')
      await redis.connect()
    }

    const client = redis.getClientSafe()
    let totalDeleted = 0

    // 遍历每个需要清除的模式
    for (const pattern of CACHE_PATTERNS) {
      try {
        logger.info(`🔍 搜索模式: ${pattern}`)

        // 获取匹配的键
        const keys = await client.keys(pattern)

        if (keys.length === 0) {
          logger.info(`📊 模式 ${pattern}: 未找到匹配的键`)
          continue
        }

        logger.info(`📊 模式 ${pattern}: 找到 ${keys.length} 个键`)

        // 分批删除（避免一次删除太多键）
        const batchSize = 100
        for (let i = 0; i < keys.length; i += batchSize) {
          const batch = keys.slice(i, i + batchSize)
          const deleted = await client.del(...batch)
          totalDeleted += deleted

          logger.info(
            `🗑️  删除了 ${deleted} 个键 (${i + 1}-${Math.min(i + batchSize, keys.length)}/${keys.length})`
          )
        }
      } catch (error) {
        logger.error(`❌ 处理模式 ${pattern} 时出错:`, error)
      }
    }

    logger.info(`✅ 清除完成！共删除 ${totalDeleted} 个缓存键`)

    // 显示保留的数据统计
    await showRetainedDataStats(client)
  } catch (error) {
    logger.error('❌ 清除失败:', error)
    throw error
  }
}

async function showRetainedDataStats(client) {
  try {
    logger.info('📋 保留的数据统计:')

    for (const pattern of KEEP_PATTERNS) {
      try {
        const keys = await client.keys(pattern)
        if (keys.length > 0) {
          logger.info(`  ${pattern}: ${keys.length} 个`)
        }
      } catch (error) {
        logger.warn(`⚠️ 无法统计模式 ${pattern}:`, error)
      }
    }
  } catch (error) {
    logger.error('❌ 统计保留数据时出错:', error)
  }
}

async function confirmClearance() {
  return new Promise((resolve) => {
    const readline = require('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    console.log('\n⚠️  确认清除操作')
    console.log('即将清除以下类型的数据:')
    console.log('- 所有使用统计数据')
    console.log('- 会话和限流状态')
    console.log('- 调度器状态')
    console.log('- 系统缓存')
    console.log('- 临时数据和锁')
    console.log('')
    console.log('✅ 以下数据将被保留:')
    console.log('- API Keys')
    console.log('- 所有账号信息')
    console.log('- 管理员和用户信息')
    console.log('- 账户组配置')
    console.log('')

    rl.question('确认执行清除操作？(输入 YES 确认): ', (answer) => {
      rl.close()
      resolve(answer === 'YES')
    })
  })
}

// 主函数
async function main() {
  try {
    // 确认操作
    const confirmed = await confirmClearance()

    if (!confirmed) {
      logger.info('❌ 操作已取消')
      process.exit(0)
    }

    // 执行清除
    await clearCacheData()

    logger.info('💡 建议重启服务以确保缓存完全清空')
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

module.exports = { clearCacheData, CACHE_PATTERNS, KEEP_PATTERNS }
