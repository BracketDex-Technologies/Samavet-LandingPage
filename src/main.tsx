import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Agentation } from 'agentation'
import './index.css'
import BlogPage from './landing/BlogPage.tsx'
import SamavetLanding from './landing/SamavetLanding.tsx'
import { SeoLandingPage } from './landing/SeoLandingPage.tsx'
import { seoPageKeyByPath } from './landing/seoPageRoutes.ts'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const seoPageKey = seoPageKeyByPath[pathname]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {pathname === '/blog' ? <BlogPage /> : seoPageKey ? <SeoLandingPage pageKey={seoPageKey} /> : <SamavetLanding />}
    {import.meta.env.DEV ? <Agentation /> : null}
  </StrictMode>,
)
