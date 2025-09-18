# 缓存清理脚本使用说明

本目录包含两个用于清理数据库缓存的脚本，保留API Key和账号信息不变。

## 脚本说明

### 1. 完整版清理脚本 (`clear-cache-data.js`)
- **功能**: 安全清理所有缓存数据，保留重要配置
- **确认机制**: 需要用户输入 `YES` 确认执行
- **详细日志**: 显示详细的清理进度和统计信息
- **使用场景**: 生产环境或重要数据清理

### 2. 快速清理脚本 (`quick-clear-cache.js`)
- **功能**: 快速清理常用缓存数据
- **确认机制**: 无需确认，直接执行
- **简化日志**: 简洁的执行日志
- **使用场景**: 开发环境快速重置

## 运行方式

### 使用 npm 命令（推荐）

```bash
# 完整版清理（需要确认）
npm run clear:cache

# 快速清理（无需确认）
npm run clear:cache:quick

# 强制快速清理（与 quick 相同）
npm run clear:cache:force
```

### 直接运行脚本

```bash
# 完整版清理
node scripts/clear-cache-data.js

# 快速清理
node scripts/quick-clear-cache.js
```

## 清理的数据类型

### ✅ 会被清除的数据
- **使用统计**: `usage:*`, `account_usage:*`, `usage:platform:*`, `usage:model:*`
- **会话数据**: `session:*`, `sticky_session:*`
- **限流状态**: `rate_limit:*`
- **调度器状态**: `scheduler:*`, `openai_scheduler:*`, `gemini_scheduler:*`
- **系统缓存**: `system_info`, `system_stats:*`, `metrics:*`
- **临时数据**: `lock:*`, `temp:*`, `cache:*`
- **统计缓存**: `daily_stats:*`, `monthly_stats:*`, `hourly_stats:*`

### 🛡️ 保留的数据
- **API Keys**: `apikey:*`
- **Claude 账户**: `claude_account:*`
- **Gemini 账户**: `gemini_account:*`
- **OpenAI 账户**: `openai_account:*`
- **Azure OpenAI 账户**: `azure_openai_account:*`
- **Bedrock 账户**: `bedrock_account:*`
- **OpenAI-Responses 账户**: `openai_responses_account:*`
- **CCR 账户**: `ccr_account:*`
- **管理员信息**: `admin:*`, `admin_username:*`
- **用户信息**: `user:*`, `user_username:*`
- **账户组**: `account_group:*`

## 使用建议

### 开发环境
```bash
# 快速重置，继续开发
npm run clear:cache:quick
```

### 测试环境
```bash
# 安全清理，查看详细日志
npm run clear:cache
```

### 生产环境
```bash
# 谨慎使用，建议先备份
npm run data:export:enhanced
npm run clear:cache
```

## 清理后的建议

1. **重启服务**: 清理完成后建议重启服务以确保缓存完全清空
   ```bash
   npm run service:restart
   ```

2. **验证功能**: 检查关键功能是否正常
   - API Key 认证
   - 账户调度
   - 费用统计

3. **监控日志**: 观察服务启动后的日志
   ```bash
   npm run service:logs:follow
   ```

## 注意事项

⚠️ **重要提醒**:
- 清理操作不可逆，请确认不需要历史统计数据
- 清理后所有使用统计将从0开始
- API Key 限额状态会被重置
- 账户调度状态会被重置

🔒 **安全保证**:
- 不会删除任何账户配置
- 不会删除API Key配置
- 不会删除用户和管理员信息
- 不会影响账户绑定关系

## 故障排除

如果脚本执行失败：

1. **检查 Redis 连接**
   ```bash
   # 检查 Redis 服务状态
   redis-cli ping
   ```

2. **检查权限**
   ```bash
   # 确保脚本有执行权限
   chmod +x scripts/*.js
   ```

3. **查看详细错误**
   - 检查 `logs/claude-relay-*.log` 文件
   - 运行 `npm run service:status` 检查服务状态