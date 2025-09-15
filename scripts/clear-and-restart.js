#!/usr/bin/env node

/**
 * 缓存清理并重启服务脚本
 * 清理缓存后自动重启服务
 */

const { spawn } = require('child_process')

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 执行: ${command} ${args.join(' ')}`)

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options
    })

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(new Error(`命令执行失败，退出码: ${code}`))
      }
    })

    child.on('error', reject)
  })
}

async function clearCacheAndRestart() {
  try {
    console.log('🚀 开始缓存清理和服务重启流程...\n')

    // 1. 清理缓存
    console.log('📋 步骤 1/3: 清理缓存数据')
    await runCommand('node', ['scripts/quick-clear-cache.js'])
    console.log('✅ 缓存清理完成\n')

    // 2. 停止服务
    console.log('📋 步骤 2/3: 停止服务')
    try {
      await runCommand('npm', ['run', 'service:stop'])
      console.log('✅ 服务已停止\n')
    } catch (error) {
      console.log('⚠️  服务可能未运行，继续执行...\n')
    }

    // 3. 启动服务
    console.log('📋 步骤 3/3: 启动服务')
    await runCommand('npm', ['run', 'service:start:daemon'])
    console.log('✅ 服务已启动\n')

    // 4. 等待服务稳定
    console.log('⏳ 等待服务启动完成...')
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // 5. 检查服务状态
    console.log('🔍 检查服务状态')
    await runCommand('npm', ['run', 'service:status'])

    console.log('\n🎉 缓存清理和服务重启完成！')
    console.log('💡 建议查看日志确认服务正常运行:')
    console.log('   npm run service:logs')
  } catch (error) {
    console.error('\n❌ 执行失败:', error.message)
    console.log('\n🔧 手动恢复步骤:')
    console.log('1. 检查服务状态: npm run service:status')
    console.log('2. 手动启动服务: npm run service:start:daemon')
    console.log('3. 查看日志: npm run service:logs')
    process.exit(1)
  }
}

// 处理命令行参数
const args = process.argv.slice(2)
const isForce = args.includes('--force') || args.includes('-f')

if (!isForce) {
  console.log('⚠️  此操作将清理所有缓存数据并重启服务')
  console.log('📋 将会清理：使用统计、会话、限流状态、调度器状态等')
  console.log('🛡️  将会保留：API Keys、账号信息、用户信息等')
  console.log('')
  console.log('如需直接执行，请使用: npm run clear:restart:force')
  console.log('或者使用分步操作：')
  console.log('  1. npm run clear:cache:quick')
  console.log('  2. npm run service:restart:daemon')
  console.log('')

  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('确认执行清理和重启？(输入 YES 确认): ', (answer) => {
    rl.close()
    if (answer === 'YES') {
      clearCacheAndRestart()
    } else {
      console.log('❌ 操作已取消')
    }
  })
} else {
  console.log('🚀 强制模式：直接执行清理和重启...\n')
  clearCacheAndRestart()
}

module.exports = { clearCacheAndRestart }
