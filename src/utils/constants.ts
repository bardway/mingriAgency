// 应用配置常量
export const APP_CONFIG = {
  name: '明日社 KP 助手',
  version: '0.1.0',
  description: 'Call of Cthulhu 7th Edition KP 辅助工具',
} as const;

// 本地存储键名
export const STORAGE_KEYS = {
  campaigns: 'mingri_campaigns',
  characters: 'mingri_characters',
  sessions: 'mingri_sessions',
  settings: 'mingri_settings',
} as const;

// COC7 规则常量
export const COC7_RULES = {
  // 属性范围
  ATTRIBUTE_MIN: 0,
  ATTRIBUTE_MAX: 99,
  
  // 技能难度
  DIFFICULTY: {
    REGULAR: 1,
    HARD: 2,
    EXTREME: 5,
  },
  
  // SAN 检定
  SAN_LOSS: {
    MINOR: { min: 0, max: 1 },
    MODERATE: { min: 1, max: 4 },
    MAJOR: { min: 1, max: 8 },
  },
} as const;

// 数据文件路径
export const DATA_PATHS = {
  skills: '/data/skills.json',
  weapons: '/data/weapons.json',
  insanities: '/data/insanities.json',
} as const;
