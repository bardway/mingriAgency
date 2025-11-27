/**
 * 场景节点组件
 */

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { SceneNodeData } from '@/types/module-designer';
import clsx from 'clsx';

interface SceneNodeProps {
  data: SceneNodeData;
  selected?: boolean;
}

export const SceneNode: React.FC<SceneNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={clsx(
        'px-4 py-3 rounded-lg border-2 bg-white shadow-lg min-w-[200px] max-w-[300px]',
        'transition-all duration-200',
        selected 
          ? 'border-blue-500 shadow-xl ring-2 ring-blue-200' 
          : 'border-blue-300 hover:border-blue-400'
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-blue-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📍</span>
        <h3 className="font-bold text-sm text-gray-800">{data.name || '未命名场景'}</h3>
      </div>
      
      {data.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {data.description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-1 text-xs">
        {data.involvedNPCs.length > 0 && (
          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded">
            {data.involvedNPCs.length} NPC
          </span>
        )}
        {data.relatedClues.length > 0 && (
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
            {data.relatedClues.length} 线索
          </span>
        )}
        {data.checks.length > 0 && (
          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">
            {data.checks.length} 检定
          </span>
        )}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-500" />
    </div>
  );
};
