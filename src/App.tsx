import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
import AppProvider from './contexts/app/AppProvider'

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
