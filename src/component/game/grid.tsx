import React from "react";
import 'src/assets/styles/component/grid.scss';

export interface GridProps {
    grid: string[][];
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
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
                <div className="ship" style={{ gridRow: "1/3", gridColumn: "1" }}></div>
                <div className="ship" style={{ gridRow: "5", gridColumn: "2/5" }}></div>
                <div className="ship" style={{ gridRow: "10", gridColumn: "5/9" }}></div>
                <div className="ship" style={{ gridRow: "8/10", gridColumn: "4" }}></div>
                <div className="ship" style={{ gridRow: "5/9", gridColumn: "10" }}></div>
            </div>
        </div>
    );
}