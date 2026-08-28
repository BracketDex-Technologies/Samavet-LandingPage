import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';

import samavetLogo from '../assets/samavet-logo-transparent.png';
import type { LandingLanguage } from '../content';
import { AHWAL_URL, MURTI_URL, landingNavItems } from '../navItems.js';

const THEME_TRANSITION_STYLE_ID = 'epawati-theme-toggle-vt';
const THEME_TRANSITION_CSS = `
html[data-epawati-vt='circle-blur']::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}

html[data-epawati-vt='circle-blur']::view-transition-new(root) {
  animation: epawati-circle-blur-reveal 700ms cubic-bezier(0.4, 0, 0.2, 1);
  mix-blend-mode: normal;
}

@keyframes epawati-circle-blur-reveal {
  from { clip-path: circle(0% at var(--epawati-vt-origin, 100% 100%)); filter: blur(8px); }
  to { clip-path: circle(150% at var(--epawati-vt-origin, 100% 100%)); filter: blur(0); }
}
`;

interface LandingHeaderProps {
  language: LandingLanguage;
  onLanguageChange: (language: LandingLanguage) => void;
  portalUrl: string;
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('epawati-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return 'light';
}

function ensureThemeTransitionStyle() {
  if (document.getElementById(THEME_TRANSITION_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = THEME_TRANSITION_STYLE_ID;
  style.textContent = THEME_TRANSITION_CSS;
  document.head.appendChild(style);
}

function shouldSkipThemeTransition() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('startViewTransition' in document);
}

function resolveLandingHref(href: string, language: LandingLanguage) {
  if (href === 'ahwal') return AHWAL_URL;
  if (href === 'murti') return MURTI_URL;
  if (!href.startsWith('/')) return href;
  if (language !== 'mr') return href;
  if (href === '/blog') return href;
  return `/mr${href}`;
}

export function LandingHeader({ language, onLanguageChange, portalUrl }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const isMarathi = language === 'mr';
  const menuLabel = isMarathi ? 'मेनू उघडा किंवा बंद करा' : 'Toggle menu';
  const themeLabel = isMarathi ? 'रंगसंगती बदला' : 'Toggle color theme';
  const portalLabel = isMarathi ? 'पोर्टल लॉगिन' : 'Portal login';
  const blogLabel = isMarathi ? 'ब्लॉग' : 'Blog';

  useEffect(() => {
    ensureThemeTransitionStyle();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('epawati-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#17251e' : '#f8f4e8');
  }, [theme]);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (shouldSkipThemeTransition()) {
      setTheme(nextTheme);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const originX = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const originY = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    const root = document.documentElement;
    root.style.setProperty('--epawati-vt-origin', `${originX}% ${originY}%`);
    root.dataset.epawatiVt = 'circle-blur';

    const transition = (document as Document & { startViewTransition: (callback: () => void) => { finished: Promise<void> } }).startViewTransition(() => setTheme(nextTheme));
    transition.finished.finally(() => {
      delete root.dataset.epawatiVt;
      root.style.removeProperty('--epawati-vt-origin');
    });
  }

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 20);
    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1080) setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`landing-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="landing-header__inner">
        <a className="landing-brand" href="/" onClick={() => setMenuOpen(false)} aria-label={isMarathi ? 'समवेत मुख्यपृष्ठ' : 'Samavet home'}>
          <img alt="" className="landing-brand__logo" src={samavetLogo} />
          <span className="landing-brand__copy"><strong>{isMarathi ? 'समवेत' : 'SAMAVET'}</strong></span>
        </a>

        <nav aria-label={isMarathi ? 'मुख्य नेव्हिगेशन' : 'Primary navigation'} className={`landing-nav${menuOpen ? ' is-open' : ''}`} id="landing-navigation">
          {landingNavItems[language].map(([href, label], index) => {
            const isExternal = href === 'ahwal' || href === 'murti';
            const resolvedHref = resolveLandingHref(href, language);
            return (
              <span className="landing-nav__item" key={href}>
                {index > 0 ? <i aria-hidden="true">|</i> : null}
                <a href={resolvedHref} onClick={() => setMenuOpen(false)} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}>{label}</a>
              </span>
            );
          })}
          <span className="landing-nav__item"><i aria-hidden="true">|</i><a href="/blog" onClick={() => setMenuOpen(false)}>{blogLabel}</a></span>
          <a className="landing-nav__mobile-cta" href={portalUrl}>{portalLabel}</a>
        </nav>

        <div className="landing-header__actions">
          <div className="language-switch" role="group" aria-label={isMarathi ? 'भाषा निवड' : 'Language selection'}>
            <button aria-pressed={language === 'en'} className={language === 'en' ? 'is-active' : ''} onClick={() => onLanguageChange('en')} type="button">EN</button>
            <span aria-hidden="true">/</span>
            <button aria-pressed={language === 'mr'} className={language === 'mr' ? 'is-active' : ''} onClick={() => onLanguageChange('mr')} type="button">मराठी</button>
          </div>
          <a className="landing-header__cta" href={portalUrl}>{portalLabel}</a>
          <button aria-controls="landing-navigation" aria-expanded={menuOpen} aria-label={menuLabel} className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} type="button">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>
        </div>
      </header>
      <button aria-label={themeLabel} className="floating-theme-toggle" onClick={toggleTheme} type="button">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </>
  );
}
