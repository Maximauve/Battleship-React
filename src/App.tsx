import { RouterProvider } from 'react-router-dom'
import router from 'src/config/router'
import AppProvider from 'src/contexts/app/AppProvider'
import UserProvider from 'src/contexts/user/UserProvider'
import ErrorProvider from 'src/contexts/error/ErrorProvider'
import 'src/App.css'

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <ErrorProvider>
          <RouterProvider router={router} />
        </ErrorProvider>
      </UserProvider>
    </AppProvider>
  )
}

export default App
