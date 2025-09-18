# AGENTS 指南（web/admin-spa · 前端）

## 目录职责
- Vue3 + Element Plus 的管理后台，实现账号监控、API Key 管理、用量追踪等界面
- 通过 Pinia、Axios 与后端 API 交互，提供实时状态展示与操作面板

## 关键结构
- `src/main.js`：应用入口与全局初始化（主题、路由、Axios 拦截器）
- `src/views/`：页面级组件（Dashboard、Accounts、Settings、User 模块等）
- `src/components/`：领域组件与通用组件集合
- `src/stores/`：Pinia 状态管理，封装 API 访问
- `vite.config.js`：构建配置，使用 Vite + Element Plus 自动导入

## 协作约定
- 前端代码遵循 ESLint + Prettier，执行 `npm run lint` / `npm run format`
- 组件按领域分类放置，新增组件需在相应子目录附带 `AGENTS.md`
- 与后端 API 契约更改需同步更新 `src/config/api*.js`

## Cargo Check 教训
- 触发告警的根因：某通用脚本在全部项目中默认执行 `cargo check`
- 前端目录已确认纯 JS/TS，无 Rust 依赖；现已在开发文档中明示移除此步骤
- 若引入 WebAssembly/Rust，请放入独立子目录并在构建脚本中显式处理

## Linus 精神守则
- 组件保持小而清晰，props/emit 明确
- 所有网络请求需集中管理，严禁在视图里硬编码 URL
- 优先保证性能与可维护性，其次再做样式优化