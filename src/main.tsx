import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Agentation } from 'agentation'
import './index.css'
import AhwalPage from './landing/AhwalPage.tsx'
import BlogPage from './landing/BlogPage.tsx'
import SamavetLanding from './landing/SamavetLanding.tsx'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {pathname === '/blog' ? <BlogPage /> : pathname === '/ahwal' ? <AhwalPage /> : <SamavetLanding />}
    {import.meta.env.DEV ? <Agentation /> : null}
  </StrictMode>,
)
