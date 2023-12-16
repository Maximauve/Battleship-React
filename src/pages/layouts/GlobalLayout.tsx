import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import 'src/assets/styles/layouts/GlobalLayout.scss'

const GlobalLayout: React.FC = () => {

  return (
    <div>
      <Link to="/login">Home</Link>
      <p>Global Layout</p>
      <Outlet />
    </div>
  );
};

export default GlobalLayout;