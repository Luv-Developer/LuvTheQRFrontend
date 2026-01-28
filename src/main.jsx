import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="527023026393-jcc9u5hu5q1hrflst9vmmtteh3rvumgg.apps.googleusercontent.com">
      <App/>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
