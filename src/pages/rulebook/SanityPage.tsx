import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import type { InsanitySymptom } from '@/types/equipment';

export const SanityPage: React.FC = () => {
  const [symptoms, setSymptoms] = useState<InsanitySymptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedSymptom, setSelectedSymptom] = useState<InsanitySymptom | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/insanity-symptoms.json');
        const data = await response.json();
        setSymptoms(data);
        setLoading(false);
      } catch (error) {
        console.error('加载疯狂症状数据失败:', error);
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

  const filteredSymptoms = typeFilter === 'all' 
    ? symptoms 
    : symptoms.filter(s => s.type === typeFilter);

  const immediateCount = symptoms.filter(s => s.type === '即时症状').length;
  const prolongedCount = symptoms.filter(s => s.type === '持续性症状').length;

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">
          📚 规则库
        </Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">🧠 理智系统</span>
      </div>

      {/* 标题区域 */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 flex items-center justify-center edge-glow">
          <span className="text-2xl">🧠</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ww-slate-800">理智系统</h1>
          <p className="text-sm text-ww-slate-600 mt-1">疯狂症状速查</p>
        </div>
      </div>

      {/* 分类筛选 */}
      {/* 桌面端：按钮筛选 */}
      <div className="hidden lg:flex gap-2">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            typeFilter === 'all'
              ? 'frosted-glass border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
              : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
          }`}
        >
          全部 ({symptoms.length})
        </button>
        <button
          onClick={() => setTypeFilter('即时症状')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            typeFilter === '即时症状'
              ? 'frosted-glass border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
              : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
          }`}
        >
          ⚡ 即时症状 ({immediateCount})
        </button>
        <button
          onClick={() => setTypeFilter('持续性症状')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            typeFilter === '持续性症状'
              ? 'frosted-glass border border-ww-orange-500/40 text-ww-orange-600 shadow-glow-sm'
              : 'glass border border-ww-slate-300/50 text-ww-slate-600 hover:border-ww-orange-500/30'
          }`}
        >
          ⏳ 持续性症状 ({prolongedCount})
        </button>
      </div>

      {/* 移动端：下拉筛选 */}
      <div className="lg:hidden">
        <label className="block text-sm font-medium text-ww-slate-700 mb-2">症状类型</label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full px-3 py-2.5 glass border border-ww-slate-300/50 rounded-lg text-ww-slate-800 focus:outline-none focus:border-ww-orange-500/50 focus:ring-2 focus:ring-ww-orange-500/20 transition-all"
        >
          <option value="all">全部 ({symptoms.length})</option>
          <option value="即时症状">⚡ 即时症状 ({immediateCount})</option>
          <option value="持续性症状">⏳ 持续性症状 ({prolongedCount})</option>
        </select>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 移动端：下拉列表选择器 */}
        <div className="lg:hidden">
          <label className="block text-sm font-medium text-ww-slate-700 mb-2">选择症状</label>
          <select
            value={selectedSymptom?.id || ''}
            onChange={(e) => {
              const symptom = filteredSymptoms.find(s => s.id === e.target.value);
              setSelectedSymptom(symptom || null);
            }}
            className="w-full px-3 py-2.5 glass border border-ww-slate-300/50 rounded-lg text-ww-slate-800 focus:outline-none focus:border-ww-orange-500/50 focus:ring-2 focus:ring-ww-orange-500/20 transition-all"
          >
            <option value="">请选择一个症状</option>
            {filteredSymptoms.map((symptom) => (
              <option key={symptom.id} value={symptom.id}>
                {symptom.type === '即时症状' ? '⚡' : '⏳'} {symptom.name}
              </option>
            ))}
          </select>
        </div>

        {/* 桌面端：症状列表 */}
        <div className="hidden lg:block space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ww-slate-300 scrollbar-track-transparent">
          {filteredSymptoms.map((symptom) => (
            <button
              key={symptom.id}
              onClick={() => setSelectedSymptom(symptom)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedSymptom?.id === symptom.id
                  ? 'frosted-glass border border-ww-orange-500/40 shadow-glow-sm depth-layer-2'
                  : 'glass border border-ww-slate-300/50 hover:border-ww-orange-500/30 glow-highlight'
              }`}
            >
              <div className="font-bold text-ww-slate-800">{symptom.name}</div>
              <div className="text-xs mt-1">
                <span className={`px-2 py-0.5 rounded ${
                  symptom.type === '即时症状' 
                    ? 'bg-orange-500/10 text-orange-600' 
                    : 'bg-purple-500/10 text-purple-600'
                }`}>
                  {symptom.type === '即时症状' ? '⚡ 即时' : '⏳ 持续'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* 详情面板 */}
        <div className="lg:col-span-2 max-h-[600px] lg:h-[calc(100vh-240px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ww-slate-300 scrollbar-track-transparent">
          {selectedSymptom ? (
            <Card className="p-6 space-y-6">
              {/* 症状标题 */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-ww-slate-800">
                    {selectedSymptom.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedSymptom.type === '即时症状'
                      ? 'bg-orange-500/10 text-orange-600 border border-orange-500/30'
                      : 'bg-purple-500/10 text-purple-600 border border-purple-500/30'
                  }`}>
                    {selectedSymptom.type}
                  </span>
                </div>
              </div>

              {/* 症状描述 */}
              <div className={`glass-strong rounded-lg p-5 ${
                selectedSymptom.type === '即时症状'
                  ? 'bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20'
                  : 'bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20'
              }`}>
                <h3 className="font-bold text-ww-slate-800 mb-3 flex items-center gap-2">
                  <span>{selectedSymptom.type === '即时症状' ? '⚡' : '⏳'}</span>
                  <span>症状说明</span>
                </h3>
                <p className="text-sm text-ww-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedSymptom.description}
                </p>
              </div>

              {/* 游戏提示 */}
              <div className="glass-strong rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
                <h3 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>KP 提示</span>
                </h3>
                <div className="text-sm text-ww-slate-700 space-y-2">
                  {selectedSymptom.type === '即时症状' ? (
                    <>
                      <p>• 即时症状通常持续 <strong>1D10 轮</strong></p>
                      <p>• 在症状持续期间，调查员可能失去对角色的控制</p>
                      <p>• 守秘人应根据情况决定症状的具体表现</p>
                    </>
                  ) : (
                    <>
                      <p>• 持续性症状通常持续 <strong>1D10 小时</strong> 或更久</p>
                      <p>• 症状结束后，调查员可能回过神来，也可能毫无记忆</p>
                      <p>• 守秘人可以根据剧情需要调整症状的影响</p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <span className="text-6xl mb-4 block">🧠</span>
              <p className="text-ww-slate-500">从左侧列表选择一个症状查看详情</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
