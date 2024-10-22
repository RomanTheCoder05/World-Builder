// src/components/NodeEditor.js

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,
} from 'react-flow-renderer';
import CustomNode from './CustomNode';
import FileUploader from './FileUploader'; // Import the FileUploader component
import styles from './NodeEditor.module.css';
import tags from '../config/tags'; // Import the tags configuration

const nodeTypes = {
  customNode: CustomNode,
};

function NodeEditor({ items }) {
  const [elements, setElements] = useState([]);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [itemQueue, setItemQueue] = useState([]);

  // Function to handle item clicks
  const addNode = (item) => {
    setItemQueue((prevQueue) => [...prevQueue, item]);
  };

  // Handle tag selection and create the node
  const handleTagSelect = (tag) => {
    const item = itemQueue[0];
    const newNode = {
      id: `node_${Date.now()}`,
      data: { label: item.name, tag, file: item.file },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      type: 'customNode',
    };
    setElements((els) => els.concat(newNode));
    setItemQueue((prevQueue) => prevQueue.slice(1));
  };

  // Open the tag modal when there are items in the queue
  useEffect(() => {
    if (itemQueue.length > 0) {
      setIsTagModalOpen(true);
    } else {
      setIsTagModalOpen(false);
    }
  }, [itemQueue]);

  // Function to handle files uploaded via the FileUploader
  const handleFilesUploaded = (files) => {
    const items = files.map((file) => ({ name: file.name, file }));
    setItemQueue((prevQueue) => [...prevQueue, ...items]);
  };

  // Function to handle connections between nodes
  const onConnect = useCallback(
    (params) => setElements((els) => addEdge({ ...params, animated: true }, els)),
    []
  );

  return (
    <div className={styles.container}>
      {/* Sidebar with items and file uploader */}
      <div className={styles.sidebar}>
        <h3>Items</h3>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={() => addNode(item)}
          >
            {item.name}
          </div>
        ))}

        {/* Add the FileUploader component */}
        <h3>Upload Files</h3>
        <FileUploader onFilesUploaded={handleFilesUploaded} />
      </div>

      {/* Node Editor */}
      <div className={styles.nodeEditor}>
        <ReactFlowProvider>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementsRemove={(elementsToRemove) =>
              setElements((els) => els.filter((el) => !elementsToRemove.includes(el)))
            }
            deleteKeyCode={46} // 'Delete' key
            defaultZoom={1}
            snapToGrid={true}
            snapGrid={[15, 15]}
          >
            <MiniMap nodeStrokeColor="#888" nodeColor="#ddd" nodeBorderRadius={2} />
            <Controls />
            <Background color="#eee" gap={16} />

            {/* Tag Selection Modal */}
            {isTagModalOpen && (
              <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                  <h3>Select a Tag</h3>
                  {Object.keys(tags).map((tag) => (
                    <button
                      key={tag}
                      className={styles.tagButton}
                      style={{ backgroundColor: tags[tag] }}
                      onClick={() => handleTagSelect(tag)}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </button>
                  ))}
                  <button
                    className={styles.cancelButton}
                    onClick={() => setItemQueue((prevQueue) => prevQueue.slice(1))}
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default NodeEditor;
