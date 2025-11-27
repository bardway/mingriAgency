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
    description: '开始跑团会话，管理场景和投骰',
    icon: '⬢',
    color: 'ww-orange'
  },
  {
    path: '/kp/characters',
    label: '角色库',
    description: '管理玩家角色卡和NPC',
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
          跑团会话管理工具，帮助你更好地引导玩家探索克苏鲁的世界
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

      {/* 功能介绍 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">📊</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">实时数据追踪</h4>
          <p className="text-ww-slate-600 text-sm">
            追踪玩家角色状态、理智值、生命值等关键数据
          </p>
        </div>
        
        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">🎲</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">投骰管理</h4>
          <p className="text-ww-slate-600 text-sm">
            支持各种COC规则投骰，自动计算成功等级
          </p>
        </div>

        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">📝</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">会话记录</h4>
          <p className="text-ww-slate-600 text-sm">
            自动保存跑团记录，方便回顾和整理
          </p>
        </div>
      </div>
    </div>
  );
};
