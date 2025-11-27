/**
 * 模组设计器状态管理
 */

import { create } from 'zustand';
import type { 
  Module, 
  StoryNode, 
  StoryEdge, 
  StoryNodeData,
  ModuleNPC, 
  ModuleItem, 
  Clue,
  Location,
  ValidationResult 
} from '@/types/module-designer';
import { nanoid } from 'nanoid';

interface ModuleDesignerState {
  // 当前编辑的模组
  currentModule: Module | null;
  
  // 选中的节点
  selectedNodeId: string | null;
  
  // 编辑模式
  editMode: 'flow' | 'clues' | 'npcs' | 'items' | 'locations' | 'metadata';
  
  // 撤销/重做栈
  history: Module[];
  historyIndex: number;
  
  // 验证结果
  validation: ValidationResult | null;
  
  // Actions
  createNewModule: (name: string) => void;
  loadModule: (module: Module) => void;
  updateMetadata: (metadata: Partial<Module['metadata']>) => void;
  
  // 内部方法
  pushHistory: (module: Module) => void;
  
  // 节点操作
  addNode: (node: StoryNode) => void;
  updateNode: (nodeId: string, data: Partial<StoryNode['data']>) => void;
  deleteNode: (nodeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  
  // 连线操作
  addEdge: (edge: StoryEdge) => void;
  updateEdge: (edgeId: string, data: Partial<StoryEdge['data']>) => void;
  deleteEdge: (edgeId: string) => void;
  
  // 线索操作
  addClue: (clue: Clue) => void;
  updateClue: (clueId: string, data: Partial<Clue>) => void;
  deleteClue: (clueId: string) => void;
  
  // NPC操作
  addNPC: (npc: ModuleNPC) => void;
  updateNPC: (npcId: string, data: Partial<ModuleNPC>) => void;
  deleteNPC: (npcId: string) => void;
  
  // 物品操作
  addItem: (item: ModuleItem) => void;
  updateItem: (itemId: string, data: Partial<ModuleItem>) => void;
  deleteItem: (itemId: string) => void;
  
  // 地点操作
  addLocation: (location: Location) => void;
  updateLocation: (locationId: string, data: Partial<Location>) => void;
  deleteLocation: (locationId: string) => void;
  
  // 历史操作
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // 验证
  validateModule: () => void;
  
  // 导入导出
  exportModule: () => string;
  importModule: (json: string) => void;
  
  // 切换编辑模式
  setEditMode: (mode: ModuleDesignerState['editMode']) => void;
}

// 生成唯一ID的辅助函数
const generateId = () => nanoid(10);

export const useModuleDesigner = create<ModuleDesignerState>((set, get) => ({
  currentModule: null,
  selectedNodeId: null,
  editMode: 'flow',
  history: [],
  historyIndex: -1,
  validation: null,
  
  createNewModule: (name: string) => {
    const newModule: Module = {
      metadata: {
        id: generateId(),
        name,
        era: '',
        location: '',
        worldview: '',
        theme: [],
        ruleSystem: 'CoC 7th Edition',
        playerCount: '3-5',
        estimatedTime: '4-6小时',
        difficulty: 'normal',
        description: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      storyGraph: {
        nodes: [],
        edges: [],
      },
      clues: [],
      npcs: [],
      items: [],
      locations: [],
      timeline: [],
    };
    
    set({ 
      currentModule: newModule,
      history: [newModule],
      historyIndex: 0,
    });
  },
  
  loadModule: (module: Module) => {
    set({ 
      currentModule: module,
      history: [module],
      historyIndex: 0,
    });
  },
  
  updateMetadata: (metadata) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      metadata: {
        ...currentModule.metadata,
        ...metadata,
        updatedAt: new Date().toISOString(),
      },
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  addNode: (node) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      storyGraph: {
        ...currentModule.storyGraph,
        nodes: [...currentModule.storyGraph.nodes, node],
      },
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  updateNode: (nodeId, data) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      storyGraph: {
        ...currentModule.storyGraph,
        nodes: currentModule.storyGraph.nodes.map(node =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } as StoryNodeData } : node
        ),
      },
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  deleteNode: (nodeId) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      storyGraph: {
        nodes: currentModule.storyGraph.nodes.filter(node => node.id !== nodeId),
        edges: currentModule.storyGraph.edges.filter(
          edge => edge.source !== nodeId && edge.target !== nodeId
        ),
      },
    };
    
    set({ 
      currentModule: updated,
      selectedNodeId: null,
    });
    get().pushHistory(updated);
  },
  
  setSelectedNode: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },
  
  addEdge: (edge) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      storyGraph: {
        ...currentModule.storyGraph,
        edges: [...currentModule.storyGraph.edges, edge],
      },
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  updateEdge: (edgeId, data) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      storyGraph: {
        ...currentModule.storyGraph,
        edges: currentModule.storyGraph.edges.map(edge =>
          edge.id === edgeId ? { ...edge, data: { ...edge.data, ...data } } : edge
        ),
      },
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  deleteEdge: (edgeId) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      storyGraph: {
        ...currentModule.storyGraph,
        edges: currentModule.storyGraph.edges.filter(edge => edge.id !== edgeId),
      },
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  addClue: (clue) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      clues: [...currentModule.clues, clue],
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  updateClue: (clueId, data) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      clues: currentModule.clues.map(clue =>
        clue.id === clueId ? { ...clue, ...data } : clue
      ),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  deleteClue: (clueId) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      clues: currentModule.clues.filter(clue => clue.id !== clueId),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  addNPC: (npc) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      npcs: [...currentModule.npcs, npc],
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  updateNPC: (npcId, data) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      npcs: currentModule.npcs.map(npc =>
        npc.id === npcId ? { ...npc, ...data } : npc
      ),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  deleteNPC: (npcId) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      npcs: currentModule.npcs.filter(npc => npc.id !== npcId),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  addItem: (item) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      items: [...currentModule.items, item],
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  updateItem: (itemId, data) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      items: currentModule.items.map(item =>
        item.id === itemId ? { ...item, ...data } : item
      ),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  deleteItem: (itemId) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      items: currentModule.items.filter(item => item.id !== itemId),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  addLocation: (location) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      locations: [...currentModule.locations, location],
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  updateLocation: (locationId, data) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      locations: currentModule.locations.map(loc =>
        loc.id === locationId ? { ...loc, ...data } : loc
      ),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  deleteLocation: (locationId) => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    const updated: Module = {
      ...currentModule,
      locations: currentModule.locations.filter(loc => loc.id !== locationId),
    };
    
    set({ currentModule: updated });
    get().pushHistory(updated);
  },
  
  pushHistory: (module: Module) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(module);
    
    // 限制历史记录数量
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({ 
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },
  
  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ 
        currentModule: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({ 
        currentModule: history[newIndex],
        historyIndex: newIndex,
      });
    }
  },
  
  canUndo: () => {
    const { historyIndex } = get();
    return historyIndex > 0;
  },
  
  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },
  
  validateModule: () => {
    const { currentModule } = get();
    if (!currentModule) return;
    
    // TODO: 实现完整验证逻辑
    const validation: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      timestamp: new Date().toISOString(),
    };
    
    set({ validation });
  },
  
  exportModule: () => {
    const { currentModule } = get();
    if (!currentModule) return '';
    
    return JSON.stringify(currentModule, null, 2);
  },
  
  importModule: (json: string) => {
    try {
      const module = JSON.parse(json) as Module;
      get().loadModule(module);
    } catch (error) {
      console.error('Failed to import module:', error);
    }
  },
  
  setEditMode: (mode) => {
    set({ editMode: mode });
  },
}));
