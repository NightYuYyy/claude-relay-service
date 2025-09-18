# AGENTS 指南（web/admin-spa/src）

## 目录职责

- 管理后台核心源码：入口、路由、状态、视图、工具方法与静态资源

## 关键结构

- `assets/`：样式与静态资源
- `components/`：业务组件目录树
- `router/`：Vue Router 定义，含权限控制
- `stores/`：Pinia 状态管理
- `utils/`：格式化、提示等通用工具

## 协作约定

- 变更全局样式需评估对暗色主题与移动端的影响
- 路由守卫、Axios 拦截器的调整需同步更新登录流程说明
