# COC7 数据结构拆分说明

## 更新时间
2025-11-25

## 拆分概述

为提升前端性能和可维护性,将原有的单一大文件 `coc7-knowledgebase.json` (约1137行) 按功能模块拆分为多个独立的JSON文件。

## 数据文件结构

### 主数据目录: `public/data/`

| 文件名 | 内容 | 行数(约) | 说明 |
|--------|------|----------|------|
| `metadata.json` | 版本信息、数据源 | ~30 | 知识库元数据 |
| `sections.json` | 章节索引 | ~50 | 知识库章节导航 |
| `rules.json` | 规则系统 | ~150 | 检定、对抗、成长等核心规则 |
| `attributes.json` | 角色属性 | ~150 | STR、CON等9项基础属性 |
| `derived-stats.json` | 派生属性 | ~100 | HP、SAN、MP、MOV、DB、BUILD |
| `skill-categories.json` | 技能分类 | ~15 | 7大技能类别 |
| `skills.json` | 技能详情 | ~500 | 所有技能的完整信息 |
| `occupations.json` | 职业 | ~120 | 各类职业及技能配置 |
| `glossary.json` | 术语表 | ~25 | 常用缩写与术语 |
| `combat-rules.json` | 战斗规则 | ~60 | 战斗机制、突袭、伤害等 |
| `weapons.json` | 武器数据 | ~160 | 近战、远程武器属性 |
| `insanities.json` | 疯狂症状 | ~120 | 短期、长期、永久疯狂 |

## 优势

### 1. 性能优化
- **按需加载**: 前端可只加载需要的模块,减少初始加载时间
- **并行加载**: 多个小文件可并行下载,比单个大文件更快
- **缓存优化**: 浏览器可独立缓存每个文件,更新某部分数据不影响其他缓存

### 2. 可维护性
- **职责清晰**: 每个文件专注于特定数据类型
- **易于扩展**: 添加新数据类别只需创建新文件
- **减少冲突**: 多人协作时减少文件修改冲突

### 3. 开发体验
- **快速定位**: 快速找到需要修改的数据文件
- **独立测试**: 每个模块可独立测试和验证
- **清晰文档**: 文件结构即文档

## TypeScript 类型支持

更新了类型定义文件 `src/types/coc7-knowledgebase.d.ts`,新增:

```typescript
// 元数据接口
export interface Coc7Metadata {
  version: string;
  lastUpdated: string;
  sources: Source[];
}

// 完整知识库接口(组合所有数据)
export interface Coc7KnowledgeBase {
  metadata: Coc7Metadata;
  sections: Section[];
  rules: Rule[];
  attributes: Attribute[];
  derivedStats: DerivedStat[];
  skillCategories: SkillCategory[];
  skills: Skill[];
  occupations: Occupation[];
  glossary: GlossaryTerm[];
  combatRules: CombatRules;
}
```

## 数据加载方式

### Hook: `useCoc7Data()`

自动并行加载所有数据文件并组合:

```typescript
import { useCoc7Data } from '@/hooks/useCoc7Data';

function MyComponent() {
  const { data, loading, error } = useCoc7Data();
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  
  return (
    <div>
      <h1>{data.metadata.version}</h1>
      <ul>
        {data.skills.map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 特定数据Hook

为常用查询提供便捷Hook:

```typescript
// 获取技能列表
const { skills, loading, error } = useCoc7Skills('combat');

// 获取单个技能
const { skill, loading, error } = useCoc7Skill('dodge');

// 获取规则详情
const { rule, loading, error } = useCoc7Rule('dice-rolling');

// 获取职业列表
const { occupations, loading, error } = useCoc7Occupations();

// 搜索技能
const { results, loading, error } = useSearchSkills('射击');
```

## 迁移指南

### 从旧版本迁移

如果你的代码使用了旧的 `coc7-knowledgebase.json`:

**之前:**
```typescript
const response = await fetch('/data/coc7-knowledgebase.json');
const data = await response.json();
```

**现在:**
```typescript
import { useCoc7Data } from '@/hooks/useCoc7Data';

const { data, loading, error } = useCoc7Data();
```

### 数据结构变化

唯一变化是顶层结构多了 `metadata` 字段:

```typescript
// 之前
data.version
data.lastUpdated
data.sources

// 现在
data.metadata.version
data.metadata.lastUpdated
data.metadata.sources

// 其他字段保持不变
data.skills
data.rules
data.attributes
// ...
```

## 后续扩展

可按需添加新的数据模块:

1. **神话生物**: `public/data/mythos-creatures.json`
2. **法术**: `public/data/spells.json`
3. **神话典籍**: `public/data/mythos-tomes.json`
4. **历史时期**: `public/data/eras.json`

每个新模块只需:
1. 创建JSON文件
2. 更新类型定义
3. 在`useCoc7Data`中添加加载逻辑
4. 创建对应的便捷Hook

## 性能建议

1. **按需加载**: 如果页面只需要技能数据,可创建专用Hook只加载 `skills.json`
2. **懒加载**: 对于详情页,可在用户点击时才加载完整数据
3. **Service Worker**: 考虑使用SW缓存静态JSON文件

## 文件命名规范

- 使用小写字母和连字符: `skill-categories.json`
- 复数形式表示列表: `skills.json`, `occupations.json`
- 单数形式表示配置/元数据: `metadata.json`, `combat-rules.json`
