import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCoc7Data } from '@/hooks/useCoc7Data';

export const OccupationsPage: React.FC = () => {
  const { data, loading, error } = useCoc7Data();
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);

  if (loading || error || !data) {
    return <div className="flex items-center justify-center h-96"><p>加载中...</p></div>;
  }

  const selectedOccData = selectedOccupation 
    ? data.occupations.find(o => o.id === selectedOccupation)
    : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">规则库</Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">职业速查</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-slate-500/20 border border-gray-500/40 flex items-center justify-center shadow-glow">
            <span className="text-2xl">◫</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">职业速查</h1>
            <p className="text-sm text-ww-slate-600 mt-1">共 {data.occupations.length} 种职业</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          {data.occupations.map(occ => (
            <button
              key={occ.id}
              onClick={() => setSelectedOccupation(occ.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedOccupation === occ.id
                  ? 'glass-strong border border-ww-orange-500/40 shadow-glow-sm'
                  : 'glass border border-ww-slate-300/50 hover:border-ww-orange-500/30'
              }`}
            >
              <div className="font-bold text-ww-slate-800">{occ.name}</div>
              <div className="text-xs text-ww-slate-500">{occ.nameEn}</div>
              <div className="text-xs text-ww-orange-600 mt-1">
                信用: {occ.creditRating.min}-{occ.creditRating.max}
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedOccData ? (
            <div className="glass rounded-xl border border-ww-slate-300/50 p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-ww-slate-800">{selectedOccData.name}</h2>
                <p className="text-ww-slate-600 mt-2">{selectedOccData.description}</p>
              </div>
              
              <div className="glass-strong rounded-lg p-4 bg-white/40">
                <h3 className="font-bold text-ww-slate-800 mb-2">职业信息</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ww-slate-600">信用评级:</span>
                    <span className="font-bold text-ww-orange-600">
                      {selectedOccData.creditRating.min}-{selectedOccData.creditRating.max}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ww-slate-600">技能点数:</span>
                    <span className="font-bold text-ww-slate-800">{selectedOccData.skillPoints}</span>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-lg p-4 bg-white/40">
                <h3 className="font-bold text-ww-slate-800 mb-3">技能配置</h3>
                {selectedOccData.skillChoices.required && (
                  <div className="mb-3">
                    <div className="text-sm text-ww-slate-600 mb-2">必选技能:</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedOccData.skillChoices.required.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 glass rounded border border-green-500/30 text-sm text-green-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedOccData.skillChoices.choose && (
                  <div>
                    <div className="text-sm text-ww-slate-600 mb-2">
                      从以下选择 {selectedOccData.skillChoices.choose.count} 项:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedOccData.skillChoices.choose.from.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 glass rounded border border-ww-slate-300/50 text-sm text-ww-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-ww-slate-500 flex items-center gap-2">
                <span>▣</span>
                <span>来源: {selectedOccData.source.book} P.{selectedOccData.source.pages}</span>
              </div>
            </div>
          ) : (
            <div className="glass rounded-xl border border-ww-slate-300/50 p-12 text-center">
              <span className="text-6xl mb-4 block">◫</span>
              <p className="text-ww-slate-500">从左侧列表选择一个职业查看详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
