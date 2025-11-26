import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RuleCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  path: string;
  color: string;
}

const categories: RuleCategory[] = [
  {
    id: 'rules',
    title: '核心规则',
    icon: '📋',
    description: '检定、对抗、成长等基础规则',
    path: '/rulebook/rules',
    color: 'from-slate-500/15 to-gray-500/15 border-slate-500/30'
  },
  {
    id: 'attributes',
    title: '角色属性',
    icon: '⭐',
    description: 'STR、CON等基础与派生属性',
    path: '/rulebook/attributes',
    color: 'from-stone-500/15 to-neutral-500/15 border-stone-500/30'
  },
  {
    id: 'skills',
    title: '技能系统',
    icon: '🎯',
    description: '47项技能详细说明',
    path: '/rulebook/skills',
    color: 'from-zinc-500/15 to-gray-600/15 border-zinc-500/30'
  },
  {
    id: 'skills-full',
    title: '技能详查',
    icon: '📖',
    description: '110项完整技能数据',
    path: '/rulebook/skills-full',
    color: 'from-blue-500/15 to-indigo-500/15 border-blue-500/30'
  },
  {
    id: 'equipment',
    title: '装备系统',
    icon: '⚔️',
    description: '武器、防具、载具资料库',
    path: '/rulebook/equipment',
    color: 'from-amber-500/15 to-orange-500/15 border-amber-500/30'
  },
  {
    id: 'combat',
    title: '战斗规则',
    icon: '⚡',
    description: '战斗回合、伤害、武器数据',
    path: '/rulebook/combat',
    color: 'from-slate-600/15 to-gray-700/15 border-slate-600/30'
  },
  {
    id: 'sanity',
    title: '理智系统',
    icon: '🧠',
    description: '理智检定、疯狂症状',
    path: '/rulebook/sanity',
    color: 'from-neutral-600/15 to-stone-600/15 border-neutral-600/30'
  },
  {
    id: 'occupations',
    title: '职业速查',
    icon: '👔',
    description: '职业技能与配置',
    path: '/rulebook/occupations',
    color: 'from-gray-500/15 to-slate-500/15 border-gray-500/30'
  }
];

/**
 * 规则库主页 - 卡片式导航
 */
export const RulebookIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 只在提交表单（回车）时跳转
    if (searchQuery.trim()) {
      navigate(`/rulebook/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 页面头部 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ww-slate-500/20 to-ww-slate-600/20 border border-ww-slate-500/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">COC7 规则库</h1>
            <p className="text-sm text-ww-slate-600 mt-1">快速查阅克苏鲁的呼唤第七版规则</p>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="relative mt-6">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="搜索规则库内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 pl-12 glass rounded-xl border border-ww-slate-300/50 
                       focus:outline-none focus:border-red-900/50 focus:shadow-glow-sm
                       text-ww-slate-800 placeholder-ww-slate-400 transition-all duration-300"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
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
      </div>

      {/* 分类卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="group glass hover:glass-strong rounded-xl p-6 border border-ww-slate-300/50 
                     hover:border-ww-orange-500/40 hover:shadow-glow-md transition-all duration-300
                     relative overflow-hidden"
          >
            {/* 背景渐变 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* 内容 */}
            <div className="relative z-10">
              {/* 图标 */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} 
                            border flex items-center justify-center mb-4 
                            group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{category.icon}</span>
              </div>
              
              {/* 标题 */}
              <h3 className="text-xl font-bold text-ww-slate-800 mb-2 
                           group-hover:text-ww-orange-600 transition-colors">
                {category.title}
              </h3>
              
              {/* 描述 */}
              <p className="text-sm text-ww-slate-600 leading-relaxed">
                {category.description}
              </p>

              {/* 箭头图标 */}
              <div className="mt-4 flex items-center gap-2 text-ww-orange-500 font-medium text-sm
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>查看详情</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 底部提示 */}
      <div className="mt-12 glass rounded-xl p-6 border border-ww-slate-300/50">
        <div className="flex items-start gap-4">
          <span className="text-3xl">💡</span>
          <div>
            <h4 className="font-bold text-ww-slate-800 mb-2">快速提示</h4>
            <ul className="text-sm text-ww-slate-600 space-y-1">
              <li>• 点击任意分类卡片进入详细规则查询</li>
              <li>• 使用搜索功能快速定位所需规则</li>
              <li>• 数据来源: COC7守秘人规则书 & 调查员手册</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
