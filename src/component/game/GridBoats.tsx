import React, { useState } from "react";
import 'src/assets/styles/component/Grid.scss';
import Ship from "./Ship";
import { isVertical } from "src/config/grid";
import { Coordinate } from "src/types/game/Coordinate";
import { useDrop } from "react-dnd";

export interface GridProps {
	grid: string[][]
	shipsIndexes?: { [key: string]: { x: number, y: number }[] }
}

export const GridBoats: React.FC<GridProps> = ({ grid, shipsIndexes }) => {
	const [shipsState, setShipsState] = useState(shipsIndexes);


	// const shipsIndexes: { [key: string]: { x: number, y: number }[] } = {
	//   1 : [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }],
	//   2 : [{ x: 2, y: 8 }, { x: 3, y: 8 }, { x: 4, y: 8 }, { x: 5, y: 8 }],
	//   3 : [{ x: 7, y: 1 }, { x: 7, y: 2 }, { x: 7, y: 3 }],
	// 	4 : [{ x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }],
	// 	5 : [{ x: 2, y: 1 }, { x: 3, y: 1 }],
	// };

	const renderShips = (shipsIndexes: { [key: string]: { x: number, y: number }[] }) => {
		return Object.keys(shipsIndexes).map((shipId) => {
			const shipCoordinates = shipsIndexes[shipId];
			const gridRowStart = Math.min(...shipCoordinates.map(coord => coord.y)) + 1;
			const gridRowEnd = Math.max(...shipCoordinates.map(coord => coord.y)) + 2;
			const gridColumnStart = Math.min(...shipCoordinates.map(coord => coord.x)) + 1;
			const gridColumnEnd = Math.max(...shipCoordinates.map(coord => coord.x)) + 2;

			return (
				<Ship key={shipId} id={shipId} length={shipCoordinates.length} isVertical={isVertical(shipCoordinates)} position={{ gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd }} />
			);
		});
	};

	const moveShip = (shipId: string, newRow: number, newCol: number) => {
		const updatedShips = { ...shipsState };
		const shipCoordinates = updatedShips[shipId];

		console.log(shipCoordinates)
		// Calculez le décalage nécessaire pour déplacer le bateau à sa nouvelle position
		const rowOffset = newRow - shipCoordinates[0].y;
		const colOffset = newCol - shipCoordinates[0].x;

		console.log(rowOffset, colOffset)
		// Mettez à jour les coordonnées de chaque partie du bateau
		updatedShips[shipId] = shipCoordinates.map((coord: Coordinate) => ({
			x: coord.x + colOffset,
			y: coord.y + rowOffset,
		}));

		// Mettez à jour l'état avec les nouvelles coordonnées du bateau
		setShipsState(updatedShips);
	};

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: 'ship',
		drop: (item: { id: string, length: number, isVertical: boolean }, monitor) => {
			const droppedOnCell = monitor.getClientOffset();
			if (droppedOnCell) {
				const row = Math.floor(droppedOnCell.y / 50) - 6; // 40px est la taille de la cellule
				const col = Math.floor(droppedOnCell.x / 50) - 8;
				console.log(row, col)
				moveShip(item.id, row, col);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});


	return (
		<div className="grid-wrapper">
			<div className={`grid playing ${canDrop && isOver ? 'drop-hover' : ''}`} ref={drop}>
				{grid.map((row, i) => (
					<div key={i} className="row">
						{row.map((cell, j) => (
							<div key={j} className={'cell ' + cell + (canDrop && isOver ? 'drop-hover' : '')}></div>
						))}
					</div>
				))}
			</div>
			<div className="grid placing">
				{shipsState && renderShips(shipsState)}
			</div>
		</div>
	);
}