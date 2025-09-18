# AGENTS 指南（components/apistats）

## 目录职责
- API 用量统计组件：模型穿透、限流配置、Token 分布、聚合指标展示

## 协作约定
- 数据来源于 `stores/apistats`，请确保图表组件在数据为空时也能友好展示
- 限流配置组件需与后端 REST 接口协同更新

## 维护提示
- 调整统计维度前需评估后端 Redis 统计结构是否兼容