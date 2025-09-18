# AGENTS 指南（components/accounts）

## 目录职责
- 账号管理相关组件（创建/编辑表单、OAuth 流程、代理配置、分组管理）

## 协作约定
- 表单校验需与后端字段保持一致，提交前进行本地验证
- OAuth 组件需处理 loading/error 状态，避免阻塞用户操作

## 维护提示
- 新增账号字段时同时更新 `AccountForm.vue` 与相关对话框