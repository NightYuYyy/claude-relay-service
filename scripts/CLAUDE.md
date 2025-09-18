# AGENTS 指南（scripts）

## 目录职责
- 承载批处理脚本与调试工具，覆盖数据迁移、监控、Redis 诊断等运维场景

## 关键脚本
- `manage.sh` / `manage.js`：服务启停与日志管理入口
- `data-transfer*.js`：导入导出、脱敏逻辑
- `analyze-log-sessions.js`、`debug-redis-keys.js` 等：问题定位工具

## 协作约定
- Node 脚本统一使用 `node scripts/<file>` 运行，Shell 脚本在类 Unix 环境执行
- 修改前请确认依赖的环境变量，避免脚本破坏线上数据
- 新脚本需在注释中注明输入、输出与安全注意事项

## 维护提示
- 所有脚本同样遵循 ESLint 规则，可通过 `npm run lint -- scripts/**/*.js` 进行检查