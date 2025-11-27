/**
 * 选择节点组件
 */

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { ChoiceNodeData } from '@/types/module-designer';
import clsx from 'clsx';

interface ChoiceNodeProps {
  data: ChoiceNodeData;
  selected?: boolean;
}

export const ChoiceNode: React.FC<ChoiceNodeProps> = ({ data, selected }) => {
  return (
    <div
      className={clsx(
        'px-4 py-3 rounded-lg border-2 bg-white shadow-lg min-w-[200px] max-w-[300px]',
        'transition-all duration-200',
        selected 
          ? 'border-yellow-500 shadow-xl ring-2 ring-yellow-200' 
          : 'border-yellow-300 hover:border-yellow-400'
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-yellow-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🔀</span>
        <h3 className="font-bold text-sm text-gray-800">{data.name || '未命名选择'}</h3>
      </div>
      
      {data.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {data.description}
        </p>
      )}
      
      <div className="text-xs">
        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">
          {data.choices.length} 个选项
        </span>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-yellow-500" />
    </div>
  );
};
