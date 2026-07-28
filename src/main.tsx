import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Agentation } from 'agentation'
import './index.css'
import App from './App.tsx'
import { queryClient } from './lib/queryClient.ts'
import SamavetLanding from './landing/SamavetLanding.tsx'
import { shouldRenderSamavetLanding } from './landing/links.js'

const activeApp = shouldRenderSamavetLanding(window.location.hostname, window.location.pathname)
  ? <SamavetLanding />
  : (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    )

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {activeApp}
    {import.meta.env.DEV ? <Agentation /> : null}
  </StrictMode>,
)
