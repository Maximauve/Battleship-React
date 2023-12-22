import React, {useRef} from "react";
import 'src/assets/styles/component/Grid.scss';
import {useGameContext} from "../../contexts/members/MemberProvider";
import useSocket from "../../hooks/useSocket";
import hitMp3 from '/hit.mp3';
import destroyMp3 from '/destroy.mp3';
export interface GridProps {
    grid: string[][]
}

export const BattlePlace: React.FC<GridProps> = ({ grid }) => {
    const gridRef = useRef<HTMLDivElement | null>(null)

    const { myUser } = useGameContext();
    const socket = useSocket();
    
    enum Audios {
        hit = 'hit',
        destroy = 'destroy'
    }
    const audio = {
        hit: new Audio(hitMp3),
        destroy: new Audio(destroyMp3)
    };

    const POUM = (key: Audios) => {
        console.log('playing audio : ', key);
        audio[key].play();
    }

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
                    console.log('[SHOOT] :', response);
                    if (response.hasOwnProperty('error')) {
                        console.log('[SHOOT] :', response.error);
                    } else if (response === 'H') {
                            POUM(Audios.hit);
                    } else if (response === 'D') {
                        POUM(Audios.destroy);
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