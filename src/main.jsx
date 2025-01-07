import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UserProvider from './context/userProvider.jsx'
import App from './App.jsx'
import "./style/index.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
)
