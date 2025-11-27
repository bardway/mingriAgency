/**
 * NPC管理器组件
 */

import React, { useState } from 'react';
import { useModuleDesigner } from '../store/moduleDesignerStore';
import { nanoid } from 'nanoid';
import type { ModuleNPC, NPCCategory, Attributes } from '@/types/module-designer';

export const NPCManager: React.FC = () => {
  const { currentModule, addNPC, updateNPC, deleteNPC } = useModuleDesigner();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingNPC, setEditingNPC] = useState<ModuleNPC | null>(null);

  if (!currentModule) return null;

  const npcs = currentModule.npcs;

  const handleAddNew = () => {
    const newNPC: ModuleNPC = {
      id: `npc-${nanoid(8)}`,
      name: '新NPC',
      category: 'human',
      identity: '',
      attributes: {
        STR: 50,
        DEX: 50,
        CON: 50,
        SIZ: 50,
        APP: 50,
        INT: 50,
        POW: 50,
        EDU: 50,
      },
      skills: {},
      hp: 10,
      mp: 10,
      sanity: 50,
      weapons: [],
      damageBonus: '0',
      build: 0,
      move: 8,
      stance: 'neutral',
      status: 'alive',
    };

    addNPC(newNPC);
    setEditingNPC(newNPC);
    setShowAddDialog(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定删除这个NPC吗?')) {
      deleteNPC(id);
      if (editingNPC?.id === id) {
        setEditingNPC(null);
      }
    }
  };

  return (
    <div className="h-full flex">
      {/* NPC列表 */}
      <div className="w-80 border-r border-gray-200 bg-white p-5 overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg">NPC列表</h3>
          <button
            onClick={() => setShowAddDialog(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            + 添加
          </button>
        </div>

        <div className="space-y-2">
          {npcs.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              还没有NPC<br/>
              点击上方按钮添加
            </p>
          )}

          {npcs.map((npc) => (
            <button
              key={npc.id}
              onClick={() => setEditingNPC(npc)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                editingNPC?.id === npc.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">{npc.name}</h4>
                  <div className="flex gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded ${
                      npc.category === 'human' ? 'bg-blue-100 text-blue-700' :
                      npc.category === 'monster' ? 'bg-red-100 text-red-700' :
                      npc.category === 'mythos' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {npc.category === 'human' ? '人类' :
                       npc.category === 'monster' ? '怪物' :
                       npc.category === 'mythos' ? '神话生物' : '其他'}
                    </span>
                    <span className={`px-2 py-0.5 rounded ${
                      npc.stance === 'friendly' ? 'bg-green-100 text-green-700' :
                      npc.stance === 'hostile' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {npc.stance === 'friendly' ? '友好' :
                       npc.stance === 'hostile' ? '敌对' : '中立'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(npc.id);
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors ml-2"
                >
                  ✕
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* NPC编辑区 */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {editingNPC ? (
          <NPCEditor npc={editingNPC} onUpdate={(updates) => updateNPC(editingNPC.id, updates)} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="text-4xl mb-4">👥</p>
              <p className="text-lg">选择一个NPC进行编辑</p>
            </div>
          </div>
        )}
      </div>

      {/* 添加对话框 */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">添加NPC</h2>
            <p className="text-gray-600 mb-6">将创建一个新的NPC模板,您可以之后编辑详细信息</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddDialog(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// NPC编辑器组件
interface NPCEditorProps {
  npc: ModuleNPC;
  onUpdate: (updates: Partial<ModuleNPC>) => void;
}

const NPCEditor: React.FC<NPCEditorProps> = ({ npc, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'attributes' | 'skills' | 'combat'>('basic');

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{npc.name}</h2>

      {/* 标签页 */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { key: 'basic' as const, label: '基本信息' },
          { key: 'attributes' as const, label: '属性' },
          { key: 'skills' as const, label: '技能' },
          { key: 'combat' as const, label: '战斗数据' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.key
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 基本信息 */}
      {activeTab === 'basic' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
            <input
              type="text"
              value={npc.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">类别</label>
            <select
              value={npc.category}
              onChange={(e) => onUpdate({ category: e.target.value as NPCCategory })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="human">人类</option>
              <option value="monster">怪物</option>
              <option value="mythos">神话生物</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">立场</label>
            <select
              value={npc.stance}
              onChange={(e) => onUpdate({ stance: e.target.value as 'friendly' | 'neutral' | 'hostile' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="friendly">友好</option>
              <option value="neutral">中立</option>
              <option value="hostile">敌对</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">身份背景</label>
            <textarea
              value={npc.identity}
              onChange={(e) => onUpdate({ identity: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="描述NPC的身份、职业、背景故事..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">性格</label>
            <input
              type="text"
              value={npc.personality || ''}
              onChange={(e) => onUpdate({ personality: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="例如: 谨慎、狡猾、暴躁..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">动机</label>
            <input
              type="text"
              value={npc.motivation || ''}
              onChange={(e) => onUpdate({ motivation: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="NPC的目标和动机..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">备注</label>
            <textarea
              value={npc.notes || ''}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      )}

      {/* 属性 */}
      {activeTab === 'attributes' && (
        <AttributesEditor attributes={npc.attributes} onUpdate={(attrs) => onUpdate({ attributes: attrs })} />
      )}

      {/* 技能 */}
      {activeTab === 'skills' && (
        <div className="space-y-4">
          <p className="text-gray-600">技能编辑功能开发中...</p>
          <p className="text-sm text-gray-500">当前技能: {Object.keys(npc.skills).length} 个</p>
        </div>
      )}

      {/* 战斗数据 */}
      {activeTab === 'combat' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">HP</label>
              <input
                type="number"
                value={npc.hp}
                onChange={(e) => onUpdate({ hp: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MP</label>
              <input
                type="number"
                value={npc.mp}
                onChange={(e) => onUpdate({ mp: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SAN</label>
              <input
                type="number"
                value={npc.sanity}
                onChange={(e) => onUpdate({ sanity: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">伤害加值</label>
              <input
                type="text"
                value={npc.damageBonus}
                onChange={(e) => onUpdate({ damageBonus: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例如: +1d4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">体格</label>
              <input
                type="number"
                value={npc.build}
                onChange={(e) => onUpdate({ build: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">移动力</label>
              <input
                type="number"
                value={npc.move}
                onChange={(e) => onUpdate({ move: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {npc.armor !== undefined && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">护甲值</label>
              <input
                type="number"
                value={npc.armor}
                onChange={(e) => onUpdate({ armor: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 属性编辑器
interface AttributesEditorProps {
  attributes: Attributes;
  onUpdate: (attrs: Attributes) => void;
}

const AttributesEditor: React.FC<AttributesEditorProps> = ({ attributes, onUpdate }) => {
  const updateAttr = (key: keyof Attributes, value: number) => {
    onUpdate({ ...attributes, [key]: value });
  };

  const attrs: Array<{ key: keyof Attributes; label: string; desc: string }> = [
    { key: 'STR', label: '力量 (STR)', desc: '肌肉力量' },
    { key: 'DEX', label: '敏捷 (DEX)', desc: '灵活度和反应' },
    { key: 'CON', label: '体质 (CON)', desc: '健康和耐力' },
    { key: 'SIZ', label: '体型 (SIZ)', desc: '身材大小' },
    { key: 'APP', label: '外貌 (APP)', desc: '外表吸引力' },
    { key: 'INT', label: '智力 (INT)', desc: '学习和推理能力' },
    { key: 'POW', label: '意志 (POW)', desc: '精神力量' },
    { key: 'EDU', label: '教育 (EDU)', desc: '学识和经验' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {attrs.map((attr) => (
        <div key={attr.key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {attr.label}
            <span className="text-xs text-gray-500 ml-2">({attr.desc})</span>
          </label>
          <input
            type="number"
            value={attributes[attr.key]}
            onChange={(e) => updateAttr(attr.key, parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="99"
          />
        </div>
      ))}
    </div>
  );
};
