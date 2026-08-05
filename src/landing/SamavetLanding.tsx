import { useEffect, useState } from 'react';

import { ComparisonSection, ContactSection, FAQSection, FeaturesSection, HeroSection, HowSection, PortalSection, StatsSection } from './components/ContentSections';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { PORTAL_URL } from './links.js';
import { applyPageSeo, SITE_ORIGIN } from './seo';
import './samavet.css';

function getInitialLanguage(): LandingLanguage {
  return window.location.pathname === '/mr' || new URLSearchParams(window.location.search).get('lang') === 'mr' ? 'mr' : 'en';
}

export default function SamavetLanding() {
  const [language, setLanguage] = useState<LandingLanguage>(getInitialLanguage);
  const copy = localizedCopy[language];

  useEffect(() => {
    const isMarathi = language === 'mr';
    const title = isMarathi
      ? 'समवेत | मंडळे आणि ट्रस्टसाठी डिजिटल पावती व वर्गणी सॉफ्टवेअर'
      : 'Samavet | Digital Pawati & Vargani Software for Mandals & Trusts';
    const description = isMarathi
      ? 'गणेश मंडळे, मंदिरे आणि ट्रस्टसाठी डिजिटल देणगी पावत्या, ई-पावती आणि वर्गणी स्लिप व्यवस्थापित करा. समवेतशी संपर्क साधा.'
      : 'Manage digital donation receipts (ePawati) and Vargani slips for Ganesh Mandals, Temples & Trusts. Book a WhatsApp demo.';
    applyPageSeo({
      title,
      description,
      path: isMarathi ? '/mr' : '/',
      lang: isMarathi ? 'mr' : 'en',
      alternates: [
        { href: `${SITE_ORIGIN}/`, hrefLang: 'en' },
        { href: `${SITE_ORIGIN}/mr`, hrefLang: 'mr' },
        { href: `${SITE_ORIGIN}/`, hrefLang: 'x-default' },
      ],
    });
  }, [language]);

  function changeLanguage(nextLanguage: LandingLanguage) {
    const nextPath = nextLanguage === 'mr' ? '/mr' : '/';
    window.history.replaceState({}, '', `${nextPath}${window.location.hash}`);
    setLanguage(nextLanguage);
  }

  return (
    <main className={`epawati-page${language === 'mr' ? ' epawati-page--mr' : ''}`}>
      <LandingHeader language={language} onLanguageChange={changeLanguage} portalUrl={PORTAL_URL} />
      <HeroSection copy={copy} portalUrl={PORTAL_URL} />
      <StatsSection copy={copy} />
      <FeaturesSection copy={copy} />
      <PortalSection copy={copy} />
      <HowSection copy={copy} />
      <ComparisonSection copy={copy} />
      <FAQSection copy={copy} />
      <ContactSection copy={copy} />
      <LandingFooter copy={copy} language={language} portalUrl={PORTAL_URL} />
    </main>
  );
}
