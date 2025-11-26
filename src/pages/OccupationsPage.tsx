import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import type { OccupationFull } from '@/types/equipment';

export const OccupationsPage: React.FC = () => {
  const [occupations, setOccupations] = useState<OccupationFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOccupation, setSelectedOccupation] = useState<OccupationFull | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/occupations-full.json');
        const data = await response.json();
        setOccupations(data);
        setLoading(false);
      } catch (error) {
        console.error('加载职业数据失败:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-ww-slate-600">加载中...</p>
      </div>
    );
  }

  // 搜索过滤
  const filteredOccupations = occupations.filter(occ =>
    occ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">
          📚 规则库
        </Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">👔 职业速查</span>
      </div>

      {/* 标题区域 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-slate-500/20 border border-gray-500/40 flex items-center justify-center edge-glow">
            <span className="text-2xl">👔</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">职业速查</h1>
            <p className="text-sm text-ww-slate-600 mt-1">共 {occupations.length} 种职业</p>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索职业..."
            className="w-full px-4 py-2 rounded-lg glass border border-ww-slate-300/50 focus:border-ww-orange-500/40 outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 职业列表 */}
        <div className="space-y-2 h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ww-slate-300 scrollbar-track-transparent">
          {filteredOccupations.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setSelectedOccupation(occ)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedOccupation?.id === occ.id
                  ? 'frosted-glass border border-ww-orange-500/40 shadow-glow-sm depth-layer-2'
                  : 'glass border border-ww-slate-300/50 hover:border-ww-orange-500/30 glow-highlight'
              }`}
            >
              <div className="font-bold text-ww-slate-800">{occ.name}</div>
              <div className="text-xs text-ww-orange-600 mt-1">
                信用评级: {occ.creditRating}
              </div>
            </button>
          ))}
        </div>

        {/* 详情面板 */}
        <div className="lg:col-span-2 h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ww-slate-300 scrollbar-track-transparent">
          {selectedOccupation ? (
            <Card className="p-6 space-y-6">
              {/* 职业标题 */}
              <div>
                <h2 className="text-2xl font-bold text-ww-slate-800 mb-2">
                  {selectedOccupation.name}
                </h2>
                <div className="inline-block px-3 py-1 rounded-full glass-strong border border-ww-orange-500/30 text-sm text-ww-orange-600">
                  信用评级: {selectedOccupation.creditRating}
                </div>
              </div>

              {/* 职业属性 */}
              {selectedOccupation.occupationalAttributes && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                    <span>⚡</span>
                    <span>职业属性</span>
                  </h3>
                  <p className="text-sm text-ww-slate-700">
                    {selectedOccupation.occupationalAttributes}
                  </p>
                </div>
              )}

              {/* 本职技能 */}
              <div className="glass-strong rounded-lg p-4 bg-white/40">
                <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                  <span>🎯</span>
                  <span>本职技能</span>
                </h3>
                <p className="text-sm text-ww-slate-700 leading-relaxed">
                  {selectedOccupation.occupationalSkills}
                </p>
              </div>

              {/* 关系人 */}
              {selectedOccupation.contacts && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                    <span>👥</span>
                    <span>推荐关系人</span>
                  </h3>
                  <p className="text-sm text-ww-slate-700">
                    {selectedOccupation.contacts}
                  </p>
                </div>
              )}

              {/* 职业介绍 */}
              {selectedOccupation.description && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                    <span>📖</span>
                    <span>职业介绍</span>
                  </h3>
                  <p className="text-sm text-ww-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedOccupation.description}
                  </p>
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <span className="text-6xl mb-4 block">👔</span>
              <p className="text-ww-slate-500">从左侧列表选择一个职业查看详情</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
