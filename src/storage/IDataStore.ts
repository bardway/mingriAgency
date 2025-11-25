import { Character, Campaign, SessionState, SceneTemplate, ClueTemplate } from '@/domain';

/**
 * 数据存储接口
 * 定义所有数据访问方法,便于切换实现(localforage/后端API等)
 */
export interface IDataStore {
  // ===== 角色相关 =====
  loadCharacters(): Promise<Character[]>;
  loadCharacter(id: string): Promise<Character | null>;
  saveCharacter(character: Character): Promise<void>;
  deleteCharacter(id: string): Promise<void>;

  // ===== 模组/团相关 =====
  loadCampaigns(): Promise<Campaign[]>;
  loadCampaign(id: string): Promise<Campaign | null>;
  saveCampaign(campaign: Campaign): Promise<void>;
  deleteCampaign(id: string): Promise<void>;

  // ===== Session 相关 =====
  loadSessions(): Promise<SessionState[]>;
  loadSession(id: string): Promise<SessionState | null>;
  saveSession(session: SessionState): Promise<void>;
  deleteSession(id: string): Promise<void>;

  // ===== 场景与线索相关 =====
  loadScenes(): Promise<SceneTemplate[]>;
  loadScene(id: string): Promise<SceneTemplate | null>;
  saveScene(scene: SceneTemplate): Promise<void>;
  deleteScene(id: string): Promise<void>;

  loadClues(): Promise<ClueTemplate[]>;
  loadClue(id: string): Promise<ClueTemplate | null>;
  saveClue(clue: ClueTemplate): Promise<void>;
  deleteClue(id: string): Promise<void>;

  // ===== 数据管理 =====
  exportAllData(): Promise<string>; // 导出为 JSON 字符串
  importAllData(jsonData: string): Promise<void>; // 从 JSON 导入
  clearAllData(): Promise<void>; // 清空所有数据
}
