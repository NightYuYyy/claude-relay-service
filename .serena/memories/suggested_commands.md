## 开发常用命令
- `npm run dev`：本地开发（nodemon 热重载）
- `npm start`：生产模式，启动前自动执行 `npm run lint`
- `npm run lint` / `npm run lint:check`：ESLint 检查（带/不带自动修复）
- `npm run format` / `npm run format:check`：Prettier 格式化
- `npm test`：运行 Jest 测试
- `npm run build:web` / `npm run install:web`：管理端前端构建与依赖安装
- `npm run service:*`：通过脚本管理守护进程（start/stop/restart/logs/status）
- `npm run docker:build|up|down`：容器化操作

## Windows/Powershell 日常
- `Get-ChildItem` (`gci`)：列目录
- `Get-Content` (`gc`)：查看文件
- `Set-Location` (`cd`)：切换目录
- `Remove-Item -Recurse -Force`：删除文件/目录（谨慎）
