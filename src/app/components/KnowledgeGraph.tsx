"use client"

import { ReactFlow, Background, Controls } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

const initialNodes = [
  { id: '1', position: { x: 50, y: 150 }, data: { label: 'ASHA Core' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
  { id: '2', position: { x: 200, y: 50 }, data: { label: 'Memory' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
  { id: '3', position: { x: 200, y: 250 }, data: { label: 'Vector DB' }, style: { background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '8px' } },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#0ea5e9' } }
];

export function KnowledgeGraph() {
  return (
    <div className="w-full h-full">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView className="bg-slate-950/50">
        <Background color="#334155" gap={16} />
        <Controls className="!bg-slate-900 !border-slate-800 [&>button]:!border-b-slate-800 [&>button]:!bg-slate-900 [&>button>svg]:!fill-slate-400" />
      </ReactFlow>
    </div>
  )
}
