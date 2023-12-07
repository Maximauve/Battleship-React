import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { I18n } from 'i18n-js';
import { I18n as I18nType } from 'i18n-js/typings';
import browserLang from 'browser-lang';
import { TRANSLATIONS_FR } from "src/translations/translations.fr";
import { TRANSLATIONS_EN } from "src/translations/translations.en";

interface AppContextData {
  i18n: I18nType
  isThemeLight: boolean;
  setIsThemeLight: Dispatch<SetStateAction<boolean>>;
}
export const AppContext = createContext({} as AppContextData);

const language = browserLang({
  languages: ['fr-FR', 'fr-EN', 'en-GB', 'en-US'],
  fallback: 'fr-FR'
});

const translations = {
  'fr-FR': TRANSLATIONS_FR,
  'fr-EN': TRANSLATIONS_FR,
  'en-GB': TRANSLATIONS_EN,
  'en-US': TRANSLATIONS_EN
}

const i18n = new I18n(translations);
i18n.locale = language;
i18n.defaultLocale = 'fr-FR';
i18n.enableFallback = true;

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isThemeLight, setIsThemeLight] = useState(true);

  return (
    <AppContext.Provider value={{
      i18n,
      isThemeLight,
      setIsThemeLight
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;