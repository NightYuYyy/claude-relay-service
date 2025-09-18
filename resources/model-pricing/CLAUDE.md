# AGENTS 指南（resources/model-pricing）

## 目录职责
- 提供模型价格、上下文窗口等静态 JSON 数据供后端调度服务使用

## 关键文件
- `model_prices_and_context_window.json`：主数据源
- `README.md`：字段含义与更新说明

## 协作约定
- 更新价格时需保证 JSON 结构不变，并在 README 中记录变更
- 调整字段后同步检查 `pricingService` 与相关脚本的解析逻辑

## 维护提示
- 建议通过脚本 `scripts/update-model-pricing.js` 统一更新与校验