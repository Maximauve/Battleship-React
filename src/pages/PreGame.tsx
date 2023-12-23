import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from 'src/contexts/user/UserProvider';
import useSocket from 'src/hooks/useSocket';
import { GameStatus } from 'src/types/GameOptions';
import { UserRoom } from 'src/types/user/UserRoom';
import {useGameContext} from "../contexts/members/MemberProvider";
import Button from 'src/components/Button';
import {ErrorContext} from "../contexts/error/ErrorProvider";
import useTranslations from 'src/hooks/useTranslation';
import 'src/assets/styles/pages/PreGame.scss';

const PreGame: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [{ user }] = useContext(UserContext);
	const socket = useSocket();
	const { setError } = useContext(ErrorContext);
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.UNSTARTED);
	const { members, setMembers, setMyUser } = useGameContext();
	const i18n = useTranslations();

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
		if (id === undefined || id === '') {
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
	}, [gameStatus, id, navigate, setError, setMembers, setMyUser, socket, user]);

	return (
		<div className='pre-game'>
			<h1>{i18n.t('pregame.h1')}</h1>
			{members && members.map((member) => {
				return (
					<div key={member.userId}>
						{member.username}
					</div>
				);
			})}
			<Button text={i18n.t('pregame.startGame')} onClick={() => startGame()} disabled={members.length != 2} />
		</div>
	);
}

export default PreGame;