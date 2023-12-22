import { useContext } from 'react';
import { AppContext } from 'src/contexts/app/AppProvider';

const useTheme = (): string => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('useTheme must be used within an AppProvider');
  }

  return appContext.theme;
}
export default useTheme;