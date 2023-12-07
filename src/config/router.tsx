import { createBrowserRouter } from 'react-router-dom';
import Game from 'src/pages/Game';
import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
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
        path: '/game',
        element: <GameLayout />,
        children: [
          {
            path: '/lobby',
            element: <PreGame />,
          },
          {
            path: '/:id',
            element: <Game />,
          }
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

export default router;