import { create } from "zustand";
import { PartyMemberState, SessionState } from "@/domain";
import { getActiveDataStore } from "@/storage";

interface SessionStore {
  currentSession: SessionState | null;
  sessions: SessionState[];
  loadSessions: () => Promise<void>;
  setCurrentSession: (sessionId: string) => Promise<void>;
  createSession: (session: SessionState) => Promise<void>;
  updateCurrentSession: (updates: Partial<SessionState>) => Promise<void>;
  updatePartyMember: (memberId: string, updates: Partial<PartyMemberState>) => Promise<void>;
  addPartyMember: (member: PartyMemberState) => Promise<void>;
  removePartyMember: (memberId: string) => Promise<void>;
  addEventLog: (event: string) => Promise<void>;
  updateHiddenVariable: (key: string, value: number) => Promise<void>;
  addVisitedScene: (sceneId: string) => Promise<void>;
  removeVisitedScene: (sceneId: string) => Promise<void>;
  addFoundClue: (clueId: string) => Promise<void>;
  removeFoundClue: (clueId: string) => Promise<void>;
  setInGameTime: (time: string) => Promise<void>;
  saveCurrentSession: () => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  currentSession: null,
  sessions: [],

  loadSessions: async () => {
    const sessions = await getActiveDataStore().loadSessions();
    set({ sessions });
  },

  setCurrentSession: async (sessionId: string) => {
    const session = await getActiveDataStore().loadSession(sessionId);
    if (session) {
      set({ currentSession: session });
    }
  },

  createSession: async (session: SessionState) => {
    await getActiveDataStore().saveSession(session);
    const sessions = await getActiveDataStore().loadSessions();
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
    await getActiveDataStore().saveSession(updated);
  },

  updatePartyMember: async (memberId: string, updates: Partial<PartyMemberState>) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const partyMembers = currentSession.partyMembers.map((member) =>
      member.characterId === memberId ? { ...member, ...updates } : member,
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

    const partyMembers = currentSession.partyMembers.filter((member) => member.characterId !== memberId);
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

  addVisitedScene: async (sceneId: string) => {
    const { currentSession } = get();
    if (!currentSession) return;
    const visitedScenes = Array.from(new Set([...(currentSession.visitedScenes || []), sceneId]));
    await get().updateCurrentSession({ visitedScenes });
  },

  removeVisitedScene: async (sceneId: string) => {
    const { currentSession } = get();
    if (!currentSession) return;
    const visitedScenes = (currentSession.visitedScenes || []).filter((id) => id !== sceneId);
    await get().updateCurrentSession({ visitedScenes });
  },

  addFoundClue: async (clueId: string) => {
    const { currentSession } = get();
    if (!currentSession) return;
    const foundClues = Array.from(new Set([...(currentSession.foundClues || []), clueId]));
    await get().updateCurrentSession({ foundClues });
  },

  removeFoundClue: async (clueId: string) => {
    const { currentSession } = get();
    if (!currentSession) return;
    const foundClues = (currentSession.foundClues || []).filter((id) => id !== clueId);
    await get().updateCurrentSession({ foundClues });
  },

  setInGameTime: async (time: string) => {
    await get().updateCurrentSession({ currentInGameTime: time });
  },

  saveCurrentSession: async () => {
    const { currentSession } = get();
    if (!currentSession) return;
    await getActiveDataStore().saveSession(currentSession);
  },

  deleteSession: async (sessionId: string) => {
    await getActiveDataStore().deleteSession(sessionId);
    const sessions = await getActiveDataStore().loadSessions();
    const { currentSession } = get();

    set({
      sessions,
      currentSession: currentSession?.id === sessionId ? null : currentSession,
    });
  },
}));
