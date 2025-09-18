# AGENTS 指南（.github/workflows）

## 目录职责
- 定义项目级 CI/CD 入口，约束提交、发布与构建行为

## 关键工作流
- `auto-release-pipeline.yml`：主干推送触发，执行版本号同步、前端构建发布、Docker 镜像推送与历史清理
- `pr-lint-check.yml`：PR 检查入口，针对差异文件执行格式化与 ESLint 校验，并在失败时自动回写评论

## 协作约定
- 工作流使用 Node18 环境，若需升级请确保前后端依赖已适配
- 发布流水线内明确禁用了无效的 `cargo check` 调用，如需扩展构建步骤请先评估语言栈
- 修改 GitHub Actions 需执行干跑 (`act` 或 workflow_dispatch`) 以验证语法

## 故障处理
- 若流水线误报，可先在 PR 评论区留存失败链接，并在此目录更新修复策略记录