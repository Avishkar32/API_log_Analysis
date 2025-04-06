import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const DependencyGraph = ({ data, currentService }) => {
  const nodes = useMemo(() => {
    const uniqueServices = new Set();
    uniqueServices.add(currentService);
    data.forEach(dep => {
      uniqueServices.add(dep.from);
      uniqueServices.add(dep.to);
    });

    return Array.from(uniqueServices).map((service, index) => ({
      id: service,
      data: { label: service },
      position: { x: index * 200, y: index % 2 === 0 ? 0 : 100 },
      style: {
        background: service === currentService ? '#2c3e50' : '#6366f1',
        color: 'white',
        padding: 10,
        borderRadius: 5,
      },
    }));
  }, [data, currentService]);

  const edges = useMemo(() => {
    return data.map((dep, index) => ({
      id: `e${index}`,
      source: dep.from,
      target: dep.to,
      label: `${dep.requests} reqs`,
      animated: dep.requests > 50,
    }));
  }, [data]);

  return (
    <div style={{ height: 300, border: '1px solid #ddd', borderRadius: 5 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DependencyGraph;