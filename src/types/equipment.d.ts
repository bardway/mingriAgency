/**
 * 武器数据类型定义
 */
export interface Weapon {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  skill: string;
  damage: string;
  range: string;
  pierce: boolean;
  roundsPerTurn: string;
  ammo: string;
  malfunction: string;
  era: string;
  price: string;
  inventedYear: string;
  description: string;
}

/**
 * 防具数据类型定义
 */
export interface Armor {
  id: string;
  name: string;
  armorValue: number;
  movPenalty: number;
  coverage: string;
  species: string;
  antiPierce: boolean;
  era: string;
  price: string;
  category: string;
  description: string;
}

/**
 * 载具数据类型定义
 */
export interface Vehicle {
  id: string;
  name: string;
  skill: string;
  mov: string;
  build: string;
  armor: string;
  passengers: string;
  driverBuild: string;
  passengerBuild: string;
  era: string;
  category: string;
  description: string;
}

/**
 * 技能扩展数据类型定义
 */
export interface SkillExtended {
  id: string;
  name: string;
  base: string;
  specialization: string;
  difficultyNote: string;
  description: string;
  regularDifficulty: string;
  hardDifficulty: string;
  pushExample: string;
  pushFailure: string;
  insanePushFailure: string;
}

/**
 * 职业数据类型定义
 */
export interface Occupation {
  id: string;
  name: string;
  era: '1920' | 'modern' | 'both';
  description: string;
  creditRatingRange: [number, number];
  skillIds: string[];
  skillPointsRule: string;
}

/**
 * 职业扩展数据类型定义（来自 CSV - 已废弃）
 * @deprecated 使用 Occupation 代替
 */
export interface OccupationFull {
  id: string;
  name: string;
  creditRating: string;
  occupationalAttributes: string;
  occupationalSkills: string;
  contacts: string;
  description: string;
}

/**
 * 职业基础数据类型定义（原有数据）
 */
export interface OccupationExtended {
  id: string;
  name: string;
  creditRating: string;
  attributes: string;
  skillPoints: string;
  occupationalSkills: string;
  contacts: string;
  description: string;
}

/**
 * 疯狂表现数据类型定义
 */
export interface InsanityManifestation {
  id: string;
  number: string;
  symptom: string;
  description: string;
}

/**
 * 技能完整数据类型定义（来自 CSV）
 */
export interface SkillFull {
  id: string;
  name: string;
  base: string;
  specialization: string;
  difficultyNote: string;
  description: string;
  regularDifficulty: string;
  hardDifficulty: string;
  pushExample: string;
  pushFailure: string;
  insanePushFailure: string;
}

/**
 * 疯狂症状数据类型定义（来自 CSV）
 */
export interface InsanitySymptom {
  id: string;
  name: string;
  description: string;
  type: '即时症状' | '持续性症状';
}

/**
 * 装备数据模块类型
 */
export interface EquipmentData {
  weapons: Weapon[];
  armor: Armor[];
  vehicles: Vehicle[];
}
