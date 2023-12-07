import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from 'src/contexts/theme/ThemeProvider';
import 'src/assets/styles/layouts/GlobalLayout.scss';

const GlobalLayout: React.FC = () => {
  const [isThemeLight, setIsThemeLight] = useContext(ThemeContext);


  return (
    <div className={`global-layout ${isThemeLight ? 'light' : 'dark'}`} >
      <button onClick={() => setIsThemeLight(!isThemeLight)}>
        {isThemeLight ? 'Passer en mode sombre' : 'Passer en mode clair'}
      </button>
      <p>Global Layout</p>
      <Outlet />
    </div >
  );
};

export default GlobalLayout;