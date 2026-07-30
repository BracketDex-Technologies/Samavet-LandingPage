import { ArrowUpRight, MessageCircle } from 'lucide-react';

import samavetLogo from '../assets/samavet-logo.svg';
import type { LandingLanguage } from '../content';

interface LandingFooterProps {
  chatHref: string;
  language: LandingLanguage;
  portalLabel: string;
  portalUrl: string;
}

export function LandingFooter({ chatHref, language, portalLabel, portalUrl }: LandingFooterProps) {
  const isMarathi = language === 'mr';
  return (
    <footer className="landing-footer">
      <div className="footer-top">
        <div><p className="footer-kicker">SAMAVET / समवेत</p><h2>{isMarathi ? 'समुदायांसाठी अधिक जवळचे तंत्रज्ञान.' : 'Technology that holds community closer.'}</h2></div>
        <div className="footer-links"><a href="#epawati">ePawati</a><a href="#intelligence">{isMarathi ? 'इव्हेंट इंटेलिजन्स' : 'Event intelligence'}</a><a href={chatHref} rel="noreferrer" target="_blank"><MessageCircle size={15} />{isMarathi ? 'व्हॉट्सअॅप' : 'WhatsApp'}</a><a href={portalUrl}><ArrowUpRight size={15} />{portalLabel}</a></div>
      </div>
      <div aria-hidden="true" className="footer-tree-mark"><img alt="" src={samavetLogo} /></div>
      <div className="footer-wordmark" aria-label="Samavet"><strong>SAMAVET</strong></div>
      <div className="footer-bottom"><div className="footer-bottom-left"><span>© {new Date().getFullYear()} Samavet.</span></div><span>{isMarathi ? 'समुदायांसोबत घडवलेले.' : 'Built with communities in mind.'}</span><a className="footer-credit-link" href="https://bracketdex.com" rel="noreferrer" target="_blank">by <span>BracketDex</span> Technologies</a></div>
    </footer>
  );
}
