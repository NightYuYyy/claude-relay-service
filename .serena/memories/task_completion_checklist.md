## 任务完成前自检
- 仅修改与需求直接相关的文件，保持最小 diff
- 执行 `npm run lint` 与 `npm test`（如包含前端改动再运行 `npm run build:web`）
- 若涉及配置/密钥，确认未提交敏感信息
- 更新相关文档或脚本说明
- 在提交信息中遵循 Conventional Commits，标注影响面与验证步骤
