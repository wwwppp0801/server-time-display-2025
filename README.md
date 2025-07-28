# 服务器时间显示 (Server Time Display)

## 项目概述
- **名称**: server-time-display-2025
- **目标**: 实时显示服务器时间，包括UTC时间、北京时间和服务器本地时间
- **主要功能**: 
  - 实时显示多个时区的服务器时间
  - 自动每5秒更新时间
  - 显示时间戳和ISO格式时间
  - 连接状态监控
  - 响应式设计，支持移动端

## 访问地址
- **开发环境**: https://3000-iwu11zg8ty0eeg69zbzze-6532622b.e2b.dev
- **GitHub仓库**: https://github.com/wwwppp0801/server-time-display-2025
- **API 端点**: 
  - 时间 API: `/api/time`
  - 健康检查: `/api/health`

## 数据架构
- **数据模型**: 
  - UTC 时间 (ISO 格式)
  - 北京时间 (UTC+8)
  - 服务器本地时间
  - Unix 时间戳
  - 格式化的日期和时间字符串
- **存储服务**: 无需外部存储，实时计算服务器时间
- **数据流**: 
  1. 客户端请求 `/api/time`
  2. 服务器计算当前时间 (UTC、北京时间、本地时间)
  3. 返回 JSON 格式的时间数据
  4. 前端每5秒自动刷新显示

## 用户指南
1. **访问网站**: 打开上述开发环境地址
2. **查看时间**: 页面会自动显示三种时间格式：
   - UTC 时间 (绿色卡片)
   - 北京时间 (红色卡片) 
   - 服务器本地时间 (蓝色卡片)
3. **实时更新**: 时间每5秒自动更新，无需手动刷新
4. **详细信息**: 底部显示Unix时间戳和ISO格式时间
5. **连接状态**: 页面底部显示连接状态和最后更新时间

## 部署信息
- **平台**: E2B Sandbox (开发环境)
- **状态**: ✅ 运行中
- **技术栈**: 
  - 后端: Hono + TypeScript
  - 前端: 原生 JavaScript + TailwindCSS
  - 构建工具: Vite
  - 部署工具: Wrangler (Cloudflare Pages)
- **端口**: 3000
- **最后更新**: 2025-07-28

## 技术特性
- **轻量级**: 使用 Hono 框架，打包后仅 37KB
- **实时性**: 每5秒自动更新，支持页面可见性检测
- **响应式**: 支持桌面和移动端设备
- **零依赖**: 除 CDN 库外无外部依赖
- **错误处理**: 自动重连机制和错误状态显示
- **美观界面**: 使用 TailwindCSS 和 FontAwesome 图标

## 开发命令
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview

# 清理端口
npm run clean-port

# 测试服务
npm run test

# Git 操作
npm run git:status
npm run "git:commit" "提交信息"
```

## API 文档

### GET /api/time
返回服务器当前时间信息：
```json
{
  "utc": "2025-07-25T14:05:41.310Z",
  "local": "7/25/2025, 2:05:41 PM", 
  "beijing": "2025/7/26 06:05:41",
  "timestamp": 1753452341310,
  "formatted": {
    "date": "2025/7/25",
    "time": "14:05:41", 
    "datetime": "2025/7/25 14:05:41",
    "iso": "2025-07-25T14:05:41.310Z"
  }
}
```

### GET /api/health
健康检查端点：
```json
{
  "status": "ok",
  "message": "服务器运行正常",
  "timestamp": "2025-07-25T14:05:52.417Z"
}
```

## 项目结构
```
server-time-display/
├── src/
│   └── index.tsx          # 主应用文件（包含API和前端）
├── public/
│   └── static/            # 静态资源（已内联到HTML中）
├── dist/                  # 构建输出目录
├── ecosystem.config.cjs   # PM2 配置文件
├── wrangler.jsonc        # Cloudflare Pages 配置
├── vite.config.ts        # Vite 构建配置
├── package.json          # 项目依赖和脚本
└── README.md             # 项目文档
```

## 部署到Cloudflare Pages
```bash
# 构建项目
npm run build

# 部署到生产环境
npm run deploy:prod
```

## 贡献
欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证
MIT License