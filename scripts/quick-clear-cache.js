#!/usr/bin/env node

/**
 * 快速清除缓存脚本 - 开发环境使用
 * 无需确认，直接清除所有缓存数据
 */

const redis = require('../src/models/redis')
const logger = require('../src/utils/logger')

async function quickClearCache() {
  try {
    logger.info('🚀 快速清除缓存数据...')

    // 连接Redis
    if (!redis.isConnected) {
      await redis.connect()
    }

    const client = redis.getClientSafe()

    // 需要清除的模式
    const patterns = [
      'usage:*',
      'account_usage:*',
      'usage:platform:*',
      'usage:model:*',
      'session:*',
      'sticky_session:*',
      'rate_limit:*',
      'scheduler:*',
      'system_info',
      'lock:*',
      'temp:*',
      'cache:*'
    ]

    let total = 0

    for (const pattern of patterns) {
      const keys = await client.keys(pattern)
      if (keys.length > 0) {
        const deleted = await client.del(...keys)
        total += deleted
        logger.info(`🗑️  ${pattern}: 删除 ${deleted} 个键`)
      }
    }

    logger.info(`✅ 完成！共删除 ${total} 个缓存键`)
  } catch (error) {
    logger.error('❌ 清除失败:', error)
    throw error
  } finally {
    if (redis.isConnected) {
      await redis.disconnect()
    }
  }
}

// 运行
quickClearCache().catch(console.error)
