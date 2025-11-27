# 项目结构说明

## 系统架构

本系统采用**三大模块**设计，每个模块独立运行且功能完整：

### 1. **KP 中控台** (`/kp`)
跑团会话管理工具，用于实时跑团
- 会话中控台 - 场景管理、投骰、数据追踪
- 角色库 - 玩家角色卡创建和导入

### 2. **模组创建** (`/designer`)
可视化模组设计平台
- 模组设计器 - 剧情流程图、场景编辑
- NPC管理 - NPC信息和关系网络
- 线索管理 - 线索分布和触发条件

### 3. **规则库** (`/rulebook`)
COC7版规则查询系统
- 规则索引、技能、属性、职业
- 战斗、理智、装备数据

## 目录组织

### `/src` - 源代码目录

#### `/src/components` - UI 组件
可复用的 React 组件，遵循单一职责原则。

- `AppLayout.tsx` - (已废弃) 旧版统一布局
- `ModuleLayout.tsx` - 模块布局组件（三大模块通用）
- `Button.tsx` - 按钮组件
- `Card.tsx` - 卡片组件
- `Toast.tsx` - 消息提示组件

#### `/src/pages` - 页面组件
按模块组织的页面文件：

**主入口**
- `HomePage.tsx` - 模块选择入口页

**KP中控台 (`/pages/kp/`)**
- `KPDashboardPage.tsx` - KP中控台概览
- `SessionConsolePage.tsx` - 会话中控台
- `CharactersPage.tsx` - 角色库

**模组创建 (`/pages/designer/`)**
- `DesignerDashboardPage.tsx` - 模组创建概览
- `ModuleDesignerPage.tsx` - 模组设计器

**规则库 (`/pages/rulebook/`)**
- `RulebookIndexPage.tsx` - 规则索引
- `RulebookSearchPage.tsx` - 规则搜索
- `RulesPage.tsx` - 核心规则
- `SkillsPage.tsx` - 技能列表
- `AttributesPage.tsx` - 属性说明
- `OccupationsPage.tsx` - 职业数据
- `CombatPage.tsx` - 战斗规则
- `SanityPage.tsx` - 理智系统
- `EquipmentPage.tsx` - 装备列表

#### `/src/features` - 功能模块
复杂功能的组件和逻辑封装

**模组设计器 (`/features/module-designer/`)**
- `/components/` - 设计器组件
  - `StoryFlowCanvas.tsx` - 故事流程画布
  - `NodeEditorPanel.tsx` - 节点编辑面板
  - `NPCManager.tsx` - NPC管理器
- `/nodes/` - 流程节点类型
  - `SceneNode.tsx` - 场景节点
  - `ChoiceNode.tsx` - 选择节点
  - `ConditionNode.tsx` - 条件节点
  - `CombatNode.tsx` - 战斗节点
  - `EndingNode.tsx` - 结局节点
- `/store/` - 设计器状态管理
  - `moduleDesignerStore.ts` - Zustand store

#### `/src/domain` - 领域模型
业务实体的 TypeScript 定义，包含数据结构和业务逻辑。

- `Campaign.ts` - 战役模型
- `Character.ts` - 角色模型
- `Session.ts` - 跑团会话模型
- `Skill.ts` - 技能模型
- `Weapon.ts` - 武器模型
- `Insanity.ts` - 疯狂症状模型

#### `/src/types` - 类型定义
统一的 TypeScript 类型定义和接口。

- `index.ts` - 导出所有类型，包含通用类型如 UUID、AsyncData 等

#### `/src/hooks` - 自定义 Hooks
可复用的 React Hooks。

- `useData.ts` - 数据加载和本地存储 Hook
  - `useAsyncData` - 异步数据加载
  - `useLocalStorage` - LocalStorage 封装

#### `/src/utils` - 工具函数
纯函数工具集，无副作用。

- `constants.ts` - 常量定义
  - `APP_CONFIG` - 应用配置
  - `STORAGE_KEYS` - 存储键名
  - `COC7_RULES` - COC7 规则常量
  - `DATA_PATHS` - 数据文件路径
- `helpers.ts` - 辅助函数
  - 日期格式化
  - UUID 生成
  - 骰子掷骰
  - 数值处理

#### `/src/state` - 状态管理
使用 Zustand 进行全局状态管理。

- `sessionStore.ts` - 跑团会话状态
- `index.ts` - 统一导出

#### `/src/storage` - 数据持久化
封装数据存储层，使用 IndexedDB (localForage)。

- `IDataStore.ts` - 数据存储接口
- `LocalDataStore.ts` - 本地存储实现
- `index.ts` - 统一导出

#### `/src/router` - 路由配置
React Router 路由配置，采用**模块化嵌套路由**。

- `AppRouter.tsx` - 路由定义和配置
  - `/` - 主入口（模块选择）
  - `/kp/*` - KP中控台模块路由
  - `/designer/*` - 模组创建模块路由
  - `/rulebook/*` - 规则库模块路由

### `/public` - 静态资源

#### `/public/data` - COC7 数据文件(分模块)
JSON 格式的静态数据，运行时通过 fetch 加载。采用模块化拆分，提升性能和可维护性。

**数据文件**(位于 `/public/data/`):
- `metadata.json` - 知识库元数据(版本、来源)
- `sections.json` - 章节索引
- `rules.json` - 核心规则系统
- `attributes.json` - 角色基础属性(STR、CON等)
- `derived-stats.json` - 派生属性(HP、SAN、MP等)
- `skill-categories.json` - 技能分类
- `skills.json` - 技能数据（62项，按年代分类）
- `occupations.json` - 职业数据（186项）
- `glossary.json` - 术语表
- `combat-rules.json` - 战斗规则
- `weapons.json` - 武器列表（104项）
- `armor.json` - 防具列表（74项）
- `vehicles.json` - 载具列表（63项）
- `insanities.json` - 疯狂症状列表
- `insanity-symptoms.json` - 疯狂症状详细说明
- `insanity-manifestations.json` - 疯狂表现（21项）
- `prices.json` - 物品价格表

> **精简优化**: 所有数据采用模块化拆分，技能和职业按年代(both/modern/1920s)分类

### `/docs` - 项目文档
所有项目相关的文档集中存放。

- `COC7_KNOWLEDGE_GUIDE.md` - COC7 知识库使用指南
- `PROJECT_STRUCTURE.md` - 项目结构说明（本文档）

### `/assets` - 参考资料
PDF 等参考文档，供开发时查阅。

- `refer/COC7空白卡CY23Final.xlsx` - COC7 角色卡模板
- `refer/COC7th守秘人规则书2002c.pdf` - 守秘人规则书
- `refer/调查员手册1.21.pdf` - 调查员手册

---

## 架构设计原则

### 1. 模块化设计
系统分为三个独立模块，每个模块有独立的：
- 入口页面（Dashboard）
- 导航菜单
- 路由命名空间
- 视觉主题色

### 2. 分层架构
```
UI Layer (Components/Pages)
    ↓
State Layer (Zustand Stores)
    ↓
Business Layer (Domain Models)
    ↓
Data Layer (Storage)
```

### 3. 单一职责
- 每个文件只负责一个功能模块
- 组件保持轻量，复杂逻辑提取到 Hooks
- 工具函数保持纯净，无副作用

### 4. 可扩展性
- 新增模块只需要：
  1. 在 `HomePage` 添加模块卡片
  2. 在 `AppRouter` 添加路由配置
  3. 创建对应的页面目录
  4. 使用 `ModuleLayout` 包装

---

## 路由结构

```
/                           # 主入口（模块选择）

/kp                         # KP中控台模块
  ├─ /                      # 概览页
  ├─ /session               # 会话中控台
  └─ /characters            # 角色库

/designer                   # 模组创建模块
  ├─ /                      # 概览页
  └─ /module                # 模组设计器

/rulebook                   # 规则库模块
  ├─ /                      # 规则索引
  ├─ /search                # 搜索
  ├─ /rules                 # 核心规则
  ├─ /skills                # 技能
  ├─ /attributes            # 属性
  ├─ /occupations           # 职业
  ├─ /combat                # 战斗
  ├─ /sanity                # 理智
  └─ /equipment             # 装备
```

---

## 命名规范

### 文件命名
- 组件：PascalCase，如 `AppLayout.tsx`
- 工具函数：camelCase，如 `helpers.ts`
- 类型定义：camelCase，如 `index.ts`
- 常量：UPPER_SNAKE_CASE

### 变量命名
- 组件：PascalCase
- 函数：camelCase
- 常量：UPPER_SNAKE_CASE
- 类型/接口：PascalCase

### 目录命名
- 全部小写，如 `components`、`pages`
- 多单词使用单数形式

---

## 数据流

### 读取流程
1. 页面组件通过 Hook 订阅 Store
2. Store 从 Storage 加载数据
3. Storage 从 IndexedDB 读取
4. 数据通过 Store 返回给组件

### 写入流程
1. 用户操作触发组件事件
2. 组件调用 Store 的 action
3. Store 更新状态并保存到 Storage
4. Storage 写入 IndexedDB
5. Store 通知所有订阅者更新

---

## 扩展指南

### 添加新页面
1. 在 `src/pages/` 创建页面组件
2. 在 `src/router/AppRouter.tsx` 添加路由
3. 在 `AppLayout.tsx` 添加导航链接

### 添加新功能模块
1. 定义领域模型（`src/domain/`）
2. 创建类型定义（`src/types/`）
3. 实现状态管理（`src/state/`）
4. 添加持久化逻辑（`src/storage/`）
5. 创建 UI 组件（`src/components/`）
6. 在页面中使用（`src/pages/`）

### 添加工具函数
1. 在 `src/utils/helpers.ts` 添加函数
2. 添加 JSDoc 注释
3. 在 `src/utils/index.ts` 导出

### 添加常量
1. 在 `src/utils/constants.ts` 定义
2. 使用 `as const` 确保类型推断
3. 按功能分组

---

## 性能优化

### 代码分割
- 使用 React.lazy 懒加载页面
- 大型第三方库按需导入

### 状态管理
- 避免不必要的全局状态
- 使用 selector 减少重渲染
- 合理拆分 Store

### 数据加载
- 使用 useAsyncData 统一管理加载状态
- 实现数据缓存机制
- 按需加载静态数据

---

**维护者**：明日社开发团队  
**最后更新**：2025-11-25
