import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Agentation } from 'agentation'
import './index.css'
import SamavetLanding from './landing/SamavetLanding.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SamavetLanding />
    {import.meta.env.DEV ? <Agentation /> : null}
  </StrictMode>,
)
