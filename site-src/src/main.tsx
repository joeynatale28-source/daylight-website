import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './index.css'
import App from './App'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (!location.hash) window.scrollTo(0, 0)
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
