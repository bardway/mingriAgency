import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Westworld 科幻风格按钮组件
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ww-light-200 relative overflow-hidden cyber-button';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 text-white font-semibold [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] hover:from-ww-orange-600 hover:to-ww-amber-600 focus:ring-ww-orange-500 shadow-md hover:shadow-glow disabled:from-ww-slate-300 disabled:to-ww-slate-400 disabled:text-ww-slate-500 disabled:[text-shadow:none]',
    secondary: 'glass text-ww-slate-800 font-semibold hover:bg-ww-slate-200/60 hover:text-ww-slate-900 focus:ring-ww-orange-400 border border-ww-slate-300/60 hover:border-ww-orange-400/60 disabled:bg-ww-light-100 disabled:text-ww-slate-400',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)] hover:from-red-600 hover:to-pink-600 focus:ring-red-500 shadow-md disabled:from-ww-slate-300 disabled:to-ww-slate-400 disabled:text-ww-slate-500',
    ghost: 'bg-transparent text-ww-slate-800 font-semibold hover:bg-ww-slate-200/50 hover:text-ww-slate-900 focus:ring-ww-orange-400 border border-transparent hover:border-ww-slate-300/50 disabled:text-ww-slate-400',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
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
