import React, {useContext, useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {Link, Navigate, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import SocketProvider from 'src/contexts/socket/SocketProvider';
import { UserContext } from 'src/contexts/user/UserProvider';
import {GameProvider} from "../../contexts/members/MemberProvider";
import useTranslations from 'src/hooks/useTranslation';
import Button from 'src/components/Button';
import 'src/assets/styles/layouts/GameLayout.scss';

const GameLayout: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const i18n = useTranslations();

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }
  }, [id, navigate, user]);

  if (!user) {
    return <Navigate to={'/login'} state={{ from: location.pathname }} />;
  }

  return (
    <div className='game-layout'>
        <GameProvider>
          <DndProvider backend={HTML5Backend}>
            <SocketProvider user={user} slug={id as string}>
              <div className='back-button'>
                <Link to="/"><Button text={i18n.t('global.back')} state="gray"/></Link>
              </div>
              <Outlet />
            </SocketProvider>
          </DndProvider>
        </GameProvider>
    </div>
  );
};

export default GameLayout;