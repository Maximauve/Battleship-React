import React from "react";
import 'src/assets/styles/component/Grid.scss';

export interface GridProps {
    grid: string[][]
		shipsIndexes?: { [key: string]: { x: number, y: number }[] }
}

export const Grid: React.FC<GridProps> = ({ grid, shipsIndexes }) => {

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
				<div
					key={shipId}
					className="ship"
					style={{
						gridRow: `${gridRowStart}/${gridRowEnd}`,
						gridColumn: `${gridColumnStart}/${gridColumnEnd}`
					}}
				></div>
			);
		});
	};

	return (
			<div className="grid-wrapper">
					<div className="grid playing">
							{grid.map((row, i) => (
									<div key={i} className="row">
											{row.map((cell, j) => (
													<div key={j} className={ 'cell ' + cell }></div>
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