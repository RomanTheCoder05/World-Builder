// src/components/NarrativeBuilder.js

import React from 'react';
import NodeEditor from './NodeEditor';

function NarrativeBuilder() {
  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    // Add more items as needed
  ];

  return (
    <div>
      <h1>Narrative Builder</h1>
      <NodeEditor items={items} />
    </div>
  );
}

export default NarrativeBuilder;
