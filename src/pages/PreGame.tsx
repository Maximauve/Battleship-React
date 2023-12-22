import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'src/contexts/user/UserProvider';
import useSocket from 'src/hooks/useSocket';
import { GameStatus } from 'src/types/GameOptions';
import { UserRoom } from 'src/types/user/UserRoom';
import {useGameContext} from "../contexts/members/MemberProvider";
import Button from 'src/components/Button';
import {ErrorContext} from "../contexts/error/ErrorProvider";

const PreGame: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [{ user }] = useContext(UserContext);
	const socket = useSocket();
	const { setError } = useContext(ErrorContext);
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.UNSTARTED);
	const { members, setMembers, setMyUser } = useGameContext();

	const startGame = () => {
		socket?.emitWithAck('startGame', id).then((response: any) => {
			if (response.hasOwnProperty('error')) {
				console.log('error from startGame : ', response.error);
			}
		}).catch((err) => {
			console.error(err);
		});
	}

	useEffect(() => {
		if (id === undefined) {
			navigate('/');
		} else if (gameStatus !== GameStatus.UNSTARTED) {
			navigate(`/game/${id}`);
		}

		socket?.on('connect', () => {
			socket?.emitWithAck('joinRoom', id).then((response: any) => {
				if (response.hasOwnProperty('error')) {
					console.log('error from joinRoom : ', response.error);
					setError(response.error);
					navigate('/')
				} else {
					setGameStatus(response.gameStatus);
				}
			}).catch((err) => {
				console.error(err);
			});
		})

		socket?.on('members', (newMembers: UserRoom[]) => {
			setMembers(newMembers);
			console.log('myUser : ', newMembers.find((member) => member.socketId === socket?.id));
			const me = newMembers.find((member) => member.socketId === socket?.id);
			setMyUser(me);
		});

		socket?.on('gameStatus', (status: GameStatus) => {
			console.log('gameStatus : ', status);
			setGameStatus(status);
		});

		return () => {
			socket?.off('connect');
			socket?.off('members');
			socket?.off('gameStatus');
		}
	}, [gameStatus, id, navigate, socket, user]);

	return (
		<>
			<h1>PreGame</h1>
			{members && members.map((member) => {
				return (
					<div key={member.userId}>
						{member.username}
					</div>
				);
			})}
			<Button text="Lancer" onClick={() => startGame()} />
		</>
	);
}

export default PreGame;