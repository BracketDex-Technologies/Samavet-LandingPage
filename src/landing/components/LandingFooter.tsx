import { ExternalLink, MessageCircle } from 'lucide-react';

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
      <div className="footer-main">
        <div><a className="landing-wordmark footer-wordmark" href="#top"><span lang="mr">समवेत</span><i>/</i><strong>SAMAVET</strong></a><p>{isMarathi ? 'समुदायांसाठी, समुदायांसोबत.' : 'Built for communities. By communities.'}</p></div>
        <div><h3>{isMarathi ? 'एक्सप्लोर करा' : 'Explore'}</h3><a href="#about">{isMarathi ? 'समवेत म्हणजे काय?' : 'What is Samavet?'}</a><a href="#epawati">ePawati</a><a href="#features">{isMarathi ? 'वैशिष्ट्ये' : 'Features'}</a></div>
        <div><h3>{isMarathi ? 'स्रोत' : 'Resources'}</h3><a href="#how-it-works">{isMarathi ? 'कसे काम करते' : 'How it works'}</a><a href="#organizations">{isMarathi ? 'संस्थांसाठी' : 'For organizations'}</a><a href="#top">{isMarathi ? 'संपर्क' : 'Contact'}</a></div>
        <div><h3>{isMarathi ? 'कनेक्ट' : 'Connect'}</h3><a href={chatHref} target="_blank" rel="noreferrer"><MessageCircle size={16} />{isMarathi ? 'व्हॉट्सअॅपवर बोला' : 'Chat on WhatsApp'}</a><a className="footer-portal" href={portalUrl}><ExternalLink size={16} />{portalLabel}</a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Samavet.</span><span>{isMarathi ? 'सर्व हक्क राखीव.' : 'All rights reserved.'}</span></div>
    </footer>
  );
}
