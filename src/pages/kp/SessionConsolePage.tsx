import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { useSessionStore } from "@/state";
import { SessionState, Character, SceneTemplate, ClueTemplate, PartyMemberState } from "@/domain";
import { useDataStore } from "@/storage";

/**
 * KP 中控台页面 - Session 管理
 */
export const SessionConsolePage: React.FC = () => {
  const dataStore = useDataStore();
  const {
    currentSession,
    sessions,
    loadSessions,
    setCurrentSession,
    createSession,
    updatePartyMember,
    updateHiddenVariable,
    addEventLog,
    addVisitedScene,
    removeVisitedScene,
    addFoundClue,
    removeFoundClue,
    setInGameTime,
    addPartyMember,
    updateCurrentSession,
  } = useSessionStore();

  const [availableCharacters, setAvailableCharacters] = useState<Character[]>([]);
  const [availableScenes, setAvailableScenes] = useState<SceneTemplate[]>([]);
  const [availableClues, setAvailableClues] = useState<ClueTemplate[]>([]);

  const [selectedCharacterId, setSelectedCharacterId] = useState("");
  const [selectedSceneId, setSelectedSceneId] = useState("");
  const [selectedClueId, setSelectedClueId] = useState("");
  const [newVarName, setNewVarName] = useState("");
  const [newVarValue, setNewVarValue] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadSessions();
      const [chars, scenes, clues] = await Promise.all([
        dataStore.loadCharacters(),
        dataStore.loadScenes(),
        dataStore.loadClues(),
      ]);
      setAvailableCharacters(chars);
      setAvailableScenes(scenes);
      setAvailableClues(clues);
      setIsLoading(false);
    };
    init();
  }, [dataStore, loadSessions]);

  useEffect(() => {
    if (currentSession?.currentInGameTime) {
      setTimeInput(currentSession.currentInGameTime);
    } else {
      setTimeInput("");
    }
  }, [currentSession]);

  const handleCreateNewSession = async () => {
    const newSession: SessionState = {
      id: `session-${Date.now()}`,
      campaignId: 'campaign-default',
      sessionName: `Session ${sessions.length + 1}`,
      date: new Date().toISOString(),
      partyMembers: [],
      visitedScenes: [],
      foundClues: [],
      hiddenVariables: {},
      eventLog: [],
      currentInGameTime: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createSession(newSession);
  };

  const handleSelectSession = async (sessionId: string) => {
    await setCurrentSession(sessionId);
  };

  const handleUpdateHP = async (memberId: string, delta: number) => {
    if (!currentSession) return;

    const member = currentSession.partyMembers.find((m) => m.characterId === memberId);
    if (!member) return;

    const newHP = Math.max(0, member.currentHP + delta);
    await updatePartyMember(memberId, { currentHP: newHP });
    await addEventLog(
      `${member.characterName} HP ${delta > 0 ? '+' : ''}${delta} → ${newHP}/${member.maxHP}`,
    );
  };

  const handleUpdateSAN = async (memberId: string, delta: number) => {
    if (!currentSession) return;

    const member = currentSession.partyMembers.find((m) => m.characterId === memberId);
    if (!member) return;

    const newSAN = Math.max(0, member.currentSAN + delta);
    await updatePartyMember(memberId, { currentSAN: newSAN });
    await addEventLog(
      `${member.characterName} SAN ${delta > 0 ? '+' : ''}${delta} → ${newSAN}/${member.maxSAN}`,
    );
  };

  const handleSaveVariable = async () => {
    if (!currentSession || !newVarName || !newVarValue) return;

    const numValue = parseFloat(newVarValue);
    if (isNaN(numValue)) {
      alert('请输入有效的数字');
      return;
    }

    await updateHiddenVariable(newVarName, numValue);
    await addEventLog(`自定义变量 [${newVarName}] 已更新为 ${numValue}`);
    setNewVarName('');
    setNewVarValue('');
  };

  const handleUpdateVariable = async (varName: string, value: string) => {
    if (!currentSession || !value) return;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      alert('请输入有效的数字');
      return;
    }

    await updateHiddenVariable(varName, numValue);
    await addEventLog(`变量 [${varName}] 已更新为 ${numValue}`);
  };

  const handleDeleteVariable = async (varName: string) => {
    if (!currentSession) return;
    const newVars = { ...currentSession.hiddenVariables } as Record<string, number>;
    delete newVars[varName];
    await updateCurrentSession({ hiddenVariables: newVars });
    await addEventLog(`变量 [${varName}] 已删除`);
  };

  const handleBackToList = async () => {
    await loadSessions();
  };

  const handleAddPartyMember = async () => {
    if (!currentSession || !selectedCharacterId) return;
    const character = availableCharacters.find((c) => c.id === selectedCharacterId);
    if (!character) return;
    const member: PartyMemberState = {
      characterId: character.id,
      characterName: character.name,
      currentHP: character.currentHP,
      maxHP: character.maxHP,
      currentSAN: character.currentSAN,
      maxSAN: character.maxSAN,
      currentMP: character.currentMP,
      maxMP: character.maxMP,
      statusTags: [],
      temporaryModifiers: {},
      notes: character.background,
    };
    await addPartyMember(member);
    await addEventLog(`加入队伍：${character.name}`);
    setSelectedCharacterId('');
  };

  const handleAddVisitedScene = async () => {
    if (!currentSession || !selectedSceneId) return;
    await addVisitedScene(selectedSceneId);
    const scene = availableScenes.find((s) => s.id === selectedSceneId);
    await addEventLog(`标记已访问场景：${scene?.name || selectedSceneId}`);
    setSelectedSceneId('');
  };

  const handleAddFoundClue = async () => {
    if (!currentSession || !selectedClueId) return;
    await addFoundClue(selectedClueId);
    const clue = availableClues.find((c) => c.id === selectedClueId);
    await addEventLog(`获得线索：${clue?.name || selectedClueId}`);
    setSelectedClueId('');
  };

  const handleRemoveScene = async (sceneId: string) => {
    await removeVisitedScene(sceneId);
    const scene = availableScenes.find((s) => s.id === sceneId);
    await addEventLog(`取消访问场景：${scene?.name || sceneId}`);
  };

  const handleRemoveClue = async (clueId: string) => {
    await removeFoundClue(clueId);
    const clue = availableClues.find((c) => c.id === clueId);
    await addEventLog(`移除线索：${clue?.name || clueId}`);
  };

  const handleSaveTime = async () => {
    if (!timeInput) return;
    await setInGameTime(timeInput);
    await addEventLog(`当前游戏时间更新为 ${timeInput}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ww-orange-400 animate-pulse">加载中...</div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-ww-light-200 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* 返回主页导航 */}
          <div className="flex items-center justify-between border-b border-ww-slate-200 pb-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-ww-slate-600 hover:text-ww-orange-600 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">返回主页</span>
            </Link>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
                KP 中控台
              </h1>
            </div>
            <p className="text-sm sm:text-base text-ww-slate-600 ml-3 sm:ml-5">选择或创建一个 Session 开始</p>
          </div>

        <Card>
          <div className="mb-4 pb-4 border-b border-ww-slate-200">
            <h3 className="text-base sm:text-lg font-semibold text-ww-slate-900">选择 Session</h3>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-ww-slate-100 to-ww-slate-200 border border-ww-slate-300 mb-4">
                <span className="text-3xl sm:text-4xl opacity-40">🎲</span>
              </div>
              <p className="text-sm sm:text-base text-ww-slate-600 mb-4">还没有任何 Session</p>
              <Button variant="primary" onClick={handleCreateNewSession}>
                创建 Session
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="group p-4 glass-strong rounded-xl border border-ww-slate-300/40 hover:border-ww-orange-500/50 transition-all duration-300 flex items-center justify-between cursor-pointer hover:shadow-glow-sm"
                  onClick={() => handleSelectSession(session.id)}
                >
                  <div>
                    <h4 className="font-semibold text-ww-slate-900 group-hover:text-ww-orange-500 transition-colors">
                      {session.sessionName}
                    </h4>
                    <p className="text-sm text-ww-slate-600 font-mono">
                      {new Date(session.date).toLocaleDateString('zh-CN')} •{' '}
                      {session.partyMembers.length} 名角色
                    </p>
                  </div>
                  <Button size="sm" variant="secondary">
                    选择
                  </Button>
                </div>
              ))}
              <div className="pt-4">
                <Button variant="primary" onClick={handleCreateNewSession} className="w-full">
                  + 创建 Session
                </Button>
              </div>
            </div>
          )}
        </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ww-light-200 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 返回主页导航 */}
        <div className="flex items-center justify-between border-b border-ww-slate-200 pb-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-ww-slate-600 hover:text-ww-orange-600 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">返回主页</span>
          </Link>
        </div>

      {/* 标题 */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
              KP 中控台
            </h1>
            <p className="text-ww-slate-600">
              当前 Session:{' '}
              <span className="font-mono text-ww-orange-500 font-semibold">
                {currentSession.sessionName}
              </span>
            </p>
          </div>
          <Button variant="secondary" onClick={handleBackToList}>
            切换 Session
          </Button>
        </div>
      </div>

      {/* 游戏内时间 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">游戏时间</h3>
          <p className="text-sm text-ww-slate-600 mt-1">记录当前剧情时间点，便于对齐事件顺序</p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
            placeholder="ISO 或描述性时间，如 1920-03-05T21:00"
            className="flex-1 px-4 py-2 glass-strong border border-ww-slate-300/50 rounded-lg text-ww-slate-800 placeholder-ww-slate-500 focus:outline-none focus:ring-2 focus:ring-ww-orange-500/50 transition-all"
          />
          <Button variant="primary" onClick={handleSaveTime}>
            保存时间
          </Button>
        </div>
        {currentSession.currentInGameTime && (
          <p className="text-xs text-ww-slate-600 mt-2 font-mono">
            当前：{currentSession.currentInGameTime}
          </p>
        )}
      </Card>

      {/* 自定义变量管理 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">自定义变量</h3>
          <p className="text-sm text-ww-slate-600 mt-1">
            添加模组特定的隐藏变量（仅 KP 可见）
          </p>
        </div>

        {/* 已有变量列表 */}
        {currentSession.hiddenVariables && Object.keys(currentSession.hiddenVariables).length > 0 && (
          <div className="space-y-2 mb-4">
            {Object.entries(currentSession.hiddenVariables).map(([varName, varValue]) => (
              <div
                key={varName}
                className="flex items-center gap-2 p-3 glass-strong rounded-lg border border-ww-slate-300/40"
              >
                <span className="font-mono font-semibold text-ww-slate-700 min-w-[100px]">
                  {varName}:
                </span>
                <span className="font-mono text-ww-orange-600 font-bold">{varValue}</span>
                <div className="ml-auto flex gap-2">
                  <input
                    type="number"
                    placeholder="新值"
                    className="w-24 px-2 py-1 text-sm glass-strong border border-ww-slate-300/50 rounded text-ww-slate-800 focus:outline-none focus:ring-2 focus:ring-ww-orange-500/50"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateVariable(varName, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDeleteVariable(varName)}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 添加新变量 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newVarName}
            onChange={(e) => setNewVarName(e.target.value)}
            placeholder="变量名（如 LS、线索数、威胁值）"
            className="flex-1 px-4 py-2 glass-strong border border-ww-slate-300/50 rounded-lg text-ww-slate-800 placeholder-ww-slate-500 focus:outline-none focus:ring-2 focus:ring-ww-orange-500/50 transition-all"
          />
          <input
            type="number"
            value={newVarValue}
            onChange={(e) => setNewVarValue(e.target.value)}
            placeholder="数值"
            className="w-32 px-4 py-2 glass-strong border border-ww-slate-300/50 rounded-lg text-ww-slate-800 placeholder-ww-slate-500 focus:outline-none focus:ring-2 focus:ring-ww-orange-500/50 transition-all"
          />
          <Button variant="primary" onClick={handleSaveVariable}>
            添加
          </Button>
        </div>
        <p className="text-xs text-ww-slate-600 mt-2">
          💡 例如：LS、SIN、调查进度、时间限制等模组特定变量
        </p>
      </Card>

      {/* 场景与线索状态 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">场景 / 线索状态</h3>
          <p className="text-sm text-ww-slate-600 mt-1">记录已访问的场景和获得的线索</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <select
                value={selectedSceneId}
                onChange={(e) => setSelectedSceneId(e.target.value)}
                className="flex-1 px-3 py-2 glass-strong border border-ww-slate-300/50 rounded-lg"
              >
                <option value="">选择场景</option>
                {availableScenes.map((scene) => (
                  <option key={scene.id} value={scene.id}>
                    {scene.name}
                  </option>
                ))}
              </select>
              <Button variant="primary" onClick={handleAddVisitedScene}>
                标记已访问
              </Button>
            </div>
            <div className="space-y-2">
              {(currentSession.visitedScenes || []).map((sceneId) => (
                <div key={sceneId} className="flex items-center justify-between glass-strong rounded-lg px-3 py-2">
                  <span className="text-sm text-ww-slate-800">
                    {availableScenes.find((s) => s.id === sceneId)?.name || sceneId}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => handleRemoveScene(sceneId)}>
                    移除
                  </Button>
                </div>
              ))}
              {currentSession.visitedScenes.length === 0 && (
                <p className="text-sm text-ww-slate-500">尚未标记任何场景</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <select
                value={selectedClueId}
                onChange={(e) => setSelectedClueId(e.target.value)}
                className="flex-1 px-3 py-2 glass-strong border border-ww-slate-300/50 rounded-lg"
              >
                <option value="">选择线索</option>
                {availableClues.map((clue) => (
                  <option key={clue.id} value={clue.id}>
                    {clue.name}
                  </option>
                ))}
              </select>
              <Button variant="primary" onClick={handleAddFoundClue}>
                标记已获得
              </Button>
            </div>
            <div className="space-y-2">
              {(currentSession.foundClues || []).map((clueId) => (
                <div key={clueId} className="flex items-center justify-between glass-strong rounded-lg px-3 py-2">
                  <span className="text-sm text-ww-slate-800">
                    {availableClues.find((c) => c.id === clueId)?.name || clueId}
                  </span>
                  <Button size="sm" variant="ghost" onClick={() => handleRemoveClue(clueId)}>
                    移除
                  </Button>
                </div>
              ))}
              {currentSession.foundClues.length === 0 && (
                <p className="text-sm text-ww-slate-500">尚未获得线索</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 队伍成员状态 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">队伍成员</h3>
        </div>

        <div className="flex gap-2 mb-4">
          <select
            value={selectedCharacterId}
            onChange={(e) => setSelectedCharacterId(e.target.value)}
            className="flex-1 px-3 py-2 glass-strong border border-ww-slate-300/50 rounded-lg"
          >
            <option value="">选择角色加入队伍</option>
            {availableCharacters.map((char) => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
          <Button variant="primary" onClick={handleAddPartyMember}>
            添加角色
          </Button>
        </div>

        {currentSession.partyMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ww-slate-600 mb-4">还没有添加角色</p>
            <Button variant="primary" onClick={handleAddPartyMember}>+ 添加角色</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentSession.partyMembers.map((member) => (
              <div
                key={member.characterId}
                className="p-4 glass-strong rounded-xl border border-ww-slate-300/40 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-ww-slate-900">{member.characterName}</h4>
                    {member.statusTags && member.statusTags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {member.statusTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded-full bg-ww-orange-100 text-ww-orange-700 border border-ww-orange-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* HP 管理 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ww-slate-600 font-mono">HP</span>
                    <span className="text-ww-slate-800 font-mono font-semibold">
                      {member.currentHP}/{member.maxHP}
                    </span>
                  </div>
                  <div className="w-full bg-ww-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (member.currentHP / member.maxHP) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateHP(member.characterId, -1)}
                    >
                      -1
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateHP(member.characterId, -5)}
                    >
                      -5
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateHP(member.characterId, 1)}
                    >
                      +1
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateHP(member.characterId, 5)}
                    >
                      +5
                    </Button>
                  </div>
                </div>

                {/* SAN 管理 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ww-slate-600 font-mono">SAN</span>
                    <span className="text-ww-slate-800 font-mono font-semibold">
                      {member.currentSAN}/{member.maxSAN}
                    </span>
                  </div>
                  <div className="w-full bg-ww-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-ww-amber-500 to-ww-orange-500 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (member.currentSAN / member.maxSAN) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateSAN(member.characterId, -1)}
                    >
                      -1
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateSAN(member.characterId, -5)}
                    >
                      -5
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateSAN(member.characterId, 1)}
                    >
                      +1
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdateSAN(member.characterId, 5)}
                    >
                      +5
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 事件日志 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">事件日志</h3>
        </div>

        <div className="space-y-1 font-mono text-sm max-h-64 overflow-y-auto">
          {!currentSession.eventLog || currentSession.eventLog.length === 0 ? (
            <p className="text-ww-slate-500 text-center py-4">暂无事件记录</p>
          ) : (
            currentSession.eventLog.map((log, idx) => (
              <div
                key={idx}
                className="text-sm text-ww-slate-700 py-1 border-b border-ww-slate-200/60"
              >
                {log}
              </div>
            ))
          )}
        </div>
      </Card>
      </div>
    </div>
  );
};
