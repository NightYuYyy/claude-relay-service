# Claude Relay Service

> 基于 Node.js 的多账号 AI 转发网关，兼容 OpenAI / Claude / Gemini / Azure / Bedrock 等平台，提供统一鉴权、限额治理与可视化后台。

## 功能总览
- **多渠道统一入口**：向外暴露兼容 OpenAI 的 API，内部按账号类型（Claude Console、Gemini、Azure OpenAI 等）自动分流。
- **智能调度与故障恢复**：账号优先级、并发控制、限流感知、速率窗口自动暂停/恢复一体化。
- **限额治理面板**：支持全局、平台、模型三级限额配置；后台表格与 `api-stats` 查询页实时展示每日/累计费用进度。
- **丰富的度量与告警**：Redis 累积请求/Token/费用数据，配合 webhook 与日志快速定位异常。
- **配套前端与脚本**：`web/admin-spa` 提供管理后台；`scripts/` 与 `cli/` 目录内含常用维护脚本。

## 架构组件
### 后端（`src/`）
- Express + Pinia 风格的服务模块：`routes/` 负责协议适配，`services/` 封装业务逻辑，`middleware/` 处理鉴权、防滥用与追踪。
- Redis（`models/redis.js`）集中管理 API Key、账户、限额、统计等状态。
- 工具库（`utils/`）覆盖代理、成本计算、日志、渠道识别等通用能力。

### 前端管理端（`web/admin-spa/`）
- Vue 3 + Vite + Element Plus；Pinia 负责状态管理与接口封装。
- 主要页面：Dashboard、Accounts、API Keys、API Stats、User 模块，均支持深色模式。
- 新增“账户单独限额”展示，联动 `platformUsage` / `modelUsage` 数据实现费用进度可视化。

### 其他配套
- 配置样例：`config/config.example.js`、`.env.example`。
- 自动化脚本：`scripts/`（bash）、`cli/index.js`（快速操作入口）。
- 部署资产：`Dockerfile`、`docker-compose.yml`、`Makefile`。

## 快速开始
1. **环境准备**：Node.js ≥ 18、Redis 实例；如需前端构建需安装 pnpm / npm。
2. **安装依赖**：
   ```bash
   npm install
   npm run install:web  # 可选：安装 admin-spa 依赖
   ```
3. **初始化配置**：复制 `.env.example` → `.env`，`config/config.example.js` → `config/config.js`，按需补充平台秘钥。
4. **开发模式**：
   ```bash
   npm run dev           # 后端热重载
   npm run dev:web       # 前端管理端（Vite）
   ```
5. **生产构建/启动**：
   ```bash
   npm run build:web     # 构建管理端静态资源
   npm run start         # 生产模式，包含 ESLint 检查
   ```
6. **Docker 方案**：`npm run docker:build && npm run docker:up`，默认包含 Redis 与 Relay 服务。

## 限额治理能力
- **全局限额**：API Key 级别的每日费用、速率窗口（请求/Token/费用）与并发限制。
- **平台限额**：`platformLimits`（Claude/OpenAI/Gemini）配置总额与每日额，后端实时统计 `platformUsage` 供 UI 展示。
- **模型限额**：`modelLimits` 支持按模型细化费用阈值，`LimitConfig` & `ApiKeysView` 将进度以卡片/提示呈现。
- **观察入口**：
  - 管理后台 → API Keys 表格新增“单独限额”进度块。
  - 公共查询页 `/admin-next/api-stats` 在单 Key 模式下显示平台/模型限额卡片。

## 开发与质量
### 常用脚本
| 命令 | 说明 |
| ---- | ---- |
| `npm run dev` | 后端热重载 |
| `npm run dev:web` | 前端管理端热重载 |
| `npm run lint` / `npm run format` | ESLint + Prettier 检查/修复 |
| `npm test` | Jest 测试套件（含 supertest API 用例） |
| `npm run build:web` | 构建 admin-spa 产物 |
| `npm run service:start` | PM2 方式启动 Relay 服务 |

### 代码规范
- 统一使用 ESLint（`eslint:recommended`）+ Prettier；2 空格缩进、单引号、无分号、`printWidth=100`。
- 文件命名遵循：服务 `*Service.js`、路由 `*Routes.js`、工具驼峰小写，模块使用 CommonJS。
- 变更前后务必运行 `npm run lint && npm test`，前端改动建议追加 `npm run build:web` 验证。

### 测试建议
- 路由层覆盖成功/失败分支、限流与鉴权场景。
- 服务层聚焦账号调度、限额命中、费用计算；可使用 Redis mock 提升可控性。
- 前端组件使用 `vitest` / `@vue/test-utils`（可选），至少在 PR 中附截图说明关键 UI 变化。

## 常见问题
- **为什么没有 Rust/Cargo？** 本仓库为 Node.js + Vue 项目，不包含 `Cargo.toml`。若通用脚本仍执行 `cargo check`，请先判断目标目录是否存在真实的 Rust 工程。
- **Redis 连接失败？** 检查 `.env` / `config/config.js` 中的 Redis 主机、密码、TLS 设置；开发环境可开启 `lazyConnect`。
- **限额数据未刷新？** 确认后端 `platformUsage` / `modelUsage` 已写入 Redis；前端需要刷新（按钮支持强制刷新缓存）。

## 贡献说明
- Commit 遵循 Conventional Commits（例：`feat: support azure openai limits`）。
- PR 模版需清晰描述改动范围、影响面、验证步骤；涉及 UI 的提交请附截图或录屏。
- 敏感配置一律通过 `.env`/`config.js`；切勿提交真实密钥。

## 目录速览
```
.
├─ src/                 # 后端 Express 应用
│  ├─ routes/           # API / Webhook / Admin 路由
│  ├─ services/         # 账户、调度、价格、Webhook 等服务层
│  ├─ middleware/       # 鉴权、限流、安全策略
│  ├─ models/redis.js   # Redis 封装
│  └─ utils/            # 日志、代理、成本、工具方法
├─ web/admin-spa/       # Vue3 管理前端
├─ config/              # 配置模板与加载逻辑
├─ scripts/             # 运维/诊断脚本
├─ cli/                 # CLI 工具
├─ docs/                # 使用/运维文档
└─ resources/           # 定价、图标等静态资源
```

---

保持 Linus 的开发精神：解决实际问题、拒绝过度设计、提交可验证的最小变更。欢迎 Issue / PR！
