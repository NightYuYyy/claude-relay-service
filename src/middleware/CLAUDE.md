# AGENTS 指南（src/middleware）

## 目录职责
- 封装 Express 中间件：认证、速率限制、安全策略、浏览器降级处理

## 关键文件
- `auth.js`：JWT 校验、速率限制、全局请求日志、错误处理等核心中间件
- `browserFallback.js`：针对浏览器扩展与非标准请求做兜底处理

## 协作约定
- 新增中间件需在 `app.js` 按顺序注册，注意依赖关系
- Any debug-only 中间件（如 `debugInterceptor`）请保持在 gitignore 中，避免生产环境加载

## 维护提示
- 变更认证逻辑后需同时更新前端登录流程与相关文档