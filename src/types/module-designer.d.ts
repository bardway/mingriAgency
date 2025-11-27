/**
 * 模组设计器类型定义
 * 基于CoC7模组设计框架
 */

import type { Node, Edge } from '@xyflow/react';

// ==================== 模组元数据 ====================

/**
 * 模组背景设定
 */
export interface ModuleMetadata {
  id: string;
  name: string;                    // 模组名称
  era: string;                     // 时代年代 (如 "1920s")
  location: string;                // 主要地点
  worldview: string;               // 世界观/环境描述
  theme: string[];                 // 主题风格标签 (调查、恐怖、战斗等)
  ruleSystem: string;              // 规则系统 (如 "CoC 7th")
  playerCount: string;             // 玩家人数 (如 "3-5人")
  roleRequirements?: string;       // 角色要求
  estimatedTime: string;           // 预计游戏时间
  difficulty: 'easy' | 'normal' | 'hard' | 'deadly'; // 难度
  description: string;             // 模组简介
  createdAt: string;
  updatedAt: string;
}

// ==================== 剧情节点类型 ====================

/**
 * 剧情节点类型枚举
 */
export type StoryNodeType = 
  | 'scene'      // 场景节点
  | 'combat'     // 战斗节点
  | 'choice'     // 选择节点
  | 'condition'  // 条件判断节点
  | 'ending';    // 结局节点

/**
 * 技能检定
 */
export interface SkillCheck {
  id: string;
  skillName: string;              // 技能名称
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme'; // 难度
  successOutcome: string;         // 成功结果描述
  failureOutcome: string;         // 失败结果描述
  successNodeId?: string;         // 成功跳转节点
  failureNodeId?: string;         // 失败跳转节点
}

/**
 * 玩家行动选项
 */
export interface PlayerOption {
  id: string;
  label: string;                  // 选项文本
  description?: string;           // 选项描述
  requiredCheck?: SkillCheck;     // 需要的检定
  targetNodeId?: string;          // 目标节点ID
}

/**
 * 场景节点数据
 */
export interface SceneNodeData {
  type: 'scene';
  name: string;                   // 场景名称
  description: string;            // 场景描述 (富文本)
  time?: string;                  // 时间点
  locationId?: string;            // 地点ID
  involvedNPCs: string[];         // 涉及的NPC ID列表
  relatedClues: string[];         // 相关线索ID列表
  checks: SkillCheck[];           // 技能检定列表
  options: PlayerOption[];        // 玩家行动选项
  notes?: string;                 // 备注
}

/**
 * 战斗节点数据
 */
export interface CombatNodeData {
  type: 'combat';
  name: string;
  description: string;
  locationId?: string;
  enemies: {
    npcId: string;
    count: number;
    tactics?: string;             // 战术AI描述
  }[];
  allies?: string[];              // 友军NPC ID
  victoryCondition: string;
  defeatCondition: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'deadly';
  specialMechanics?: string;      // 特殊机制说明
  sanityLoss?: {                  // 理智损失
    success: string;              // 成功损失 (如 "0")
    failure: string;              // 失败损失 (如 "1d6")
  };
  rewards?: {                     // 战斗奖励
    clues?: string[];
    items?: string[];
  };
  notes?: string;
}

/**
 * 选择节点数据
 */
export interface ChoiceNodeData {
  type: 'choice';
  name: string;
  description: string;
  choices: {
    id: string;
    label: string;
    description?: string;
    targetNodeId?: string;
  }[];
  notes?: string;
}

/**
 * 条件节点数据
 */
export interface ConditionNodeData {
  type: 'condition';
  name: string;
  description: string;
  conditions: {
    id: string;
    expression: string;           // 条件表达式
    description: string;
    targetNodeId?: string;
  }[];
  defaultTargetNodeId?: string;   // 默认跳转
  notes?: string;
}

/**
 * 结局节点数据
 */
export interface EndingNodeData {
  type: 'ending';
  name: string;
  description: string;            // 结局叙述
  endingType: 'success' | 'partial' | 'failure' | 'tpk'; // TPK = Total Party Kill
  conditions?: string[];          // 达成条件
  aftermath?: string;             // 后续影响
  score?: number;                 // 评分 (可选)
  notes?: string;
}

/**
 * 剧情节点数据联合类型
 */
export type StoryNodeData = 
  | SceneNodeData 
  | CombatNodeData 
  | ChoiceNodeData 
  | ConditionNodeData 
  | EndingNodeData;

/**
 * 剧情节点 (ReactFlow Node)
 */
export type StoryNode = Node<StoryNodeData>;

/**
 * 连线数据
 */
export interface StoryEdgeData {
  label?: string;                 // 连线标签
  condition?: string;             // 触发条件
  isRequired?: boolean;           // 是否必经路径
}

/**
 * 剧情连线 (ReactFlow Edge)
 */
export type StoryEdge = Edge<StoryEdgeData>;

// ==================== 线索系统 ====================

/**
 * 线索
 */
export interface Clue {
  id: string;
  name: string;                   // 线索名称
  content: string;                // 线索内容
  discoveryMethod: string;        // 获取方式
  relatedClues: string[];         // 关联线索ID
  pointsToNodeId?: string;        // 指向的场景节点
  importance: 'critical' | 'major' | 'minor'; // 重要性
  isDiscovered?: boolean;         // 是否已发现 (运行时)
  notes?: string;
}

// ==================== NPC配置 ====================

/**
 * NPC类别
 */
export type NPCCategory = 'human' | 'monster' | 'mythos' | 'other';

/**
 * 属性值
 */
export interface Attributes {
  STR: number; // 力量
  DEX: number; // 敏捷
  CON: number; // 体质
  SIZ: number; // 体型
  APP: number; // 外貌
  INT: number; // 智力
  POW: number; // 意志
  EDU: number; // 教育
}

/**
 * 武器数据
 */
export interface WeaponData {
  name: string;
  skill: string;                  // 对应技能
  skillValue: number;             // 技能值
  damage: string;                 // 伤害 (如 "1d10")
  range?: string;                 // 射程
}

/**
 * NPC配置
 */
export interface ModuleNPC {
  id: string;
  name: string;
  category: NPCCategory;
  identity: string;               // 身份背景
  attributes: Attributes;
  skills: Record<string, number>; // 技能名 -> 技能值
  hp: number;
  mp: number;
  sanity: number;
  weapons: WeaponData[];
  armor?: number;                 // 护甲值
  damageBonus: string;            // 伤害加值
  build: number;                  // 体格
  move: number;                   // 移动力
  sanityLoss?: {                  // 理智影响 (怪物)
    success: string;
    failure: string;
  };
  personality?: string;           // 性格
  motivation?: string;            // 动机
  stance: 'friendly' | 'neutral' | 'hostile'; // 立场
  sampleDialogue?: string[];      // 台词示例
  relatedClues?: string[];        // 掌握的线索
  relatedItems?: string[];        // 携带的物品
  appearInNodes?: string[];       // 出现的节点
  status?: 'alive' | 'dead';      // 状态
  notes?: string;
}

// ==================== 物品系统 ====================

/**
 * 物品类别
 */
export type ItemCategory = 'clue' | 'weapon' | 'armor' | 'consumable' | 'key' | 'document' | 'magic';

/**
 * 物品配置
 */
export interface ModuleItem {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;            // 外观描述
  hiddenInfo?: string;            // 隐藏信息 (需检定发现)
  
  // 规则属性 (根据类别不同)
  weaponStats?: {
    damage: string;
    range?: string;
    skill: string;
    malfunction?: number;
  };
  armorStats?: {
    protection: number;
  };
  consumableStats?: {
    effect: string;
    uses: number;
  };
  magicStats?: {
    effect: string;
    mpCost?: number;
  };
  
  relatedClueId?: string;         // 关联线索
  obtainedFrom?: string;          // 获取方式
  holder?: string;                // 持有者 (NPC ID或地点)
  purpose?: string;               // 用途说明
  isConsumable?: boolean;
  notes?: string;
}

// ==================== 地图与地点 ====================

/**
 * 地点
 */
export interface Location {
  id: string;
  name: string;
  type: 'indoor' | 'outdoor' | 'mixed';
  description: string;
  connectedLocations: string[];   // 邻接地点ID
  eventsInLocation: string[];     // 发生的事件/节点ID
  cluesInLocation?: string[];     // 地点内的线索
  itemsInLocation?: string[];     // 地点内的物品
  npcsInLocation?: string[];      // 地点内的NPC
  specialRules?: string;          // 特殊环境规则
  mapImage?: string;              // 地图图片URL
  notes?: string;
}

// ==================== 时间线 ====================

/**
 * 时间线事件
 */
export interface TimelineEvent {
  id: string;
  time: string;                   // 时间点 (如 "Day 1 18:00")
  event: string;                  // 事件描述
  nodeId?: string;                // 关联节点
  impact?: string;                // 影响
  isOptional?: boolean;           // 是否可选事件
}

// ==================== 完整模组 ====================

/**
 * 完整模组数据结构
 */
export interface Module {
  metadata: ModuleMetadata;
  storyGraph: {
    nodes: StoryNode[];
    edges: StoryEdge[];
  };
  clues: Clue[];
  npcs: ModuleNPC[];
  items: ModuleItem[];
  locations: Location[];
  timeline?: TimelineEvent[];
  validationErrors?: ValidationError[];
  validationWarnings?: ValidationWarning[];
}

// ==================== 验证结果 ====================

/**
 * 验证错误
 */
export interface ValidationError {
  id: string;
  type: 'error' | 'warning';
  category: 'structure' | 'reference' | 'logic' | 'completeness';
  message: string;
  nodeId?: string;
  severity: 'critical' | 'major' | 'minor';
}

/**
 * 验证警告
 */
export interface ValidationWarning extends ValidationError {
  type: 'warning';
}

/**
 * 验证结果
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  timestamp: string;
}

// ==================== 模板系统 ====================

/**
 * 模板类型
 */
export type TemplateType = 'full-module' | 'scene' | 'npc' | 'combat';

/**
 * 模板
 */
export interface Template {
  id: string;
  type: TemplateType;
  name: string;
  description: string;
  tags: string[];
  data: Partial<Module> | StoryNodeData | ModuleNPC | CombatNodeData;
  previewImage?: string;
  createdAt: string;
}
