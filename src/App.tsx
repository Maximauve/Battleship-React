import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './config/router'
import ThemeProvider from './contexts/theme/ThemeProvider'
import UserProvider from './contexts/user/UserProvider'

function App() {
  return (
    <ThemeProvider>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
    </ThemeProvider>
  )
}

export default App
