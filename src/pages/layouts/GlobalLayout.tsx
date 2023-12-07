import React from 'react';
import { Outlet } from 'react-router-dom';
import 'src/assets/styles/layouts/GlobalLayout.scss'

const GlobalLayout: React.FC = () => {

  return (
    <div>
      <p>Global Layout</p>
      <Outlet />
    </div>
  );
};

export default GlobalLayout;