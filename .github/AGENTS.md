# AGENTS 指南（.github）

## 目录职责
- 承载 GitHub Actions、Issue 模板等自动化协作资产
- 通过流水线约束代码质量与发布节奏

## 关键文件
- `workflows/auto-release-pipeline.yml`：自动打包、打 tag、推送 Docker 镜像与前端构建分支
- `workflows/pr-lint-check.yml`：PR 级别的 ESLint、Prettier 校验和差异化格式化流程

## 协作约定
- 修改流水线需同步更新相应目录的 `AGENTS.md` 与变更说明
- 发布流程依赖 `VERSION` 文件与 Git tag，同步策略不可随意改动
- CI 中已显式移除无关的 `cargo check` 步骤，勿在此重新引入

## 维护提示
- 引入新工作流前先在 fork 或私有分支验证
- 若需额外密钥，请通过组织级别 Secrets 管理，禁止硬编码