import { Mail, MessageCircle } from 'lucide-react';

import samavetLogo from '../assets/samavet-logo-transparent.png';
import type { LandingCopy, LandingLanguage } from '../content';
import { buildWhatsAppLink, WHATSAPP_PHONE } from '../links.js';
import { landingNavItems } from '../navItems.js';

const legalLinks = [
  ['/privacy-policy', 'Privacy'],
  ['/terms-and-conditions', 'Terms'],
  ['/refund-and-cancellation-policy', 'Refunds'],
  ['/cookie-policy', 'Cookies'],
  ['/acceptable-use-policy', 'Acceptable Use'],
  ['/donation-disclaimer', 'Donation Disclaimer'],
];

interface LandingFooterProps {
  copy: LandingCopy;
  language: LandingLanguage;
  portalUrl: string;
}

function resolveFooterHref(href: string, language: LandingLanguage) {
  if (!href.startsWith('/')) return href;
  if (language !== 'mr') return href;
  if (href === '/ahwal' || href === '/blog') return href;
  return `/mr${href}`;
}

export function LandingFooter({ copy, language, portalUrl }: LandingFooterProps) {
  const isMarathi = language === 'mr';
  const whatsappUrl = buildWhatsAppLink(
    WHATSAPP_PHONE,
    isMarathi ? 'नमस्कार समवेत, मला ई-पावतीबद्दल अधिक माहिती हवी आहे.' : 'Hello Samavet, I would like to know more about ePawati.',
  );

  return (
    <footer className="landing-footer">
      <div className="landing-container footer-container">
        <a className="footer-brand-lockup" href="/" aria-label={isMarathi ? 'समवेत मुख्यपृष्ठ' : 'Samavet home'}>
          <img alt="" src={samavetLogo} />
        </a>

        <nav className="footer-nav" aria-label={isMarathi ? 'फूटर नेव्हिगेशन' : 'Footer navigation'}>
          {landingNavItems[language].map(([href, label]) => <a href={resolveFooterHref(href, language)} key={href}>{label}</a>)}
          <a href={resolveFooterHref('/faq', language)}>{isMarathi ? 'प्रश्नोत्तरे' : 'FAQ'}</a>
          <a href="/blog">{copy.blog}</a>
          <a href={portalUrl}>{isMarathi ? 'पोर्टल' : 'Portal'}</a>
        </nav>
        <nav className="footer-legal-nav" aria-label="Legal navigation">
          {legalLinks.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="footer-divider" aria-hidden="true" />

        <div className="footer-bottom">
          <span className="footer-copyright">© {new Date().getFullYear()} {copy.copyright}</span>
          <span className="footer-credit">Powered by <a href="https://bracketdex.com" rel="noreferrer" target="_blank">BracketDex Technologies</a></span>
          <ul className="footer-social" aria-label={isMarathi ? 'सोशल मीडिया' : 'Social media'}>
            <li className="footer-social__item">
              <a aria-label="Instagram" data-social="instagram" href="https://www.instagram.com/samavetofficial/" rel="noreferrer" target="_blank"><span className="filled" aria-hidden="true" /><svg aria-hidden="true" fill="none" height="21" viewBox="0 0 24 24" width="21"><rect height="18" rx="5" stroke="currentColor" strokeWidth="2" width="18" x="3" y="3" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" fill="currentColor" r="1" /></svg></a>
              <span className="tooltip" role="tooltip">Instagram</span>
            </li>
            <li className="footer-social__item">
              <a aria-label="Email" data-social="email" href="mailto:bracketdevs.teams@gmail.com"><span className="filled" aria-hidden="true" /><Mail size={21} /></a>
              <span className="tooltip" role="tooltip">Email</span>
            </li>
            <li className="footer-social__item">
              <a aria-label="WhatsApp" data-social="whatsapp" href={whatsappUrl} rel="noreferrer" target="_blank"><span className="filled" aria-hidden="true" /><MessageCircle size={21} /></a>
              <span className="tooltip" role="tooltip">WhatsApp</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
