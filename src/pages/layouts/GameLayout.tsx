import React, {useContext, useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SocketProvider from 'src/contexts/socket/SocketProvider';
import { UserContext } from 'src/contexts/user/UserProvider';
import {GameProvider} from "../../contexts/members/MemberProvider";

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