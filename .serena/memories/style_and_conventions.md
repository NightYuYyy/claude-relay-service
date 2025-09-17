## 代码风格
- 使用 ESLint(`eslint:recommended`) + Prettier，2 空格缩进、单引号、无分号、`printWidth=100`、`endOfLine=lf`
- 模块使用 CommonJS (`require/module.exports`)
- 命名约定：文件 `*Service.js`、`*Routes.js`；工具小驼峰；变量/函数 `camelCase`；常量 `UPPER_SNAKE_CASE`；类名 `PascalCase`

## 文档与注释
- 仅在复杂逻辑前添加简洁注释，避免冗余说明
- 提交前保持 ESLint/Prettier 干净

## 设计/流程
- 服务路由与业务交互在 `src/services/` 与 `src/routes/`
- 注意多账号调度、限流、日志和错误分支覆盖
