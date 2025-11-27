/**
 * 节点属性编辑面板
 */

import React from 'react';
import { useModuleDesigner } from '../store/moduleDesignerStore';
import type { SceneNodeData, CombatNodeData, ChoiceNodeData, ConditionNodeData, EndingNodeData } from '@/types/module-designer';

export const NodeEditorPanel: React.FC = () => {
  const { currentModule, selectedNodeId, updateNode, deleteNode } = useModuleDesigner();

  if (!selectedNodeId || !currentModule) {
    return (
      <div className="flex-1 border-l border-gray-200 p-8 bg-gray-50">
        <h3 className="font-bold text-2xl mb-5">节点属性</h3>
        <p className="text-lg text-gray-600">选择一个节点以编辑其属性</p>
      </div>
    );
  }

  const node = currentModule.storyGraph.nodes.find(n => n.id === selectedNodeId);
  if (!node) return null;

  const handleDelete = () => {
    if (confirm('确定要删除这个节点吗?')) {
      deleteNode(selectedNodeId);
    }
  };

  const handleUpdateData = (updates: Partial<typeof node.data>) => {
    updateNode(selectedNodeId, updates);
  };

  return (
    <div className="flex-1 border-l border-gray-200 p-8 bg-gray-50 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-2xl">节点属性</h3>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-base bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          删除节点
        </button>
      </div>

      {node.data.type === 'scene' && (
        <SceneNodeEditor data={node.data as SceneNodeData} onUpdate={handleUpdateData} />
      )}
      
      {node.data.type === 'combat' && (
        <CombatNodeEditor data={node.data as CombatNodeData} onUpdate={handleUpdateData} />
      )}
      
      {node.data.type === 'choice' && (
        <ChoiceNodeEditor data={node.data as ChoiceNodeData} onUpdate={handleUpdateData} />
      )}
      
      {node.data.type === 'condition' && (
        <ConditionNodeEditor data={node.data as ConditionNodeData} onUpdate={handleUpdateData} />
      )}
      
      {node.data.type === 'ending' && (
        <EndingNodeEditor data={node.data as EndingNodeData} onUpdate={handleUpdateData} />
      )}
    </div>
  );
};

// 场景节点编辑器
interface SceneNodeEditorProps {
  data: SceneNodeData;
  onUpdate: (updates: Partial<SceneNodeData>) => void;
}

const SceneNodeEditor: React.FC<SceneNodeEditorProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">场景名称</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">场景描述</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="描述场景环境、氛围、重要细节..."
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">时间地点</label>
        <input
          type="text"
          value={data.time || ''}
          onChange={(e) => onUpdate({ time: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例如: 当日晚间, 阿卡姆图书馆"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">备注</label>
        <textarea
          value={data.notes || ''}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="KP备注、特殊规则等..."
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-base text-gray-500">
          涉及 {data.involvedNPCs.length} 个NPC, {data.relatedClues.length} 条线索, {data.checks.length} 个检定
        </p>
      </div>
    </div>
  );
};

// 战斗节点编辑器
interface CombatNodeEditorProps {
  data: CombatNodeData;
  onUpdate: (updates: Partial<CombatNodeData>) => void;
}

const CombatNodeEditor: React.FC<CombatNodeEditorProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">战斗名称</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">战斗描述</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">难度</label>
        <select
          value={data.difficulty}
          onChange={(e) => onUpdate({ difficulty: e.target.value as any })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="easy">简单</option>
          <option value="normal">普通</option>
          <option value="hard">困难</option>
          <option value="deadly">致命</option>
        </select>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">胜利条件</label>
        <input
          type="text"
          value={data.victoryCondition}
          onChange={(e) => onUpdate({ victoryCondition: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="例如: 击败所有敌人"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">失败条件</label>
        <input
          type="text"
          value={data.defeatCondition}
          onChange={(e) => onUpdate({ defeatCondition: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="例如: 所有调查员昏迷"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">特殊机制</label>
        <textarea
          value={data.specialMechanics || ''}
          onChange={(e) => onUpdate({ specialMechanics: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          placeholder="环境效果、特殊规则等..."
        />
      </div>
    </div>
  );
};

// 选择节点编辑器
interface ChoiceNodeEditorProps {
  data: ChoiceNodeData;
  onUpdate: (updates: Partial<ChoiceNodeData>) => void;
}

const ChoiceNodeEditor: React.FC<ChoiceNodeEditorProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">选择点名称</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">描述</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-base text-gray-500">共 {data.choices.length} 个选项</p>
      </div>
    </div>
  );
};

// 条件节点编辑器
interface ConditionNodeEditorProps {
  data: ConditionNodeData;
  onUpdate: (updates: Partial<ConditionNodeData>) => void;
}

const ConditionNodeEditor: React.FC<ConditionNodeEditorProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">条件名称</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">描述</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={5}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-base text-gray-500">共 {data.conditions.length} 个条件分支</p>
      </div>
    </div>
  );
};

// 结局节点编辑器
interface EndingNodeEditorProps {
  data: EndingNodeData;
  onUpdate: (updates: Partial<EndingNodeData>) => void;
}

const EndingNodeEditor: React.FC<EndingNodeEditorProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">结局名称</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">结局类型</label>
        <select
          value={data.endingType}
          onChange={(e) => onUpdate({ endingType: e.target.value as any })}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="success">成功</option>
          <option value="partial">部分成功</option>
          <option value="failure">失败</option>
          <option value="tpk">团灭 (TPK)</option>
        </select>
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">结局描述</label>
        <textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          rows={7}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="描述结局的情节、角色结局、世界状态..."
        />
      </div>

      <div>
        <label className="block text-base font-medium text-gray-700 mb-3">后续影响</label>
        <textarea
          value={data.aftermath || ''}
          onChange={(e) => onUpdate({ aftermath: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          placeholder="对后续模组的影响..."
        />
      </div>

      {data.score !== undefined && (
        <div>
          <label className="block text-base font-medium text-gray-700 mb-3">评分</label>
          <input
            type="number"
            value={data.score}
            onChange={(e) => onUpdate({ score: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="0"
            max="100"
          />
        </div>
      )}
    </div>
  );
};
