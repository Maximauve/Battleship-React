import { I18n } from 'i18n-js/typings';
import { useContext } from 'react';
import { AppContext } from 'src/contexts/app/AppProvider';

const useTranslations = (): I18n => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('useTranslations must be used within an AppProvider');
  }

  return appContext.i18n;
}
export default useTranslations;