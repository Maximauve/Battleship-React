import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
import AppProvider from './contexts/app/AppProvider'
import UserProvider from './contexts/user/UserProvider'

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AppProvider>
  )
}

export default App
