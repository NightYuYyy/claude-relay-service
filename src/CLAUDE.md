# AGENTS 指南（src · 后端）

## 目录职责
- 构建 Express + Redis 的核心后端：路由接入、账号调度、限流、日志与健康检查
- 统一封装外部平台（Claude、Gemini、OpenAI、Azure、Bedrock）的账户管理与代理访问

## 关键模块
- `app.js`：应用入口，初始化 Redis、缓存监控、路由与中间件
- `routes/`：REST/SSE 入口（`openaiRoutes.js`、`admin.js` 等）
- `services/`：业务服务层（调度器、账号服务、Webhook、价格体系等）
- `middleware/`：认证、安全、速率限制与浏览器兼容处理
- `utils/`：日志、代理、成本计算、缓存监控等通用能力

## 协作约定
- 代码遵守 ESLint + Prettier，提交前运行 `npm run lint` 并酌情补充单测/集成验证
- Redis 操作通过 `models/redis.js` 统一封装，禁止直接依赖外部连接
- 服务之间靠依赖注入与模块边界协作，新增模块需在对应 `AGENTS.md` 中记录职责

## Cargo Check 教训
- 曾有自动化脚本误对 `src/` 作为 Rust crate 执行 `cargo check`，导致警告干扰 CI
- 已在后端文档中标注：本目录专属 Node.js，任何构建脚本若需拓展请使用 npm 生态
- 若未来引入 Rust 模块需拆分至独立子仓或 `rust/` 子目录，避免语言冲突

## Linus 精神守则
- 逻辑改动须附带日志与错误处理，避免“静默失败”
- 优先编写可维护的朴素代码，拒绝过度抽象
- 以可测试、可回溯为底线，保证后端稳定运行