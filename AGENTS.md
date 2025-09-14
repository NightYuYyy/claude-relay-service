# Repository Guidelines

> 本文是本仓库的贡献者指南，聚焦结构、开发流程与质量规范，帮助你快速高质量地提交变更。

## 项目结构与模块组织
- 核心后端：`src/`
  - 路由：`src/routes/*Routes.js`（如 `openaiRoutes.js`）
  - 服务：`src/services/*Service.js`（业务与第三方集成）
  - 中间件：`src/middleware/`
  - 模型与存储：`src/models/`
  - 工具：`src/utils/`
  - 入口：`src/app.js`
- 前端管理端（可选）：`web/admin-spa/`（`npm run build:web` 产物位于 `dist/`）
- 配置与资源：`config/`（`config.example.js` → `config.js`）、`.env.example`
- 工具脚本与 CLI：`scripts/`、`cli/`
- 文档与运维：`docs/`、`Dockerfile`、`docker-compose.yml`、`Makefile`

## 构建、测试与本地开发
- 运行环境：`Node >= 18`
- 常用命令（从仓库根目录执行）：
  - 开发热重载：`npm run dev`
  - 生产启动：`npm start`（包含 `eslint` 检查）
  - 前端构建：`npm run build:web`
  - 安装前端依赖：`npm run install:web`
  - 测试：`npm test`（Jest）
  - 代码检查/修复：`npm run lint` / `npm run format`
  - 一键初始化：`make setup`（拷贝 `.env`/`config.js` 并运行初始化脚本）
  - 服务管理：`npm run service:start|stop|status|logs`
  - Docker：`npm run docker:build`，`npm run docker:up`，`npm run docker:down`

## 代码风格与命名
- Lint/Format：ESLint（`eslint:recommended`）+ Prettier；提交前确保无报错。
- 主要格式：2 空格缩进、单引号、无分号、`printWidth=100`、`endOfLine=lf`。
- 命名约定：
  - 文件：服务 `*Service.js`，路由 `*Routes.js`，工具小驼峰（如 `dateHelper.js`）。
  - 变量/函数：`camelCase`；常量：`UPPER_SNAKE_CASE`；类名：`PascalCase`。
  - 模块：使用 CommonJS（`require/module.exports`）。

## 测试指南
- 框架：Jest（配合 `supertest` 测 API）。
- 位置与命名：同目录或 `tests/` 下，使用 `*.test.js` / `*.spec.js`。
- 覆盖重点：路由行为、服务边界条件、错误分支与日志输出。
- 运行：`npm test`；本地可使用 `--watch` 提升迭代效率。

## Commit 与 Pull Request
- Commit 采用 Conventional Commits：`feat: ...`、`fix: ...`、`chore: ...`、`docs:`、`refactor:` 等；示例：
  - `feat: 支持 Azure OpenAI 账号路由`
  - `fix: 修复限流状态判断为空字符串的情况`
  - `chore: sync VERSION [skip ci]`
- PR 要求：
  - 清晰描述目的与变更范围，关联 Issue（如 `Closes #123`）。
  - 标注影响面（API、配置、迁移、前端 UI），附本地验证步骤；涉及前端改动请附截图/录屏。
  - 通过 `npm run lint` 与测试；避免无关重构或大规模格式化。

## 安全与配置提示（可选）
- 通过 `make setup` 或手动从示例复制 `.env` 与 `config/config.js`。严禁提交秘钥与私密配置。
- 如启用代理或外部服务，检查 `config/` 与环境变量；避免在日志中输出敏感信息。

## 面向自动化代理的说明（Agent 指南）
- 仅修改与任务直接相关的文件；遵循本文件命名与风格；保持最小变更面。
- 变更前后运行：`npm run lint && npm test`；涉及前端改动请同步执行 `npm run build:web` 验证构建。

