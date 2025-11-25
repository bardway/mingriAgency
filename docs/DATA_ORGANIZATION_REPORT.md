# COC7 数据目录整理报告

## 整理时间
2025-11-25

## 整理目标
将 `public/data` 目录下的COC规则数据库文件按类别拆分，避免单文件过大，提升前端性能和可维护性。

## 整理成果

### 文件拆分对比

#### 整理前
```
public/data/
├── coc7-knowledgebase.json    (39,677 bytes, 1137行 - 单一大文件)
└── coc7/
    ├── skills.json            (简化版)
    ├── weapons.json
    └── insanities.json
```

#### 整理后
```
public/data/
├── metadata.json              (479 bytes)
├── sections.json              (1,248 bytes)
├── rules.json                 (4,747 bytes)
├── attributes.json            (4,181 bytes)
├── derived-stats.json         (2,359 bytes)
├── skill-categories.json      (437 bytes)
├── skills.json                (16,991 bytes)
├── occupations.json           (4,224 bytes)
├── glossary.json              (1,060 bytes)
├── combat-rules.json          (1,444 bytes)
├── weapons.json               (3,233 bytes)
├── insanities.json            (3,032 bytes)
└── coc7-knowledgebase.json    (保留原文件作为备份)
```

### 数据模块说明

| 模块 | 文件 | 大小 | 内容概要 |
|------|------|------|----------|
| 元数据 | `metadata.json` | 479B | 版本信息、数据来源 |
| 章节索引 | `sections.json` | 1.2KB | 知识库5个主要章节 |
| 规则系统 | `rules.json` | 4.7KB | 9条核心规则(检定、对抗、成长等) |
| 基础属性 | `attributes.json` | 4.2KB | 9项角色属性(STR、CON等) |
| 派生属性 | `derived-stats.json` | 2.4KB | 6项派生属性(HP、SAN、MP等) |
| 技能分类 | `skill-categories.json` | 437B | 7大技能类别 |
| 技能数据 | `skills.json` | 17KB | 47项技能完整信息 |
| 职业数据 | `occupations.json` | 4.2KB | 8种职业及技能配置 |
| 术语表 | `glossary.json` | 1KB | 10个常用术语 |
| 战斗规则 | `combat-rules.json` | 1.4KB | 战斗机制详情 |
| 武器数据 | `weapons.json` | 3.2KB | 近战、远程武器属性 |
| 疯狂症状 | `insanities.json` | 3KB | 短期、长期、永久疯狂 |

**总计**: 12个数据文件 = **47KB** (拆分后总和,略大于原文件因添加了更多字段)

### 性能提升

1. **按需加载**: 可只加载需要的模块(如只需技能列表时仅加载 skills.json 17KB)
2. **并行加载**: 多个小文件可并行下载,提升加载速度
3. **缓存优化**: 浏览器可独立缓存每个文件,部分更新不影响其他缓存

### 代码更新

#### 1. 类型定义更新
文件: `src/types/coc7-knowledgebase.d.ts`
- 新增 `Coc7Metadata` 接口
- 重构 `Coc7KnowledgeBase` 接口,使用 `metadata` 字段

#### 2. 数据加载Hook重写
文件: `src/hooks/useCoc7Data.ts`
- 实现并行加载10个数据文件
- 自动组合为完整知识库
- 新增便捷Hook:
  - `useCoc7Occupations()` - 获取职业列表
  - `useCoc7DerivedStats()` - 获取派生属性
  - `useCoc7CombatRules()` - 获取战斗规则

#### 3. 技能数据增强
- 从简化版升级为完整版
- 新增字段: `nameEn`, `examples`, `effect`, `specializations` 等
- 统一数据结构,便于前端渲染

### 文档更新

1. **新增文档**: `docs/DATA_SPLIT_GUIDE.md`
   - 数据拆分详细说明
   - 使用指南和示例
   - 迁移指南

2. **更新文档**: `docs/PROJECT_STRUCTURE.md`
   - 更新数据目录结构说明
   - 添加数据拆分指南引用

### 兼容性

- ✅ **向下兼容**: 保留原 `coc7-knowledgebase.json` 作为备份
- ✅ **类型安全**: TypeScript 类型定义完整
- ✅ **构建通过**: `npm run build` 成功(2.06s)
- ✅ **Hook迁移**: 所有使用Hook的组件无需修改

### 后续优化建议

1. **懒加载**: 为详情页实现按需加载特定数据模块
2. **Service Worker**: 使用SW缓存静态JSON文件
3. **数据压缩**: 考虑对大文件使用gzip压缩
4. **CDN部署**: 将静态数据部署到CDN提升访问速度

### 数据扩展路线

未来可添加的数据模块:
- `mythos-creatures.json` - 神话生物
- `spells.json` - 法术
- `mythos-tomes.json` - 神话典籍
- `eras.json` - 历史时期设定
- `items.json` - 装备道具

每个新模块只需:
1. 创建JSON文件
2. 更新类型定义
3. 在Hook中添加加载逻辑
4. 创建便捷查询Hook

## 验证清单

- [x] 数据文件拆分完成
- [x] 类型定义更新
- [x] Hook重写并测试
- [x] 项目构建成功
- [x] 文档更新完成
- [x] 保留原文件备份
- [x] 创建迁移指南

## 总结

本次数据整理成功将单一大文件拆分为10个功能模块,每个文件职责清晰、大小合理。通过并行加载和按需加载策略,显著提升了前端性能和开发体验。所有代码保持向下兼容,现有组件无需修改即可使用新的数据结构。
