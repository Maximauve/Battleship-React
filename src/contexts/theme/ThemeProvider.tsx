import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";


export const ThemeContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([true, (() => null) as Dispatch<SetStateAction<boolean>>]);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isThemeLight, setIsThemeLight] = useState(true);

  return (
    <ThemeContext.Provider value={[isThemeLight, setIsThemeLight]}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;