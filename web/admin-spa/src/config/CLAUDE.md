# AGENTS 指南（src/config）

## 目录职责

- 前端配置与 API 封装：Axios 客户端、接口常量、应用基础配置

## 协作约定

- 修改 API 基址或路由需同步通知后端
- `api.js` / `apiStats.js` 中新增方法请保持 Promise 封装与错误处理一致
