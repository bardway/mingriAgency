import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useCoc7Data } from '@/hooks/useCoc7Data';

interface SearchResult {
  type: 'rule' | 'skill' | 'attribute' | 'occupation' | 'glossary';
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  path: string;
  category?: string;
}

/**
 * 规则库全局搜索页面
 */
export const RulebookSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const { data, loading, error } = useCoc7Data();

  // 同步URL参数到输入框
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // 全局搜索逻辑
  const searchResults = useMemo(() => {
    if (!data || !query.trim()) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    // 搜索规则
    data.rules.forEach(rule => {
      if (
        rule.title.toLowerCase().includes(searchTerm) ||
        rule.summary.toLowerCase().includes(searchTerm) ||
        JSON.stringify(rule.details).toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'rule',
          id: rule.id,
          title: rule.title,
          subtitle: `规则 · ${getCategoryLabel(rule.category)}`,
          description: rule.summary,
          path: `/rulebook/rules`,
          category: rule.category,
        });
      }
    });

    // 搜索技能
    data.skills.forEach(skill => {
      if (
        skill.name.toLowerCase().includes(searchTerm) ||
        skill.nameEn.toLowerCase().includes(searchTerm) ||
        skill.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'skill',
          id: skill.id,
          title: skill.name,
          subtitle: `技能 · ${skill.nameEn}`,
          description: skill.description,
          path: `/rulebook/skills`,
          category: skill.category,
        });
      }
    });

    // 搜索属性
    data.attributes.forEach(attr => {
      if (
        attr.name.toLowerCase().includes(searchTerm) ||
        attr.nameEn.toLowerCase().includes(searchTerm) ||
        attr.abbr.toLowerCase().includes(searchTerm) ||
        attr.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'attribute',
          id: attr.id,
          title: attr.name,
          subtitle: `属性 · ${attr.nameEn} (${attr.abbr})`,
          description: attr.description,
          path: `/rulebook/attributes`,
        });
      }
    });

    // 搜索派生属性
    data.derivedStats.forEach(stat => {
      if (
        stat.name.toLowerCase().includes(searchTerm) ||
        stat.nameEn.toLowerCase().includes(searchTerm) ||
        stat.abbr.toLowerCase().includes(searchTerm) ||
        stat.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'attribute',
          id: stat.id,
          title: stat.name,
          subtitle: `派生属性 · ${stat.nameEn} (${stat.abbr})`,
          description: stat.description,
          path: `/rulebook/attributes`,
        });
      }
    });

    // 搜索职业
    data.occupations.forEach(occ => {
      if (
        occ.name.toLowerCase().includes(searchTerm) ||
        occ.nameEn.toLowerCase().includes(searchTerm) ||
        occ.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'occupation',
          id: occ.id,
          title: occ.name,
          subtitle: `职业 · ${occ.nameEn}`,
          description: occ.description,
          path: `/rulebook/occupations`,
        });
      }
    });

    // 搜索术语表
    data.glossary.forEach(term => {
      if (
        term.term.toLowerCase().includes(searchTerm) ||
        term.full.toLowerCase().includes(searchTerm) ||
        term.zh.toLowerCase().includes(searchTerm) ||
        term.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'glossary',
          id: term.term,
          title: term.term,
          subtitle: `术语 · ${term.full}`,
          description: term.description,
          path: `/rulebook/rules`,
        });
      }
    });

    return results;
  }, [data, query]);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      core: '核心',
      combat: '战斗',
      sanity: '理智',
      character: '角色',
    };
    return labels[category] || category;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      rule: '▣',
      skill: '◐',
      attribute: '◈',
      occupation: '◫',
      glossary: '◉',
    };
    return icons[type] || '◈';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      rule: 'from-slate-500/10 to-gray-500/10 border-slate-500/30',
      skill: 'from-zinc-500/10 to-gray-600/10 border-zinc-500/30',
      attribute: 'from-stone-500/10 to-neutral-500/10 border-stone-500/30',
      occupation: 'from-gray-500/10 to-slate-500/10 border-gray-500/30',
      glossary: 'from-neutral-600/10 to-stone-600/10 border-neutral-600/30',
    };
    return colors[type] || '';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 表单提交时立即触发搜索（支持回车）
    if (searchQuery.trim()) {
      navigate(`/rulebook/search?q=${encodeURIComponent(searchQuery.trim())}`, { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse text-red-900">⌕</div>
          <p className="text-ww-slate-600">加载数据中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠</div>
          <p className="text-ww-slate-600">加载失败: {error.message}</p>
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
        <span className="text-ww-slate-800 font-medium">搜索结果</span>
      </div>

      {/* 搜索框 */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="搜索规则、技能、属性、职业..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 pl-12 glass-strong rounded-xl border border-ww-slate-300/50 
                     focus:outline-none focus:border-red-900/50 focus:shadow-glow-sm
                     text-ww-slate-800 placeholder-ww-slate-400 transition-all duration-300 text-lg"
            autoFocus
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-red-900">⌕</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ww-slate-400 hover:text-ww-slate-600 transition-colors"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* 搜索结果 */}
      {query ? (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ww-slate-800">
              找到 <span className="text-red-900">{searchResults.length}</span> 条结果
            </h2>
            {searchResults.length > 0 && (
              <p className="text-sm text-ww-slate-500">关键词: "{query}"</p>
            )}
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-16 glass rounded-xl border border-ww-slate-300/50">
              <span className="text-6xl mb-4 block text-red-900">⌕</span>
              <p className="text-ww-slate-600 text-lg mb-2">未找到相关结果</p>
              <p className="text-ww-slate-500 text-sm">尝试使用不同的关键词搜索</p>
            </div>
          ) : (
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <Link
                  key={`${result.type}-${result.id}-${index}`}
                  to={result.path}
                  className="group block glass hover:glass-strong rounded-xl p-5 border border-ww-slate-300/50 
                           hover:border-red-900/40 hover:shadow-glow-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* 类型图标 */}
                    <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center
                                  bg-gradient-to-br ${getTypeColor(result.type)} border transition-all duration-300
                                  group-hover:scale-110 group-hover:shadow-glow`}>
                      <span className="text-xl text-red-900">{getTypeIcon(result.type)}</span>
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-ww-slate-800 mb-1 group-hover:text-red-900 transition-colors">
                        {result.title}
                      </h3>
                      {result.subtitle && (
                        <p className="text-xs text-ww-slate-500 mb-2">{result.subtitle}</p>
                      )}
                      <p className="text-sm text-ww-slate-600 line-clamp-2">
                        {result.description}
                      </p>
                    </div>

                    {/* 箭头 */}
                    <div className="flex-shrink-0 text-ww-slate-400 group-hover:text-red-900 group-hover:translate-x-1 transition-all duration-300">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 glass rounded-xl border border-ww-slate-300/50">
          <span className="text-6xl mb-4 block text-red-900">⌕</span>
          <p className="text-ww-slate-600 text-lg mb-2">输入关键词开始搜索</p>
          <p className="text-ww-slate-500 text-sm">可搜索规则、技能、属性、职业等所有内容</p>
        </div>
      )}
    </div>
  );
};
