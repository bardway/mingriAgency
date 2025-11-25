import { create } from 'zustand';
import { SessionState, PartyMemberState } from '@/domain';
import { dataStore } from '@/storage';

/**
 * Session Store 接口
 */
interface SessionStore {
  // 当前选中的 Session
  currentSession: SessionState | null;
  
  // 所有 Session 列表
  sessions: SessionState[];
  
  // 加载所有 Session
  loadSessions: () => Promise<void>;
  
  // 设置当前 Session
  setCurrentSession: (sessionId: string) => Promise<void>;
  
  // 创建新 Session
  createSession: (session: SessionState) => Promise<void>;
  
  // 更新当前 Session
  updateCurrentSession: (updates: Partial<SessionState>) => Promise<void>;
  
  // 更新队伍成员
  updatePartyMember: (memberId: string, updates: Partial<PartyMemberState>) => Promise<void>;
  
  // 添加队伍成员
  addPartyMember: (member: PartyMemberState) => Promise<void>;
  
  // 移除队伍成员
  removePartyMember: (memberId: string) => Promise<void>;
  
  // 添加事件日志
  addEventLog: (event: string) => Promise<void>;
  
  // 更新隐藏变量
  updateHiddenVariable: (key: string, value: number) => Promise<void>;
  
  // 保存当前 Session
  saveCurrentSession: () => Promise<void>;
  
  // 删除 Session
  deleteSession: (sessionId: string) => Promise<void>;
}

/**
 * Session 状态管理
 */
export const useSessionStore = create<SessionStore>((set, get) => ({
  currentSession: null,
  sessions: [],

  loadSessions: async () => {
    const sessions = await dataStore.loadSessions();
    set({ sessions });
  },

  setCurrentSession: async (sessionId: string) => {
    const session = await dataStore.loadSession(sessionId);
    if (session) {
      set({ currentSession: session });
    }
  },

  createSession: async (session: SessionState) => {
    await dataStore.saveSession(session);
    const sessions = await dataStore.loadSessions();
    set({ sessions, currentSession: session });
  },

  updateCurrentSession: async (updates: Partial<SessionState>) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const updated = {
      ...currentSession,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    set({ currentSession: updated });
    await dataStore.saveSession(updated);
  },

  updatePartyMember: async (memberId: string, updates: Partial<PartyMemberState>) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const partyMembers = currentSession.partyMembers.map(member =>
      member.characterId === memberId
        ? { ...member, ...updates }
        : member
    );

    await get().updateCurrentSession({ partyMembers });
  },

  addPartyMember: async (member: PartyMemberState) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const partyMembers = [...currentSession.partyMembers, member];
    await get().updateCurrentSession({ partyMembers });
  },

  removePartyMember: async (memberId: string) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const partyMembers = currentSession.partyMembers.filter(
      member => member.characterId !== memberId
    );
    await get().updateCurrentSession({ partyMembers });
  },

  addEventLog: async (event: string) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const eventLog = [...(currentSession.eventLog || []), event];
    await get().updateCurrentSession({ eventLog });
  },

  updateHiddenVariable: async (key: string, value: number) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const hiddenVariables = {
      ...currentSession.hiddenVariables,
      [key]: value,
    };
    await get().updateCurrentSession({ hiddenVariables });
  },

  saveCurrentSession: async () => {
    const { currentSession } = get();
    if (!currentSession) return;

    await dataStore.saveSession(currentSession);
  },

  deleteSession: async (sessionId: string) => {
    await dataStore.deleteSession(sessionId);
    const sessions = await dataStore.loadSessions();
    const { currentSession } = get();
    
    set({
      sessions,
      currentSession: currentSession?.id === sessionId ? null : currentSession,
    });
  },
}));
