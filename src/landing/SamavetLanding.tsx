import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect, useState } from 'react';

import { ComparisonSection, ContactSection, FAQSection, FeaturesSection, HeroSection, HowSection, PortalSection, StatsSection } from './components/ContentSections';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { PORTAL_URL } from './links.js';
import { applyPageSeo, SITE_ORIGIN } from './seo';
import './samavet.css';

const LANDING_SECTION_IDS = new Set(['features', 'portal', 'how', 'faq', 'contact']);

function getLandingSectionFromPath() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const pathWithoutLanguage = normalizedPath.startsWith('/mr/') ? normalizedPath.slice(3) : normalizedPath;
  const sectionId = pathWithoutLanguage.replace(/^\//, '');
  return LANDING_SECTION_IDS.has(sectionId) ? sectionId : '';
}

function getInitialLanguage(): LandingLanguage {
  return window.location.pathname === '/mr' || window.location.pathname.startsWith('/mr/') || new URLSearchParams(window.location.search).get('lang') === 'mr' ? 'mr' : 'en';
}

export default function SamavetLanding() {
  const [language, setLanguage] = useState<LandingLanguage>(getInitialLanguage);
  const copy = localizedCopy[language];

  useEffect(() => {
    const isMarathi = language === 'mr';
    const title = isMarathi
      ? 'समवेत | डिजिटल वर्गणी, ई-पावती आणि पावती सॉफ्टवेअर'
      : 'Samavet | Digital Vargani, ePawati & Pawati Software for Mandals';
    const description = isMarathi
      ? 'गणेश मंडळे, मंदिरे आणि ट्रस्टसाठी डिजिटल वर्गणी, ई-पावती आणि पावती सॉफ्टवेअर. WhatsApp पावत्या, देणगीदार नोंदी आणि ऑनलाइन संकलन व्यवस्थापित करा.'
      : 'Digital Vargani, ePawati and Pawati software for Ganesh mandals, temples and trusts. Issue WhatsApp receipts, track donors and manage collections online.';
    const keywords = isMarathi
      ? 'डिजिटल वर्गणी, डिजिटल पावती, ई-पावती, वर्गणी अ‍ॅप, पावती अ‍ॅप, गणेश मंडळ पावती, मंडळ वर्गणी सॉफ्टवेअर, देणगी पावती सॉफ्टवेअर, मंदिर देणगी पावती'
      : 'digital vargani, digital pawati, digital pavati, ePawati, e Pawati, e Pavati, epawati app, pawati app, pavati app, vargani app, vargani software, digital vargani software, digital pawati software, pawati pustak, pavati pustak, digital receipt for Ganesh mandal, Ganesh mandal vargani software, Ganpati mandal donation software, mandal collection app, WhatsApp donation receipt, online donation receipt, trust donation receipt software, temple donation receipt software, NGO donation receipt software';
    applyPageSeo({
      title,
      description,
      keywords,
      path: isMarathi ? '/mr' : '/',
      lang: isMarathi ? 'mr' : 'en',
      alternates: [
        { href: `${SITE_ORIGIN}/`, hrefLang: 'en' },
        { href: `${SITE_ORIGIN}/mr`, hrefLang: 'mr' },
        { href: `${SITE_ORIGIN}/`, hrefLang: 'x-default' },
      ],
    });
  }, [language]);

  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      duration: 1,
    });

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const sectionId = getLandingSectionFromPath();
    if (!sectionId) return;
    requestAnimationFrame(() => document.getElementById(sectionId)?.scrollIntoView({ block: 'start' }));
  }, []);

  function changeLanguage(nextLanguage: LandingLanguage) {
    const sectionId = getLandingSectionFromPath();
    const nextBasePath = nextLanguage === 'mr' ? '/mr' : '';
    const nextPath = sectionId ? `${nextBasePath}/${sectionId}` : nextBasePath || '/';
    window.history.replaceState({}, '', nextPath);
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
