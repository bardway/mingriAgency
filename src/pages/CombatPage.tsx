import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCoc7CombatRules } from '@/hooks/useCoc7Data';

interface Weapon {
  id: string;
  name: string;
  category: string;
  skill: string;
  damage: string;
  range: string;
  attacks: number;
  ammo: number | null;
  malfunction: number | null;
}

export const CombatPage: React.FC = () => {
  const { combatRules, loading, error } = useCoc7CombatRules();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [weaponCategory, setWeaponCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/data/weapons.json')
      .then(res => res.json())
      .then(data => setWeapons(data))
      .catch(err => console.error('加载武器数据失败:', err));
  }, []);

  if (loading || error) {
    return <div className="flex items-center justify-center h-96"><p>加载中...</p></div>;
  }

  const filteredWeapons = weaponCategory === 'all' 
    ? weapons 
    : weapons.filter(w => w.category === weaponCategory);

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
            <p className="text-sm text-ww-slate-600 mt-1">战斗机制 & 武器数据</p>
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

        {/* 武器列表 */}
        <div className="glass rounded-xl border border-ww-slate-300/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-ww-slate-800 flex items-center gap-2">
              <span>⬡</span>
              <span>武器数据</span>
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setWeaponCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  weaponCategory === 'all'
                    ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600'
                    : 'glass border border-ww-slate-300/50 text-ww-slate-600'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setWeaponCategory('melee')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  weaponCategory === 'melee'
                    ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600'
                    : 'glass border border-ww-slate-300/50 text-ww-slate-600'
                }`}
              >
                近战
              </button>
              <button
                onClick={() => setWeaponCategory('ranged')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  weaponCategory === 'ranged'
                    ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600'
                    : 'glass border border-ww-slate-300/50 text-ww-slate-600'
                }`}
              >
                远程
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ww-slate-300/50">
                  <th className="text-left py-2 px-3 text-ww-slate-600 font-semibold">武器</th>
                  <th className="text-left py-2 px-3 text-ww-slate-600 font-semibold">技能</th>
                  <th className="text-left py-2 px-3 text-ww-slate-600 font-semibold">伤害</th>
                  <th className="text-left py-2 px-3 text-ww-slate-600 font-semibold">射程</th>
                  <th className="text-left py-2 px-3 text-ww-slate-600 font-semibold">攻击次数</th>
                </tr>
              </thead>
              <tbody>
                {filteredWeapons.map(weapon => (
                  <tr key={weapon.id} className="border-b border-ww-slate-200/50 hover:bg-ww-slate-100/30">
                    <td className="py-2 px-3 font-medium text-ww-slate-800">{weapon.name}</td>
                    <td className="py-2 px-3 text-ww-slate-600">{weapon.skill}</td>
                    <td className="py-2 px-3 font-mono text-ww-orange-600">{weapon.damage}</td>
                    <td className="py-2 px-3 text-ww-slate-600">{weapon.range}</td>
                    <td className="py-2 px-3 text-ww-slate-600">{weapon.attacks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
