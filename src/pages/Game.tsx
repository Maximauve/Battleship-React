import useTranslations from 'src/hooks/useTranslation';
import React, { useContext, useEffect, useState } from 'react';
import { GridDraggableBoats } from 'src/components/game/GridDraggableBoats';
import { emptyGrid, generateRandomFleet } from 'src/config/grid';
import { UserContext } from 'src/contexts/user/UserProvider';
import useSocket from 'src/hooks/useSocket';
import { GameStatus } from 'src/types/GameOptions';
import { UserRoom } from 'src/types/user/UserRoom';
import {useGameContext} from "src/contexts/members/MemberProvider";
import {BattlePlace} from "src/components/game/BattlePlace";
import {GridBoats} from "src/components/game/GridBoats";
import Button from 'src/components/Button';
import {useParams} from "react-router-dom";
import 'src/assets/styles/pages/Game.scss';


const Game: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [playerBoats, setPlayerBoats] = useState<string[][]>(emptyGrid);
	const [battlePlace, setBattlePlace] = useState<string[][]>(emptyGrid);
	const [gameStatus, setGameStatus] = useState<string>(GameStatus.PLACE_SHIPS);
	const [shipsIndexes, setShipsIndexes] = useState<{ [key: string]: { x: number, y: number }[] }>(generateRandomFleet());
	const [winner, setWinner] = useState<UserRoom | undefined>(undefined);
	const socket = useSocket();
	const [{ user }] = useContext(UserContext);
	const i18n = useTranslations();
	const { setMembers, myUser, setMyUser } = useGameContext();

	const placeShips = () => {
		console.log('placeShips : ', shipsIndexes)
		socket?.emitWithAck('placeShips', shipsIndexes).then((response: any) => {
			if (response.hasOwnProperty('error')) {
				console.log('error from placeShips : ', response.error);
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	const replay = () => {
		socket?.emitWithAck('replay', id).then((response: any) => {
			if (response.hasOwnProperty('error')) {
				console.log('error from replay : ', response.error);
			} else {
				setShipsIndexes(generateRandomFleet());
				setGameStatus(response.gameStatus);
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	useEffect(() => {
		socket?.on('connect', () => {
			console.log('connected');
			socket?.emitWithAck('joinRoom', id).then((response: any) => {
				if (response.hasOwnProperty('error')) {
					console.log('error from joinRoom : ', response.error);
				} else {
					setGameStatus(response.gameStatus);
				}
			}).catch((err) => {
				console.error(err);
			});
		})

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
			const me: UserRoom | undefined = members.find((member) => member.userId === user?.id)
			setMyUser(me);
		});

		socket?.on('winner', (winner: UserRoom) => {
			console.log("[GAME] winner : ", winner);
			setWinner(winner);
		});

		return () => {
			socket?.off('connect');
			socket?.off('gameStatus');
			socket?.off('playerBoats');
			socket?.off('battlePlace');
			socket?.off('shipsIndexes');
			socket?.off('members');
			socket?.off('winner');
		}
	}, [socket, myUser, user, setMyUser, setMembers]);

	if (gameStatus === GameStatus.ENDED) {
		return (
			<div className='game'>
				{winner && (
					<div>{i18n.t('game.winner', { username: winner.username })}</div>
				)}
				<Button text={i18n.t('game.replay')} onClick={() => replay()} />
			</div>
		);
	}

	if (gameStatus === GameStatus.PLACE_SHIPS) {
		return (
			<div className='game'>
				<h1>{i18n.t('game.h1')}</h1>
				{user && (
					<p>{i18n.t('game.userIsOnline', { username: user.username })}</p>
				)}
				<GridDraggableBoats grid={playerBoats} shipsIndexes={shipsIndexes} setShipsIndexes={setShipsIndexes}/>
				<Button onClick={() => placeShips()} text={i18n.t('game.validateShips')} />
			</div>
		);
	}
	// else gameStatus === GameStatus.PLAY
	return (
		<div className='game'>
			<div className='who-turn'>
				{myUser?.hasToPlay && <p>{i18n.t('game.yourTurn')}</p>}
			</div>
			<BattlePlace grid={battlePlace} />
			<GridBoats grid={playerBoats} shipsIndexes={shipsIndexes}/>
		</div>
	);
};

export default Game;