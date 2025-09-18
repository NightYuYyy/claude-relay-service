# AGENTS 指南（src/services）

## 目录职责
- 承担业务核心逻辑：账号调度、限流恢复、价格计算、Webhook 通知、OAuth 等

## 关键模块示例
- `unifiedOpenAIScheduler.js`、`unifiedGeminiScheduler.js`：跨账号调度与粘性会话
- `claudeAccountService.js`、`openaiAccountService.js` 等：账号生命周期管理
- `pricingService.js`、`costInitService.js`：价格、成本初始化
- `webhookService.js`、`webhookConfigService.js`：事件推送
- `rateLimitCleanupService.js`：限流状态巡检

## 协作约定
- 业务服务保持纯函数/类，禁止直接耦合 Express `req/res`
- 跨服务调用需遵守依赖方向（Service → Model/Util），避免环依赖
- 变更数据结构必须同步更新 Redis 序列化逻辑与前端消费侧

## 维护提示
- 请在对应服务上补充注释或在 `AGENTS.md` 标注策略，便于后续值班排障