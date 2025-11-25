import localforage from 'localforage';
import { IDataStore } from './IDataStore';
import { Character, Campaign, SessionState, SceneTemplate, ClueTemplate } from '@/domain';

/**
 * 存储键名常量
 */
const STORAGE_KEYS = {
  CHARACTERS: 'characters',
  CAMPAIGNS: 'campaigns',
  SESSIONS: 'sessions',
  SCENES: 'scenes',
  CLUES: 'clues',
  SCHEMA_VERSION: 'schemaVersion',
};

const CURRENT_SCHEMA_VERSION = '1.0.0';

/**
 * 基于 localForage 的本地数据存储实现
 */
export class LocalDataStore implements IDataStore {
  constructor() {
    // 配置 localForage
    localforage.config({
      name: 'MingriAgency',
      storeName: 'cocKpData',
      description: 'COC7 KP 助手本地数据存储',
    });
    
    this.initializeSchemaVersion();
  }

  private async initializeSchemaVersion() {
    const version = await localforage.getItem<string>(STORAGE_KEYS.SCHEMA_VERSION);
    if (!version) {
      await localforage.setItem(STORAGE_KEYS.SCHEMA_VERSION, CURRENT_SCHEMA_VERSION);
    }
  }

  // ===== 角色相关 =====
  async loadCharacters(): Promise<Character[]> {
    const characters = await localforage.getItem<Character[]>(STORAGE_KEYS.CHARACTERS);
    return characters || [];
  }

  async loadCharacter(id: string): Promise<Character | null> {
    const characters = await this.loadCharacters();
    return characters.find(c => c.id === id) || null;
  }

  async saveCharacter(character: Character): Promise<void> {
    const characters = await this.loadCharacters();
    const index = characters.findIndex(c => c.id === character.id);
    
    if (index >= 0) {
      characters[index] = character;
    } else {
      characters.push(character);
    }
    
    await localforage.setItem(STORAGE_KEYS.CHARACTERS, characters);
  }

  async deleteCharacter(id: string): Promise<void> {
    const characters = await this.loadCharacters();
    const filtered = characters.filter(c => c.id !== id);
    await localforage.setItem(STORAGE_KEYS.CHARACTERS, filtered);
  }

  // ===== 模组/团相关 =====
  async loadCampaigns(): Promise<Campaign[]> {
    const campaigns = await localforage.getItem<Campaign[]>(STORAGE_KEYS.CAMPAIGNS);
    return campaigns || [];
  }

  async loadCampaign(id: string): Promise<Campaign | null> {
    const campaigns = await this.loadCampaigns();
    return campaigns.find(c => c.id === id) || null;
  }

  async saveCampaign(campaign: Campaign): Promise<void> {
    const campaigns = await this.loadCampaigns();
    const index = campaigns.findIndex(c => c.id === campaign.id);
    
    if (index >= 0) {
      campaigns[index] = campaign;
    } else {
      campaigns.push(campaign);
    }
    
    await localforage.setItem(STORAGE_KEYS.CAMPAIGNS, campaigns);
  }

  async deleteCampaign(id: string): Promise<void> {
    const campaigns = await this.loadCampaigns();
    const filtered = campaigns.filter(c => c.id !== id);
    await localforage.setItem(STORAGE_KEYS.CAMPAIGNS, filtered);
  }

  // ===== Session 相关 =====
  async loadSessions(): Promise<SessionState[]> {
    const sessions = await localforage.getItem<SessionState[]>(STORAGE_KEYS.SESSIONS);
    return sessions || [];
  }

  async loadSession(id: string): Promise<SessionState | null> {
    const sessions = await this.loadSessions();
    return sessions.find(s => s.id === id) || null;
  }

  async saveSession(session: SessionState): Promise<void> {
    const sessions = await this.loadSessions();
    const index = sessions.findIndex(s => s.id === session.id);
    
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    
    await localforage.setItem(STORAGE_KEYS.SESSIONS, sessions);
  }

  async deleteSession(id: string): Promise<void> {
    const sessions = await this.loadSessions();
    const filtered = sessions.filter(s => s.id !== id);
    await localforage.setItem(STORAGE_KEYS.SESSIONS, filtered);
  }

  // ===== 场景与线索相关 =====
  async loadScenes(): Promise<SceneTemplate[]> {
    const scenes = await localforage.getItem<SceneTemplate[]>(STORAGE_KEYS.SCENES);
    return scenes || [];
  }

  async loadScene(id: string): Promise<SceneTemplate | null> {
    const scenes = await this.loadScenes();
    return scenes.find(s => s.id === id) || null;
  }

  async saveScene(scene: SceneTemplate): Promise<void> {
    const scenes = await this.loadScenes();
    const index = scenes.findIndex(s => s.id === scene.id);
    
    if (index >= 0) {
      scenes[index] = scene;
    } else {
      scenes.push(scene);
    }
    
    await localforage.setItem(STORAGE_KEYS.SCENES, scenes);
  }

  async deleteScene(id: string): Promise<void> {
    const scenes = await this.loadScenes();
    const filtered = scenes.filter(s => s.id !== id);
    await localforage.setItem(STORAGE_KEYS.SCENES, filtered);
  }

  async loadClues(): Promise<ClueTemplate[]> {
    const clues = await localforage.getItem<ClueTemplate[]>(STORAGE_KEYS.CLUES);
    return clues || [];
  }

  async loadClue(id: string): Promise<ClueTemplate | null> {
    const clues = await this.loadClues();
    return clues.find(c => c.id === id) || null;
  }

  async saveClue(clue: ClueTemplate): Promise<void> {
    const clues = await this.loadClues();
    const index = clues.findIndex(c => c.id === clue.id);
    
    if (index >= 0) {
      clues[index] = clue;
    } else {
      clues.push(clue);
    }
    
    await localforage.setItem(STORAGE_KEYS.CLUES, clues);
  }

  async deleteClue(id: string): Promise<void> {
    const clues = await this.loadClues();
    const filtered = clues.filter(c => c.id !== id);
    await localforage.setItem(STORAGE_KEYS.CLUES, filtered);
  }

  // ===== 数据管理 =====
  async exportAllData(): Promise<string> {
    const data = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      exportDate: new Date().toISOString(),
      characters: await this.loadCharacters(),
      campaigns: await this.loadCampaigns(),
      sessions: await this.loadSessions(),
      scenes: await this.loadScenes(),
      clues: await this.loadClues(),
    };
    
    return JSON.stringify(data, null, 2);
  }

  async importAllData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      // 简单的版本校验
      if (!data.schemaVersion) {
        throw new Error('缺少 schemaVersion 字段');
      }
      
      // TODO: 更严格的数据校验
      
      if (data.characters) {
        await localforage.setItem(STORAGE_KEYS.CHARACTERS, data.characters);
      }
      if (data.campaigns) {
        await localforage.setItem(STORAGE_KEYS.CAMPAIGNS, data.campaigns);
      }
      if (data.sessions) {
        await localforage.setItem(STORAGE_KEYS.SESSIONS, data.sessions);
      }
      if (data.scenes) {
        await localforage.setItem(STORAGE_KEYS.SCENES, data.scenes);
      }
      if (data.clues) {
        await localforage.setItem(STORAGE_KEYS.CLUES, data.clues);
      }
      
    } catch (error) {
      throw new Error(`导入数据失败: ${error}`);
    }
  }

  async clearAllData(): Promise<void> {
    await localforage.clear();
    // 重新初始化版本号
    await this.initializeSchemaVersion();
  }
}

