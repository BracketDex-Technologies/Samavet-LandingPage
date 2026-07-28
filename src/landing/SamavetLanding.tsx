import { useEffect, useMemo, useState } from 'react';

import { CapabilitySection, AudienceSection, EpawatiSection, FeedbackSection, FinalCtaSection, HeroSection, WorkflowSection } from './components/ContentSections';
import { LandingFooter } from './components/LandingFooter';
import { LandingHeader } from './components/LandingHeader';
import { type LandingLanguage, localizedCopy } from './content';
import { buildWhatsAppLink, PORTAL_URL, WHATSAPP_PHONE } from './links.js';
import './samavet.css';

export default function SamavetLanding() {
  const [language, setLanguage] = useState<LandingLanguage>('en');
  const [feedback, setFeedback] = useState<string | null>(null);
  const copy = localizedCopy[language];
  const { chatHref, demoHref } = useMemo(() => ({
    demoHref: buildWhatsAppLink(WHATSAPP_PHONE, language === 'mr' ? 'नमस्कार समवेत, मला डेमो बुक करायचा आहे.' : 'Hello Samavet, I would like to book a demo.'),
    chatHref: buildWhatsAppLink(WHATSAPP_PHONE, language === 'mr' ? 'नमस्कार समवेत, मला अधिक माहिती हवी आहे.' : 'Hello Samavet, I would like to know more about Samavet.'),
  }), [language]);

  useEffect(() => {
    const originalTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const originalDescription = description?.getAttribute('content');

    document.title = language === 'mr'
      ? 'समवेत | समुदायांसाठी तंत्रज्ञान मंच'
      : 'Samavet | India’s Community Technology Platform';
    description?.setAttribute(
      'content',
      language === 'mr'
        ? 'समवेत समुदाय संस्थांना देणगी पावत्या, सदस्य, कामे आणि अहवाल व्यवस्थित सांभाळण्यास मदत करते.'
        : 'Samavet helps community organizations manage digital donation receipts, members, tasks, and clear reports.',
    );

    return () => {
      document.title = originalTitle;
      if (originalDescription === null) {
        description?.removeAttribute('content');
      } else if (originalDescription) {
        description?.setAttribute('content', originalDescription);
      }
    };
  }, [language]);

  return (
    <main className="samavet" id="top">
      <LandingHeader language={language} onLanguageChange={setLanguage} portalUrl={PORTAL_URL} portalLabel={copy.portal} />
      <HeroSection language={language} demoHref={demoHref} chatHref={chatHref} />
      <AudienceSection language={language} />
      <EpawatiSection language={language} />
      <CapabilitySection language={language} />
      <WorkflowSection language={language} />
      <FinalCtaSection language={language} demoHref={demoHref} chatHref={chatHref} />
      <FeedbackSection language={language} response={feedback} onRespond={setFeedback} />
      <LandingFooter language={language} chatHref={chatHref} portalUrl={PORTAL_URL} portalLabel={copy.portal} />
    </main>
  );
}
