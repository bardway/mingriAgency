/**
 * 模组设计器页面
 * 仅支持桌面端访问
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    const newNode = {
      id: nodeId,
      type,
      position,
      data,
    };

    addNode(newNode);
  }, [addNode]);

  // 如果是移动设备，显示提示页面
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-ww-slate-100 to-ww-slate-200">
        <div className="max-w-md w-full text-center">
          <div className="glass rounded-2xl p-8 border border-ww-slate-300/50 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-ww-orange-500/20 to-ww-amber-500/20 border border-ww-orange-500/40 flex items-center justify-center">
              <span className="text-5xl">🖥️</span>
            </div>
            <h2 className="text-2xl font-bold text-ww-slate-800 mb-4">
              仅支持桌面端访问
            </h2>
            <p className="text-ww-slate-600 mb-6 leading-relaxed">
              模组设计器功能复杂，需要较大的屏幕空间和精确操作。
              <br />
              <br />
              请使用<strong className="text-ww-orange-600">电脑浏览器</strong>访问此功能。
            </p>
            <div className="text-sm text-ww-slate-500 space-y-2">
              <p>💡 建议屏幕宽度：≥ 1024px</p>
              <p>💻 推荐设备：台式机、笔记本电脑</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-ww-light-200 flex items-center justify-center p-4">
        <div className="text-center px-4 max-w-3xl w-full">
          {/* 返回主页按钮 - 绝对定位在左上角 */}
          <Link 
            to="/" 
            className="fixed top-8 left-8 flex items-center gap-2 text-ww-slate-600 hover:text-ww-orange-600 transition-colors group z-50"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">返回主页</span>
          </Link>

          <div className="mb-10">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-ww-orange-500/20 to-ww-amber-500/20 border border-ww-orange-500/40 rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-7xl">📝</span>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-1.5 h-10 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-ww-slate-900 to-ww-slate-700 bg-clip-text text-transparent tracking-tight">
                CoC7 模组设计器
              </h1>
            </div>
            <p className="text-lg text-ww-slate-600 leading-relaxed">
              可视化创建和编辑克苏鲁的呼唤模组<br/>
              通过拖拽流程图的方式快速构建剧情结构
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setShowNewModuleDialog(true)}
              className="w-full max-w-md mx-auto px-8 py-4 text-lg bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 text-white rounded-xl hover:shadow-glow-lg transition-all duration-300 shadow-lg font-semibold"
            >
              创建新模组
            </button>
            
            <button className="w-full max-w-md mx-auto px-8 py-4 text-lg glass-strong text-ww-slate-800 rounded-xl hover:shadow-glow-sm transition-all duration-300 border border-ww-slate-300/50 font-medium">
              导入模组
            </button>
          </div>
        </div>

        {/* 创建模组对话框 */}
        {showNewModuleDialog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-strong rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-ww-slate-300/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full shadow-glow"></div>
                <h2 className="text-2xl font-bold text-ww-slate-900">创建新模组</h2>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-ww-slate-700 mb-2">
                  模组名称
                </label>
                <input
                  type="text"
                  value={newModuleName}
                  onChange={(e) => setNewModuleName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateModule()}
                  placeholder="例如: 午夜追踪"
                  className="w-full px-4 py-3 text-base glass-strong border border-ww-slate-300/50 rounded-lg text-ww-slate-800 placeholder-ww-slate-500 focus:outline-none focus:ring-2 focus:ring-ww-orange-500/50 transition-all"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowNewModuleDialog(false)}
                  className="px-6 py-2.5 text-sm font-medium text-ww-slate-700 hover:bg-ww-slate-200/50 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreateModule}
                  disabled={!newModuleName.trim()}
                  className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 text-white rounded-lg hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="flex flex-col h-screen bg-ww-light-200">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-ww-slate-300/50 glass-strong shadow-sm flex-shrink-0">
        <div className="flex items-center gap-6">
          {/* 返回主页按钮 */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-ww-slate-600 hover:text-ww-orange-600 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">返回主页</span>
          </Link>
          
          <div className="h-6 w-px bg-ww-slate-300"></div>

          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></div>
            <h1 className="text-2xl font-bold text-ww-slate-900">
              {currentModule.metadata.name}
            </h1>
          </div>
          <span className="px-3 py-1 bg-ww-orange-500/10 text-ww-orange-600 text-sm rounded-full font-medium border border-ww-orange-500/30">
            {currentModule.metadata.ruleSystem}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-ww-slate-700 hover:bg-ww-slate-200/50 rounded-lg transition-colors">
            验证
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-ww-slate-700 hover:bg-ww-slate-200/50 rounded-lg transition-colors">
            导出
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-ww-orange-500 to-ww-amber-500 text-white rounded-lg hover:shadow-glow transition-all">
            保存
          </button>
        </div>
      </div>

      {/* 标签页导航 */}
      <div className="flex border-b border-ww-slate-300/50 bg-ww-slate-100/30 px-8 flex-shrink-0">
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
            className={`flex items-center gap-2 px-6 py-3.5 border-b-2 transition-all text-sm font-medium ${
              editMode === tab.key
                ? 'border-ww-orange-500 text-ww-orange-600 bg-ww-orange-500/5'
                : 'border-transparent text-ww-slate-600 hover:text-ww-slate-800 hover:bg-ww-slate-200/30'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        {editMode === 'metadata' && (
          <div className="p-8 bg-white h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-ww-slate-900">模组基本信息</h2>
            </div>
            <p className="text-ww-slate-600">待实现...</p>
          </div>
        )}
        
        {editMode === 'flow' && (
          <div className="h-full flex">
            <div className="w-72 border-r border-ww-slate-300/50 p-5 glass-strong">
              <h3 className="font-bold text-base mb-4 text-ww-slate-900 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></div>
                节点工具箱
              </h3>
              <div className="space-y-2.5">
                <button
                  onClick={() => handleAddNode('scene')}
                  className="w-full p-3.5 glass border border-ww-orange-500/30 rounded-lg cursor-pointer hover:shadow-glow-sm hover:border-ww-orange-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📍</span>
                    <span className="font-medium text-sm text-ww-slate-800">场景节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('combat')}
                  className="w-full p-3.5 glass border border-red-500/30 rounded-lg cursor-pointer hover:shadow-glow-sm hover:border-red-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">⚔️</span>
                    <span className="font-medium text-sm text-ww-slate-800">战斗节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('choice')}
                  className="w-full p-3.5 glass border border-ww-amber-500/30 rounded-lg cursor-pointer hover:shadow-glow-sm hover:border-ww-amber-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🔀</span>
                    <span className="font-medium text-sm text-ww-slate-800">选择节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('condition')}
                  className="w-full p-3.5 glass border border-purple-500/30 rounded-lg cursor-pointer hover:shadow-glow-sm hover:border-purple-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">❓</span>
                    <span className="font-medium text-sm text-ww-slate-800">条件节点</span>
                  </div>
                </button>
                <button
                  onClick={() => handleAddNode('ending')}
                  className="w-full p-3.5 glass border border-green-500/30 rounded-lg cursor-pointer hover:shadow-glow-sm hover:border-green-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏁</span>
                    <span className="font-medium text-sm text-ww-slate-800">结局节点</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-white">
              <StoryFlowCanvas />
            </div>
            
            <NodeEditorPanel />
          </div>
        )}
        
        {editMode === 'clues' && (
          <div className="p-8 bg-white h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-ww-slate-900">线索网络</h2>
            </div>
            <p className="text-ww-slate-600">待实现...</p>
          </div>
        )}
        
        {editMode === 'npcs' && (
          <div className="bg-white h-full">
            <NPCManager />
          </div>
        )}
        
        {editMode === 'items' && (
          <div className="p-8 bg-white h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-ww-slate-900">物品道具</h2>
            </div>
            <p className="text-ww-slate-600">待实现...</p>
          </div>
        )}
        
        {editMode === 'locations' && (
          <div className="p-8 bg-white h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-ww-orange-500 to-ww-amber-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-ww-slate-900">地图地点</h2>
            </div>
            <p className="text-ww-slate-600">待实现...</p>
          </div>
        )}
      </div>
    </div>
  );
};
