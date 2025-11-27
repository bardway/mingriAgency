import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCoc7Data } from '@/hooks/useCoc7Data';

/**
 * 技能系统浏览页面
 */
export const SkillsPage: React.FC = () => {
  const { data, loading, error } = useCoc7Data();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // 处理URL参数中的高亮技能
  useEffect(() => {
    const highlightSkillId = searchParams.get('highlight');
    if (highlightSkillId && data) {
      const skill = data.skills.find(s => s.id === highlightSkillId);
      if (skill) {
        setSelectedSkill(highlightSkillId);
        // 清除URL参数
        setTimeout(() => {
          setSearchParams({});
        }, 100);
        // 滚动到选中的技能
        setTimeout(() => {
          const element = document.getElementById(`skill-${highlightSkillId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    }
  }, [searchParams, data, setSearchParams]);

  const filteredSkills = useMemo(() => {
    if (!data) return [];
    
    let skills = data.skills;
    
    // 分类筛选
    if (categoryFilter !== 'all') {
      skills = skills.filter(s => s.category === categoryFilter);
    }
    
    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      skills = skills.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.nameEn.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    }
    
    return skills;
  }, [data, categoryFilter, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">◐</div>
          <p className="text-ww-slate-600">加载技能数据中...</p>
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

  // 过滤掉计数为0的分类
  const categories = data.skillCategories
    .map(cat => ({
      ...cat,
      count: data.skills.filter(s => s.category === cat.id).length
    }))
    .filter(cat => cat.count > 0);

  const selectedSkillData = selectedSkill 
    ? data.skills.find(s => s.id === selectedSkill)
    : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 面包屑导航 */}
      <div className="mb-6 flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">规则库</Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">技能系统</span>
      </div>

      {/* 页面头部 */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-zinc-500/20 to-gray-600/20 
                        border border-zinc-500/40 flex items-center justify-center shadow-glow">
            <span className="text-xl sm:text-2xl">◐</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ww-slate-800">技能系统</h1>
            <p className="text-xs sm:text-sm text-ww-slate-600 mt-1">
              共 {filteredSkills.length} 项技能
            </p>
          </div>
        </div>

        {/* 搜索框 */}
        <input
          type="text"
          placeholder="搜索技能名称或描述..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 sm:px-5 py-2.5 sm:py-3 pl-10 sm:pl-12 glass rounded-xl border border-ww-slate-300/50 
                   focus:outline-none focus:border-ww-orange-500/50 focus:shadow-glow-sm
                   text-sm sm:text-base text-ww-slate-800 placeholder-ww-slate-400 transition-all duration-300 mb-4"
        />

        {/* 分类筛选 - 桌面端按钮 */}
        <div className="hidden lg:flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              categoryFilter === 'all'
                ? 'glass-strong border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
                : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
            }`}
          >
            全部 ({data.skills.length})
          </button>
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
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* 分类筛选 - 移动端下拉列表 */}
        <div className="lg:hidden">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg glass border border-ww-slate-300/50 
                     focus:outline-none focus:border-ww-orange-500/50 focus:shadow-glow-sm
                     text-sm text-ww-slate-800 transition-all duration-300 appearance-none
                     bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%208.5l3%203%203-3%22%20stroke%3D%22%23475569%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] 
                     bg-no-repeat bg-[center_right_1rem]"
          >
            <option value="all">全部技能 ({data.skills.length})</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 技能列表 - 桌面端列表 */}
        <div className="hidden lg:block lg:col-span-1 space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          {filteredSkills.map(skill => (
            <button
              key={skill.id}
              id={`skill-${skill.id}`}
              onClick={() => setSelectedSkill(skill.id)}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300 ${
                selectedSkill === skill.id
                  ? 'glass-strong border border-ww-orange-500/40 shadow-glow-sm'
                  : 'glass border border-ww-slate-300/50 hover:border-ww-orange-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm sm:text-base font-bold text-ww-slate-800">{skill.name}</div>
                  <div className="text-xs text-ww-slate-500 mt-0.5">{skill.nameEn}</div>
                </div>
                <div className="text-xs sm:text-sm font-mono text-ww-orange-600 bg-ww-orange-500/10 px-2 py-1 rounded">
                  {skill.base}%
                </div>
              </div>
            </button>
          ))}
          
          {filteredSkills.length === 0 && (
            <div className="text-center py-12 glass rounded-xl border border-ww-slate-300/50">
              <span className="text-4xl mb-2 block">⌕</span>
              <p className="text-ww-slate-500 text-sm">未找到匹配的技能</p>
            </div>
          )}
        </div>

        {/* 技能列表 - 移动端下拉列表 */}
        <div className="lg:hidden mb-4">
          <select
            value={selectedSkill || ''}
            onChange={(e) => setSelectedSkill(e.target.value || null)}
            className="w-full px-4 py-3 rounded-lg glass border border-ww-slate-300/50 
                     focus:outline-none focus:border-ww-orange-500/50 focus:shadow-glow-sm
                     text-sm text-ww-slate-800 transition-all duration-300 appearance-none
                     bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%208.5l3%203%203-3%22%20stroke%3D%22%23475569%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] 
                     bg-no-repeat bg-[center_right_1rem]"
          >
            <option value="">选择技能...</option>
            {filteredSkills.map(skill => (
              <option key={skill.id} value={skill.id}>
                {skill.name} ({skill.nameEn}) - {skill.base}%
              </option>
            ))}
          </select>
        </div>

        {/* 技能详情 */}
        <div className="lg:col-span-2">
          {selectedSkillData ? (
            <div className="glass rounded-xl border border-ww-slate-300/50 p-6 space-y-6">
              {/* 标题区 */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-ww-slate-800">{selectedSkillData.name}</h2>
                  <span className="text-ww-slate-500">({selectedSkillData.nameEn})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-medium glass border border-ww-slate-300/50">
                    {categories.find(c => c.id === selectedSkillData.category)?.name || selectedSkillData.category}
                  </span>
                  <span className="text-sm font-mono text-ww-orange-600">
                    基础成功率: <span className="font-bold">{selectedSkillData.base}%</span>
                  </span>
                  {selectedSkillData.hasSpecialization && (
                    <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-600 text-xs font-medium">
                      需要专精
                    </span>
                  )}
                </div>
              </div>

              {/* 描述 */}
              <div className="glass-strong rounded-lg p-4 bg-white/40">
                <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                  <span>📝</span>
                  <span>技能说明</span>
                </h3>
                <p className="text-ww-slate-700 leading-relaxed">{selectedSkillData.description}</p>
              </div>

              {/* 使用示例 */}
              {selectedSkillData.examples && selectedSkillData.examples.length > 0 && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-3 flex items-center gap-2">
                    <span>💡</span>
                    <span>使用示例</span>
                  </h3>
                  <ul className="space-y-2">
                    {selectedSkillData.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-ww-slate-700">
                        <span className="text-ww-orange-500 mt-0.5">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 专精选项 */}
              {selectedSkillData.hasSpecialization && selectedSkillData.specializations && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-3 flex items-center gap-2">
                    <span>🎨</span>
                    <span>专精选项</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkillData.specializations.map((spec, idx) => (
                      <span key={idx} className="px-3 py-1.5 glass rounded-lg text-sm text-ww-slate-700 border border-ww-slate-300/50">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 特殊效果 */}
              {selectedSkillData.effect && (
                <div className="glass-strong rounded-lg p-4 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/30">
                  <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                    <span>⚡</span>
                    <span>特殊效果</span>
                  </h3>
                  <p className="text-ww-slate-700">{selectedSkillData.effect}</p>
                </div>
              )}

              {/* 来源 */}
              {selectedSkillData.source && (
                <div className="flex items-center gap-2 text-xs text-ww-slate-500 pt-4 border-t border-ww-slate-300/30">
                  <span>▣</span>
                  <span>来源: {selectedSkillData.source.book}</span>
                  {selectedSkillData.source.pages && <span>P.{selectedSkillData.source.pages}</span>}
                </div>
              )}
            </div>
          ) : (
            <div className="glass rounded-xl border border-ww-slate-300/50 p-12 text-center">
              <span className="text-6xl mb-4 block">◐</span>
              <p className="text-ww-slate-500">从左侧列表选择一个技能查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
