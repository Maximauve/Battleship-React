import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'src/assets/styles/layouts/GlobalLayout.scss';
import PlayerModal from 'src/components/modal/PlayerModal';
import useTheme from 'src/hooks/useTheme';

const GlobalLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const theme = useTheme();

  const toggleModal = () => {
    console.log('ToggleModal');
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className={"global"+ theme}>
      <div onClick={toggleModal} className="player-modal close">
        <button className='button-profil'>
          <img src="/compte-utilisateur-1.png" alt="" />
        </button>
      </div>
      {isModalOpen &&
        <>
          <PlayerModal onClose={() => setIsModalOpen(false)} />
        </>
      }
        
      <Outlet />
    </div>
  );
}

export default GlobalLayout;