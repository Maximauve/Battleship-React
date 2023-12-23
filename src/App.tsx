import { RouterProvider } from 'react-router-dom'
import router from 'src/config/router'
import AppProvider from 'src/contexts/app/AppProvider'
import UserProvider from 'src/contexts/user/UserProvider'
import ErrorProvider from 'src/contexts/error/ErrorProvider'
import 'src/assets/styles/App.scss'
import useTheme from 'src/hooks/useTheme'

function App() {
  const theme = useTheme();
  return (
    <div className={"App"+theme}>
      <AppProvider>
        <UserProvider>
          <ErrorProvider>
            <RouterProvider router={router} />
          </ErrorProvider>
        </UserProvider>
      </AppProvider>
    </div>
  )
}

export default App
