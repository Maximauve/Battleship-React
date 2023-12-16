import React from 'react';
import { useDrag } from 'react-dnd';
import {GridCoordinate} from "../../types/game/Coordinate";

interface Props {
	id: string;
	length: number;
	isVertical: boolean;
	position: GridCoordinate;
  pivotShip: (shipId: string) => void;
}

const Ship: React.FC<Props> = ({ id, length, isVertical, position, pivotShip }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ship',
    item: { id, length, isVertical, position },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div onClick={() => pivotShip(id)}
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
