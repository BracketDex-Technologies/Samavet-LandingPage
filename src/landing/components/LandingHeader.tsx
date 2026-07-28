import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

import type { LandingLanguage } from '../content';

interface LandingHeaderProps {
  language: LandingLanguage;
  onLanguageChange: (language: LandingLanguage) => void;
  portalUrl: string;
  portalLabel: string;
}

const navItems = {
  en: [['#about', 'What is Samavet'], ['#organizations', 'For organizations'], ['#epawati', 'ePawati'], ['#features', 'Features'], ['#how-it-works', 'How it works'], ['#contact', 'Contact']],
  mr: [['#about', 'समवेत म्हणजे काय?'], ['#organizations', 'संस्थांसाठी'], ['#epawati', 'ई-पावती'], ['#features', 'वैशिष्ट्ये'], ['#how-it-works', 'कसे काम करते'], ['#contact', 'संपर्क']],
} as const;

export function LandingHeader({ language, onLanguageChange, portalLabel, portalUrl }: LandingHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="landing-header">
      <a className="landing-wordmark" href="#top" aria-label="Samavet home">
        <span lang="mr">समवेत</span><i>/</i><strong>SAMAVET</strong>
      </a>
      <nav className={menuOpen ? 'landing-nav is-open' : 'landing-nav'} aria-label="Primary navigation">
        {navItems[language].map(([href, label], index) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}{index === 1 ? <ChevronDown size={13} strokeWidth={1.8} /> : null}
          </a>
        ))}
        <div className="mobile-language-switch" aria-label="Language selection">
          <button className={language === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')} type="button">EN</button>
          <span>/</span>
          <button aria-label="मराठी" className={language === 'mr' ? 'active' : ''} onClick={() => onLanguageChange('mr')} type="button" lang="mr">मराठी</button>
        </div>
      </nav>
      <div className="header-actions">
        <div className="language-switch" aria-label="Language selection" role="group">
          <button className={language === 'en' ? 'active' : ''} onClick={() => onLanguageChange('en')} type="button">EN</button>
          <span>/</span>
          <button className={language === 'mr' ? 'active' : ''} onClick={() => onLanguageChange('mr')} type="button" lang="mr">मराठी</button>
        </div>
        <a className="portal-link" href={portalUrl}>{portalLabel}</a>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
