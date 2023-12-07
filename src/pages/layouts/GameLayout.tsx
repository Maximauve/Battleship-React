import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SocketProvider from 'src/contexts/socket/SocketProvider';
import { UserContext } from 'src/contexts/user/UserProvider';

const GameLayout: React.FC = () => {
	const [{ user }] = useContext(UserContext);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	useEffect(() => {
		if (id === undefined) {
			navigate('/');
		}
	}, [id, navigate]);

	if (user === undefined) {
		navigate('/login');
		return;
	}

	return (
		<div>
			<h1>Game Layout</h1>
			<SocketProvider user={user} slug={id as string} >
				<Outlet />
			</SocketProvider>
		</div>
	);
};

export default GameLayout;