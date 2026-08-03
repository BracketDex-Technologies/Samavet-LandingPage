import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, BarChart3, Landmark, Leaf, MessageCircle, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TextEffect } from '../../../components/motion-primitives/text-effect';
import { DemoRequestForm } from './DemoRequestForm';
import { GlowingEffect } from './ui/GlowingEffect';
import { RevealSection } from './RevealSection';
import { audienceGroups, localizedCopy, supportingServices, workflowSteps, type LandingLanguage } from '../content';

import bentoReceiptEditor from '../assets/bento-receipt-editor.png';
import bentoActivityLogs from '../assets/bento-activity-logs.png';
import bentoReceiptTemplates from '../assets/bento-receipt-templates.png';

interface SectionProps {
  chatHref: string;
  demoHref: string;
  language: LandingLanguage;
  onEnter: () => void;
}

function Actions({ chatHref, demoHref, labels }: { chatHref: string; demoHref: string; labels: { chat: string; demo: string } }) {
  return <div className="whatsapp-actions"><a className="button button-primary" href={demoHref} rel="noreferrer" target="_blank"><MessageCircle size={18} />{labels.demo}</a><a className="button button-secondary" href={chatHref} rel="noreferrer" target="_blank"><MessageCircle size={18} />{labels.chat}</a></div>;
}

function MarketingText({ children }: { children: string }) {
  const reduceMotion = useReducedMotion();

  return reduceMotion ? children : <TextEffect as="span" preset="fade-in-blur" speedReveal={1.1} speedSegment={0.3}>{children}</TextEffect>;
}

export function HeroSection({ chatHref, demoHref, language, onEnter }: SectionProps) {
  const copy = localizedCopy[language];
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? undefined : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.62, ease: [0.2, 0.75, 0.28, 1] as const };
  return <RevealSection className="samavet-hero section-shell" id="top" onEnter={onEnter}><motion.div animate="show" className="hero-copy" initial={reduceMotion ? false : 'hidden'} transition={{ staggerChildren: 0.12 }} variants={reduceMotion ? undefined : { hidden: {}, show: {} }}><motion.h1 transition={transition} variants={item}><MarketingText>{copy.heroTitle[0]}</MarketingText><em><MarketingText>{copy.heroTitle[1]}</MarketingText></em></motion.h1><motion.p className="hero-kicker" transition={transition} variants={item}><Leaf size={24} /><MarketingText>{copy.heroEyebrow}</MarketingText></motion.p><motion.p className="hero-description" transition={transition} variants={item}>{language === 'en' ? <>Samavet helps community organizations manage <strong className="hero-description-strong">digital donation receipts</strong> and day-to-day <strong className="hero-description-strong">festival operations</strong> — simply and transparently.</> : <MarketingText>{copy.heroDescription}</MarketingText>}</motion.p><motion.div transition={transition} variants={item}><Actions chatHref={chatHref} demoHref={demoHref} labels={copy} /></motion.div><motion.div className="hero-signals" transition={transition} variants={item}>{copy.heroSignals.map((signal) => <span key={signal}><ShieldCheck size={28} />{signal}</span>)}</motion.div></motion.div></RevealSection>;
}

type BentoCard = {
  id: string;
  img: string;
  enTitle: string;
  mrTitle: string;
  enDescription: string;
  mrDescription: string;
  enExpanded: string;
  mrExpanded: string;
};

const bentoCards: BentoCard[] = [
  {
    id: 'receipt-editor',
    img: bentoReceiptEditor,
    enTitle: 'A receipt made for your organization',
    mrTitle: 'तुमच्या संस्थेसाठी योग्य पावती',
    enDescription: 'A receipt made for your organization',
    mrDescription: 'तुमच्या संस्थेसाठी योग्य पावती',
    enExpanded: 'Create and issue digital donation receipts in seconds. Choose a template, fill in donor details, and send — no paperwork, no delays. Every receipt is stored automatically for easy tracking and compliance.',
    mrExpanded: 'सेकंदात डिजिटल देणगी पावत्या तयार करा आणि पाठवा. टेम्पलेट निवडा, देणगीदार माहिती भरा आणि पाठवा — कागदपत्रे नाहीत, विलंब नाही. प्रत्येक पावती स्वयंचलितपणे नोंदवली जाते.',
  },
  {
    id: 'activity-logs',
    img: bentoActivityLogs,
    enTitle: 'A clear digital record for every offering',
    mrTitle: 'प्रत्येक देणगीची स्पष्ट डिजिटल नोंद',
    enDescription: 'A clear digital record for every offering',
    mrDescription: 'प्रत्येक देणगीची स्पष्ट डिजिटल नोंद',
    enExpanded: 'Every donation, every check-in, every transaction — logged in real time. Team members can view activity instantly, no more chasing paper trails. Full transparency for your trust and its donors.',
    mrExpanded: 'प्रत्येक देणगी, प्रत्येक चेक-इन, प्रत्येक व्यवहार — रिअल-टाइममध्ये नोंदवले. संघाचे सदस्य त्वरित क्रियाकलाप पाहू शकतात, आता कागदपत्रांच्या मागे धावण्याची गरज नाही.',
  },
  {
    id: 'receipt-templates',
    img: bentoReceiptTemplates,
    enTitle: 'Beautiful templates for every occasion',
    mrTitle: 'प्रत्येक सणासाठी सुंदर टेम्पलेट्स',
    enDescription: 'Beautiful templates for every occasion',
    mrDescription: 'प्रत्येक सणासाठी सुंदर टेम्पलेट्स',
    enExpanded: 'Festival-specific, event-ready receipt designs that reflect your tradition. From Ganesh Chaturthi to Diwali, each template carries your organization\'s identity with warmth and professionalism.',
    mrExpanded: 'सण-विशिष्ट, कार्यक्रम-सज्ज पावती डिझाइन जी तुमच्या परंपरेचे प्रतिबिंब आहे. गणेश चतुर्थीपासून दिवाळीपर्यंत, प्रत्येक टेम्पलेट तुमच्या संस्थेची ओळख उबदारपणे आणि व्यावसायिकपणे दर्शवतो.',
  },
];

export function EpawatiStory({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const [active, setActive] = useState<BentoCard | null>(null);
  const id = useId();
  const backdropRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) setActive(null);
  }, []);

  return (
    <RevealSection className="epawati-story section-shell" id="epawati" onEnter={onEnter}>
      <div className="epawati-story-copy section-heading">
        <p className="section-kicker">{copy.receiptKicker}</p>
        <h2>{copy.receiptTitle}</h2>
        <p>{copy.receiptDescription}</p>
      </div>
      <div className="bento-grid">
        {bentoCards.map((card) => (
          <motion.article
            className="bento-card"
            key={card.id}
            layoutId={`bento-card-${card.id}-${id}`}
            onClick={() => setActive(card)}
            style={{ cursor: 'pointer' }}
          >
            <motion.div className="bento-card__image" layoutId={`bento-image-${card.id}-${id}`}>
              <img alt={card[language === 'mr' ? 'mrTitle' : 'enTitle']} src={card.img} />
            </motion.div>
            <div className="bento-card__content">
              <motion.p layoutId={`bento-title-${card.id}-${id}`}>{card[language === 'mr' ? 'mrTitle' : 'enTitle']}</motion.p>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="bento-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            ref={backdropRef}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="bento-expanded"
              layoutId={`bento-card-${active.id}-${id}`}
              ref={expandedRef}
            >
              <button className="bento-expanded__close" onClick={() => setActive(null)} aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>
              </button>
              <motion.div className="bento-expanded__image" layoutId={`bento-image-${active.id}-${id}`}>
                <img alt={active[language === 'mr' ? 'mrTitle' : 'enTitle']} src={active.img} />
              </motion.div>
              <div className="bento-expanded__body">
                <motion.h3 layoutId={`bento-title-${active.id}-${id}`}>{active[language === 'mr' ? 'mrTitle' : 'enTitle']}</motion.h3>
                <p>{active[language === 'mr' ? 'mrExpanded' : 'enExpanded']}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </RevealSection>
  );
}

export function IntelligenceSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const metrics = language === 'mr'
    ? [['1,284', 'नोंदणी'], ['86%', 'चेक-इन'], ['24x7', 'प्रसारण']]
    : [['1,284', 'Registrations'], ['86%', 'Checked in'], ['24x7', 'Streaming']];
  const zones = language === 'mr'
    ? [['प्रवेशद्वार', '92%'], ['मुख्य मंडप', '74%'], ['प्रसाद', '58%']]
    : [['Entry gate', '92%'], ['Main mandap', '74%'], ['Prasad desk', '58%']];

  useEffect(() => {
    if (reduceMotion || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo('.insight-card', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true } });
    }, sectionRef);
    return () => context.revert();
  }, [reduceMotion]);

  return <RevealSection className="intelligence-section section-shell" id="intelligence" onEnter={onEnter}><div className="intelligence-copy"><p className="section-kicker"><MarketingText>{copy.eventKicker}</MarketingText></p><h2><MarketingText>{copy.eventTitle}</MarketingText></h2><p><MarketingText>{copy.eventDescription}</MarketingText></p><div className="intelligence-tags"><span><UsersRound size={18} />{language === 'mr' ? 'लाइव्ह हेडकाउंट' : 'Live headcount'}</span><span><BarChart3 size={18} />{language === 'mr' ? 'स्पष्ट इनसाइट्स' : 'Clear insights'}</span></div></div><div className="intelligence-dashboard" ref={sectionRef} aria-label={language === 'mr' ? 'इव्हेंट इंटेलिजन्सचे उदाहरण' : 'Illustrative event intelligence dashboard'}><div className="insight-header insight-card"><div><span>{language === 'mr' ? 'लाइव्ह नियंत्रण' : 'Live command view'}</span><strong>{language === 'mr' ? 'आजचा उत्सव' : 'Today festival'}</strong></div><i>LIVE</i></div><div className="insight-metrics">{metrics.map(([value, label]) => <div className="insight-card" key={label}><b>{value}</b><small>{label}</small></div>)}</div><div className="insight-zone-grid">{zones.map(([label, value]) => <div className="insight-card" key={label}><span>{label}</span><b>{value}</b></div>)}</div></div></RevealSection>;
}

export function ServicesSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="services-section section-shell" id="services" onEnter={onEnter}><div className="section-heading centered"><p className="section-kicker"><MarketingText>{copy.servicesKicker}</MarketingText></p><h2><MarketingText>{copy.servicesTitle}</MarketingText></h2></div><div className="services-bento">{supportingServices[language].map(([eyebrow, title, description], index) => <article className={`service-bento-card service-bento-card--${index + 1}`} key={title}><GlowingEffect blur={0} borderWidth={3} spread={80} glow disabled={false} proximity={64} inactiveZone={0.01} /><div className="service-bento-card__content"><p>{eyebrow}</p><h3>{title}</h3><small>{description}</small></div></article>)}</div></RevealSection>;
}

export function AudienceSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const icons = [Landmark, Landmark, Sparkles, UsersRound, UsersRound];
  return <RevealSection className="audience-section section-shell" id="organizations" onEnter={onEnter}><div className="section-heading"><p className="section-kicker"><MarketingText>{copy.audienceKicker}</MarketingText></p><h2><MarketingText>{copy.audienceTitle}</MarketingText></h2><p><MarketingText>{copy.audienceDescription}</MarketingText></p></div><div className="audience-grid">{audienceGroups[language].map(([name, description], index) => { const Icon = icons[index]; return <article key={name}><Icon size={34} /><h3><MarketingText>{name}</MarketingText></h3><p><MarketingText>{description}</MarketingText></p></article>; })}</div></RevealSection>;
}

export function WorkflowSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const icons = [Sparkles, ShieldCheck, BarChart3];
  return <RevealSection className="workflow-section section-shell" id="workflow" onEnter={onEnter}><div className="section-heading centered"><p className="section-kicker"><MarketingText>{copy.workflowKicker}</MarketingText></p><h2><MarketingText>{copy.workflowTitle}</MarketingText></h2></div><div className="workflow-list">{workflowSteps[language].map(([title, description], index) => { const Icon = icons[index]; return <article key={title}><i className="workflow-step-icon"><Icon size={28} /></i><div className="workflow-step-copy"><h3><MarketingText>{title}</MarketingText></h3><p><MarketingText>{description}</MarketingText></p></div></article>; })}</div></RevealSection>;
}

export function ConversionSection({ chatHref, language, onEnter }: Pick<SectionProps, 'chatHref' | 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="conversion-section section-shell" id="contact" onEnter={onEnter}><div className="conversion-copy"><p className="section-kicker"><MarketingText>{copy.conversionKicker}</MarketingText></p><h2><MarketingText>{copy.conversionTitle}</MarketingText></h2><p><MarketingText>{copy.conversionDescription}</MarketingText></p><a className="conversion-chat" href={chatHref} rel="noreferrer" target="_blank"><MessageCircle size={18} />{copy.chat}<ArrowRight size={16} /></a><small>{copy.formNotice}</small></div><DemoRequestForm language={language} /></RevealSection>;
}
