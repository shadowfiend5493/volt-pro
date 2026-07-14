import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// This is the React entry point: it mounts the app into the #root element in index.html.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter enables <Routes> and <Link> navigation across the whole app. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
