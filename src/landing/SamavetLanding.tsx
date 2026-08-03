import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

import { AudienceSection, ConversionSection, EpawatiStory, HeroSection, IntelligenceSection, ServicesSection, WorkflowSection } from './components/ContentSections';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { localizedCopy, type LandingLanguage } from './content';
import { buildWhatsAppLink, PORTAL_URL, WHATSAPP_PHONE } from './links.js';
import './samavet.css';

export default function SamavetLanding() {
  const [language, setLanguage] = useState<LandingLanguage>('en');
  const [enteredSections, setEnteredSections] = useState(0);
  const [languagePulseKey, setLanguagePulseKey] = useState(0);
  const copy = localizedCopy[language];
  const demoHref = buildWhatsAppLink(WHATSAPP_PHONE, language === 'mr' ? 'नमस्कार समवेत, मला ई-पावती डेमो मागायचा आहे.' : 'Hello Samavet, I would like to request an ePawati demo.');
  const chatHref = buildWhatsAppLink(WHATSAPP_PHONE, language === 'mr' ? 'नमस्कार समवेत, मला अधिक माहिती हवी आहे.' : 'Hello Samavet, I would like to know more about Samavet.');

  useEffect(() => {
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
    document.title = language === 'mr'
      ? 'समवेत | प्रत्येक समुदाय देणगीसाठी डिजिटल पावती'
      : 'Samavet | Digital receipts for every community offering';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      language === 'mr'
        ? 'समवेत समुदाय संस्थांना डिजिटल देणगी पावत्या तयार करण्यास आणि इव्हेंटमधील उपक्रम समजून घेण्यास मदत करते.'
        : 'Samavet helps community organizations issue digital donation receipts and understand event activity.',
    );
  }, [language]);

  useEffect(() => {
    if (enteredSections > 0 && enteredSections % 2 === 0) setLanguagePulseKey(enteredSections);
  }, [enteredSections]);

  function recordSectionEntry() {
    setEnteredSections((count) => count + 1);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className={`samavet samavet--${language}`}>
      <LandingHeader language={language} languagePulseKey={languagePulseKey} onLanguageChange={setLanguage} portalLabel={copy.portal} portalUrl={PORTAL_URL} />
      <HeroSection chatHref={chatHref} demoHref={demoHref} language={language} onEnter={recordSectionEntry} />
      <EpawatiStory language={language} onEnter={recordSectionEntry} />
      <IntelligenceSection language={language} onEnter={recordSectionEntry} />
      <ServicesSection language={language} onEnter={recordSectionEntry} />
      <AudienceSection language={language} onEnter={recordSectionEntry} />
      <WorkflowSection language={language} onEnter={recordSectionEntry} />
      <ConversionSection chatHref={chatHref} language={language} onEnter={recordSectionEntry} />
        <LandingFooter chatHref={chatHref} language={language} portalLabel={copy.portal} portalUrl={PORTAL_URL} />
      </main>
    </MotionConfig>
  );
}
