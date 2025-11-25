# 数据结构优化更新日志

## [数据模块化] - 2025-11-25

### 🎯 目标
将单一大文件数据库按类别拆分为多个模块,提升前端性能和可维护性。

### ✨ 新增

#### 数据文件
- `public/data/metadata.json` - 知识库元数据
- `public/data/sections.json` - 章节索引
- `public/data/rules.json` - 核心规则系统
- `public/data/attributes.json` - 角色基础属性
- `public/data/derived-stats.json` - 派生属性
- `public/data/skill-categories.json` - 技能分类
- `public/data/skills.json` - 技能完整数据(增强版)
- `public/data/occupations.json` - 职业数据
- `public/data/glossary.json` - 术语表
- `public/data/combat-rules.json` - 战斗规则

#### Hook功能
- `useCoc7Occupations()` - 获取职业列表
- `useCoc7DerivedStats()` - 获取派生属性
- `useCoc7CombatRules()` - 获取战斗规则

#### 文档
- `docs/DATA_SPLIT_GUIDE.md` - 数据拆分使用指南
- `docs/DATA_ORGANIZATION_REPORT.md` - 整理报告

### 🔄 变更

#### 数据结构
- 重构 `Coc7KnowledgeBase` 接口,元数据移至 `metadata` 字段
- 技能数据从简化版升级为完整版,新增多个字段

#### Hook
- 重写 `useCoc7Data()` 实现并行加载多文件
- 优化错误处理和加载状态管理

#### 文档
- 更新 `docs/PROJECT_STRUCTURE.md` 数据目录说明

### 🗑️ 移除
- `public/data/coc7/skills.json` - 合并至主 `skills.json`

### 📊 性能提升
- **加载优化**: 支持按需加载特定数据模块
- **并行下载**: 多个小文件可并行加载
- **缓存优化**: 浏览器可独立缓存每个模块

### 🔧 技术细节
- 文件总数: 12个(10个主文件 + 2个子目录文件)
- 总大小: 约43.8KB(拆分后)
- 构建时间: 2.06s ✓
- 类型安全: 完整 TypeScript 支持

### 📦 兼容性
- ✅ 保留原 `coc7-knowledgebase.json` 作为备份
- ✅ 现有组件无需修改
- ✅ Hook API保持不变

### 📝 迁移指南
使用新数据结构唯一变化:
```typescript
// 之前
data.version
data.sources

// 现在
data.metadata.version
data.metadata.sources

// 其他字段保持不变
data.skills
data.rules
// ...
```

### 🎓 文档资源
- [数据拆分指南](./docs/DATA_SPLIT_GUIDE.md)
- [整理报告](./docs/DATA_ORGANIZATION_REPORT.md)
- [项目结构](./docs/PROJECT_STRUCTURE.md)
