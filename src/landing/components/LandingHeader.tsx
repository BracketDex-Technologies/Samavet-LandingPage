import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import samavetLogo from '../assets/samavet-logo-transparent.png';
import type { LandingLanguage } from '../content';
import { landingNavItems } from '../navItems.js';

interface LandingHeaderProps {
  language: LandingLanguage;
  onLanguageChange: (language: LandingLanguage) => void;
  portalUrl: string;
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem('epawati-theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function LandingHeader({ language, onLanguageChange, portalUrl }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const isMarathi = language === 'mr';
  const menuLabel = isMarathi ? 'मेनू उघडा किंवा बंद करा' : 'Toggle menu';
  const themeLabel = isMarathi ? 'रंगसंगती बदला' : 'Toggle color theme';
  const portalLabel = isMarathi ? 'पोर्टल लॉगिन' : 'Portal login';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('epawati-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#17251e' : '#f8f4e8');
  }, [theme]);

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
        <a className="landing-brand" href="#top" onClick={() => setMenuOpen(false)} aria-label={isMarathi ? 'समवेत मुख्यपृष्ठ' : 'Samavet home'}>
          <img alt="" className="landing-brand__logo" src={samavetLogo} />
          <span className="landing-brand__copy"><strong>{isMarathi ? 'समवेत' : 'SAMAVET'}</strong></span>
        </a>

        <nav aria-label={isMarathi ? 'मुख्य नेव्हिगेशन' : 'Primary navigation'} className={`landing-nav${menuOpen ? ' is-open' : ''}`} id="landing-navigation">
          {landingNavItems[language].map(([href, label], index) => <span className="landing-nav__item" key={href}>{index > 0 ? <i aria-hidden="true">|</i> : null}<a href={href} onClick={() => setMenuOpen(false)}>{label}</a></span>)}
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
      <button aria-label={themeLabel} className="floating-theme-toggle" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} type="button">
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </>
  );
}
