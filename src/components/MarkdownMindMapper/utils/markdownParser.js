// markdownParser.js
export const parseMarkdown = (text) => {
  const lines = text.split('\n');
  const tree = { id: 'root', children: [], text: 'Root' };
  let currentLevel = 0;
  let currentNode = tree;
  let nodeStack = [tree];

  lines.forEach((line, index) => {
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, '');
      
      while (nodeStack.length > level) nodeStack.pop();
      currentNode = nodeStack[nodeStack.length - 1];
      
      const newNode = {
        id: `node-${index}`,
        text,
        children: [],
        level
      };
      
      currentNode.children.push(newNode);
      nodeStack.push(newNode);
    } else if (line.trim().startsWith('-')) {
      const text = line.replace(/^-\s*/, '');
      currentNode.children.push({
        id: `leaf-${index}`,
        text,
        children: [],
        level: currentNode.level + 1
      });
    }
  });

  return tree;
};
