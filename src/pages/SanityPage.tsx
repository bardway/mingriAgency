import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Insanity {
  id: string;
  name: string;
  type: 'temporary' | 'indefinite' | 'permanent';
  description: string;
}

export const SanityPage: React.FC = () => {
  const [insanities, setInsanities] = useState<Insanity[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/data/insanities.json')
      .then(res => res.json())
      .then(data => setInsanities(data))
      .catch(err => console.error('加载疯狂症状数据失败:', err));
  }, []);

  const filteredInsanities = typeFilter === 'all' 
    ? insanities 
    : insanities.filter(i => i.type === typeFilter);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      temporary: '短期疯狂',
      indefinite: '不定期疯狂',
      permanent: '永久疯狂'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      temporary: 'from-yellow-500/10 to-amber-500/10 border-yellow-500/30',
      indefinite: 'from-orange-500/10 to-red-500/10 border-orange-500/30',
      permanent: 'from-red-500/10 to-rose-500/10 border-red-500/30'
    };
    return colors[type] || '';
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">规则库</Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">理智系统</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-600/20 to-stone-600/20 border border-neutral-600/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">◉</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">理智系统</h1>
            <p className="text-sm text-ww-slate-600 mt-1">疯狂症状速查</p>
          </div>
        </div>

        <div className="flex gap-2">
          {['all', 'temporary', 'indefinite', 'permanent'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                typeFilter === type
                  ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
                  : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
              }`}
            >
              {type === 'all' ? '全部' : getTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInsanities.map(insanity => (
          <div
            key={insanity.id}
            className={`glass rounded-xl border p-5 hover:shadow-glow-sm transition-all bg-gradient-to-br ${getTypeColor(insanity.type)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-ww-slate-800">{insanity.name}</h3>
              <span className={`px-3 py-1 rounded-lg text-xs font-medium glass border ${getTypeColor(insanity.type)}`}>
                {getTypeLabel(insanity.type)}
              </span>
            </div>
            <p className="text-sm text-ww-slate-700 leading-relaxed">{insanity.description}</p>
          </div>
        ))}
      </div>

      {filteredInsanities.length === 0 && (
        <div className="text-center py-16 glass rounded-xl border border-ww-slate-300/50">
          <span className="text-6xl mb-4 block">⌕</span>
          <p className="text-ww-slate-500">该分类下暂无症状</p>
        </div>
      )}
    </div>
  );
};
