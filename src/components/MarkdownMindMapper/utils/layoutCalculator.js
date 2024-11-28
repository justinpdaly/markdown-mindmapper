// layoutCalculator.js
export const calculateNodePositions = (node, angle, distance, startAngle, endAngle) => {
  const positions = [];
  
  // Calculate this node's position
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  positions.push({
    id: node.id,
    x,
    y,
    text: node.text,
    level: node.level || 0
  });

  // Calculate children positions
  if (node.children && node.children.length > 0) {
    const angleStep = (endAngle - startAngle) / node.children.length;
    const newDistance = distance + 120;

    node.children.forEach((child, index) => {
      const childStartAngle = startAngle + angleStep * index;
      const childAngle = childStartAngle + angleStep / 2;
      const childPositions = calculateNodePositions(
        child,
        childAngle,
        newDistance,
        childStartAngle,
        childStartAngle + angleStep
      );
      positions.push(...childPositions);
    });
  }

  return positions;
};

export const createConnections = (data, nodePositions) => {
  const connections = [];
  const processNode = (node, parentX = 0, parentY = 0) => {
    const nodePos = nodePositions.find(pos => pos.id === node.id);
    if (!nodePos) return;

    if (node.id !== data.id) {
      connections.push({
        id: `${node.id}-connection`,
        x1: parentX,
        y1: parentY,
        x2: nodePos.x,
        y2: nodePos.y
      });
    }

    if (node.children) {
      node.children.forEach(child => {
        processNode(child, nodePos.x, nodePos.y);
      });
    }
  };

  processNode(data);
  return connections;
};
