import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

// 主要功能菜单
const navItems: NavItem[] = [
  { path: '/', label: '概览', icon: '◫' },
  { path: '/session', label: 'KP 中控台', icon: '⬢' },
  { path: '/characters', label: '角色库', icon: '◉' },
  { path: '/campaigns', label: '团/模组', icon: '▣' },
  { path: '/scenes', label: '场景/线索', icon: '◈' },
  { path: '/settings', label: '设置', icon: '⚙' },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Westworld 风格应用主布局
 * 银灰科幻、玻璃态、立体感设计
 * 响应式设计，支持移动端
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-ww-light-200 text-ww-slate-700 scanlines">
      {/* 移动端顶部导航栏 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-strong border-b border-ww-slate-300/50 shadow-xl">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ww-orange-500/15 to-ww-amber-500/15 border border-ww-orange-500/30 flex items-center justify-center shadow-glow">
              <span className="text-xl text-red-900">◉</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 bg-clip-text text-transparent tracking-wide">
              明日调查局
            </h1>
          </div>
          
          {/* 汉堡菜单按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-ww-slate-200/50 transition-colors"
            aria-label="菜单"
          >
            <svg
              className="w-6 h-6 text-ww-slate-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 遮罩层 - 移动端菜单打开时 */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 侧边栏 - 玻璃态效果 */}
      <aside className={clsx(
        'w-72 frosted-glass border-r border-ww-slate-300/50 flex flex-col floating-layer z-50 transition-transform duration-300',
        // 移动端: fixed 定位，通过 transform 控制显隐
        // 桌面端: relative 定位,始终显示
        'fixed inset-y-0 left-0 lg:relative lg:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* 顶部发光线 */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ww-orange-500/40 to-transparent"></div>
        
        {/* Logo */}
        <div className="p-6 border-b border-ww-slate-300/50 relative hidden lg:block glossy-surface">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ww-orange-500/15 to-ww-amber-500/15 border border-ww-orange-500/30 flex items-center justify-center edge-glow">
              <span className="text-2xl text-red-900">◉</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 bg-clip-text text-transparent tracking-wide">
                明日调查局
              </h1>              
            </div>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto pt-16 lg:pt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={clsx(
                  'group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden',
                  isActive
                    ? 'frosted-glass text-ww-orange-500 edge-glow border border-ww-orange-500/40 font-semibold depth-layer-2'
                    : 'text-ww-slate-600 hover:text-ww-slate-800 hover:bg-ww-slate-200/50 glow-highlight'
                )}
              >
                {/* 激活指示器 */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-r-full shadow-glow"></span>
                )}
                
                {/* 图标容器 */}
                <span className={clsx(
                  'text-xl text-red-900 transition-transform duration-300',
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                )}>
                  {item.icon}
                </span>
                
                {/* 标签 */}
                <span className="font-medium tracking-wide">{item.label}</span>
                
                {/* hover 发光效果 */}
                {!isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-ww-orange-500/0 via-ww-orange-500/5 to-ww-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 规则库特殊入口 - 独立区域 */}
        <div className="px-4 pb-4">
          <Link
            to="/rulebook"
            onClick={() => setIsMobileMenuOpen(false)}
            className={clsx(
              'group block relative overflow-hidden rounded-xl transition-all duration-300',
              location.pathname.startsWith('/rulebook')
                ? 'floating-layer'
                : 'hover:depth-layer-2'
            )}
          >
            {/* 渐变背景 */}
            <div className={clsx(
              'absolute inset-0 bg-gradient-to-br transition-opacity duration-300',
              location.pathname.startsWith('/rulebook')
                ? 'from-slate-500/20 via-gray-500/20 to-red-900/20 opacity-100'
                : 'from-slate-500/10 via-gray-500/10 to-red-900/10 opacity-70 group-hover:opacity-100'
            )}></div>
            
            {/* 边框和玻璃效果 */}
            <div className={clsx(
              'relative frosted-glass border rounded-xl p-4 transition-all duration-300',
              location.pathname.startsWith('/rulebook')
                ? 'border-red-900/50'
                : 'border-ww-slate-300/50 group-hover:border-red-900/40'
            )}>
              {/* 装饰性顶部线条 */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
              
              <div className="flex items-center gap-3 mb-2">
                {/* 图标 */}
                <div className={clsx(
                  'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                  'bg-gradient-to-br from-gray-500/20 to-red-900/20 border edge-glow',
                  location.pathname.startsWith('/rulebook')
                    ? 'border-red-900/50 scale-110'
                    : 'border-gray-500/30 group-hover:scale-105'
                )}>
                  <span className="text-xl">📚</span>
                </div>
                
                <div className="flex-1">
                  <div className={clsx(
                    'font-bold text-sm tracking-wide transition-colors',
                    location.pathname.startsWith('/rulebook')
                      ? 'text-red-900'
                      : 'text-ww-slate-700 group-hover:text-red-900'
                  )}>
                    COC7 规则库
                  </div>
                  <div className="text-xs text-ww-slate-500">
                    规则速查参考
                  </div>
                </div>
                
                {/* 箭头指示 */}
                <span className={clsx(
                  'text-lg transition-transform duration-300',
                  location.pathname.startsWith('/rulebook')
                    ? 'text-red-900 translate-x-1'
                    : 'text-ww-slate-400 group-hover:translate-x-1 group-hover:text-red-900'
                )}>
                  →
                </span>
              </div>
              
              {/* 底部装饰性发光点 */}
              {location.pathname.startsWith('/rulebook') && (
                <div className="flex gap-1 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-900 pulse-glow"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-900 pulse-glow animation-delay-200"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-900 pulse-glow animation-delay-400"></span>
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* 底部信息 */}
        <div className="p-4 border-t border-ww-slate-300/50 relative glossy-surface">
          <div className="glass rounded-lg px-3 py-2 text-center soft-inset">
            <p className="text-xs text-ww-slate-500 font-mono tracking-wider">
              SYSTEM v0.0.1
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-xs text-ww-slate-600">LEX</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区 - 背景网格 */}
      <main className="flex-1 w-full overflow-auto relative pt-16 lg:pt-0">
        {/* 背景网格效果 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(107,114,128,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(107,114,128,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        
        {/* 内容容器 */}
        <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};
