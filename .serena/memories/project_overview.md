## 项目定位
- Claude Relay Service：提供兼容 OpenAI/Claude 的多账号转发与调度能力，支持 API Key 鉴权与分组路由。

## 技术栈
- 运行时：Node.js >= 18
- 框架：Express 应用，配合中间件（helmet、compression、cors、morgan 等）
- 数据与状态：Redis（ioredis）以及脚本维护工具
- 其他：CLI 工具、前端管理端（web/admin-spa，基于 npm 构建）

## 目录结构
- `src/` 核心后端逻辑：`routes/*Routes.js`、`services/*Service.js`、`middleware/`、`models/`、`utils/`、入口 `app.js`
- `web/admin-spa/` 后台前端（构建产物位于 `dist/`）
- `config/` 配置文件（`config.example.js` → `config.js`）
- `scripts/` & `cli/` 日常维护脚本与 CLI
- `docs/` 文档、`Dockerfile` & `docker-compose.yml` 运维文件

## 其他注意
- 遵循仓库贡献者指南：最小变更面、严禁提交敏感配置，必要时复制 `.env`/`config.js`
