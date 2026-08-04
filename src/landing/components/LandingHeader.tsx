import { Menu, X } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

import type { LandingLanguage } from '../content';
import { isLandingHeaderCondensed } from '../headerState.js';
import { landingNavItems } from '../navItems.js';
import samavetLogo from '../assets/samavet-logo-transparent.png';

interface LandingHeaderProps {
  language: LandingLanguage;
  languagePulseKey: number;
  onLanguageChange: (language: LandingLanguage) => void;
  portalLabel: string;
  portalUrl: string;
}

export function LandingHeader({ language, languagePulseKey, onLanguageChange, portalLabel, portalUrl }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const brandName = language === 'mr' ? 'समवेत' : 'SAMAVET';
  const blogLabel = language === 'mr' ? 'ब्लॉग' : 'Blog';

  useEffect(() => {
    function updateHeaderState() {
      setIsCondensed(isLandingHeaderCondensed(window.scrollY));
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function closeMenu(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }

    function closeMenuOnDesktop() {
      if (window.innerWidth > 940) setMenuOpen(false);
    }

    window.addEventListener('keydown', closeMenu);
    window.addEventListener('resize', closeMenuOnDesktop);
    return () => {
      window.removeEventListener('keydown', closeMenu);
      window.removeEventListener('resize', closeMenuOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className={isCondensed ? 'landing-header is-condensed' : 'landing-header'}>
      <a className="landing-brand" href="#top" onClick={() => setMenuOpen(false)}>
        <img alt="Samavet tree of community logo" src={samavetLogo} />
        <span className={`landing-brand-name ${language === 'mr' ? 'is-marathi' : ''}`} lang={language === 'mr' ? 'mr' : undefined}>{brandName}</span>
      </a>
      <nav aria-label="Primary navigation" className={menuOpen ? 'landing-nav is-open' : 'landing-nav'} id="landing-navigation">
        {landingNavItems[language].map(([href, label], index) => <Fragment key={href}>{index > 0 ? <span aria-hidden="true" className="nav-separator">|</span> : null}<a href={href} onClick={() => setMenuOpen(false)}>{label}</a></Fragment>)}
        <span aria-hidden="true" className="nav-separator">|</span>
        <a href="/blog" onClick={() => setMenuOpen(false)}>{blogLabel}</a>
        <a className="mobile-portal-link" href={portalUrl} onClick={() => setMenuOpen(false)}>{portalLabel}</a>
      </nav>
      <div className="header-actions">
        <div className={`language-switch ${languagePulseKey ? 'is-pulsing' : ''}`} key={languagePulseKey || 'rest'} role="group" aria-label="Language selection">
          <input checked={language === 'en'} id="lang-en" name="lang" onChange={() => { onLanguageChange('en'); setMenuOpen(false); }} type="radio" />
          <label className="language-tab" htmlFor="lang-en">Eng</label>
          <input checked={language === 'mr'} id="lang-mr" name="lang" onChange={() => { onLanguageChange('mr'); setMenuOpen(false); }} type="radio" />
          <label className="language-tab" htmlFor="lang-mr">मराठी</label>
        </div>
        <a className="portal-link" href={portalUrl}><span>{portalLabel}</span></a>
        <button aria-controls="landing-navigation" aria-expanded={menuOpen} aria-label="Toggle navigation" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} type="button">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
