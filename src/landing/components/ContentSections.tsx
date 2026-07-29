import { ArrowRight, BarChart3, Check, Film, Landmark, Leaf, MessageCircle, Radio, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { TextEffect } from '../../../components/motion-primitives/text-effect';
import { DemoRequestForm } from './DemoRequestForm';
import { RevealSection } from './RevealSection';
import { audienceGroups, localizedCopy, supportingServices, workflowSteps, type LandingLanguage } from '../content';

interface SectionProps {
  chatHref: string;
  demoHref: string;
  language: LandingLanguage;
  onEnter: () => void;
}

function Actions({ chatHref, demoHref, labels }: { chatHref: string; demoHref: string; labels: { chat: string; demo: string } }) {
  return <div className="whatsapp-actions"><a className="button button-primary" href={demoHref} rel="noreferrer" target="_blank"><MessageCircle size={32} />{labels.demo}</a><a className="button button-secondary" href={chatHref} rel="noreferrer" target="_blank"><MessageCircle size={32} />{labels.chat}</a></div>;
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
  return <RevealSection className="samavet-hero section-shell" id="top" onEnter={onEnter}><motion.div animate="show" className="hero-copy" initial={reduceMotion ? false : 'hidden'} transition={{ staggerChildren: 0.12 }} variants={reduceMotion ? undefined : { hidden: {}, show: {} }}><motion.h1 transition={transition} variants={item}><MarketingText>{copy.heroTitle[0]}</MarketingText><em><MarketingText>{copy.heroTitle[1]}</MarketingText></em></motion.h1><motion.p className="hero-kicker" transition={transition} variants={item}><Leaf size={24} /><MarketingText>{copy.heroEyebrow}</MarketingText><span aria-hidden="true" className="hero-kicker-rule" /></motion.p><motion.p className="hero-description" transition={transition} variants={item}>{language === 'en' ? <>Samavet helps community organizations manage <strong className="hero-description-strong">digital donation receipts</strong> and day-to-day <strong className="hero-description-strong">festival operations</strong> — simply and transparently.</> : <MarketingText>{copy.heroDescription}</MarketingText>}</motion.p><motion.div transition={transition} variants={item}><Actions chatHref={chatHref} demoHref={demoHref} labels={copy} /></motion.div><motion.div className="hero-signals" transition={transition} variants={item}>{copy.heroSignals.map((signal) => <span key={signal}><ShieldCheck size={28} />{signal}</span>)}</motion.div></motion.div></RevealSection>;
}

export function EpawatiStory({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="epawati-story section-shell" id="epawati" onEnter={onEnter}><div className="story-rule"><span>01</span><i /></div><div className="section-heading"><p className="section-kicker"><MarketingText>{copy.receiptKicker}</MarketingText></p><h2><MarketingText>{copy.receiptTitle}</MarketingText></h2><p><MarketingText>{copy.receiptDescription}</MarketingText></p></div><div className="receipt-benefits">{copy.receiptBenefits.map((benefit) => <div key={benefit}><span><Check size={15} /></span><p><MarketingText>{benefit}</MarketingText></p></div>)}</div></RevealSection>;
}

export function IntelligenceSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="intelligence-section section-shell" id="intelligence" onEnter={onEnter}><div className="intelligence-copy"><p className="section-kicker"><MarketingText>{copy.eventKicker}</MarketingText></p><h2><MarketingText>{copy.eventTitle}</MarketingText></h2><p><MarketingText>{copy.eventDescription}</MarketingText></p><div className="intelligence-tags"><span><UsersRound size={15} /><MarketingText>{language === 'mr' ? 'लाइव्ह हेडकाउंट' : 'Live headcount'}</MarketingText></span><span><BarChart3 size={15} /><MarketingText>{language === 'mr' ? 'स्पष्ट इनसाइट्स' : 'Clear insights'}</MarketingText></span></div></div><div className="intelligence-panel" aria-label={language === 'mr' ? 'इव्हेंट इंटेलिजन्सचे उदाहरण' : 'Illustrative event intelligence dashboard'} role="img"><div className="panel-top"><span><MarketingText>LIVE EVENT INTELLIGENCE</MarketingText></span><i><MarketingText>NOW</MarketingText></i></div><div className="panel-metrics"><div><b><MarketingText>1,284</MarketingText></b><small><MarketingText>{language === 'mr' ? 'हेडकाउंट' : 'HEADCOUNT'}</MarketingText></small></div><div><b><MarketingText>74%</MarketingText></b><small><MarketingText>{language === 'mr' ? 'सक्रिय क्षेत्रे' : 'ACTIVE ZONES'}</MarketingText></small></div></div><div className="panel-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><p><MarketingText>{language === 'mr' ? 'उदाहरणासाठी दाखवलेले आकडे' : 'Illustrative activity signals'}</MarketingText></p></div></RevealSection>;
}

export function ServicesSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const icons = [Radio, Film];
  return <RevealSection className="services-section section-shell" id="services" onEnter={onEnter}><div className="section-heading centered"><p className="section-kicker"><MarketingText>{copy.servicesKicker}</MarketingText></p><h2><MarketingText>{copy.servicesTitle}</MarketingText></h2></div><div className="services-grid">{supportingServices[language].map(([title, description], index) => { const Icon = icons[index]; return <article key={title}><span><Icon size={24} /></span><h3><MarketingText>{title}</MarketingText></h3><p><MarketingText>{description}</MarketingText></p><i><ArrowRight size={17} /></i></article>; })}</div></RevealSection>;
}

export function AudienceSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const icons = [Landmark, Landmark, Sparkles, UsersRound, UsersRound];
  return <RevealSection className="audience-section section-shell" id="organizations" onEnter={onEnter}><div className="section-heading"><p className="section-kicker"><MarketingText>{copy.audienceKicker}</MarketingText></p><h2><MarketingText>{copy.audienceTitle}</MarketingText></h2><p><MarketingText>{copy.audienceDescription}</MarketingText></p></div><div className="audience-grid">{audienceGroups[language].map(([name, description], index) => { const Icon = icons[index]; return <article key={name}><Icon size={26} /><h3><MarketingText>{name}</MarketingText></h3><p><MarketingText>{description}</MarketingText></p></article>; })}</div></RevealSection>;
}

export function WorkflowSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="workflow-section section-shell" id="workflow" onEnter={onEnter}><div className="section-heading centered"><p className="section-kicker"><MarketingText>{copy.workflowKicker}</MarketingText></p><h2><MarketingText>{copy.workflowTitle}</MarketingText></h2></div><div className="workflow-list">{workflowSteps[language].map(([title, description], index) => <article key={title}><span><MarketingText>{`0${index + 1}`}</MarketingText></span><div><h3><MarketingText>{title}</MarketingText></h3><p><MarketingText>{description}</MarketingText></p></div></article>)}</div></RevealSection>;
}

export function ConversionSection({ chatHref, language, onEnter }: Pick<SectionProps, 'chatHref' | 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="conversion-section section-shell" id="contact" onEnter={onEnter}><div className="conversion-copy"><p className="section-kicker"><MarketingText>{copy.conversionKicker}</MarketingText></p><h2><MarketingText>{copy.conversionTitle}</MarketingText></h2><p><MarketingText>{copy.conversionDescription}</MarketingText></p><a className="conversion-chat" href={chatHref} rel="noreferrer" target="_blank"><MessageCircle size={18} />{copy.chat}<ArrowRight size={16} /></a><small>{copy.formNotice}</small></div><DemoRequestForm language={language} /></RevealSection>;
}
