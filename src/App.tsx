import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
import ThemeProvider from './contexts/theme/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
