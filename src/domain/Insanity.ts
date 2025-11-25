/**
 * 疯狂/精神病类型
 */
export enum InsanityType {
  TEMPORARY = 'TEMPORARY', // 临时性疯狂
  INDEFINITE = 'INDEFINITE', // 不定性疯狂
  PERMANENT = 'PERMANENT', // 永久性疯狂
}

/**
 * 疯狂定义
 */
export interface InsanityDefinition {
  id: string;
  name: string;
  type: InsanityType;
  description: string;
  duration?: string; // 持续时间描述
  symptoms?: string[]; // 症状列表
}
