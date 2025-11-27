import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface QuickAction {
  path: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    path: '/kp/session',
    label: 'KP 中控台',
    description: '跑团会话、场景管理',
    icon: '⬢',
    color: 'ww-orange'
  },
  {
    path: '/kp/characters',
    label: '角色库',
    description: '角色卡和NPC管理',
    icon: '◉',
    color: 'blue'
  }
];

/**
 * KP中控台概览页面
 */
export const KPDashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ww-slate-800 mb-2">KP 中控台</h1>
        <p className="text-ww-slate-600">
          跑团会话管理，引导玩家探索克苏鲁世界
        </p>
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className={clsx(
              'group p-6 rounded-xl transition-all duration-300',
              'frosted-glass border border-ww-slate-300/50',
              'hover:scale-105 hover:shadow-xl',
              'depth-layer-1 glow-highlight'
            )}
          >
            <div className="flex items-start gap-4">
              <div className={clsx(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                'bg-gradient-to-br from-ww-orange-500/15 to-ww-amber-500/15',
                'border border-ww-orange-500/30 shadow-lg',
                'group-hover:scale-110 transition-transform'
              )}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-ww-slate-800 mb-1 group-hover:text-ww-orange-500 transition-colors">
                  {action.label}
                </h3>
                <p className="text-ww-slate-600 text-sm">
                  {action.description}
                </p>
              </div>
              <svg className="w-5 h-5 text-ww-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* 功能说明 */}
      <div className="mt-6 p-4 rounded-lg bg-ww-slate-100/50 border border-ww-slate-200/50">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ww-slate-600">
          <div className="flex items-center gap-2">
            <span className="opacity-50">📊</span>
            <span>实时数据追踪</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">🎲</span>
            <span>投骰管理</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">📝</span>
            <span>会话记录</span>
          </div>
        </div>
      </div>
    </div>
  );
};
