# AGENTS 指南（resources）

## 目录职责
- 保存运行时所需的静态资源（模型价格、上下文信息等）

## 协作约定
- 数据文件需说明来源与更新时间，确保与 `pricingService` 同步
- 禁止在此存放动态生成或敏感数据

## 维护提示
- 资源更新后需同时校验 `scripts/update-model-pricing.js` 读取是否正常