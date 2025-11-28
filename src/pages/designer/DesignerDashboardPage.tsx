import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Copyright } from '@/components/Copyright';

/**
 * 模组创建概览页面
 */
export const DesignerDashboardPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 1024;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // 如果是移动设备，显示提示页面
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="glass rounded-2xl p-8 border border-ww-slate-300/50 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-900/15 to-rose-800/15 border border-rose-900/30 flex items-center justify-center">
              <span className="text-5xl">🖥️</span>
            </div>
            <h2 className="text-2xl font-bold text-ww-slate-800 mb-4">
              仅支持桌面端访问
            </h2>
            <p className="text-ww-slate-600 mb-6 leading-relaxed">
              模组创建工具需要较大的屏幕空间进行可视化编辑。
              <br />
              <br />
              请使用<strong className="text-rose-800">电脑浏览器</strong>访问此功能。
            </p>
            <div className="text-sm text-ww-slate-500 space-y-2">
              <p>💡 建议屏幕宽度：≥ 1024px</p>
              <p>💻 推荐设备：台式机、笔记本电脑</p>
            </div>
            <div className="mt-8">
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ww-slate-800">模组创建工具</h1>
      </div>

      {/* 快速操作 */}
      <div className="mb-8">
        <Link
          to="/designer/module"
          className={clsx(
            'group inline-flex items-center gap-4 p-6 rounded-xl transition-all duration-300',
            'frosted-glass border border-ww-slate-300/50',
            'hover:scale-105 hover:shadow-xl',
            'depth-layer-1 glow-highlight'
          )}
        >
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-rose-900/10 to-rose-800/10 border border-rose-900/25 shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-2xl">📝</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-ww-slate-800 mb-1 group-hover:text-rose-800 transition-colors">
              进入模组设计器
            </h3>
            <p className="text-ww-slate-600 text-sm">
              创建模组、场景和NPC
            </p>
          </div>
          <svg className="w-5 h-5 text-rose-800 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 版权信息 */}
      <Copyright />
    </div>
  );
};
