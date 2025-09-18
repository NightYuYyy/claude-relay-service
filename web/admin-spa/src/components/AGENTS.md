# AGENTS 指南（web/admin-spa/src/components）

## 目录职责
- 提供拆分后的业务组件集合，按功能域拆分为 accounts、apikeys、apistats、common 等子目录

## 协作约定
- 组件需维持无状态/轻状态设计，状态交互交给 Pinia
- 公用组件需写明 props、事件说明，减少重复理解成本