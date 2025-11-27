import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

// KP中控台菜单
const kpNavItems: NavItem[] = [
  { path: '/kp', label: '概览', icon: '◫' },
  { path: '/kp/session', label: 'KP 中控台', icon: '⬢' },
  { path: '/kp/characters', label: '角色库', icon: '◉' },
];

// 模组创建菜单
const designerNavItems: NavItem[] = [
  { path: '/designer', label: '概览', icon: '◫' },
  { path: '/designer/module', label: '模组设计器', icon: '📝' },
];

// 规则库菜单
const rulebookNavItems: NavItem[] = [
  { path: '/rulebook', label: '规则索引', icon: '◫' },
  { path: '/rulebook/search', label: '搜索', icon: '🔍' },
  { path: '/rulebook/rules', label: '规则', icon: '📖' },
  { path: '/rulebook/skills', label: '技能', icon: '⚡' },
  { path: '/rulebook/attributes', label: '属性', icon: '💪' },
  { path: '/rulebook/occupations', label: '职业', icon: '👔' },
  { path: '/rulebook/combat', label: '战斗', icon: '⚔️' },
  { path: '/rulebook/sanity', label: '理智', icon: '🧠' },
  { path: '/rulebook/equipment', label: '装备', icon: '🎒' },
];

interface ModuleLayoutProps {
  children: React.ReactNode;
  module: 'kp' | 'designer' | 'rulebook';
  title: string;
}

/**
 * 模块布局组件 - 为三个大模块提供统一的布局结构
 */
export const ModuleLayout: React.FC<ModuleLayoutProps> = ({ children, module, title }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // 根据模块选择对应的菜单
  const navItems = module === 'kp' 
    ? kpNavItems 
    : module === 'designer' 
    ? designerNavItems 
    : rulebookNavItems;

  // 模块主题色
  const moduleTheme = {
    kp: {
      gradient: 'from-ww-orange-500 to-ww-amber-500',
      iconBg: 'from-ww-orange-500/15 to-ww-amber-500/15',
      border: 'border-ww-orange-500/30',
      icon: '⬢'
    },
    designer: {
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'from-blue-500/15 to-cyan-500/15',
      border: 'border-blue-500/30',
      icon: '📝'
    },
    rulebook: {
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'from-purple-500/15 to-pink-500/15',
      border: 'border-purple-500/30',
      icon: '📚'
    }
  }[module];

  return (
    <div className="flex h-screen bg-ww-light-200 text-ww-slate-700 scanlines">
      {/* 移动端顶部导航栏 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-strong border-b border-ww-slate-300/50 shadow-xl">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center shadow-glow',
                `bg-gradient-to-br ${moduleTheme.iconBg} border ${moduleTheme.border}`
              )}>
                <span className="text-xl">{moduleTheme.icon}</span>
              </div>
              <h1 className={clsx(
                'text-lg font-bold bg-clip-text text-transparent tracking-wide',
                `bg-gradient-to-r ${moduleTheme.gradient}`
              )}>
                {title}
              </h1>
            </Link>
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
        'fixed inset-y-0 left-0 max-lg:z-50',
        'lg:relative lg:translate-x-0',
        isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
      )}>
        {/* 顶部发光线 */}
        <div className={clsx(
          'absolute top-0 left-0 right-0 h-px',
          `bg-gradient-to-r from-transparent via-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500/40 to-transparent`
        )}></div>
        
        {/* Logo */}
        <div className="p-6 border-b border-ww-slate-300/50 relative hidden lg:block glossy-surface">
          <Link to="/" className="flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity">
            <div className={clsx(
              'w-10 h-10 rounded-lg flex items-center justify-center edge-glow',
              `bg-gradient-to-br ${moduleTheme.iconBg} border ${moduleTheme.border}`
            )}>
              <span className="text-2xl">{moduleTheme.icon}</span>
            </div>
            <div>
              <h1 className={clsx(
                'text-xl font-bold bg-clip-text text-transparent tracking-wide',
                `bg-gradient-to-r ${moduleTheme.gradient}`
              )}>
                {title}
              </h1>              
            </div>
          </Link>
          {/* 返回主页按钮 */}
          <Link 
            to="/" 
            className="text-sm text-ww-slate-500 hover:text-ww-slate-700 flex items-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回主页
          </Link>
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
                    ? `frosted-glass text-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500 edge-glow border border-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500/40 font-semibold depth-layer-2`
                    : 'text-ww-slate-600 hover:text-ww-slate-800 hover:bg-ww-slate-200/50 glow-highlight'
                )}
              >
                {/* 激活指示器 */}
                {isActive && (
                  <span className={clsx(
                    'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full shadow-glow',
                    `bg-gradient-to-b ${moduleTheme.gradient}`
                  )}></span>
                )}
                
                {/* 图标容器 */}
                <span className={clsx(
                  'text-xl transition-transform duration-300',
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                )}>
                  {item.icon}
                </span>
                
                {/* 标签 */}
                <span className="font-medium tracking-wide">{item.label}</span>
                
                {/* hover 发光效果 */}
                {!isActive && (
                  <span className={clsx(
                    'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    `bg-gradient-to-r from-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500/0 via-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500/5 to-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500/0`
                  )}></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 底部分隔线 */}
        <div className={clsx(
          'absolute bottom-0 left-0 right-0 h-px',
          `bg-gradient-to-r from-transparent via-${module === 'kp' ? 'ww-orange' : module === 'designer' ? 'blue' : 'purple'}-500/40 to-transparent`
        )}></div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-20 lg:pt-8">
        {children}
      </main>
    </div>
  );
};
