import { ArrowRight, MessageCircle } from 'lucide-react';

import type { LandingCopy, LandingLanguage } from '../content';
import { buildWhatsAppLink, WHATSAPP_PHONE } from '../links.js';
import { landingNavItems } from '../navItems.js';

interface LandingFooterProps {
  copy: LandingCopy;
  language: LandingLanguage;
  portalUrl: string;
}

export function LandingFooter({ copy, language, portalUrl }: LandingFooterProps) {
  const whatsappUrl = buildWhatsAppLink(
    WHATSAPP_PHONE,
    language === 'mr' ? 'नमस्कार समवेत, मला ई-पावतीबद्दल अधिक माहिती हवी आहे.' : 'Hello Samavet, I would like to know more about ePawati.',
  );

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
          <div className="footer-social" aria-label={language === 'mr' ? 'सोशल मीडिया' : 'Social media'}>
            <a aria-label="Instagram" href="https://www.instagram.com/samavet.in/" rel="noreferrer" target="_blank"><svg aria-hidden="true" fill="none" height="17" viewBox="0 0 24 24" width="17"><rect height="18" rx="5" stroke="currentColor" strokeWidth="2" width="18" x="3" y="3" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" fill="currentColor" r="1" /></svg></a>
            <a aria-label="WhatsApp" href={whatsappUrl} rel="noreferrer" target="_blank"><MessageCircle size={17} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
