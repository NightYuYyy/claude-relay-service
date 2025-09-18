# AGENTS 指南（src/routes）

## 目录职责
- 提供所有 HTTP/SSE 接口入口，连接前端、CLI 与对外 API

## 关键文件
- `openaiRoutes.js`：Codex/OpenAI 兼容层，含粘性会话与速率限制处理
- `admin.js`：管理后台主入口，覆盖账号、API Key、Webhook 等
- `api.js`、`geminiRoutes.js`、`azureOpenaiRoutes.js` 等：各云厂商调度
- `web.js`、`userRoutes.js`：Web 面板与用户自助端

## 协作约定
- 新增路由需确保认证策略、异常处理与日志输出齐备
- SSE/流式接口须在响应头中设置 `X-Accel-Buffering` 与 `Content-Type`
- 修改路由签名后请同步更新前端 API 配置

## 维护提示
- PR 中务必说明外部接口变化，避免客户端不兼容