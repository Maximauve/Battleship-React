import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'src/contexts/user/UserProvider';
import useSocket from 'src/hooks/useSocket';
import { GameStatus } from 'src/types/GameOptions';
import { UserRoom } from 'src/types/user/UserRoom';
import {useGameContext} from "../contexts/members/MemberProvider";

const PreGame: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [{ user }] = useContext(UserContext);
	const socket = useSocket();
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
		if (!user) {
			navigate('/login');
			return;
		} else if (id === undefined) {
			navigate('/');
		} else if (gameStatus !== GameStatus.UNSTARTED) {
			navigate(`/game/${id}`);
		}

		socket?.on('connect', () => {
			console.log('connected');
			socket?.emitWithAck('joinRoom', id).then((response: any) => {
				if (response.hasOwnProperty('error')) {
					console.log('error from joinRoom : ', response.error);
				} else {
					console.log('joined room : response : ', response);
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
			<button onClick={() => startGame()}>Start Game</button>
		</>
	);
}

export default PreGame;