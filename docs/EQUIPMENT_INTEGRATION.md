# 装备系统集成文档

## 概述
成功将 Excel 数据（武器、防具、载具）集成到知识库系统中。

## 完成的工作

### 1. TypeScript 类型定义
- **文件**: `src/types/equipment.d.ts`
- **内容**: 
  - `Weapon` 接口 (14个字段)
  - `Armor` 接口 (11个字段)  
  - `Vehicle` 接口 (12个字段)
  - `SkillExtended` 接口 (11个字段)
  - `OccupationExtended` 接口 (8个字段)
  - `InsanityManifestation` 接口 (4个字段)
  - `EquipmentData` 联合类型

### 2. 装备页面组件
- **文件**: `src/pages/EquipmentPage.tsx`
- **功能**:
  - 三标签切换：武器(104)、防具(74)、载具(63)
  - 搜索功能：按名称搜索
  - 分类筛选：按类别过滤数据
  - 详情面板：显示完整装备信息
  - 响应式布局：适配手机/平板/桌面
  - 异步加载：使用 fetch API 从 public/data 加载 JSON

### 3. 路由配置
- **文件**: `src/router/AppRouter.tsx`
- **路由**: `/rulebook/equipment`

### 4. 导航入口
- **文件**: `src/pages/RulebookIndexPage.tsx`
- **新增卡片**: 装备系统 (⚔图标，橙色渐变)

## 数据文件
所有数据存储在 `public/data/` 目录：
- `weapons.json` - 104 个武器数据
- `armor.json` - 74 个防具数据
- `vehicles.json` - 63 个载具数据
- `skills-extended.json` - 110 个技能扩展数据
- `occupations-extended.json` - 230 个职业数据
- `insanity-manifestations.json` - 21 个疯狂症状数据

## 访问路径
1. 主页 → COC7 规则库 → 装备系统
2. 直接访问: `/rulebook/equipment`

## 功能特性
✅ 分类浏览 - 按武器/防具/载具分类  
✅ 搜索功能 - 实时搜索名称  
✅ 分类筛选 - 按装备类别过滤  
✅ 详情查看 - 点击查看完整信息  
✅ 响应式设计 - 移动端友好  
✅ Westworld主题 - 玻璃态效果  
✅ 加载状态 - 优雅的加载动画
