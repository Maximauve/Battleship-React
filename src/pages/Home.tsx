import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import redis from 'src/config/redis';
import { UserContext } from 'src/contexts/user/UserProvider';
import { RoomOptions } from 'src/types/RoomOptions';

const Home: React.FC = () => {
  const [{ user }] = useContext(UserContext);

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
		if (user === undefined) {
      navigate('/login');
      return;
    }
    navigate(`/game/lobby/${room}`);
	}

  return (
    <div>
      <h1>Home</h1>
			{error && <div>{error}</div>}
			{user && <div>{user.username} est connecté !</div>}
			<button onClick={() => createRoom()}>Créer une partie</button>
			<input type="text" placeholder="Nom de la partie" value={roomName} onChange={(event) => setRoomName(event.target.value)}/>
			<button onClick={() => joinRoom(roomName)}>Rejoindre la partie</button>
    </div>
  );
}

export default Home;