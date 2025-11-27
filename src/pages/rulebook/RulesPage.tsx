import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCoc7Data } from '@/hooks/useCoc7Data';

/**
 * 核心规则浏览页面
 */
export const RulesPage: React.FC = () => {
  const { data, loading, error } = useCoc7Data();
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">📖</div>
          <p className="text-ww-slate-600">加载规则数据中...</p>
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

  const categories = [
    { id: 'all', name: '全部规则', count: data.rules.length },
    { id: 'core', name: '核心规则', count: data.rules.filter(r => r.category === 'core').length },
    { id: 'combat', name: '战斗规则', count: data.rules.filter(r => r.category === 'combat').length },
    { id: 'sanity', name: '理智规则', count: data.rules.filter(r => r.category === 'sanity').length },
    { id: 'character', name: '角色规则', count: data.rules.filter(r => r.category === 'character').length },
  ];

  const filteredRules = categoryFilter === 'all' 
    ? data.rules 
    : data.rules.filter(r => r.category === categoryFilter);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      core: 'from-blue-500/10 to-cyan-500/10 border-blue-500/30',
      combat: 'from-red-500/10 to-rose-500/10 border-red-500/30',
      sanity: 'from-purple-500/10 to-violet-500/10 border-purple-500/30',
      character: 'from-green-500/10 to-emerald-500/10 border-green-500/30',
    };
    return colors[category] || 'from-ww-slate-500/10 to-ww-slate-500/10 border-ww-slate-500/30';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      core: '核心',
      combat: '战斗',
      sanity: '理智',
      character: '角色',
    };
    return labels[category] || category;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* 面包屑导航 */}
      <div className="mb-6 flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">规则库</Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">核心规则</span>
      </div>

      {/* 页面头部 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500/20 to-gray-500/20 
                        border border-slate-500/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">▣</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">核心规则</h1>
            <p className="text-sm text-ww-slate-600 mt-1">
              共 {filteredRules.length} 条规则
            </p>
          </div>
        </div>

        {/* 分类过滤 */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                categoryFilter === cat.id
                  ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
                  : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
              }`}
            >
              {cat.name} <span className="text-xs opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 规则列表 */}
      <div className="space-y-4">
        {filteredRules.map((rule) => {
          const isExpanded = expandedRule === rule.id;
          
          return (
            <div
              key={rule.id}
              className="glass rounded-xl border border-ww-slate-300/50 overflow-hidden
                       hover:shadow-glow-sm transition-all duration-300"
            >
              {/* 规则标题 */}
              <button
                onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-ww-slate-100/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* 分类标签 */}
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-br ${getCategoryColor(rule.category)} border`}>
                    {getCategoryLabel(rule.category)}
                  </span>
                  
                  {/* 标题 */}
                  <h3 className="text-lg font-bold text-ww-slate-800">{rule.title}</h3>
                </div>

                {/* 展开图标 */}
                <span className={`text-2xl transform transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              {/* 规则内容 */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-ww-slate-300/30 bg-gradient-to-b from-ww-slate-50/30 to-transparent">
                  {/* 概述 */}
                  <div className="mt-4 mb-4">
                    <p className="text-ww-slate-700 leading-relaxed">{rule.summary}</p>
                  </div>

                  {/* 详细内容 */}
                  <div className="glass rounded-lg p-4 bg-white/40">
                    <h4 className="font-bold text-ww-slate-800 mb-3 flex items-center gap-2">
                      <span>📋</span>
                      <span>详细说明</span>
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(rule.details).map(([key, value]) => (
                        <div key={key} className="flex gap-3 text-sm">
                          <span className="font-medium text-ww-slate-700 min-w-24">
                            {key}:
                          </span>
                          <span className="text-ww-slate-600 flex-1">
                            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 来源引用 */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-ww-slate-500">
                    <span>▣</span>
                    <span>来源: {rule.source.book} - {rule.source.chapter}</span>
                    {rule.source.pages && <span>P.{rule.source.pages}</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 空状态 */}
      {filteredRules.length === 0 && (
        <div className="text-center py-16 glass rounded-xl border border-ww-slate-300/50">
          <span className="text-6xl mb-4 block">⌕</span>
          <p className="text-ww-slate-500">该分类下暂无规则</p>
        </div>
      )}
    </div>
  );
};
