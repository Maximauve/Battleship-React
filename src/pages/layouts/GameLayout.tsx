import React, {useContext, useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Navigate, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import SocketProvider from 'src/contexts/socket/SocketProvider';
import { UserContext } from 'src/contexts/user/UserProvider';
import {GameProvider} from "../../contexts/members/MemberProvider";

const GameLayout: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }
  }, [id, navigate, user]);

  if (!user) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />;
  }

  return (
    <div>
      <h1>Game Layout</h1>
        <GameProvider>
          <DndProvider backend={HTML5Backend}>
            <SocketProvider user={user} slug={id as string}>
              <Outlet />
            </SocketProvider>
          </DndProvider>
        </GameProvider>
    </div>
  );
};

export default GameLayout;