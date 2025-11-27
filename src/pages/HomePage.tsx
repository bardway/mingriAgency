import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  bgGradient: string;
  iconBg: string;
}

const modules: ModuleCard[] = [
  {
    id: 'kp-console',
    title: 'KP 中控台',
    description: '跑团会话管理、角色库、实时数据追踪',
    icon: '⬢',
    path: '/kp',
    bgGradient: 'from-ww-orange-500/10 to-ww-amber-500/10',
    iconBg: 'from-ww-orange-500/20 to-ww-amber-500/20'
  },
  {
    id: 'module-designer',
    title: '模组创建',
    description: '剧情设计、场景编辑、NPC管理、故事流程',
    icon: '📝',
    path: '/designer',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    iconBg: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'rulebook',
    title: '规则库',
    description: 'COC7版规则、技能、属性、装备查询',
    icon: '📚',
    path: '/rulebook',
    bgGradient: 'from-purple-500/10 to-pink-500/10',
    iconBg: 'from-purple-500/20 to-pink-500/20'
  }
];

/**
 * 主入口页面 - 模块选择
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ww-light-200 flex flex-col items-center justify-center p-4 scanlines">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ww-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ww-orange-500/15 to-ww-amber-500/15 border border-ww-orange-500/30 flex items-center justify-center shadow-glow">
              <span className="text-4xl text-red-900">◉</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 bg-clip-text text-transparent tracking-wide">
              明日调查局
            </h1>
          </div>
          <p className="text-ww-slate-600 text-lg">
            -- 跑团工具套件 --
          </p>
        </div>

        {/* 模块卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => navigate(module.path)}
              className={clsx(
                'group relative p-8 rounded-2xl transition-all duration-300',
                'frosted-glass border border-ww-slate-300/50',
                'hover:scale-105 hover:shadow-2xl hover:border-ww-orange-500/40',
                'depth-layer-1 glow-highlight',
                'text-left overflow-hidden'
              )}
            >
              {/* 背景渐变 */}
              <div className={clsx(
                'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                module.bgGradient
              )}></div>

              {/* 内容 */}
              <div className="relative z-10">
                {/* 图标 */}
                <div className={clsx(
                  'w-16 h-16 rounded-xl mb-6',
                  'bg-gradient-to-br border border-ww-slate-300/50',
                  'flex items-center justify-center',
                  'group-hover:scale-110 transition-transform duration-300',
                  'shadow-lg',
                  module.iconBg
                )}>
                  <span className="text-3xl">{module.icon}</span>
                </div>

                {/* 标题 */}
                <h2 className="text-2xl font-bold text-ww-slate-800 mb-3 group-hover:text-ww-orange-500 transition-colors">
                  {module.title}
                </h2>

                {/* 描述 */}
                <p className="text-ww-slate-600 leading-relaxed">
                  {module.description}
                </p>

                {/* 箭头指示 */}
                <div className="mt-6 flex items-center gap-2 text-ww-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">进入模块</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* 发光边框效果 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ww-orange-500/0 via-ww-orange-500/20 to-ww-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </button>
          ))}
        </div>

        {/* 底部信息 */}
        <div className="mt-16 text-center">
          <p className="text-ww-slate-400 text-xs">
            v1.0.0 · 穿山
          </p>
        </div>
      </div>
    </div>
  );
};
