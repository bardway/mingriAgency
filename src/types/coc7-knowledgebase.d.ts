// COC7 知识库类型定义
// 自动生成于 2025-11-25
// 支持分文件加载的模块化数据结构

// 元数据接口
export interface Coc7Metadata {
  version: string;
  lastUpdated: string;
  sources: Source[];
}

// 完整知识库接口(用于组合所有数据)
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

export interface Source {
  id: string;
  title: string;
  version: string;
  type: 'rulebook' | 'handbook' | 'template';
}

export interface Section {
  id: string;
  slug: string;
  title: string;
  order: number;
  description: string;
  source: SourceReference;
}

export interface SourceReference {
  book: string;
  chapter?: string;
  pages?: string;
}

export interface Rule {
  id: string;
  category: 'core' | 'combat' | 'sanity' | 'character';
  title: string;
  summary: string;
  details: Record<string, unknown>;
  source: SourceReference;
}

export interface Attribute {
  id: string;
  abbr: string;
  name: string;
  nameEn: string;
  description: string;
  rollFormula: string;
  ageModifier: AgeModifier | null;
  effects: string[];
}

export interface AgeModifier {
  [ageRange: string]: {
    modifier?: number;
    rolls?: number;
    select?: 'higher' | 'lower';
    eduCheck?: number;
  };
}

export interface DerivedStat {
  id: string;
  abbr: string;
  name: string;
  nameEn: string;
  formula: string | FormulaObject;
  round?: 'down' | 'up';
  max?: string;
  table?: ValueRange[];
  description: string;
}

export interface FormulaObject {
  default?: number;
  conditions?: Array<{
    if?: string;
    then?: number;
    modifier?: number;
    per?: string;
  }>;
}

export interface ValueRange {
  range: string;
  value: string | number;
  status?: string;
  desc?: string;
  assets?: string;
  level?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  base: number | string;
  hasSpecialization: boolean;
  specializations?: string[];
  range?: { min: number; max: number };
  description: string;
  examples?: string[];
  effect?: string;
  formula?: Record<string, string>;
  levels?: ValueRange[];
  source: SourceReference;
}

export interface Occupation {
  id: string;
  name: string;
  nameEn: string;
  creditRating: { min: number; max: number };
  skillPoints: string;
  skillChoices: SkillChoices;
  description: string;
  source: SourceReference;
}

export interface SkillChoices {
  required?: string[];
  choose?: {
    count: number;
    from: string[];
  };
  anyOther?: number;
}

export interface GlossaryTerm {
  term: string;
  full: string;
  zh: string;
  description: string;
}

export interface CombatRules {
  surprise: {
    description: string;
    effect: string;
    detection: string;
  };
  maneuvers: Maneuver[];
  range: {
    [key: string]: {
      distance: string;
      modifier: string;
    };
  };
  healing: {
    natural: string;
    firstAid: string;
    medicine: string;
  };
}

export interface Maneuver {
  id: string;
  name: string;
  effect: string;
  requirement: string;
}

// 辅助类型
export type DifficultyLevel = 'regular' | 'hard' | 'extreme' | 'critical' | 'fumble';
export type SkillCategoryId = 'combat' | 'physical' | 'perception' | 'interpersonal' | 'academic' | 'practical' | 'special';
export type AttributeId = 'str' | 'con' | 'siz' | 'dex' | 'app' | 'int' | 'pow' | 'edu' | 'luck';
export type DerivedStatId = 'hp' | 'san' | 'mp' | 'mov' | 'db' | 'build';
