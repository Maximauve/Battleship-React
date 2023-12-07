import { PropsWithChildren, createContext, useState } from "react";


export const ThemeContext = createContext({});

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isThemeLight, setIsThemeLight] = useState(true);

  return (
    <ThemeContext.Provider value={[isThemeLight, setIsThemeLight]}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;