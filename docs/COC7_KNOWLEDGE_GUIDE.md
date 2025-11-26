# COC7 知识库使用指南

## 📖 概述

COC7 知识库是一个完整的、结构化的《克苏鲁的呼唤》第7版规则数据库，专为 React 项目优化，提供类型安全的 TypeScript 接口和便捷的 Hooks。

---

## 🚀 快速开始

### 1. 导入 Hook

```typescript
import { useCoc7Data, useCoc7Skills, useCoc7Rule } from '@/hooks';
```

### 2. 加载全部数据

```typescript
function MyComponent() {
  const { data, loading, error } = useCoc7Data();
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  
  return <div>版本: {data.version}</div>;
}
```

### 3. 获取技能列表

```typescript
function SkillsList() {
  const { skills, loading, error } = useCoc7Skills(); // 全部技能
  
  // 或按分类筛选
  const { skills: combatSkills } = useCoc7Skills('combat'); // 战斗技能
  
  return (
    <ul>
      {skills.map(skill => (
        <li key={skill.id}>{skill.name} ({skill.base}%)</li>
      ))}
    </ul>
  );
}
```

---

## 🎯 可用 Hooks

### `useCoc7Data()`
加载完整知识库

**返回**: `{ data, loading, error }`

```typescript
const { data, loading, error } = useCoc7Data();
```

### `useCoc7Skills(category?)`
获取技能列表，可选分类筛选

**参数**:
- `category` (可选): 技能分类 ID
  - `'combat'` - 战斗技能
  - `'physical'` - 身体技能
  - `'perception'` - 感知技能
  - `'interpersonal'` - 人际技能
  - `'academic'` - 学术技能
  - `'practical'` - 实用技能
  - `'special'` - 特殊技能

**返回**: `{ skills, loading, error }`

```typescript
// 获取全部技能
const { skills } = useCoc7Skills();

// 获取战斗技能
const { skills: combatSkills } = useCoc7Skills('combat');
```

### `useCoc7Skill(skillId)`
获取单个技能详情

**参数**:
- `skillId`: 技能 ID（如 `'spot_hidden'`, `'firearms_handgun'`）

**返回**: `{ skill, loading, error }`

```typescript
const { skill } = useCoc7Skill('spot_hidden');
// skill.name -> "侦察"
// skill.base -> 25
// skill.description -> "发现隐藏的物体、线索或细节"
```

### `useCoc7Rule(ruleId)`
获取规则详情

**参数**:
- `ruleId`: 规则 ID（如 `'dice-rolling'`, `'sanity-check'`）

**返回**: `{ rule, loading, error }`

```typescript
const { rule } = useCoc7Rule('dice-rolling');
// rule.title -> "检定规则"
// rule.summary -> "使用D100进行技能检定..."
```

### `useCoc7Attributes()`
获取属性列表

**返回**: `{ attributes, loading, error }`

```typescript
const { attributes } = useCoc7Attributes();
// attributes[0].abbr -> "STR"
// attributes[0].name -> "力量"
```

### `useSearchSkills(query)`
搜索技能（按中英文名）

**参数**:
- `query`: 搜索关键词

**返回**: `{ results, loading, error }`

```typescript
const { results } = useSearchSkills('射击');
// 返回包含"射击"的所有技能
```

---

## 📊 数据结构

### 技能对象 (Skill)

```typescript
{
  id: "spot_hidden",
  name: "侦察",
  nameEn: "Spot Hidden",
  category: "perception",
  base: 25,
  hasSpecialization: false,
  description: "发现隐藏的物体、线索或细节",
  examples: ["搜索房间", "发现隐藏门", "注意到细节"],
  source: { book: "handbook", pages: "62" }
}
```

### 属性对象 (Attribute)

```typescript
{
  id: "str",
  abbr: "STR",
  name: "力量",
  nameEn: "Strength",
  description: "肌肉力量和体格，影响伤害加值和负重",
  rollFormula: "3D6×5",
  effects: ["伤害加值", "体格", "近战攻击"]
}
```

### 规则对象 (Rule)

```typescript
{
  id: "dice-rolling",
  category: "core",
  title: "检定规则",
  summary: "使用D100进行技能检定...",
  details: {
    regular: { threshold: "≤技能值", description: "普通成功" },
    hard: { threshold: "≤技能值/2", description: "困难成功" },
    // ...
  },
  source: { book: "rulebook", chapter: "基础规则", pages: "85-92" }
}
```

---

## 🎨 示例组件

### 技能列表

```typescript
import { DemoSkills } from '@/components/DemoCoc7';

function Page() {
  return <DemoSkills />;
}
```

### 规则详情

```typescript
import { DemoRuleDetails } from '@/components/DemoCoc7';

function RulePage() {
  return <DemoRuleDetails ruleId="dice-rolling" />;
}
```

### 属性列表

```typescript
import { DemoAttributes } from '@/components/DemoCoc7';

function AttributesPage() {
  return <DemoAttributes />;
}
```

---

## 💡 实用案例

### 1. 角色创建器 - 显示可选技能

```typescript
function CharacterCreator() {
  const { skills } = useCoc7Skills();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  return (
    <div>
      <h2>选择技能</h2>
      {skills.map(skill => (
        <label key={skill.id}>
          <input
            type="checkbox"
            checked={selectedSkills.includes(skill.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedSkills([...selectedSkills, skill.id]);
              } else {
                setSelectedSkills(selectedSkills.filter(id => id !== skill.id));
              }
            }}
          />
          {skill.name} (基础: {skill.base}%)
        </label>
      ))}
    </div>
  );
}
```

### 2. 技能检定辅助工具

```typescript
function SkillCheckHelper() {
  const { skill } = useCoc7Skill('spot_hidden');
  const [skillValue, setSkillValue] = useState(50);
  
  if (!skill) return null;
  
  const regular = skillValue;
  const hard = Math.floor(skillValue / 2);
  const extreme = Math.floor(skillValue / 5);
  
  return (
    <div>
      <h3>{skill.name} 检定</h3>
      <input 
        type="number" 
        value={skillValue}
        onChange={(e) => setSkillValue(Number(e.target.value))}
      />
      <ul>
        <li>普通成功: ≤ {regular}</li>
        <li>困难成功: ≤ {hard}</li>
        <li>极难成功: ≤ {extreme}</li>
      </ul>
    </div>
  );
}
```

### 3. 规则速查

```typescript
function QuickRuleReference() {
  const [ruleId, setRuleId] = useState('dice-rolling');
  const { rule } = useCoc7Rule(ruleId);
  
  const ruleIds = [
    'dice-rolling',
    'sanity-check',
    'combat-round',
    'damage-armor'
  ];
  
  return (
    <div>
      <select value={ruleId} onChange={(e) => setRuleId(e.target.value)}>
        {ruleIds.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      
      {rule && (
        <div>
          <h3>{rule.title}</h3>
          <p>{rule.summary}</p>
        </div>
      )}
    </div>
  );
}
```

---

## 📁 文件位置

| 文件 | 路径 | 说明 |
|------|------|------|
| 数据文件 | `public/data/*.json` | 拆分的模块化数据文件 |
| 类型定义 | `src/types/coc7-knowledgebase.d.ts` | TypeScript 接口 |
| Hooks | `src/hooks/useCoc7Data.ts` | 自定义 Hooks |

---

## 🔧 自定义与扩展

### 添加新技能

直接编辑 `public/data/skills.json`:

```json
{
  "id": "my_custom_skill",
  "name": "自定义技能",
  "nameEn": "Custom Skill",
  "category": "practical",
  "base": 10,
  "hasSpecialization": false,
  "description": "这是一个自定义技能",
  "source": { "book": "custom", "pages": "N/A" }
}
```

### 修改现有数据

1. 编辑 JSON 文件
2. 刷新页面即可生效（无需重新构建）

---

## ⚠️ 注意事项

1. **数据缓存**: Hook 会缓存数据，避免重复请求
2. **类型安全**: 使用 TypeScript 类型定义确保类型正确
3. **错误处理**: 始终检查 `loading` 和 `error` 状态
4. **性能**: 数据文件模块化拆分，按需加载

---

## 📚 参考资料

- [项目结构说明](./PROJECT_STRUCTURE.md)
- [COC7 官方规则](https://www.chaosium.com/call-of-cthulhu-rpg/)

---

**版本**: 7th Edition  
**最后更新**: 2025-11-25
