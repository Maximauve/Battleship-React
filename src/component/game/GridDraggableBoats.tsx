import React, {useRef} from "react";
import 'src/assets/styles/component/Grid.scss';
import Ship from "./Ship";
import {canMove, isVertical} from "src/config/grid";
import {Coordinate, GridCoordinate} from "src/types/game/Coordinate";
import { useDrop } from "react-dnd";

export interface GridProps {
	grid: string[][]
	shipsIndexes: { [key: string]: { x: number, y: number }[] }
	setShipsIndexes: (shipIndexes: { [key: string]: { x: number, y: number }[] }) => void
}

export const GridDraggableBoats: React.FC<GridProps> = ({ grid, shipsIndexes, setShipsIndexes }) => {
	const gridRef = useRef<HTMLDivElement | null>(null)

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

	const moveShip = (shipId: string, initialRow: number, initialCol: number, newRow: number, newCol: number) => {
		const updatedShips = { ...shipsIndexes };
		const shipCoordinates = updatedShips[shipId];

		// Calculez le décalage nécessaire pour déplacer le bateau à sa nouvelle position
		const rowOffset = newRow - initialRow;
		const colOffset = newCol - initialCol;

		// Mettez à jour les coordonnées de chaque partie du bateau
		updatedShips[shipId] = shipCoordinates.map((coord: Coordinate) => ({
			x: coord.x + colOffset,
			y: coord.y + rowOffset,
		}));

		if (canMove(updatedShips)) {
			setShipsIndexes(updatedShips);
		}
	};

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: 'ship',
		drop: (item: { id: string, length: number, isVertical: boolean, position: GridCoordinate }, monitor) => {

			if (gridRef.current) {
				const gridRect = gridRef.current.getBoundingClientRect();
				const clientOffset = monitor.getClientOffset();
				const initialSourceClientOffset = monitor.getInitialClientOffset();

				let initialRow: number;
				let initialCol: number;
				let newRow: number;
				let newCol: number;

				if (initialSourceClientOffset) {
					const relativeX = initialSourceClientOffset.x - gridRect.left - (2 * window.innerWidth / 100);
					const relativeY = initialSourceClientOffset.y - gridRect.top - (2 * window.innerWidth / 100);

					initialCol = Math.floor(relativeX / (50 + 5));
					initialRow = Math.floor(relativeY / (50 + 5));
				}

				if (clientOffset) {
					const relativeX = clientOffset.x - gridRect.left - (2 * window.innerWidth / 100);
					const relativeY = clientOffset.y - gridRect.top - (2 * window.innerWidth / 100);

					newRow = Math.floor(relativeY / (50 + 5));
					newCol = Math.floor(relativeX / (50 + 5));
				}
				moveShip(item.id, initialRow!, initialCol!, newRow!, newCol!);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});


	return (
		<div className="grid-wrapper">
			<div id="grid" className={`grid playing ${canDrop && isOver ? 'drop-hover' : ''}`} ref={(node) => {
				gridRef.current = node;
				drop(node);
			}}>
				{grid.map((row, i) => (
					<div key={i} className="row">
						{row.map((cell, j) => (
							<div key={j} data-row={i} data-col={j} className={'cell ' + cell + (canDrop && isOver ? 'drop-hover' : '')}></div>
						))}
					</div>
				))}
			</div>
			<div className="grid placing">
				{shipsIndexes && renderShips(shipsIndexes)}
			</div>
		</div>
	);
}