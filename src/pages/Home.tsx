import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redis from 'src/config/redis';
import { UserContext } from 'src/contexts/user/UserProvider';
import { RoomOptions } from 'src/types/RoomOptions';
import useTranslation from 'src/hooks/useTranslation';
import 'src/assets/styles/pages/Home.scss';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import {ErrorContext} from "../contexts/error/ErrorProvider";

const Home: React.FC = () => {
	const [{ user }] = useContext(UserContext);
	const [roomName, setRoomName] = useState<string>('');
	const { setError } = useContext(ErrorContext);
	const navigate = useNavigate();
	const i18n = useTranslation();

	useEffect(() => {
		console.log('i18n => ', i18n);
	}, [i18n]);

	const createRoom = () => {
		if (!user) {
			navigate('/login');
			return;
		}
		const obj: RoomOptions = {
			userId: user.id,
			username: user.username,
			socketId: null
		};
		redis.createRoom(obj, user).then((res) => {
			navigate(`/game/lobby/${res.slug}`);
		}).catch((err: any) => {
			console.log("ERROR HOME => ", err);
			setError(err.message)
		});
	}

	const joinRoom = (room: string) => {
		if (!user) {
			navigate('/login');
			return;
		}
		navigate(`/game/lobby/${room}`);
	}

  return (
    <div className='home'>
			<h1>{i18n.t('home.h1')}</h1>
			{user && <div>{i18n.t('home.greetUser', {username: user.username})}</div>}
			<Button text={i18n.t('home.createGame')} onClick={() => createRoom()} />
			<Input type='text' text={i18n.t('home.joinInput')} value={roomName} onChange={(event) => setRoomName(event.target.value)} placeholder={i18n.t('home.joinInput')} />
			<Button text={i18n.t('home.joinGame')} onClick={() => joinRoom(roomName)} />
    </div>
  );
}

export default Home;