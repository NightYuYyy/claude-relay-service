# Scripts 目录说明

本目录包含项目维护和管理所需的各类脚本。

## 📂 脚本分类

### 🔧 系统维护脚本

#### 缓存清理脚本
- **clear-cache-data.js** - 完整版缓存清理（需确认，详细日志）
- **quick-clear-cache.js** - 快速缓存清理（无需确认，适合开发）
- **clear-and-restart.js** - 清理缓存并重启服务（一站式解决方案）

#### 数据修复脚本
- **fix-redis-wrongtype.js** - 修复 Redis 键类型冲突（WRONGTYPE 错误）
- **fix-usage-stats.js** - 修复使用统计数据
- **fix-inquirer.js** - 修复 inquirer 依赖问题

### 📊 数据管理脚本

#### 数据迁移
- **data-transfer.js** - 基础数据迁移工具
- **data-transfer-enhanced.js** - 增强版数据迁移（支持更多选项）
- **migrate-apikey-expiry.js** - API Key 过期时间迁移

#### 数据分析
- **analyze-log-sessions.js** - 分析日志会话
- **debug-redis-keys.js** - 调试 Redis 键问题
- **check-redis-keys.js** - 检查 Redis 键状态

### 🧪 测试脚本

#### 功能测试
- **test-api-response.js** - 测试 API 响应
- **test-account-display.js** - 测试账户显示
- **test-gemini-refresh.js** - 测试 Gemini token 刷新
- **test-bedrock-models.js** - 测试 Bedrock 模型
- **test-model-mapping.js** - 测试模型映射
- **test-pricing-fallback.js** - 测试价格回退机制
- **test-window-remaining.js** - 测试窗口剩余时间
- **test-group-scheduling.js** - 测试分组调度
- **test-dedicated-accounts.js** - 测试专用账户

### 🛠️ 管理工具

- **manage.js** - 通用管理工具
- **manage-session-windows.js** - 管理会话窗口
- **setup.js** - 初始化设置脚本
- **generate-test-data.js** - 生成测试数据
- **update-model-pricing.js** - 更新模型定价

## 🚀 常用命令

### 缓存清理
```bash
# 快速清理（开发环境）
npm run clear:cache:quick
# 或
node scripts/quick-clear-cache.js

# 完整清理（生产环境）
npm run clear:cache
# 或
node scripts/clear-cache-data.js

# 清理并重启服务
node scripts/clear-and-restart.js
```

### 数据修复
```bash
# 修复 Redis 键类型错误
node scripts/fix-redis-wrongtype.js

# 修复使用统计
node scripts/fix-usage-stats.js
```

### 数据管理
```bash
# 导出数据
node scripts/data-transfer-enhanced.js export

# 导入数据
node scripts/data-transfer-enhanced.js import

# 生成测试数据
node scripts/generate-test-data.js
```

## ⚠️ 注意事项

1. **生产环境使用前**：
   - 先备份数据：`npm run data:export:enhanced`
   - 查看脚本帮助：`node scripts/[脚本名].js --help`
   - 了解脚本影响范围

2. **清理脚本注意**：
   - 清理操作不可逆
   - 会重置使用统计
   - 不会删除账户和 API Key

3. **测试脚本注意**：
   - 仅在测试环境使用
   - 可能产生测试数据
   - 使用后记得清理

## 📝 脚本开发规范

创建新脚本时请遵循：

1. 添加清晰的文件头注释说明功能
2. 提供 `--help` 参数支持
3. 危险操作需要用户确认
4. 使用项目的 logger 记录日志
5. 正确处理 Redis 连接的建立和断开
6. 添加错误处理和友好的错误提示

## 🔄 更新记录

- 2025-09-15: 创建脚本说明文档
- 2025-09-15: 添加缓存清理脚本系列
- 2025-09-15: 添加 Redis 键类型修复脚本