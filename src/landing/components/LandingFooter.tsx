import { ArrowRight } from 'lucide-react';

import type { LandingCopy, LandingLanguage } from '../content';
import { landingNavItems } from '../navItems.js';

interface LandingFooterProps {
  copy: LandingCopy;
  language: LandingLanguage;
  portalUrl: string;
}

export function LandingFooter({ copy, language, portalUrl }: LandingFooterProps) {
  return (
    <footer className="landing-footer" id="contact">
      <div className="landing-container">
        <section className="footer-cta grain" aria-labelledby="footer-cta-title">
          <div className="footer-cta__glow" aria-hidden="true" />
          <div className="footer-cta__content">
            <h2 id="footer-cta-title">{copy.ctaTitle}</h2>
            <p>{copy.ctaDescription}</p>
            <a className="button button--light" href={portalUrl}>{copy.portalCta}<ArrowRight size={18} /></a>
          </div>
        </section>

        <div className="footer-main">
          <div className="footer-about">
            <a className="landing-brand landing-brand--footer" href="#top" aria-label="ePawati home">
              <span className="landing-brand__mark" aria-hidden="true"><i /><i /><i /></span>
              <span className="landing-brand__copy"><strong>ePawati</strong><small>{copy.brandDescriptor}</small></span>
            </a>
            <p>{copy.footerDescription}</p>
          </div>
          <nav className="footer-nav" aria-label={language === 'mr' ? 'फूटर नेव्हिगेशन' : 'Footer navigation'}>
            {landingNavItems[language].map(([href, label]) => <a href={href} key={href}>{label}</a>)}
            <a href="/blog">{copy.blog}</a>
          </nav>
          <div className="footer-contact">
            <a href="mailto:hello@samavet.in">hello@samavet.in</a>
            <span>{copy.footerLocation}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {copy.copyright}</span>
          <span>Powered by <a href="https://bracketdex.com" rel="noreferrer" target="_blank">BracketDex Technologies</a></span>
        </div>
      </div>
    </footer>
  );
}
