import React, { useState } from 'react';
import { calculateNodePositions, createConnections } from './utils/layoutCalculator';

const MindMapVisualizer = ({ data }) => {
  const [transform, setTransform] = useState({ x: 400, y: 300, scale: 1 });
  
  if (!data) return null;

  // Generate all node positions
  const nodePositions = calculateNodePositions(data, 0, 0, -Math.PI, Math.PI);
  const connections = createConnections(data, nodePositions);

  return (
    <div className="w-full h-96 border rounded-lg overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="bg-white"
      >
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Draw connections */}
          {connections.map(conn => (
            <line
              key={conn.id}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="#CBD5E0"
              strokeWidth="2"
            />
          ))}

          {/* Draw nodes */}
          {nodePositions.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={node.level === 0 ? 40 : 30}
                fill={node.level === 0 ? "#3B82F6" : "#60A5FA"}
                opacity="0.9"
              />
              <text
                textAnchor="middle"
                dy=".3em"
                fill="white"
                fontSize={node.level === 0 ? "14px" : "12px"}
                className="select-none"
              >
                {node.text}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default MindMapVisualizer;
