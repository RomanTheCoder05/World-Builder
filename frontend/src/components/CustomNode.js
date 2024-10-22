// src/components/CustomNode.js

import React from 'react';
import { Handle } from 'react-flow-renderer';
import tags from '../config/tags'; // Import the tags

function CustomNode({ data }) {
  const nodeStyle = {
    padding: '10px',
    backgroundColor: tags[data.tag] || '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
    color: '#fff', // Text color for contrast
    width: '150px',
  };

  return (
    <div style={nodeStyle}>
      <Handle type="target" position="top" />
      <div>{data.label}</div>
      {data.file && data.file.type.startsWith('image/') && (
        <img
          src={URL.createObjectURL(data.file)}
          alt={data.label}
          style={{ width: '100%', marginTop: '10px' }}
        />
      )}
      <Handle type="source" position="bottom" />
    </div>
  );
}

export default CustomNode;
