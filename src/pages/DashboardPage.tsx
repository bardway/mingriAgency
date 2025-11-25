import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { dataStore } from '@/storage';
import { SessionState, Character, Campaign } from '@/domain';

/**
 * Dashboard 页面 - 概览页
 */
export const DashboardPage: React.FC = () => {
  const [sessions, setSessions] = useState<SessionState[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sessionsData, charactersData, campaignsData] = await Promise.all([
        dataStore.loadSessions(),
        dataStore.loadCharacters(),
        dataStore.loadCampaigns(),
      ]);
      setSessions(sessionsData);
      setCharacters(charactersData);
      setCampaigns(campaignsData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-ww-slate-500">加载中...</div>;
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
            系统概览
          </h1>
        </div>
        <p className="text-ww-slate-600 ml-5 tracking-wide">欢迎回到明日调查局指挥中心</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/session" className={sessions.length === 0 ? 'pointer-events-none' : ''}>
          <Card>
            <div className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 mb-4 shadow-[0_0_20px_rgba(127,29,29,0.3)]">
                <span className="text-3xl text-red-900">⬢</span>
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-red-900 to-red-800 bg-clip-text text-transparent mb-2 tracking-tight">
                {sessions.length}
              </div>
              <div className="text-ww-slate-600 font-medium tracking-wide">跑团存档</div>
            </div>
          </Card>
        </Link>

        <Link to="/characters" className={characters.length === 0 ? 'pointer-events-none' : ''}>
          <Card>
            <div className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 mb-4 shadow-[0_0_20px_rgba(127,29,29,0.3)]">
                <span className="text-3xl text-red-900">◉</span>
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-red-900 to-red-800 bg-clip-text text-transparent mb-2 tracking-tight">
                {characters.length}
              </div>
              <div className="text-ww-slate-600 font-medium tracking-wide">角色档案</div>
            </div>
          </Card>
        </Link>

        <Link to="/campaigns" className={campaigns.length === 0 ? 'pointer-events-none' : ''}>
          <Card>
            <div className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 mb-4 shadow-[0_0_20px_rgba(127,29,29,0.3)]">
                <span className="text-3xl text-red-900">▣</span>
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-red-900 to-red-800 bg-clip-text text-transparent mb-2 tracking-tight">
                {campaigns.length}
              </div>
              <div className="text-ww-slate-600 font-medium tracking-wide">团/模组</div>
            </div>
          </Card>
        </Link>
      </div>

      {/* 最近的 Session */}
      <Card title="最近的跑团存档">
        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-ww-slate-100 to-ww-slate-200 border border-ww-slate-300 mb-4">
              <span className="text-4xl opacity-40 text-red-900">⬢</span>
            </div>
            <p className="text-ww-slate-600 mb-4 text-lg">还没有任何跑团存档</p>
            <Link to="/session">
              <Button variant="primary">开始新的 Session</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="group flex items-center justify-between p-5 glass-strong rounded-xl border border-ww-slate-300/40 hover:border-ww-orange-500/50 transition-all duration-300 hover:shadow-glow-sm"
              >              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.25)]">
                  <span className="text-2xl text-red-900">⬢</span>
                </div>
                  <div>
                    <h4 className="font-semibold text-ww-slate-900 mb-1 tracking-wide group-hover:text-ww-orange-500 transition-colors">
                      {session.sessionName}
                    </h4>
                    <p className="text-sm text-ww-slate-500 flex items-center gap-3 font-mono">
                      <span>{new Date(session.date).toLocaleDateString('zh-CN')}</span>
                      <span className="w-1 h-1 rounded-full bg-ww-slate-400"></span>
                      <span>{session.partyMembers.length} 名角色</span>
                    </p>
                  </div>
                </div>
                <Link to="/session">
                  <Button size="sm" variant="secondary">继续</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 快速操作 */}
      <Card title="快速操作">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/characters" className="group">
            <div className="p-6 glass-strong rounded-xl border border-ww-slate-300/40 hover:border-ww-orange-500/50 transition-all duration-300 hover:shadow-glow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.25)]">
                  <span className="text-2xl text-red-900">◉</span>
                </div>
                <div>
                  <h4 className="font-semibold text-ww-slate-900 mb-1 group-hover:text-ww-orange-500 transition-colors">管理角色</h4>
                  <p className="text-sm text-ww-slate-500">查看和编辑角色库</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/campaigns" className="group">
            <div className="p-6 glass-strong rounded-xl border border-ww-slate-300/40 hover:border-ww-orange-500/50 transition-all duration-300 hover:shadow-glow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.25)]">
                  <span className="text-2xl text-red-900">▣</span>
                </div>
                <div>
                  <h4 className="font-semibold text-ww-slate-900 mb-1 group-hover:text-ww-orange-500 transition-colors">管理模组</h4>
                  <p className="text-sm text-ww-slate-500">创建和管理跑团模组</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/scenes" className="group">
            <div className="p-6 glass-strong rounded-xl border border-ww-slate-300/40 hover:border-ww-orange-500/50 transition-all duration-300 hover:shadow-glow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.25)]">
                  <span className="text-2xl text-red-900">◈</span>
                </div>
                <div>
                  <h4 className="font-semibold text-ww-slate-900 mb-1 group-hover:text-ww-orange-500 transition-colors">场景与线索</h4>
                  <p className="text-sm text-ww-slate-500">管理场景和线索信息</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/settings" className="group">
            <div className="p-6 glass-strong rounded-xl border border-ww-slate-300/40 hover:border-ww-orange-500/50 transition-all duration-300 hover:shadow-glow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-900/20 to-red-800/20 border-2 border-red-900/40 flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.25)]">
                  <span className="text-2xl text-red-900">⚙</span>
                </div>
                <div>
                  <h4 className="font-semibold text-ww-slate-900 mb-1 group-hover:text-ww-orange-500 transition-colors">系统设置</h4>
                  <p className="text-sm text-ww-slate-500">数据备份和系统配置</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </Card>
    </div>
  );
};
