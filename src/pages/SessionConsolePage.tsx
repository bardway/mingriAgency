import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useSessionStore } from '@/state';
import { SessionState } from '@/domain';

/**
 * KP 中控台页面 - Session 管理
 */
export const SessionConsolePage: React.FC = () => {
  const {
    currentSession,
    sessions,
    loadSessions,
    setCurrentSession,
    createSession,
    updatePartyMember,
    updateHiddenVariable,
    addEventLog,
  } = useSessionStore();

  const [newVarName, setNewVarName] = useState('');
  const [newVarValue, setNewVarValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadSessions();
      setIsLoading(false);
    };
    init();
  }, [loadSessions]);

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
      `${member.characterName} HP ${delta > 0 ? '+' : ''}${delta} → ${newHP}/${member.maxHP}`
    );
  };

  const handleUpdateSAN = async (memberId: string, delta: number) => {
    if (!currentSession) return;

    const member = currentSession.partyMembers.find((m) => m.characterId === memberId);
    if (!member) return;

    const newSAN = Math.max(0, member.currentSAN + delta);
    await updatePartyMember(memberId, { currentSAN: newSAN });
    await addEventLog(
      `${member.characterName} SAN ${delta > 0 ? '+' : ''}${delta} → ${newSAN}/${member.maxSAN}`
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
    await addEventLog(`自定义变量 [${newVarName}] 已更新: ${numValue}`);
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
    await addEventLog(`变量 [${varName}] 已更新: ${numValue}`);
  };

  const handleDeleteVariable = async (varName: string) => {
    if (!currentSession) return;
    
    // 删除变量（设置为 undefined）
    const newVars = { ...currentSession.hiddenVariables };
    delete newVars[varName];
    
    // 更新所有变量
    Object.keys(newVars).forEach(key => {
      updateHiddenVariable(key, newVars[key]);
    });
    
    await addEventLog(`变量 [${varName}] 已删除`);
  };

  const handleRollSanCheck = async (loss: string) => {
    if (!currentSession || !loss) return;
    await addEventLog(`SAN 检定: 失败扣除 ${loss} SAN`);
  };

  const handleBackToList = async () => {
    await loadSessions();
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
      <div className="space-y-8">
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
              KP 中控台
            </h1>
          </div>
          <p className="text-ww-slate-600 ml-5">选择或创建一个 Session 开始</p>
        </div>

        <Card>
          <div className="mb-4 pb-4 border-b border-ww-slate-200">
            <h3 className="text-lg font-semibold text-ww-slate-900">选择 Session</h3>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-ww-slate-100 to-ww-slate-200 border border-ww-slate-300 mb-4">
                <span className="text-4xl opacity-40">🎲</span>
              </div>
              <p className="text-ww-slate-600 mb-4">还没有任何 Session</p>
              <Button variant="primary" onClick={handleCreateNewSession}>
                创建新 Session
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
                  + 创建新 Session
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
            placeholder="变量名（如: LS、线索数、威胁值）"
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

      {/* SAN 检定工具 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">SAN 检定</h3>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="输入失败损失 (例如: 1d6)"
            className="flex-1 px-4 py-2 glass-strong border border-ww-slate-300/50 rounded-lg text-ww-slate-800 placeholder-ww-slate-500 focus:outline-none focus:ring-2 focus:ring-ww-orange-500/50"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleRollSanCheck((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <Button variant="primary">🎲 投骰</Button>
        </div>
        <p className="text-xs text-ww-slate-600 mt-2">输入 SAN 损失公式后按回车或点击投骰</p>
      </Card>

      {/* 队伍成员状态 */}
      <Card>
        <div className="mb-4 pb-4 border-b border-ww-slate-200">
          <h3 className="text-lg font-semibold text-ww-slate-900">队伍成员</h3>
        </div>

        {currentSession.partyMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-ww-slate-600 mb-4">还没有添加角色</p>
            <Button variant="primary">+ 添加角色</Button>
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
  );
};
