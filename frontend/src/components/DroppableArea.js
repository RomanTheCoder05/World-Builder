// src/components/DroppableArea.js

import React from 'react';
import { useDrop } from 'react-dnd';
import styles from './DroppableArea.module.css';

function DroppableArea({ onDrop, droppedItems }) {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'ITEM',
    drop: (item) => {
      onDrop(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`${styles.droppableArea} ${isOver ? styles.over : ''}`}
    >
      <h2>Drop Items Here</h2>
      {droppedItems.map((item) => (
        <div key={item.id} className={styles.droppedItem}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default DroppableArea;
