import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { dataStore } from '@/storage';
import { SceneTemplate, ClueTemplate } from '@/domain';

/**
 * 场景与线索管理页面
 */
export const ScenesPage: React.FC = () => {
  const [scenes, setScenes] = useState<SceneTemplate[]>([]);
  const [clues, setClues] = useState<ClueTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'scenes' | 'clues'>('scenes');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [scenesData, cluesData] = await Promise.all([
        dataStore.loadScenes(),
        dataStore.loadClues(),
      ]);
      setScenes(scenesData);
      setClues(cluesData);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSampleScene = async () => {
    const sample: SceneTemplate = {
      id: `scene_${Date.now()}`,
      name: '废弃书店',
      summary: '一家位于老城区的废弃书店，传说曾是神秘学者的聚集地',
      description: '破旧的木门半掩着，透过窗户可以看到堆满灰尘的书架...',
      clueIds: [],
      prerequisites: [],
    };
    
    await dataStore.saveScene(sample);
    await loadData();
  };

  const handleCreateSampleClue = async () => {
    const sample: ClueTemplate = {
      id: `clue_${Date.now()}`,
      name: '神秘手稿',
      description: '一本用古老文字书写的手稿，记载着不为人知的仪式',
      requiredSkillCheck: {
        skillId: 'skill_library_use',
        difficulty: 60,
      },
      relatedClues: [],
      relatedScenes: [],
      isHidden: false,
    };
    
    await dataStore.saveClue(sample);
    await loadData();
  };

  const handleDeleteScene = async (id: string) => {
    if (confirm('确定要删除此场景吗？')) {
      await dataStore.deleteScene(id);
      await loadData();
    }
  };

  const handleDeleteClue = async (id: string) => {
    if (confirm('确定要删除此线索吗？')) {
      await dataStore.deleteClue(id);
      await loadData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-ww-orange-400 animate-pulse">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1.5 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
            场景与线索
          </h1>
        </div>
        <p className="text-ww-slate-600 ml-5 tracking-wide">
          构建模组的场景与线索体系
        </p>
      </div>

      {/* 标签切换 */}
      <div className="flex gap-2 border-b border-ww-slate-200">
        <button
          onClick={() => setActiveTab('scenes')}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === 'scenes'
              ? 'text-ww-orange-600 border-b-2 border-ww-orange-500'
              : 'text-ww-slate-600 hover:text-ww-slate-900'
          }`}
        >
          场景模板
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-ww-slate-100 text-ww-slate-600">
            {scenes.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('clues')}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === 'clues'
              ? 'text-ww-orange-600 border-b-2 border-ww-orange-500'
              : 'text-ww-slate-600 hover:text-ww-slate-900'
          }`}
        >
          线索模板
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-ww-slate-100 text-ww-slate-600">
            {clues.length}
          </span>
        </button>
      </div>

      {/* 场景面板 */}
      {activeTab === 'scenes' && (
        <div className="space-y-6">
          {/* 操作栏 */}
          <div className="flex gap-3">
            <Button variant="primary" onClick={handleCreateSampleScene}>
              + 创建示例场景
            </Button>
          </div>

          {/* 场景列表 */}
          {scenes.length === 0 ? (
            <Card className="text-center py-16">
              <div className="text-ww-slate-400 mb-4 text-lg">尚无场景模板</div>
              <p className="text-ww-slate-500 text-sm mb-6">
                创建场景模板，为你的模组搭建框架
              </p>
              <Button variant="primary" onClick={handleCreateSampleScene} className="mx-auto">
                创建第一个场景
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenes.map((scene) => (
                <Card
                  key={scene.id}
                  className="group transition-all duration-300 hover:shadow-glow"
                >
                  {/* 场景头部 */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-ww-slate-900 group-hover:text-ww-orange-600 transition-colors mb-2">
                      {scene.name}
                    </h3>
                    <p className="text-sm text-ww-slate-600 font-medium">
                      {scene.summary}
                    </p>
                  </div>

                  {/* 场景描述 */}
                  {scene.description && (
                    <p className="text-sm text-ww-slate-600 mb-4 line-clamp-3 leading-relaxed">
                      {scene.description}
                    </p>
                  )}

                  {/* 元数据 */}
                  <div className="flex gap-4 text-xs text-ww-slate-500 mb-4">
                    {scene.clueIds && scene.clueIds.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-ww-orange-500">🔍</span>
                        {scene.clueIds.length} 线索
                      </div>
                    )}
                    {scene.prerequisites && scene.prerequisites.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-ww-orange-500">🔒</span>
                        {scene.prerequisites.length} 前置
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2 pt-3 border-t border-ww-slate-200">
                    <Button
                      variant="secondary"
                      className="flex-1 text-sm"
                      onClick={() => alert('场景详情功能开发中...')}
                    >
                      查看详情
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-3 text-sm hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteScene(scene.id)}
                    >
                      删除
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 线索面板 */}
      {activeTab === 'clues' && (
        <div className="space-y-6">
          {/* 操作栏 */}
          <div className="flex gap-3">
            <Button variant="primary" onClick={handleCreateSampleClue}>
              + 创建示例线索
            </Button>
          </div>

          {/* 线索列表 */}
          {clues.length === 0 ? (
            <Card className="text-center py-16">
              <div className="text-ww-slate-400 mb-4 text-lg">尚无线索模板</div>
              <p className="text-ww-slate-500 text-sm mb-6">
                创建线索模板，为调查员们准备线索网络
              </p>
              <Button variant="primary" onClick={handleCreateSampleClue} className="mx-auto">
                创建第一条线索
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clues.map((clue) => (
                <Card
                  key={clue.id}
                  className="group transition-all duration-300 hover:shadow-glow"
                >
                  {/* 线索头部 */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-ww-slate-900 group-hover:text-ww-orange-600 transition-colors flex-1">
                      {clue.name}
                    </h3>
                    {clue.isHidden && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-ww-orange-100 text-ww-orange-700 border border-ww-orange-200 ml-2">
                        隐藏
                      </span>
                    )}
                  </div>

                  {/* 线索描述 */}
                  <p className="text-sm text-ww-slate-600 mb-4 leading-relaxed">
                    {clue.description}
                  </p>

                  {/* 技能检定 */}
                  {clue.requiredSkillCheck && (
                    <div className="mb-4 p-3 bg-ww-orange-50 rounded-lg border border-ww-orange-200">
                      <div className="text-xs text-ww-slate-600 mb-1">需要技能检定</div>
                      <div className="text-sm font-medium text-ww-slate-900">
                        {clue.requiredSkillCheck.skillId}
                        <span className="text-ww-orange-600 ml-2">
                          难度 {clue.requiredSkillCheck.difficulty}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 关联信息 */}
                  <div className="flex gap-4 text-xs text-ww-slate-500 mb-4">
                    {clue.relatedClues && clue.relatedClues.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-ww-orange-500">🔗</span>
                        {clue.relatedClues.length} 关联线索
                      </div>
                    )}
                    {clue.relatedScenes && clue.relatedScenes.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-ww-orange-500">📍</span>
                        {clue.relatedScenes.length} 关联场景
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2 pt-3 border-t border-ww-slate-200">
                    <Button
                      variant="secondary"
                      className="flex-1 text-sm"
                      onClick={() => alert('线索详情功能开发中...')}
                    >
                      查看详情
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-3 text-sm hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteClue(clue.id)}
                    >
                      删除
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
