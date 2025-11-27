import React from 'react';
import { Link } from 'react-router-dom';
import { useCoc7CombatRules } from '@/hooks/useCoc7Data';

export const CombatPage: React.FC = () => {
  const { combatRules, loading, error } = useCoc7CombatRules();

  if (loading || error) {
    return <div className="flex items-center justify-center h-96"><p>加载中...</p></div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">规则库</Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">战斗规则</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600/20 to-gray-700/20 border border-slate-600/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">⬢</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">战斗规则</h1>
            <p className="text-sm text-ww-slate-600 mt-1">战斗机制说明</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* 战斗动作 */}
        {combatRules && (
          <div className="glass rounded-xl border border-ww-slate-300/50 p-6">
            <h2 className="text-xl font-bold text-ww-slate-800 mb-4 flex items-center gap-2">
              <span>◈</span>
              <span>战斗动作</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {combatRules.maneuvers.map(maneuver => (
                <div key={maneuver.id} className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-2">{maneuver.name}</h3>
                  <p className="text-sm text-ww-slate-700 mb-2">{maneuver.effect}</p>
                  <p className="text-xs text-ww-slate-500">{maneuver.requirement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 武器数据跳转卡片 */}
        <Link 
          to="/rulebook/equipment?tab=weapons" 
          className="block glass rounded-xl border border-ww-slate-300/50 hover:border-ww-orange-500/50 p-6 transition-all duration-300 hover:shadow-glow group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ww-orange-500/20 to-ww-amber-500/20 border border-ww-orange-500/40 flex items-center justify-center group-hover:shadow-glow transition-all">
                <span className="text-2xl">⚔️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-ww-slate-800 mb-1 flex items-center gap-2">
                  <span>武器数据库</span>
                </h2>
                <p className="text-sm text-ww-slate-600">
                  查看完整的武器列表，包含伤害、射程、攻击次数等详细数据
                </p>
              </div>
            </div>
            <div className="text-ww-orange-500 text-2xl group-hover:translate-x-1 transition-transform">
              →
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
