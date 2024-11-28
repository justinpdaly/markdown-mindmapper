import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import MindMapVisualizer from './MindMapVisualizer';
import { parseMarkdown } from './utils/markdownParser';

const MarkdownMindMapper = () => {
  const [markdown, setMarkdown] = useState('# Main Topic\n## Subtopic 1\n- Point A\n- Point B\n## Subtopic 2\n- Point C\n- Point D');
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const tree = parseMarkdown(markdown);
    setTreeData(tree);
  }, [markdown]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Markdown Mind Mapper</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Markdown Input</h2>
          <textarea
            className="w-full h-64 p-2 border rounded font-mono"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Enter your markdown here..."
          />
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Tree Preview</h2>
          <div className="border rounded h-64 p-2 overflow-auto font-mono text-sm">
            <pre>{JSON.stringify(treeData, null, 2)}</pre>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Mind Map Visualization</h2>
        <MindMapVisualizer data={treeData} />
      </Card>
    </div>
  );
};

export default MarkdownMindMapper;
