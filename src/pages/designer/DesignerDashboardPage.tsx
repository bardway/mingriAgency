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
          可视化模组设计平台，轻松创建精彩的克苏鲁故事
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
              创建或编辑模组剧情、场景和NPC
            </p>
          </div>
          <svg className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 功能介绍 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">🌳</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">故事流程图</h4>
          <p className="text-ww-slate-600 text-sm">
            可视化设计剧情分支和场景连接
          </p>
        </div>
        
        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">🎭</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">场景编辑器</h4>
          <p className="text-ww-slate-600 text-sm">
            创建场景描述、线索和互动元素
          </p>
        </div>

        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">👥</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">NPC管理</h4>
          <p className="text-ww-slate-600 text-sm">
            管理NPC信息、关系和行为模式
          </p>
        </div>

        <div className="p-6 rounded-xl frosted-glass border border-ww-slate-300/50">
          <div className="text-3xl mb-3">🔀</div>
          <h4 className="text-lg font-bold text-ww-slate-800 mb-2">条件分支</h4>
          <p className="text-ww-slate-600 text-sm">
            设置基于技能、线索的剧情分支
          </p>
        </div>
      </div>

      {/* 提示 */}
      <div className="mt-8 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <h4 className="text-lg font-bold text-blue-700 mb-2 flex items-center gap-2">
          <span>💡</span>
          <span>设计提示</span>
        </h4>
        <ul className="text-ww-slate-600 text-sm space-y-1 ml-8">
          <li>• 从核心场景开始，逐步构建剧情网络</li>
          <li>• 为关键NPC设置详细的背景和动机</li>
          <li>• 设计多个结局，增加重玩价值</li>
          <li>• 合理分配线索，避免玩家卡关</li>
        </ul>
      </div>
    </div>
  );
};
