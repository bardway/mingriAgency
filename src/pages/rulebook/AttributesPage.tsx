import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCoc7Data } from '@/hooks/useCoc7Data';
import { Copyright } from '@/components/Copyright';

/**
 * 角色属性浏览页面
 */
export const AttributesPage: React.FC = () => {
  const { data, loading, error } = useCoc7Data();
  const [activeTab, setActiveTab] = useState<'basic' | 'derived'>('basic');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">💪</div>
          <p className="text-ww-slate-600">加载属性数据中...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-ww-slate-600">加载失败: {error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* 面包屑导航 */}
      <div className="mb-6 flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">规则库</Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">角色属性</span>
      </div>

      {/* 页面头部 */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stone-500/20 to-neutral-500/20 
                        border border-stone-500/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">◈</span>
          </div>
          <h1 className="text-3xl font-bold text-ww-slate-800">角色属性</h1>
        </div>

        {/* 标签切换 */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'basic'
                ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
                : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
            }`}
          >
            基础属性 ({data.attributes.length})
          </button>
          <button
            onClick={() => setActiveTab('derived')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'derived'
                ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
                : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
            }`}
          >
            派生属性 ({data.derivedStats.length})
          </button>
        </div>
      </div>

      {/* 基础属性 */}
      {activeTab === 'basic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.attributes.map(attr => (
            <div key={attr.id} className="glass rounded-xl border border-ww-slate-300/50 p-6 hover:shadow-glow-sm transition-all">
              {/* 属性头部 */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-ww-slate-800">{attr.name}</h3>
                  <p className="text-sm text-ww-slate-500">{attr.nameEn}</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/15 to-emerald-500/15 
                              border border-green-500/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">{attr.abbr}</span>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-ww-slate-700 mb-4 leading-relaxed">{attr.description}</p>

              {/* 掷骰公式 */}
              <div className="glass-strong rounded-lg p-3 bg-white/40 mb-4">
                <div className="text-xs text-ww-slate-600 mb-1">掷骰公式</div>
                <div className="font-mono text-lg font-bold text-ww-orange-600">{attr.rollFormula}</div>
              </div>

              {/* 影响因素 */}
              <div>
                <div className="text-xs text-ww-slate-600 mb-2">影响项目</div>
                <div className="flex flex-wrap gap-2">
                  {attr.effects.map((effect, idx) => (
                    <span key={idx} className="px-2 py-1 glass rounded text-xs text-ww-slate-700 border border-ww-slate-300/50">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 派生属性 */}
      {activeTab === 'derived' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.derivedStats.map(stat => (
            <div key={stat.id} className="glass rounded-xl border border-ww-slate-300/50 p-6 hover:shadow-glow-sm transition-all">
              {/* 属性头部 */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-ww-slate-800">{stat.name}</h3>
                  <p className="text-sm text-ww-slate-500">{stat.nameEn}</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 
                              border border-blue-500/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">{stat.abbr}</span>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-ww-slate-700 mb-4 leading-relaxed">{stat.description}</p>

              {/* 计算公式 */}
              <div className="glass-strong rounded-lg p-3 bg-white/40">
                <div className="text-xs text-ww-slate-600 mb-1">计算公式</div>
                <div className="font-mono text-sm font-bold text-ww-orange-600">
                  {typeof stat.formula === 'string' ? stat.formula : JSON.stringify(stat.formula, null, 2)}
                </div>
              </div>

              {/* 查询表 */}
              {stat.table && stat.table.length > 0 && (
                <div className="mt-4 glass-strong rounded-lg p-3 bg-white/40">
                  <div className="text-xs text-ww-slate-600 mb-2">数值对照表</div>
                  <div className="space-y-1.5 text-sm max-h-48 overflow-y-auto">
                    {stat.table.map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-ww-slate-200/50 last:border-0">
                        <span className="text-ww-slate-600 font-mono">{row.range}</span>
                        <span className="font-bold text-ww-slate-800">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* 版权信息 */}
      <Copyright />
    </div>
  );
};
