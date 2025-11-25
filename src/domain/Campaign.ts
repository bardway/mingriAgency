/**
 * 模组/团(Campaign)
 */
export interface Campaign {
  id: string;
  title: string;
  ruleSystem: string; // 规则版本,如 "COC7"
  description?: string;
  setting?: string; // 背景设定,如 "1920s 美国"
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 场景模板
 */
export interface SceneTemplate {
  id: string;
  campaignId?: string; // 所属模组(可选)
  name: string;
  summary: string;
  description?: string;
  
  // 场景中可能包含的线索 ID 列表
  clueIds?: string[];
  
  // 场景触发条件/前置场景等(简化处理)
  prerequisites?: string[];
  
  notes?: string;
}

/**
 * 线索模板
 */
export interface ClueTemplate {
  id: string;
  campaignId?: string;
  name: string;
  description: string;
  
  // 获取线索所需的技能检定(可选)
  requiredSkillCheck?: {
    skillId: string;
    difficulty: number; // 难度值
  };
  
  // 线索关联的其他线索或场景
  relatedClues?: string[];
  relatedScenes?: string[];
  
  isHidden?: boolean; // 是否为隐藏线索
  notes?: string;
}
