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
 * 职业扩展数据类型定义
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
 * 装备数据模块类型
 */
export interface EquipmentData {
  weapons: Weapon[];
  armor: Armor[];
  vehicles: Vehicle[];
}
