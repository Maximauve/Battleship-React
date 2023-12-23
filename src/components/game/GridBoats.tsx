import React from "react";
import 'src/assets/styles/components/Grid.scss';
import Ship from "./Ship";
import {isVertical} from "src/config/grid";

export interface GridProps {
    grid: string[][]
    shipsIndexes: { [key: string]: { x: number, y: number }[] }
}

export const GridBoats: React.FC<GridProps> = ({ grid, shipsIndexes }) => {
    console.log('shipsIndexes : ', shipsIndexes)
    const renderShips = (shipsIndexes: { [key: string]: { x: number, y: number }[] }) => {
        return Object.keys(shipsIndexes).map((shipId) => {
            const shipCoordinates = shipsIndexes[shipId];
            const gridRowStart = Math.min(...shipCoordinates.map(coord => coord.y)) + 1;
            const gridRowEnd = Math.max(...shipCoordinates.map(coord => coord.y)) + 2;
            const gridColumnStart = Math.min(...shipCoordinates.map(coord => coord.x)) + 1;
            const gridColumnEnd = Math.max(...shipCoordinates.map(coord => coord.x)) + 2;

            return (
                <Ship key={shipId} id={shipId} length={shipCoordinates.length} isVertical={isVertical(shipCoordinates)} position={{ gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd }} pivotShip={pivotShip}/>
            );
        });
    };

  const pivotShip = (shipId: string) => {
    return shipId;
  }

    return (
        <div className="grid-wrapper">
            <div id="grid" className="grid playing in-game">
                {grid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((cell, j) => (
                            <div key={j} data-row={i} data-col={j} className={'cell ' + cell}></div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="grid placing in-game user-grid">
                {shipsIndexes && renderShips(shipsIndexes)}
            </div>
        </div>
    );
}