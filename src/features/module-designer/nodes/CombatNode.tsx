/**
 * 战斗节点组件
 */

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { CombatNodeData } from '@/types/module-designer';
import clsx from 'clsx';

interface CombatNodeProps {
  data: CombatNodeData;
  selected?: boolean;
}

export const CombatNode: React.FC<CombatNodeProps> = ({ data, selected }) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    normal: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-orange-100 text-orange-700',
    deadly: 'bg-red-100 text-red-700',
  };

  return (
    <div
      className={clsx(
        'px-4 py-3 rounded-lg border-2 bg-white shadow-lg min-w-[200px] max-w-[300px]',
        'transition-all duration-200',
        selected 
          ? 'border-red-500 shadow-xl ring-2 ring-red-200' 
          : 'border-red-300 hover:border-red-400'
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-red-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">⚔️</span>
        <h3 className="font-bold text-sm text-gray-800">{data.name || '未命名战斗'}</h3>
      </div>
      
      {data.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {data.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-1 text-xs mb-2">
        <span className={clsx('px-2 py-0.5 rounded', difficultyColors[data.difficulty])}>
          {data.difficulty === 'easy' ? '简单' : 
           data.difficulty === 'normal' ? '普通' : 
           data.difficulty === 'hard' ? '困难' : '致命'}
        </span>
        {data.enemies.length > 0 && (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">
            {data.enemies.reduce((sum, e) => sum + e.count, 0)} 敌人
          </span>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-red-500" />
    </div>
  );
};
