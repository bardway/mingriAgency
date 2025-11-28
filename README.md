# 明日调查局 - COC7 跑团工具套件# KP 助手



<div align="center">专为《克苏鲁的呼唤》第七版 (Call of Cthulhu 7th Edition) 跑团设计的 KP 辅助工具。



**v1.0.0 - 穿山**##  功能特性



专为《克苏鲁的呼唤》第七版 (Call of Cthulhu 7th Edition) 设计的跑团辅助工具### 核心功能



[在线使用](https://mingri.agency) | [文档](./docs) | [反馈问题](https://github.com/bardway/mingriAgency/issues)- **概览仪表盘** - 快速查看跑团、角色和模组的整体概况

- **KP 中控台** - 实时管理当前跑团状态

</div>  - 队伍成员 HP/SAN 追踪

  - SAN 检定自动化

---  - 自定义变量管理

  - 事件日志记录

## ✨ 功能特性- **角色管理** - 调查员信息、NPC 资料库、技能与属性跟踪

- **战役管理** - 模组组织、场景与线索追踪、进度记录

### 🎲 KP 中控台- **COC7 规则库** - 核心规则、属性、技能、战斗、理智系统、职业速查

跑团会话实时管理工具- **数据备份** - 导入/导出 JSON、本地持久化

- ✅ 会话管理 - 场景追踪、线索管理

- ✅ 队伍成员 HP/SAN 追踪##  技术栈

- ✅ 自定义变量管理

- ✅ 事件日志记录| 技术 | 版本 |

- ✅ 角色库 - 调查员、NPC 资料|------|------|

| React | 18 |

### 📝 模组创建（开发中）| TypeScript | 5 |

可视化模组设计平台（桌面端专用）| Vite | 5 |

- ✅ 剧情流程图 - 拖拽式场景编辑| React Router | 6 |

- ✅ NPC 管理 - 角色关系网络| Zustand | 4 |

- 🚧 线索网络 - 线索分布和触发| Tailwind CSS | 3 |

- 🚧 物品道具管理| localForage | 1 |

- 🚧 地图地点编辑

##  快速开始

### 📚 规则库

COC7 版完整规则查询系统\\\ash

- ✅ 62 项技能详解（含年代区分）# 安装依赖

- ✅ 186 项职业数据npm install

- ✅ 104 种武器 + 74 种防具

- ✅ 战斗、理智、属性规则# 开发模式

- ✅ 术语表、价格表npm run dev



---# 构建生产版本

npm run build

## 🚀 快速开始

# 预览构建结果

### 安装依赖npm run preview

```bash\\\

npm install

```##  部署



### 开发模式纯前端 SPA，可部署到任何静态托管服务（Vercel、Netlify、GitHub Pages 等）。

```bash

npm run dev##  许可证

```

MIT License

### 构建生产版本

```bash**维护者**：穿山  
npm run build
```

### 预览构建结果
```bash
npm run preview
```

---

## 📦 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| TypeScript | 5 | 类型安全 |
| Vite | 5 | 构建工具 |
| React Router | 6 | 路由管理 |
| Zustand | 4 | 状态管理 |
| Tailwind CSS | 3 | 样式框架 |
| React Flow | 11 | 流程图编辑 |
| localForage | 1 | 数据持久化 |

---

## 📂 项目结构

```
mingriAgency/
├── src/
│   ├── components/      # UI 组件
│   ├── pages/           # 页面组件
│   │   ├── kp/         # KP 中控台
│   │   ├── designer/   # 模组创建
│   │   └── rulebook/   # 规则库
│   ├── features/        # 功能模块
│   ├── domain/          # 领域模型
│   ├── state/           # 状态管理
│   ├── storage/         # 数据持久化
│   └── router/          # 路由配置
├── data/                # COC7 规则数据
└── docs/                # 项目文档
```

详细结构说明见 [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md)

---

## 🎨 设计理念

- **模块化设计** - 三大独立模块，各司其职
- **响应式布局** - 移动端友好，桌面端优化
- **玻璃态美学** - 现代化 UI，沉浸式体验
- **类型安全** - TypeScript 全覆盖
- **性能优先** - 代码分割、按需加载

---

## 🌐 部署

纯前端 SPA，可部署到任何静态托管服务：

- ✅ Vercel（推荐）
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Cloudflare Pages

---

## 📄 许可证

MIT License - 自由使用、修改和分发

---

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

**维护者**：穿山 ([bardway](https://github.com/bardway))  
**版本**：v1.0.0 - 穿山  
**最后更新**：2025-11-28
