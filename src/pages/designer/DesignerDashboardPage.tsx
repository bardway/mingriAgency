import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/**
 * 模组创建概览页面
 */
export const DesignerDashboardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ww-slate-800 mb-2">模组创建工具</h1>
        <p className="text-ww-slate-600">
          可视化模组设计，创建克苏鲁故事
        </p>
      </div>

      {/* 快速操作 */}
      <div className="mb-8">
        <Link
          to="/designer/module"
          className={clsx(
            'group inline-flex items-center gap-4 p-6 rounded-xl transition-all duration-300',
            'frosted-glass border border-ww-slate-300/50',
            'hover:scale-105 hover:shadow-xl',
            'depth-layer-1 glow-highlight'
          )}
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-blue-500/30 shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-ww-slate-800 mb-1 group-hover:text-blue-500 transition-colors">
              进入模组设计器
            </h3>
            <p className="text-ww-slate-600 text-sm">
              创建模组、场景和NPC
            </p>
          </div>
          <svg className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 功能说明 */}
      <div className="mt-6 p-4 rounded-lg bg-ww-slate-100/50 border border-ww-slate-200/50">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ww-slate-600">
          <div className="flex items-center gap-2">
            <span className="opacity-50">�</span>
            <span>故事流程图</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">🎭</span>
            <span>场景编辑器</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">�</span>
            <span>NPC管理</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">🔀</span>
            <span>条件分支</span>
          </div>
        </div>
      </div>
    </div>
  );
};
