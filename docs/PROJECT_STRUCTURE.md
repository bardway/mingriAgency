# 项目结构说明

## 目录组织

### `/src` - 源代码目录

#### `/src/components` - UI 组件
可复用的 React 组件，遵循单一职责原则。

- `AppLayout.tsx` - 应用主布局（导航栏、侧边栏）
- `Button.tsx` - 按钮组件
- `Card.tsx` - 卡片组件

#### `/src/pages` - 页面组件
每个页面对应一个路由，负责页面级的状态管理和业务逻辑。

- `DashboardPage.tsx` - 概览仪表盘
- `CharactersPage.tsx` - 角色管理
- `CampaignsPage.tsx` - 战役管理
- `ScenesPage.tsx` - 场景管理
- `SessionConsolePage.tsx` - KP 中控台
- `SettingsPage.tsx` - 设置页面

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
React Router 路由配置。

- `AppRouter.tsx` - 路由定义和配置

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
- `skills.json` - 技能完整数据
- `occupations.json` - 职业数据
- `glossary.json` - 术语表
- `combat-rules.json` - 战斗规则
- `weapons.json` - 武器列表
- `insanities.json` - 疯狂症状列表

> 详细说明请参考 [数据拆分指南](./DATA_SPLIT_GUIDE.md)

### `/docs` - 项目文档
所有项目相关的文档集中存放。

- `QUICKSTART.md` - 快速开始指南
- `DESIGN_GUIDE.md` - 设计规范
- `DEVELOPMENT.md` - 开发者指南
- `CHANGELOG.md` - 版本更新日志
- `COLOR_SCHEME.md` - 配色方案详解
- `PROJECT_STRUCTURE.md` - 本文档

### `/assets` - 参考资料
PDF 等参考文档。

---

## 架构设计原则

### 1. 分层架构
```
UI Layer (Components/Pages)
    ↓
State Layer (Zustand Stores)
    ↓
Business Layer (Domain Models)
    ↓
Data Layer (Storage)
```

### 2. 单一职责
- 每个文件只负责一个功能模块
- 组件保持轻量，复杂逻辑提取到 Hooks
- 工具函数保持纯净，无副作用

### 3. 依赖倒置
- 使用接口定义契约（如 `IDataStore`）
- 具体实现可替换（如 `LocalDataStore`）

### 4. 可测试性
- 业务逻辑与 UI 分离
- 纯函数易于单元测试
- 使用依赖注入便于 Mock

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
