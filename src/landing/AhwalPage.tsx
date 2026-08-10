import { useEffect, useState } from 'react';

import { AhwalBookMaker } from './components/AhwalBookMaker';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { PORTAL_URL } from './links.js';
import { applyPageSeo, SITE_ORIGIN } from './seo';
import './samavet.css';
import './ahwal.css';

function getInitialLanguage(): LandingLanguage {
  return new URLSearchParams(window.location.search).get('lang') === 'mr' ? 'mr' : 'en';
}

export default function AhwalPage() {
  const [language, setLanguage] = useState<LandingLanguage>(getInitialLanguage);
  const copy = localizedCopy[language];
  const isMarathi = language === 'mr';

  useEffect(() => {
    applyPageSeo({
      title: isMarathi ? 'अहवाल | PDF पासून 3D पुस्तक तयार करा' : 'Ahwal | Create a 3D Book from a PDF',
      description: isMarathi
        ? 'PDF अपलोड करून ब्राउजरमध्येच तात्पुरते interactive 3D अहवाल पुस्तक तयार करा. फाइल सर्व्हरवर अपलोड होत नाही.'
        : 'Upload a PDF and create a temporary interactive 3D Ahwal book directly in your browser. No server upload or storage.',
      keywords: isMarathi ? 'अहवाल, 3D पुस्तक, PDF पुस्तक, समवेत अहवाल' : 'Ahwal, 3D book maker, PDF book maker, Samavet Ahwal, GLB USDZ book',
      path: '/ahwal',
      lang: isMarathi ? 'mr' : 'en',
      alternates: [
        { href: `${SITE_ORIGIN}/ahwal`, hrefLang: 'en' },
        { href: `${SITE_ORIGIN}/ahwal?lang=mr`, hrefLang: 'mr' },
        { href: `${SITE_ORIGIN}/ahwal`, hrefLang: 'x-default' },
      ],
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Ahwal 3D Book Maker',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web browser',
        url: `${SITE_ORIGIN}/ahwal`,
      },
    });
  }, [isMarathi]);

  function changeLanguage(nextLanguage: LandingLanguage) {
    const nextSearch = nextLanguage === 'mr' ? '?lang=mr' : '';
    window.history.replaceState({}, '', `/ahwal${nextSearch}`);
    setLanguage(nextLanguage);
  }

  return (
    <main className={`epawati-page ahwal-shell${isMarathi ? ' epawati-page--mr' : ''}`}>
      <LandingHeader language={language} onLanguageChange={changeLanguage} portalUrl={PORTAL_URL} />
      <AhwalBookMaker language={language} />
      <LandingFooter copy={copy} language={language} portalUrl={PORTAL_URL} />
    </main>
  );
}
