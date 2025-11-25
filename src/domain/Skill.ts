/**
 * 技能类型
 */
export enum SkillType {
  STANDARD = 'STANDARD', // 标准技能
  BRANCHED = 'BRANCHED', // 可分支技能(如语言/科学/艺术等)
  COMBAT = 'COMBAT', // 战斗技能
}

/**
 * 技能定义(规则层面的技能模板)
 */
export interface SkillDefinition {
  id: string;
  name: string;
  type: SkillType;
  baseValue: number; // 基础成功率
  description?: string;
  
  // 对于可分支技能,记录一些常见分支示例
  branches?: string[]; // 例如: ["英语", "法语", "德语"]
  
  category?: string; // 技能分类,如"社交","知识","战斗"等
}
