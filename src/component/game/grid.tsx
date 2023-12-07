import React from "react";
import 'src/assets/styles/component/grid.scss';

export interface GridProps {
    grid: string[][];
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
    return (
        <div className="grid">
            {grid.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <div key={j} className="cell">
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}