# AGENTS 指南（src/stores）

## 目录职责
- Pinia 状态仓库：账户、API Key、统计、主题、会话等全局状态

## 协作约定
- Store 方法需返回 Promise 以便组件处理异步状态
- 修改状态结构需同步更新依赖的组件与 API 层
- Axios 拦截器注册集中在 `auth` / `user` store，请避免重复注册

## 维护提示
- 重构 store 前先梳理缓存策略与本地存储键名