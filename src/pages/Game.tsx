import React from 'react';
import useTranslations from 'src/hooks/useTranslation';

const Game: React.FC = () => {

  const i18n = useTranslations();

  return (
    <div>
      <h1>{i18n.t('game.title')}</h1>
    </div>
  );
};

export default Game;