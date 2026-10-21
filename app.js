// Color Definitions matching the visual style
const categoryColors = {
  core: { background: '#D2D7F0', border: '#7C83C3' },      // Purple / Slate Blue
  math: { background: '#FCEEA7', border: '#D9B44A' },      // Yellow / Gold
  elective: { background: '#EAEAEA', border: '#B0B0B0' }   // Gray / Neutral
};

let selectedNodeId = null;
let network = null;
let nodesDataSet = new vis.DataSet();
let edgesDataSet = new vis.DataSet();

function initNetwork() {
  const container = document.getElementById('network-container');

  // Format nodes for Vis-Network
  const formattedNodes = courseData.nodes.map(node => ({
    id: node.id,
    label: `${node.code}\n${node.title}`,
    level: node.level,
    color: categoryColors[node.category] || categoryColors.elective,
    shape: 'box',
    margin: 12,
    font: { face: 'Inter, system-ui, sans-serif', size: 12, multi: true },
    borderWidth: 2,
    shadow: { enabled: true, color: 'rgba(0,0,0,0.05)', size: 5, x: 2, y: 2 }
  }));

  // Format edges for Vis-Network
  const formattedEdges = courseData.edges.map(edge => ({
    from: edge.from,
    to: edge.to,
    arrows: 'to',
    dashes: edge.dashes || false,
    color: { color: edge.type === 'recommended' ? '#94a3b8' : '#475569', highlight: '#2563eb' },
    width: edge.type === 'recommended' ? 1.5 : 2
  }));

  nodesDataSet.add(formattedNodes);
  edgesDataSet.add(formattedEdges);

  const data = { nodes: nodesDataSet, edges: edgesDataSet };
  const options = {
    layout: {
      hierarchical: {
        direction: 'LR',
        sortMethod: 'directed',
        levelSeparation: 220,
        nodeSpacing: 70
      }
    },
    physics: false,
    interaction: { hover: true, dragNodes: true, zoomView: true }
  };

  network = new vis.Network(container, data, options);

  // Click & Selection handlers
  network.on('selectNode', (params) => {
    if (params.nodes.length > 0) {
      showDetails(params.nodes[0]);
    }
  });

  network.on('deselectNode', () => {
    hideDetails();
  });
}

function showDetails(nodeId) {
  selectedNodeId = nodeId;
  const node = courseData.nodes.find(n => n.id === nodeId);
  
  // Find direct prerequisites from incoming edges
  const prereqIds = courseData.edges.filter(e => e.to === nodeId).map(e => e.from);
  const prereqCodes = prereqIds.map(id => {
    const item = courseData.nodes.find(n => n.id === id);
    return item ? item.code : id;
  });

  document.getElementById('course-code').innerText = node.code;
  document.getElementById('course-title').innerText = node.title;
  document.getElementById('course-id').innerText = node.id;

  const typeBadge = document.getElementById('course-type');
  typeBadge.innerText = node.category;
  typeBadge.className = `text-xs uppercase tracking-wider font-semibold px-2 py-1 rounded ${
    node.category === 'core' ? 'bg-indigo-100 text-indigo-800' :
    node.category === 'math' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
  }`;

  document.getElementById('course-prereqs').innerText = node.prereqText 
    ? node.prereqText 
    : (prereqCodes.length > 0 ? prereqCodes.join(', ') : 'None');

  document.getElementById('detail-panel').classList.remove('hidden');
}

function hideDetails() {
  selectedNodeId = null;
  document.getElementById('detail-panel').classList.add('hidden');
}

function setCourseStatus(status) {
  if (!selectedNodeId) return;

  const targetNode = courseData.nodes.find(n => n.id === selectedNodeId);
  const statusColors = {
    completed: { background: '#D1FAE5', border: '#10B981' },
    planned: { background: '#FEF3C7', border: '#F59E0B' },
    none: categoryColors[targetNode.category] || categoryColors.elective
  };

  nodesDataSet.update({ id: selectedNodeId, color: statusColors[status] });
}

function filterCategory(category) {
  if (category === 'all') {
    nodesDataSet.forEach(node => nodesDataSet.update({ id: node.id, hidden: false }));
  } else {
    courseData.nodes.forEach(node => {
      nodesDataSet.update({ id: node.id, hidden: node.category !== category });
    });
  }
}

function resetGraph() {
  document.getElementById('filter-category').value = 'all';
  filterCategory('all');
  network.fit();
  hideDetails();
}

window.addEventListener('DOMContentLoaded', initNetwork);
