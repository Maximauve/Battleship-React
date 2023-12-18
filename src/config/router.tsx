import { createBrowserRouter, redirect } from 'react-router-dom';
import Game from 'src/pages/Game';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Logout from 'src/pages/Logout';
import PreGame from 'src/pages/PreGame';
import Register from 'src/pages/Register';
import User from 'src/pages/User';
import GameLayout from 'src/pages/layouts/GameLayout';
import GlobalLayout from 'src/pages/layouts/GlobalLayout';
import ProtectedRoute from 'src/pages/layouts/ProtectedRoute';

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
		],
	},
	{
		path: '/user',
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				loader: () => redirect('/user/me')
			},
			{
				path: 'me',
				element: <User me={true} />,
				children: [
					{
						path: 'edit',
						element: <User me={true} />, // TODO : Edit User
					}
				]
			},
			{
				path: ':id',
				element: <User />,
			}
		],
	},
	{
		path: '/friends',
		element: <ProtectedRoute />,
		children: [
			{
				index: true,
				element: <Home />, //TODO : friends list
			},
			{
				path: 'add',
				element: <Home />, // TODO : Add friend form
			},
			{
				path: 'requests',
				element: <Home />, // TODO : Friends requests list
			},
			{
				path: 'pending',
				element: <Home />, // TODO : Pending friends list
			}
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/logout',
		element: <Logout />,
	}
]);

export default router;