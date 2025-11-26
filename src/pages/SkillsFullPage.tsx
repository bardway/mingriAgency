import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import type { SkillFull } from '@/types/equipment';

export const SkillsFullPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<SkillFull | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/skills-full.json');
        const data = await response.json();
        setSkills(data);
        setLoading(false);
      } catch (error) {
        console.error('加载技能数据失败:', error);
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
  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-ww-slate-600">
        <Link to="/rulebook" className="hover:text-ww-orange-500 transition-colors">
          📚 规则库
        </Link>
        <span>→</span>
        <span className="text-ww-slate-800 font-medium">🎯 技能速查</span>
      </div>

      {/* 标题区域 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/40 flex items-center justify-center edge-glow">
            <span className="text-2xl">🎯</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ww-slate-800">技能速查</h1>
            <p className="text-sm text-ww-slate-600 mt-1">共 {skills.length} 项技能</p>
          </div>
        </div>

        {/* 搜索框 */}
        <div className="w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索技能..."
            className="w-full px-4 py-2 rounded-lg glass border border-ww-slate-300/50 focus:border-ww-orange-500/40 outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 技能列表 */}
        <div className="space-y-2 h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ww-slate-300 scrollbar-track-transparent">
          {filteredSkills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                selectedSkill?.id === skill.id
                  ? 'frosted-glass border border-ww-orange-500/40 shadow-glow-sm depth-layer-2'
                  : 'glass border border-ww-slate-300/50 hover:border-ww-orange-500/30 glow-highlight'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-ww-slate-800">{skill.name}</div>
                <div className="text-xs font-mono text-ww-orange-600 bg-ww-orange-500/10 px-2 py-1 rounded">
                  {skill.base}
                </div>
              </div>
              {skill.specialization && skill.specialization !== '——' && (
                <div className="text-xs text-purple-600 mt-1">需要专精</div>
              )}
            </button>
          ))}
        </div>

        {/* 详情面板 */}
        <div className="lg:col-span-2 h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-ww-slate-300 scrollbar-track-transparent">
          {selectedSkill ? (
            <Card className="p-6 space-y-6">
              {/* 技能标题 */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-ww-slate-800">
                    {selectedSkill.name}
                  </h2>
                  <div className="inline-block px-3 py-1 rounded-full glass-strong border border-ww-orange-500/30 text-sm text-ww-orange-600">
                    基础值: {selectedSkill.base}
                  </div>
                </div>
                {selectedSkill.specialization && selectedSkill.specialization !== '——' && (
                  <div className="text-sm text-purple-600">
                    ✨ 专精适用: {selectedSkill.specialization}
                  </div>
                )}
              </div>

              {/* 技能注释 */}
              <div className="glass-strong rounded-lg p-4 bg-white/40">
                <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                  <span>📝</span>
                  <span>技能说明</span>
                </h3>
                <p className="text-sm text-ww-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedSkill.description}
                </p>
              </div>

              {/* 难度等级 */}
              {(selectedSkill.difficultyNote || selectedSkill.regularDifficulty || selectedSkill.hardDifficulty) && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-3 flex items-center gap-2">
                    <span>⚖️</span>
                    <span>难度等级</span>
                  </h3>
                  {selectedSkill.difficultyNote && (
                    <div className="mb-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="text-xs text-blue-600 font-medium mb-1">难度说明</div>
                      <div className="text-sm text-ww-slate-700">{selectedSkill.difficultyNote}</div>
                    </div>
                  )}
                  {selectedSkill.regularDifficulty && (
                    <div className="mb-2 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <div className="text-xs text-green-600 font-medium mb-1">✓ 普通难度</div>
                      <div className="text-sm text-ww-slate-700">{selectedSkill.regularDifficulty}</div>
                    </div>
                  )}
                  {selectedSkill.hardDifficulty && (
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                      <div className="text-xs text-red-600 font-medium mb-1">⚠ 困难难度</div>
                      <div className="text-sm text-ww-slate-700">{selectedSkill.hardDifficulty}</div>
                    </div>
                  )}
                </div>
              )}

              {/* 孤注一掷 */}
              {selectedSkill.pushExample && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-2 flex items-center gap-2">
                    <span>🎲</span>
                    <span>孤注一掷示例</span>
                  </h3>
                  <p className="text-sm text-ww-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedSkill.pushExample}
                  </p>
                </div>
              )}

              {/* 失败后果 */}
              {(selectedSkill.pushFailure || selectedSkill.insanePushFailure) && (
                <div className="glass-strong rounded-lg p-4 bg-white/40">
                  <h3 className="font-bold text-ww-slate-800 mb-3 flex items-center gap-2">
                    <span>💥</span>
                    <span>孤注一掷失败后果</span>
                  </h3>
                  {selectedSkill.pushFailure && (
                    <div className="mb-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                      <div className="text-xs text-orange-600 font-medium mb-1">一般失败</div>
                      <div className="text-sm text-ww-slate-700 whitespace-pre-wrap">{selectedSkill.pushFailure}</div>
                    </div>
                  )}
                  {selectedSkill.insanePushFailure && (
                    <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                      <div className="text-xs text-purple-600 font-medium mb-1">🧠 疯狂调查员失败</div>
                      <div className="text-sm text-ww-slate-700">{selectedSkill.insanePushFailure}</div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <span className="text-6xl mb-4 block">🎯</span>
              <p className="text-ww-slate-500">从左侧列表选择一个技能查看详情</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
