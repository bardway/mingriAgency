import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Westworld 科幻风格按钮组件 - 增强立体感
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ww-light-200 relative overflow-hidden btn-3d touch-manipulation';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 text-white font-semibold [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] hover:from-ww-orange-600 hover:to-ww-amber-600 focus:ring-ww-orange-500 shimmer-effect disabled:from-ww-slate-300 disabled:to-ww-slate-400 disabled:text-ww-slate-500 disabled:[text-shadow:none]',
    secondary: 'glass text-ww-slate-800 font-semibold hover:bg-ww-slate-200/60 hover:text-ww-slate-900 focus:ring-ww-orange-400 border border-ww-slate-300/60 hover:border-ww-orange-400/60 glow-highlight disabled:bg-ww-light-100 disabled:text-ww-slate-400',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] hover:from-red-600 hover:to-pink-600 focus:ring-red-500 disabled:from-ww-slate-300 disabled:to-ww-slate-400 disabled:text-ww-slate-500',
    ghost: 'bg-transparent text-ww-slate-800 font-semibold hover:bg-ww-slate-200/50 hover:text-ww-slate-900 focus:ring-ww-orange-400 border border-transparent hover:border-ww-slate-300/50 disabled:text-ww-slate-400',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 sm:px-5 py-2.5 text-sm sm:text-base min-h-[40px] sm:min-h-[44px]',
    lg: 'px-5 sm:px-6 py-3 text-base sm:text-lg min-h-[44px] sm:min-h-[48px]',
  };
  
  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'cursor-not-allowed opacity-60',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
