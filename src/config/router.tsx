import { createBrowserRouter } from 'react-router-dom';
import Game from 'src/pages/Game';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Logout from 'src/pages/Logout';
import PreGame from 'src/pages/PreGame';
import Register from 'src/pages/Register';
import GameLayout from 'src/pages/layouts/GameLayout';
import GlobalLayout from 'src/pages/layouts/GlobalLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GlobalLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'game',
				element: <GameLayout />,
				children: [
					{
						path: 'lobby/:id',
						element: <PreGame />,
					},
					{
						path: ':id',
						element: <Game />,
					}
				],
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'logout',
				element: <Logout />,
			}
		],
	},
]);

export default router;