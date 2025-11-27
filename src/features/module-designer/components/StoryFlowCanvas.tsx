/**
 * 剧情流程画布组件
 * 基于ReactFlow实现的可视化流程编辑器
 */

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { SceneNode } from '../nodes/SceneNode';
import { CombatNode } from '../nodes/CombatNode';
import { ChoiceNode } from '../nodes/ChoiceNode';
import { ConditionNode } from '../nodes/ConditionNode';
import { EndingNode } from '../nodes/EndingNode';
import { useModuleDesigner } from '../store/moduleDesignerStore';

// 注册自定义节点类型
const nodeTypes = {
  scene: SceneNode as any,
  combat: CombatNode as any,
  choice: ChoiceNode as any,
  condition: ConditionNode as any,
  ending: EndingNode as any,
};

export const StoryFlowCanvas: React.FC = () => {
  const { currentModule, addEdge: addEdgeToStore, setSelectedNode } = useModuleDesigner();

  // 从store同步nodes和edges
  const initialNodes: Node[] = useMemo(() => 
    (currentModule?.storyGraph.nodes || []) as any[], 
    [currentModule?.storyGraph.nodes]
  );
  
  const initialEdges: Edge[] = useMemo(() => 
    (currentModule?.storyGraph.edges || []) as any[], 
    [currentModule?.storyGraph.edges]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 处理连线创建
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: any = {
        id: `edge-${connection.source}-${connection.target}`,
        source: connection.source!,
        target: connection.target!,
        data: {},
      };
      
      setEdges((eds) => addEdge(connection, eds));
      addEdgeToStore(newEdge);
    },
    [setEdges, addEdgeToStore]
  );

  // 处理节点选择
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  // 处理画布点击(取消选择)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="w-full h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={16}
          size={1}
          color="#d1d5db"
        />
        <Controls 
          className="bg-white border border-gray-300 rounded-lg shadow-lg"
        />
        <MiniMap 
          className="bg-white border border-gray-300 rounded-lg shadow-lg"
          nodeColor={(node) => {
            switch (node.type) {
              case 'scene': return '#3b82f6';
              case 'combat': return '#ef4444';
              case 'choice': return '#eab308';
              case 'condition': return '#a855f7';
              case 'ending': return '#22c55e';
              default: return '#6b7280';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};
