/**
 * 用户模型
 */
export interface User {
  id: string;
  name: string;
  email?: string;
  createdAt: string;
}

/**
 * 角色类型
 */
export enum CharacterType {
  INVESTIGATOR = 'INVESTIGATOR', // 调查员
  NPC = 'NPC', // NPC
}

/**
 * 技能值
 */
export interface CharacterSkillValue {
  skillId: string; // 对应 SkillDefinition 的 id
  value: number; // 技能点数
  customName?: string; // 对于可分支技能(如语言/科学),记录具体名称
}

/**
 * 角色属性
 */
export interface CharacterAttributes {
  STR: number; // 力量
  CON: number; // 体质
  SIZ: number; // 体型
  DEX: number; // 敏捷
  APP: number; // 外貌
  INT: number; // 智力
  POW: number; // 意志
  EDU: number; // 教育
  LUCK?: number; // 幸运(可选)
}

/**
 * 角色模型
 */
export interface Character {
  id: string;
  name: string;
  type: CharacterType;
  
  // 基础属性
  attributes: CharacterAttributes;
  
  // 生命值/理智值
  maxHP: number;
  currentHP: number;
  maxSAN: number;
  currentSAN: number;
  maxMP?: number; // 魔法值(可选)
  currentMP?: number;
  
  // 技能列表
  skills: CharacterSkillValue[];
  
  // 元信息
  occupation?: string; // 职业
  age?: number;
  background?: string; // 背景故事
  notes?: string; // 备注
  
  createdAt: string;
  updatedAt: string;
}

/**
 * 队伍成员状态(Session 中的角色状态快照)
 */
export interface PartyMemberState {
  characterId: string; // 关联到 Character
  characterName: string; // 冗余存储,方便显示
  
  // 当前状态
  currentHP: number;
  maxHP: number;
  currentSAN: number;
  maxSAN: number;
  currentMP?: number;
  maxMP?: number;
  
  // 状态标签(如"重伤","疯狂","昏迷"等)
  statusTags: string[];
  
  // 临时修正
  temporaryModifiers?: Record<string, number>; // 例如 { "侦查": 20 } 表示侦查+20
  
  notes?: string; // 当前状态备注
}
