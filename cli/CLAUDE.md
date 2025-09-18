# AGENTS 指南（cli）

## 目录职责
- 提供运维向 Node.js CLI，涵盖管理员初始化、API Key 管理、Bedrock 账户操作等

## 关键文件
- `index.js`：Commander 主入口，封装 Redis 初始化与各子命令逻辑

## 协作约定
- CLI 依赖业务同源的 `src/services/*`，调整服务层接口时需同步梳理此处调用
- 运行前需保证 `.env` 与 `data/init.json` 已准备完毕，避免 Redis 写入失败
- CLI 场景仍遵守后端 lint 规范：`npm run lint -- cli/**/*.js`

## 维护提示
- 若新增子命令，请补充交互文案、错误处理与 Redis 连接的清理逻辑