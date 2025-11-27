/**
 * 模组设计器页面
 */

import React, { useState, useCallback } from 'react';
import { useModuleDesigner } from '@/features/module-designer/store/moduleDesignerStore';
import { StoryFlowCanvas } from '@/features/module-designer/components/StoryFlowCanvas';
import { NodeEditorPanel } from '@/features/module-designer/components/NodeEditorPanel';
import { NPCManager } from '@/features/module-designer/components/NPCManager';
import { nanoid } from 'nanoid';
import type { SceneNodeData, CombatNodeData, ChoiceNodeData, ConditionNodeData, EndingNodeData } from '@/types/module-designer';

export const ModuleDesignerPage: React.FC = () => {
  const { currentModule, createNewModule, editMode, setEditMode, addNode } = useModuleDesigner();
  const [showNewModuleDialog, setShowNewModuleDialog] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');

  const handleCreateModule = () => {
    if (newModuleName.trim()) {
      createNewModule(newModuleName.trim());
      setShowNewModuleDialog(false);
      setNewModuleName('');
    }
  };

  // 添加节点的处理函数
  const handleAddNode = useCallback((type: 'scene' | 'combat' | 'choice' | 'condition' | 'ending') => {
    const nodeId = `node-${nanoid(8)}`;
    const position = { x: 250, y: 100 };

    let data: SceneNodeData | CombatNodeData | ChoiceNodeData | ConditionNodeData | EndingNodeData;

    switch (type) {
      case 'scene':
        data = {
          type: 'scene',
          name: '新场景',
          description: '',
          involvedNPCs: [],
          relatedClues: [],
          checks: [],
          options: [],
        };
        break;
      case 'combat':
        data = {
          type: 'combat',
          name: '新战斗',
          description: '',
          enemies: [],
          victoryCondition: '',
          defeatCondition: '',
          difficulty: 'normal',
        };
        break;
      case 'choice':
        data = {
          type: 'choice',
          name: '新选择',
          description: '',
          choices: [],
        };
        break;
      case 'condition':
        data = {
          type: 'condition',
          name: '新条件',
          description: '',
          conditions: [],
        };
        break;
      case 'ending':
        data = {
          type: 'ending',
          name: '新结局',
          description: '',
          endingType: 'success',
        };
        break;
    }

    const newNode: any = {
      id: nodeId,
      type,
      position,
      data,
    };

    addNode(newNode);
  }, [addNode]);

  if (!currentModule) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center px-4">
          <div className="mb-10">
            <div className="w-40 h-40 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-8xl">📝</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            CoC7 模组设计器
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            可视化创建和编辑克苏鲁的呼唤模组<br/>
            通过拖拽流程图的方式快速构建剧情结构
          </p>
          
          <div className="space-y-5">
            <button
              onClick={() => setShowNewModuleDialog(true)}
              className="px-10 py-4 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-medium"
            >
              创建新模组
            </button>
            
            <div>
              <button className="px-10 py-4 text-lg bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-300 font-medium">
                导入模组
              </button>
            </div>
          </div>
        </div>

        {/* 创建模组对话框 */}
        {showNewModuleDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">创建新模组</h2>
              
              <div className="mb-6">
                <label className="block text-base font-medium text-gray-700 mb-3">
                  模组名称
                </label>
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateModule()}
                  placeholder="例如: 午夜追踪"
                  className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowNewModuleDialog(false)}
                  className="px-6 py-3 text-base text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateModule}
                  disabled={!newModuleName.trim()}
                  className="px-6 py-3 text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {currentModule.metadata.name}
          </h1>
          <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-base rounded-full font-medium">
            {currentModule.metadata.ruleSystem}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            验证
          </button>
          <button className="px-5 py-2.5 text-base text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
            导出
          </button>
          <button className="px-5 py-2.5 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            保存
          </button>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="flex border-b border-gray-200 bg-gray-50 px-8">
        {[
          { key: 'metadata' as const, label: '基本信息', icon: '📋' },
          { key: 'flow' as const, label: '剧情流程', icon: '🔀' },
          { key: 'clues' as const, label: '线索网络', icon: '🔍' },
          { key: 'npcs' as const, label: 'NPC管理', icon: '👥' },
          { key: 'items' as const, label: '物品道具', icon: '🎒' },
          { key: 'locations' as const, label: '地图地点', icon: '🗺️' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setEditMode(tab.key)}
            className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors text-base ${
              editMode === tab.key
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        {editMode === 'metadata' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">模组基本信息</h2>
            <p className="text-gray-600">待实现...</p>
          </div>
        )}
        
        {editMode === 'flow' && (
          <div className="h-full flex">
            <div className="w-72 border-r border-gray-200 p-5 bg-gray-50">
              <h3 className="font-bold text-lg mb-5">节点工具箱</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleAddNode('scene')}
                  className="w-full p-4 bg-white border-2 border-blue-300 rounded-xl cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <span className="font-semibold text-base">场景节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('combat')}
                  className="w-full p-4 bg-white border-2 border-red-300 rounded-xl cursor-pointer hover:shadow-lg hover:border-red-400 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚔️</span>
                    <span className="font-semibold text-base">战斗节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('choice')}
                  className="w-full p-4 bg-white border-2 border-yellow-300 rounded-xl cursor-pointer hover:shadow-lg hover:border-yellow-400 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔀</span>
                    <span className="font-semibold text-base">选择节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('condition')}
                  className="w-full p-4 bg-white border-2 border-purple-300 rounded-xl cursor-pointer hover:shadow-lg hover:border-purple-400 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">❓</span>
                    <span className="font-semibold text-base">条件节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('ending')}
                  className="w-full p-4 bg-white border-2 border-green-300 rounded-xl cursor-pointer hover:shadow-lg hover:border-green-400 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏁</span>
                    <span className="font-semibold text-base">结局节点</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <StoryFlowCanvas />
            </div>
            
            <NodeEditorPanel />
          </div>
        )}
        
        {editMode === 'clues' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">线索网络</h2>
            <p className="text-gray-600">待实现...</p>
          </div>
        )}
        
        {editMode === 'npcs' && (
          <NPCManager />
        )}
        
        {editMode === 'items' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">物品道具</h2>
            <p className="text-gray-600">待实现...</p>
          </div>
        )}
        
        {editMode === 'locations' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">地图地点</h2>
            <p className="text-gray-600">待实现...</p>
          </div>
        )}
      </div>
    </div>
  );
};
