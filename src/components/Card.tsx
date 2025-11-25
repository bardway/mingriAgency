import React from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Westworld 科幻风格卡片组件 - 玻璃态设计
 */
export const Card: React.FC<CardProps> = ({
  title,
  className,
  children,
  actions,
}) => {
  return (
    <div className={clsx('data-panel rounded-xl overflow-hidden shadow-lg', className)}>
      {title && (
        <div className="px-6 py-4 border-b border-ww-slate-300/40 flex justify-between items-center bg-gradient-to-r from-ww-light-100 to-ww-light-50">
          <h3 className="text-lg font-semibold text-ww-slate-800 tracking-wide flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></span>
            {title}
          </h3>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
