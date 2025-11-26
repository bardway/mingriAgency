import React from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Westworld 科幻风格卡片组件 - 增强玻璃态和立体感
 */
export const Card: React.FC<CardProps> = ({
  title,
  className,
  children,
  actions,
}) => {
  return (
    <div className={clsx('data-panel frosted-glass rounded-xl overflow-hidden card-elevated', className)}>
      {title && (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-ww-slate-300/40 flex justify-between items-center glossy-surface relative">
          <h3 className="text-base sm:text-lg font-semibold text-ww-slate-800 tracking-wide flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-sm"></span>
            {title}
          </h3>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-4 sm:p-6 relative">
        {children}
      </div>
    </div>
  );
};
