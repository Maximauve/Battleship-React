import useTranslations from 'src/hooks/useTranslation';
import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'src/component/game/Grid';
import { emptyGrid } from 'src/config/grid';
import { UserContext } from 'src/contexts/user/UserProvider';
import useSocket from 'src/hooks/useSocket';
import { GameStatus } from 'src/types/GameOptions';
import { UserRoom } from 'src/types/user/UserRoom';

const Game: React.FC = () => {
	const [playerBoats, setPlayerBoats] = useState<string[][]>(emptyGrid);
	const [battlePlace, setBattlePlace] = useState<string[][]>(emptyGrid);
	const [gameStatus, setGameStatus] = useState<string>(GameStatus.PLACE_SHIPS);
	const [members, setMembers] = useState<UserRoom[]>([]);
	const [shipsIndexes, setShipsIndexes] = useState<{ [key: string]: { x: number, y: number }[] }>({});
	const socket = useSocket();
	const [{ user }] = useContext(UserContext);

	const i18n = useTranslations();

	useEffect(() => {
		socket?.on('gameStatus', (status: GameStatus) => {
			console.log("[GAME] gameStatus : ", status);
			setGameStatus(status);
		});
		
		socket?.on('playerBoats', (grid: string[][]) => {
			console.log("[GAME] playerBoats : ", grid);
			setPlayerBoats(grid);
		});
		
		socket?.on('battlePlace', (grid: string[][]) => {
			console.log("[GAME] battlePlace : ", grid);
			setBattlePlace(grid);
		});

		socket?.on('shipsIndexes', (shipsIndexes: { [key: string]: { x: number, y: number }[] }) => {
			console.log("[GAME] shipsIndexes : ", shipsIndexes);
			setShipsIndexes(shipsIndexes);
		});

		socket?.on('members', (members: UserRoom[]) => {
			console.log("[GAME] members : ", members);
			setMembers(members);
		});
	}, [socket]);

	if (gameStatus === GameStatus.PLACE_SHIPS) {
		return (
			<div>
				<h1>Game</h1>
				{user && <div>{user.username} est connecté !</div>}
				<Grid grid={playerBoats} shipsIndexes={shipsIndexes}/>
			</div>
		);
	}
	// else gameStatus === GameStatus.PLAY
	return (
		<div>PLAY</div>
	);
};

export default Game;