import React from 'react';
import { Outlet } from 'react-router-dom';

const GameLayout: React.FC = () => {

  return (
    <div>
      <p>Game Layout</p>
      <Outlet />
    </div>
  );
};

export default GameLayout;