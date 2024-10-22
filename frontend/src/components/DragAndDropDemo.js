// src/components/DragAndDropDemo.js

import React, { useState } from 'react';
import DraggableItem from './DraggableItem';
import DroppableArea from './DroppableArea';
import styles from './DragAndDropDemo.module.css';

function DragAndDropDemo() {
  // Define your items here or fetch from a source
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  // State to keep track of dropped items
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (id) => {
    console.log(`Item with id ${id} was dropped.`);

    const item = items.find((item) => item.id === id);

    if (!item) {
      console.error(`Item with id ${id} not found.`);
      return;
    }

    // Check if the item is already in the droppedItems array
    setDroppedItems((prevItems) => {
      if (prevItems.find((droppedItem) => droppedItem.id === id)) {
        return prevItems; // Item is already dropped; do nothing
      }
      return [...prevItems, item];
    });
  };

  return (
    <div className={styles.dragAndDropContainer}>
      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.droppableContainer}>
        <DroppableArea onDrop={handleDrop} droppedItems={droppedItems} />
      </div>
    </div>
  );
}

export default DragAndDropDemo;
