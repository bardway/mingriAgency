import { PartyMemberState } from './Character';

/**
 * 隐藏变量 - KP 可自定义添加的变量（如某些模组特定的数值）
 * 键为变量名，值为数值
 */
export type HiddenVariables = Record<string, number>;

/**
 * Session 状态(跑团存档)
 */
export interface SessionState {
  id: string;
  campaignId: string; // 关联的模组
  moduleId?: string; // 具体模组的某个章节/子模组(可选)
  
  sessionName: string; // 本次 Session 名称
  date: string; // Session 日期(ISO)
  
  // 队伍状态
  partyMembers: PartyMemberState[];
  
  // 进度追踪
  visitedScenes: string[]; // 已访问的场景 ID
  foundClues: string[]; // 已获得的线索 ID
  
  // 自定义隐藏变量（完全通用，适配任何模组）
  hiddenVariables: HiddenVariables;
  
  // 游戏内时间
  currentInGameTime?: string; // ISO 字符串或自定义格式
  
  // 事件日志(简化版)
  eventLog?: string[]; // 记录关键事件文本
  
  // 备注
  notes?: string;
  
  createdAt: string;
  updatedAt: string;
}
