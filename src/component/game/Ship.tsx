import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
	id: string;
	length: number;
	isVertical: boolean;
	position: { gridRowStart: number, gridRowEnd: number, gridColumnStart: number, gridColumnEnd: number };
}

const Ship: React.FC<Props> = ({ id, length, isVertical, position }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ship',
    item: { id, length, isVertical },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
  });

  return (
    <div
      ref={drag}
      className={`ship ${isVertical ? 'vertical' : 'horizontal'} ${isDragging ? 'dragging' : ''}`}
      style={{
        gridRow: `${position.gridRowStart}/${position.gridRowEnd}`,
        gridColumn: `${position.gridColumnStart}/${position.gridColumnEnd}`,
      }}
    ></div>
  );
};

export default Ship;
