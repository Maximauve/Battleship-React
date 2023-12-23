import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import { I18n as I18nType } from 'i18n-js/typings';
import { I18nActionType, appReducer, initializeState } from "./appReducer";
import { Action } from "src/types/Action";

interface AppContextData {
  i18n: I18nType;
  theme: string;
  dispatch: Dispatch<Action<I18nActionType>>;
}

const defaultState = initializeState();
export const AppContext = createContext<AppContextData>({
  i18n: defaultState.i18n,
  theme: '',
  dispatch: () => null,
});

interface Language {
  name: string;
  img: string;
  values: string[];
}
export const availableLanguages: Language[] = [
  { name: 'Français', img: '/drapeau_france.jpg', values: ['fr-FR', 'fr-EN'] },
  { name: 'English', img: '/drapeau_anglais.png', values: ['en-GB', 'en-US'] }
];

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const defaultState = initializeState();
  const [{i18n, theme}, dispatch] = useReducer(appReducer, defaultState);

  return (
    <AppContext.Provider value={{
      i18n,
      theme,
      dispatch,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;