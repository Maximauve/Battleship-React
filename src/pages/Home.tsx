import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redis from 'src/config/redis';
import { UserContext } from 'src/contexts/user/UserProvider';
import { RoomOptions } from 'src/types/RoomOptions';
import 'src/assets/styles/pages/Home.scss';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

const Home: React.FC = () => {
	const [{ user }] = useContext(UserContext);
	const [roomName, setRoomName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();

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
		
        <h1>Bataille Navale</h1>
		{error && <div>{error}</div>}
		{user && <div>Bonjour {user.username}, Prêt.e à jouer ?</div>}
		<Button text="Créer une partie" onClick={() => createRoom()} />
		<Input type='text' text="Nom de la partie" value={roomName} onChange={(event) => setRoomName(event.target.value)} placeholder="Nom de la partie" />
		<Button state="red" text="Rejoindre une partie" onClick={() => joinRoom(roomName)} />
		
    </div>
  );
}

export default Home;