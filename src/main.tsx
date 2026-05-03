import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SessionRoleProvider } from './context/SessionRoleContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SessionRoleProvider>
        <App />
      </SessionRoleProvider>
    </BrowserRouter>
  </StrictMode>,
)
