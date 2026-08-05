import { MessageCircle } from 'lucide-react';

import samavetLogo from '../assets/samavet-logo-transparent.png';
import type { LandingCopy, LandingLanguage } from '../content';
import { buildWhatsAppLink, WHATSAPP_PHONE } from '../links.js';
import { landingNavItems } from '../navItems.js';

interface LandingFooterProps {
  copy: LandingCopy;
  language: LandingLanguage;
  portalUrl: string;
}

export function LandingFooter({ copy, language, portalUrl }: LandingFooterProps) {
  const isMarathi = language === 'mr';
  const whatsappUrl = buildWhatsAppLink(
    WHATSAPP_PHONE,
    isMarathi ? 'नमस्कार समवेत, मला ई-पावतीबद्दल अधिक माहिती हवी आहे.' : 'Hello Samavet, I would like to know more about ePawati.',
  );

  return (
    <footer className="landing-footer" id="contact">
      <div className="landing-container footer-container">
        <a className="footer-brand-lockup" href="#top" aria-label={isMarathi ? 'समवेत मुख्यपृष्ठ' : 'Samavet home'}>
          <img alt="" src={samavetLogo} />
        </a>

        <nav className="footer-nav" aria-label={isMarathi ? 'फूटर नेव्हिगेशन' : 'Footer navigation'}>
          {landingNavItems[language].map(([href, label]) => <a href={href} key={href}>{label}</a>)}
          <a href="#faq">{isMarathi ? 'प्रश्नोत्तरे' : 'FAQ'}</a>
          <a href="/blog">{copy.blog}</a>
          <a href={portalUrl}>{isMarathi ? 'पोर्टल' : 'Portal'}</a>
        </nav>

        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} {copy.copyright}</span>
            <span>Powered by <a href="https://bracketdex.com" rel="noreferrer" target="_blank">BracketDex Technologies</a></span>
          </div>
          <div className="footer-social" aria-label={isMarathi ? 'सोशल मीडिया' : 'Social media'}>
            <a aria-label="Instagram" href="https://www.instagram.com/samavet.in/" rel="noreferrer" target="_blank"><svg aria-hidden="true" fill="none" height="21" viewBox="0 0 24 24" width="21"><rect height="18" rx="5" stroke="currentColor" strokeWidth="2" width="18" x="3" y="3" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" fill="currentColor" r="1" /></svg></a>
            <a aria-label="WhatsApp" href={whatsappUrl} rel="noreferrer" target="_blank"><MessageCircle size={21} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
