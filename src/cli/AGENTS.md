# AGENTS 指南（src/cli）

## 目录职责
- 存放面向后端管理员的 Node CLI 子命令实现

## 关键文件
- `initCosts.js`：检查并初始化所有 API Key 的成本数据，复用 `services/costInitService`

## 协作约定
- CLI 调用需保持幂等，并在异常时输出可读日志
- 依赖服务层接口变动时需同步更新此处

## 维护提示
- 运行前确认 Redis 可用，命令示例：`node src/cli/initCosts.js`