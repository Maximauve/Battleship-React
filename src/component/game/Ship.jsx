import React from 'react';
import { useDrag } from 'react-dnd';

const Ship = ({ length, isVertical, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ship',
    item: { id: 'ship', length, isVertical },
  });

  return (
    <div
      ref={drag}
      className={`ship ${isVertical ? 'vertical' : 'horizontal'} ${isDragging ? 'dragging' : ''}`}
      style={{
        gridRow: `${position.y + 1}/${position.y + 1 + (isVertical ? length : 1)}`,
        gridColumn: `${position.x + 1}/${position.x + 1 + (isVertical ? 1 : length)}`,
      }}
    ></div>
  );
};

export default Ship;
