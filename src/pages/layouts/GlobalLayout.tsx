import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import 'src/assets/styles/layouts/GlobalLayout.scss'
import useTranslations from "../../hooks/useTranslation";

const GlobalLayout: React.FC = () => {
  const i18n = useTranslations();

  return (
    <>
      <div className="global-container">
        <Link to="/login">{i18n.t('global.home')}</Link>
        <Link to="/logout">{i18n.t('global.logout')}</Link>
      </div>
      <Outlet />
    </>
  );
};

export default GlobalLayout;