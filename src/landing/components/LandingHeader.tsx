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

  useEffect(() => {
    function updateHeaderState() {
      setIsCondensed(isLandingHeaderCondensed(window.scrollY));
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  return (
    <header className={isCondensed ? 'landing-header is-condensed' : 'landing-header'}>
      <a className="landing-brand" href="#top" onClick={() => setMenuOpen(false)}>
        <img alt="Samavet tree of community logo" src={samavetLogo} />
        <span className={`landing-brand-name ${language === 'mr' ? 'is-marathi' : ''}`} lang={language === 'mr' ? 'mr' : undefined}>{brandName}</span>
      </a>
      <nav aria-label="Primary navigation" className={menuOpen ? 'landing-nav is-open' : 'landing-nav'}>
        {landingNavItems[language].map(([href, label], index) => <Fragment key={href}>{index > 0 ? <span aria-hidden="true" className="nav-separator">|</span> : null}<a href={href} onClick={() => setMenuOpen(false)}>{label}</a></Fragment>)}
        <a className="mobile-portal-link" href={portalUrl}>{portalLabel}</a>
      </nav>
      <div className="header-actions">
        <div className={`language-switch ${languagePulseKey ? 'is-pulsing' : ''}`} key={languagePulseKey || 'rest'} role="group" aria-label="Language selection">
          <button className={language === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')} type="button">EN</button>
          <span>/</span>
          <button className={language === 'mr' ? 'active' : ''} lang="mr" onClick={() => onLanguageChange('mr')} type="button">मराठी</button>
        </div>
        <a className="portal-link" href={portalUrl}>{portalLabel}</a>
        <button aria-expanded={menuOpen} aria-label="Toggle navigation" className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} type="button">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
