# 项目结构说明

## 系统架构

本系统采用**三大模块**设计，每个模块独立运行：

### 1. **KP 中控台** (`/kp`)
跑团会话管理工具，用于实时跑团
- 会话中控台 - 场景管理、数据追踪、事件日志
- 角色库 - 玩家角色卡创建和管理

### 2. **模组创建** (`/designer`)
可视化模组设计平台（桌面端专用）
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
- `ModuleLayout.tsx` - 规则库布局组件
- `Button.tsx` - 按钮组件
- `Card.tsx` - 卡片组件
- `Toast.tsx` - 消息提示组件
- `Copyright.tsx` - 版权信息组件

#### `/src/pages` - 页面组件

**主入口**
- `HomePage.tsx` - 三模块选择入口

**KP中控台 (`/pages/kp/`)**
- `SessionConsolePage.tsx` - 会话中控台（独立页面）
- `CharactersPage.tsx` - 角色库

**模组创建 (`/pages/designer/`)**
- `ModuleDesignerPage.tsx` - 模组设计器（独立页面）

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

#### `/src/domain` - 领域模型
- `Campaign.ts` - 战役模型
- `Character.ts` - 角色模型
- `Session.ts` - 跑团会话模型
- `Skill.ts` - 技能模型
- `Weapon.ts` - 武器模型
- `Insanity.ts` - 疯狂症状模型

#### `/src/types` - 类型定义
- `coc7-knowledgebase.d.ts` - COC7规则类型
- `equipment.d.ts` - 装备类型
- `module-designer.d.ts` - 模组设计器类型
- `index.ts` - 通用类型导出

#### `/src/hooks` - 自定义 Hooks
- `useCoc7Data.ts` - COC7数据加载
- `useData.ts` - 通用数据管理

#### `/src/utils` - 工具函数
- `constants.ts` - 常量定义
- `helpers.ts` - 辅助函数
- `toastService.ts` - 消息提示服务

#### `/src/state` - 状态管理
- `sessionStore.ts` - 会话状态（Zustand）

#### `/src/storage` - 数据持久化
- `IDataStore.ts` - 存储接口
- `LocalDataStore.ts` - 本地存储实现
- `RuleDataStore.tsx` - 规则数据存储
- `DataStoreProvider.tsx` - 存储提供者

#### `/src/router` - 路由配置
- `AppRouter.tsx` - 路由定义
  - `/` - 主入口（模块选择）
  - `/kp` - KP中控台（直达会话页）
  - `/designer` - 模组设计器（直达设计页）
  - `/rulebook/*` - 规则库（带侧边栏导航）

### `/data` - COC7 数据文件
JSON格式的静态规则数据：
- `metadata.json` - 知识库元数据
- `sections.json` - 章节索引
- `rules.json` - 核心规则
- `attributes.json` - 基础属性
- `derived-stats.json` - 派生属性
- `skill-categories.json` - 技能分类
- `skills.json` - 技能数据（62项）
- `occupations.json` - 职业数据（186项）
- `weapons.json` - 武器列表（104项）
- `armor.json` - 防具列表（74项）
- `vehicles.json` - 载具列表（63项）
- `insanities.json` - 疯狂症状
- `prices.json` - 物品价格

### `/docs` - 项目文档
- `COC7_KNOWLEDGE_GUIDE.md` - COC7知识库使用指南
- `PROJECT_STRUCTURE.md` - 项目结构说明（本文档）

---

## 架构设计

### 模块化设计
三个独立模块，各有独立的入口和导航：
- **KP中控台**: 橙色主题，直接进入会话页
- **模组创建**: 橙色主题，直接进入设计器
- **规则库**: 紫色主题，带侧边栏导航

### 分层架构
```
UI Layer (Pages/Components)
    ↓
State Layer (Zustand Stores)
    ↓
Business Layer (Domain Models)
    ↓
Data Layer (Storage/IndexedDB)
```

### 响应式设计
- 移动端优化：下拉菜单、面包屑导航
- 桌面端专用：模组设计器（<1024px禁止访问）
- 自适应布局：玻璃态效果、响应式间距

---

## 路由结构

```
/                      # 主入口（三模块选择）
/kp                    # KP中控台（SessionConsolePage）
/designer              # 模组设计器（ModuleDesignerPage）
/rulebook/*            # 规则库（ModuleLayout + 子页面）
  ├─ /                 # 规则索引
  ├─ /search           # 搜索
  ├─ /rules            # 核心规则
  ├─ /skills           # 技能
  ├─ /attributes       # 属性
  ├─ /occupations      # 职业
  ├─ /combat           # 战斗
  ├─ /sanity           # 理智
  └─ /equipment        # 装备
```

---

## 技术栈

- **框架**: React 18 + TypeScript
- **路由**: React Router v6
- **状态管理**: Zustand
- **样式**: Tailwind CSS + 自定义玻璃态效果
- **数据持久化**: IndexedDB (localForage)
- **构建工具**: Vite
- **流程图**: React Flow

---

## 配色方案

| 模块 | 主题色 | 使用位置 |
|------|--------|----------|
| 主页 | 橙黄渐变 | ww-orange-500 → ww-amber-500 |
| KP中控台 | 橙色系 | ww-orange/amber |
| 模组创建 | 橙色系 | ww-orange/amber |
| 规则库 | 紫粉渐变 | purple-500 → pink-500 |

---

**版本**: v1.0.0 - 穿山  
**最后更新**: 2025-11-28
