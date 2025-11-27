/**
 * 结局节点组件
 */

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import type { EndingNodeData } from '@/types/module-designer';
import clsx from 'clsx';

interface EndingNodeProps {
  data: EndingNodeData;
  selected?: boolean;
}

export const EndingNode: React.FC<EndingNodeProps> = ({ data, selected }) => {
  const typeColors = {
    success: 'border-green-400 bg-green-50',
    partial: 'border-blue-400 bg-blue-50',
    failure: 'border-orange-400 bg-orange-50',
    tpk: 'border-red-400 bg-red-50',
  };

  const typeLabels = {
    success: '成功',
    partial: '部分成功',
    failure: '失败',
    tpk: '团灭',
  };

  return (
    <div
      className={clsx(
        'px-4 py-3 rounded-lg border-2 shadow-lg min-w-[200px] max-w-[300px]',
        'transition-all duration-200',
        selected 
          ? 'shadow-xl ring-2 ring-green-200' 
          : 'hover:shadow-2xl',
        typeColors[data.endingType]
      )}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-green-500" />
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🏁</span>
        <h3 className="font-bold text-sm text-gray-800">{data.name || '未命名结局'}</h3>
      </div>
      
      {data.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {data.description}
        </p>
      )}
      
      <div className="text-xs">
        <span className={clsx('px-2 py-0.5 rounded font-medium', {
          'bg-green-100 text-green-700': data.endingType === 'success',
          'bg-blue-100 text-blue-700': data.endingType === 'partial',
          'bg-orange-100 text-orange-700': data.endingType === 'failure',
          'bg-red-100 text-red-700': data.endingType === 'tpk',
        })}>
          {typeLabels[data.endingType]}
        </span>
      </div>
    </div>
  );
};
