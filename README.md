# 明日社 KP 助手 🎭

**一个专为《克苏鲁的呼唤》(Call of Cthulhu 7th Edition) 跑团设计的现代化 KP 辅助工具**

[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https:/## 📚 文档

- [项目结构说明](docs/PROJECT_STRUCTURE.md) - 目录组织和架构
- [数据拆分指南](docs/DATA_SPLIT_GUIDE.md) - 规则数据库模块化结构
- [COC7 知识库使用指南](docs/COC7_KNOWLEDGE_GUIDE.md) - 规则数据 API 文档
- [数据整理报告](docs/DATA_ORGANIZATION_REPORT.md) - 数据库优化详情
- [构建日志](docs/BUILDLOG.md) - 知识库构建日志ields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ 特色功能

### 🎨 视觉设计 - Canva "Sliver of Silver"
采用专业配色方案，呈现优雅低调的视觉风格：

- **象牙白主背景** - `#E5DACE` 温暖舒适
- **深灰按钮** - `#5C5350` 醒目清晰
- **乌木黑文字** - `#3C3630` 层次分明
- **玻璃态效果** - Glassmorphism 设计语言
- **微妙光晕** - 低调精致的视觉细节

配色来源：[Canva - Sliver of Silver](https://www.canva.com/colors/color-palettes/sliver-of-silver/)

### 🎮 核心功能

#### 📊 概览仪表盘
快速查看跑团、角色和模组的整体概况

#### 🎲 KP 中控台
实时管理当前跑团状态：
- 队伍成员 HP/SAN 追踪（渐变进度条）
- SAN 检定自动化（D100 骰子）
- 自定义变量管理（完全通用，适配任何模组）
- 事件日志记录（实时更新）

#### 👥 角色管理
- 完整的调查员信息管理
- NPC 资料库
- 技能与属性跟踪

#### 📚 战役管理
- 模组组织与管理
- 场景与线索追踪
- 战役进度记录

#### 📖 COC7 规则库
**全新的规则速查系统**：
- 🎯 **核心规则** - 检定、对抗、成长等基础规则
- 💪 **角色属性** - 9项基础属性 + 6项派生属性详解
- 🎯 **技能系统** - 47项技能完整说明和使用示例
- ⚔️ **战斗规则** - 战斗回合、动作、武器数据
- 🧠 **理智系统** - 疯狂症状速查（短期/不定期/永久）
- 👔 **职业速查** - 职业技能配置和信用评级

所有数据来源于COC7守秘人规则书和调查员手册，支持快速搜索和分类筛选。

#### ⚙️ 数据备份
- 导入/导出 JSON
- 本地数据持久化
- 支持跨设备迁移

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **React 18** | 前端框架，支持并发渲染 |
| **TypeScript 5** | 类型安全，增强开发体验 |
| **Vite 6** | 超快的构建工具和开发服务器 |
| **React Router 7** | 声明式路由管理 |
| **Zustand** | 轻量级状态管理 |
| **Tailwind CSS 3** | 原子化 CSS 框架 + Canva 配色 |
| **localForage** | IndexedDB 封装，本地数据持久化 |

---

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:5173 启动，支持热更新

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

---

## 📦 部署

本项目是纯前端 SPA，可以部署到任何静态托管服务：

| 平台 | 说明 |
|------|------|
| **Vercel** | 推荐，自动构建和部署 |
| **Netlify** | 简单易用，拖拽即可 |
| **GitHub Pages** | 免费，已配置 `base: './'` |
| **本地部署** | 构建后直接打开 `dist/index.html` |

---

## 📁 项目结构

```
MingriAgency/
├── src/
│   ├── components/      # 可复用 UI 组件
│   │   ├── AppLayout.tsx
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── pages/          # 页面组件
│   │   ├── DashboardPage.tsx      # 概览仪表盘
│   │   ├── CharactersPage.tsx     # 角色管理
│   │   ├── CampaignsPage.tsx      # 战役管理
│   │   ├── ScenesPage.tsx         # 场景管理
│   │   ├── SessionConsolePage.tsx # KP 中控台
│   │   └── SettingsPage.tsx       # 设置页面
│   ├── domain/         # 业务领域模型
│   │   ├── Campaign.ts
│   │   ├── Character.ts
│   │   ├── Session.ts
│   │   └── ...
│   ├── types/          # TypeScript 类型定义
│   │   └── index.ts
│   ├── hooks/          # 自定义 React Hooks
│   │   ├── useData.ts
│   │   └── index.ts
│   ├── utils/          # 工具函数
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── index.ts
│   ├── state/          # Zustand 状态管理
│   │   ├── sessionStore.ts
│   │   └── index.ts
│   ├── storage/        # 数据持久化层
│   │   ├── IDataStore.ts
│   │   ├── LocalDataStore.ts
│   │   └── index.ts
│   ├── router/         # 路由配置
│   │   └── AppRouter.tsx
│   ├── index.css       # 全局样式
│   └── main.tsx        # 应用入口
├── public/
│   └── data/           # 静态 JSON 数据
│       └── coc7/
│           ├── skills.json
│           ├── weapons.json
│           └── insanities.json
├── docs/               # 项目文档
│   ├── QUICKSTART.md   # 快速开始指南
│   ├── DESIGN_GUIDE.md # 设计指南
│   ├── DEVELOPMENT.md  # 开发指南
│   ├── CHANGELOG.md    # 更新日志
│   ├── COLOR_SCHEME.md # 配色方案
│   └── PROJECT_STRUCTURE.md
├── assets/             # 参考资料
│   └── *.pdf
├── index.html          # HTML 模板
├── tailwind.config.js  # Tailwind 配置
├── vite.config.ts      # Vite 配置
└── package.json        # 项目配置
```

---

## 🎨 配色方案

### Canva "Sliver of Silver" 核心色

```javascript
{
  ivory:  '#E5DACE',  // 象牙白 - 主背景
  pewter: '#BCBEC0',  // 锡灰   - 卡片/边框
  gray:   '#5C5350',  // 深灰   - 按钮/文字
  ebony:  '#3C3630',  // 乌木黑 - 标题/强调
}
```

### Tailwind 类名快速参考

```tsx
// 主按钮（深灰，醒目）
<button className="bg-ww-orange-500 hover:bg-ww-orange-600 text-white">
  Primary
</button>

// 次按钮（浅色）
<button className="bg-ww-light-300 hover:bg-ww-light-400 text-ww-slate-800">
  Secondary
</button>

// 卡片
<div className="bg-ww-light-100 border border-ww-slate-400 shadow-glow">
  Content
</div>

// 标题
<h1 className="text-ww-slate-900 font-bold">
  Title
</h1>
```

---

## � 文档

- [快速开始指南](docs/QUICKSTART.md) - 5分钟上手
- [设计指南](docs/DESIGN_GUIDE.md) - UI/UX 设计规范
- [开发指南](docs/DEVELOPMENT.md) - 开发者文档
- [配色方案](docs/COLOR_SCHEME.md) - Canva "Sliver of Silver"
- [更新日志](docs/CHANGELOG.md) - 版本变更记录

---

## �🔧 开发指南

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/router/AppRouter.tsx` 添加路由
3. 在 `src/components/AppLayout.tsx` 添加导航链接

### 添加新功能

1. 在 `src/domain/` 定义领域模型
2. 在 `src/state/` 创建 Zustand store
3. 在 `src/storage/` 实现持久化逻辑
4. 在页面组件中使用

### 样式定制

所有配色在 `tailwind.config.js` 中定义：

```javascript
colors: {
  'ww-light': { /* 象牙白系 */ },
  'ww-slate': { /* 灰色系 */ },
  'ww-orange': { /* 深灰按钮系 */ },
  'ww-amber': { /* 辅助色系 */ },
}
```

全局样式在 `src/index.css` 中定义。

---

## 🐛 故障排除

### 样式未生效

清理缓存并重启：

```powershell
# PowerShell
Remove-Item -Recurse -Force node_modules/.vite
npm run dev
```

```bash
# Bash
rm -rf node_modules/.vite
npm run dev
```

### 数据丢失

本项目使用 IndexedDB 本地存储，数据在浏览器中持久化。建议定期导出备份。

---

## 📝 许可证

MIT License

---

## 🙏 致谢

- 配色方案来自 [Canva](https://www.canva.com/)
- 设计灵感来自《西部世界》
- COC7 规则来自 Chaosium Inc.

---

**开发团队**：明日社  
**版本**：1.0.0  
**最后更新**：2024
