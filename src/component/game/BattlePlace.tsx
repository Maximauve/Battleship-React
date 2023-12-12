import React, {useRef} from "react";
import 'src/assets/styles/component/Grid.scss';
import {useGameContext} from "../../contexts/members/MemberProvider";
import useSocket from "../../hooks/useSocket";
export interface GridProps {
    grid: string[][]
}

export const BattlePlace: React.FC<GridProps> = ({ grid }) => {
    const gridRef = useRef<HTMLDivElement | null>(null)

    const { myUser } = useGameContext();
    const socket = useSocket();

    const shootBoat = (event: any) => {
        const { clientX, clientY } = event;
        if (gridRef.current) {
            const gridRect = gridRef.current.getBoundingClientRect();
            const relativeX = clientX - gridRect.left - (2 * window.innerWidth / 100);
            const relativeY = clientY - gridRect.top - (2 * window.innerWidth / 100);
            const y: number = Math.floor(relativeY / (50 + 5));
            const x: number = Math.floor(relativeX / (50 + 5));
            if (myUser?.hasToPlay) {
                socket?.emitWithAck('shoot', { x, y }).then((response: any) => {
                    if (response.hasOwnProperty('error')) {
                        console.log('[SHOOT] :', response.error);
                    }
                }).catch((err) => {
                    console.error("[SHOOT] : ", err);
                });
            }
        }
    }

    return (
        <div className="grid-wrapper">
            <div id="grid" className="grid playing" onClick={shootBoat} ref={(node) => {
                gridRef.current = node;
            }}>
                {grid.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((cell, j) => (
                            <div key={j} data-row={i} data-col={j} className={'cell ' + cell}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}