# KP 助手

专为《克苏鲁的呼唤》第七版 (Call of Cthulhu 7th Edition) 跑团设计的 KP 辅助工具。

##  功能特性

### 核心功能

- **概览仪表盘** - 快速查看跑团、角色和模组的整体概况
- **KP 中控台** - 实时管理当前跑团状态
  - 队伍成员 HP/SAN 追踪
  - SAN 检定自动化
  - 自定义变量管理
  - 事件日志记录
- **角色管理** - 调查员信息、NPC 资料库、技能与属性跟踪
- **战役管理** - 模组组织、场景与线索追踪、进度记录
- **COC7 规则库** - 核心规则、属性、技能、战斗、理智系统、职业速查
- **数据备份** - 导入/导出 JSON、本地持久化

##  技术栈

| 技术 | 版本 |
|------|------|
| React | 18 |
| TypeScript | 5 |
| Vite | 5 |
| React Router | 6 |
| Zustand | 4 |
| Tailwind CSS | 3 |
| localForage | 1 |

##  快速开始

\\\ash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
\\\

##  部署

纯前端 SPA，可部署到任何静态托管服务（Vercel、Netlify、GitHub Pages 等）。

##  许可证

MIT License

**维护者**：穿山  