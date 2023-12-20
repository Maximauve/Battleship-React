import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";
import { I18n } from 'i18n-js';
import { I18n as I18nType } from 'i18n-js/typings';
import browserLang from 'browser-lang';
import { TRANSLATIONS_FR } from "src/translations/translations.fr";
import { TRANSLATIONS_EN } from "src/translations/translations.en";

interface AppContextData {
  i18n: I18nType
  setI18n: Dispatch<SetStateAction<I18nType>>;
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

interface Language {
  name: string;
  img: string;
  values: string[];
}
export const availableLanguages: Language[] = [
  { name: 'Français', img: '/drapeau_france.jpg', values: ['fr-FR', 'fr-EN'] },
  { name: 'English', img: '/drapeau_anglais.png', values: ['en-GB', 'en-US'] }
]

const defaultI18n = new I18n(translations);
defaultI18n.locale = language;
defaultI18n.defaultLocale = 'fr-FR';
defaultI18n.enableFallback = true;

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isThemeLight, setIsThemeLight] = useState(true);
  const [i18n, setI18n] = useState<I18nType>(defaultI18n);

  return (
    <AppContext.Provider value={{
      i18n,
      setI18n,
      isThemeLight,
      setIsThemeLight
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;