import { useEffect, useState } from 'react';

import { ComparisonSection, FAQSection, FeaturesSection, HeroSection, HowSection, PortalSection, StatsSection } from './components/ContentSections';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { PORTAL_URL } from './links.js';
import './samavet.css';

export default function SamavetLanding() {
  const [language, setLanguage] = useState<LandingLanguage>('en');
  const copy = localizedCopy[language];

  useEffect(() => {
    const isMarathi = language === 'mr';
    const title = isMarathi
      ? 'ई-पावती | मंडळे आणि ट्रस्टसाठी पेपरलेस देणगी संकलन'
      : 'ePawati | Paperless donation collection for mandals & trusts';
    const description = isMarathi
      ? 'समवेतची ई-पावती मंदिरे, ट्रस्ट आणि गणपती मंडळांसाठी डिजिटल पावत्या, UPI संकलन, लाइव्ह डॅशबोर्ड आणि ऑडिटसाठी तयार अहवाल देते.'
      : 'ePawati by Samavet provides instant receipts, UPI collection, live dashboards and audit-ready reports for temples, trusts and Ganapati mandals.';

    document.documentElement.lang = isMarathi ? 'mr' : 'en';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [language]);

  return (
    <main className={`epawati-page${language === 'mr' ? ' epawati-page--mr' : ''}`}>
      <LandingHeader language={language} onLanguageChange={setLanguage} portalUrl={PORTAL_URL} />
      <HeroSection copy={copy} portalUrl={PORTAL_URL} />
      <StatsSection copy={copy} />
      <FeaturesSection copy={copy} />
      <PortalSection copy={copy} />
      <HowSection copy={copy} />
      <ComparisonSection copy={copy} />
      <FAQSection copy={copy} />
      <LandingFooter copy={copy} language={language} portalUrl={PORTAL_URL} />
    </main>
  );
}
