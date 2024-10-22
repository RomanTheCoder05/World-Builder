// src/components/DraggableItem.js

import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableItem({ item }) {
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: 'ITEM',
      item: { id: item.id },
      canDrag: () => item.draggable, // Determine if the item is draggable
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item] // Dependencies array
  );

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={item.draggable ? dragRef : null}
      style={{ opacity, cursor: item.draggable ? 'move' : 'default' }}
    >
      {item.name}
    </div>
  );
}

export default DraggableItem;
