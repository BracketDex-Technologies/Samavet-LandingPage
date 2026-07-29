import { ArrowRight, BarChart3, Check, Film, Landmark, Leaf, MessageCircle, Radio, Sparkles, UsersRound } from 'lucide-react';

import { DemoRequestForm } from './DemoRequestForm';
import { EpawatiShowcase } from './EpawatiShowcase';
import { RevealSection } from './RevealSection';
import { audienceGroups, localizedCopy, supportingServices, workflowSteps, type LandingLanguage } from '../content';

interface SectionProps {
  chatHref: string;
  demoHref: string;
  language: LandingLanguage;
  onEnter: () => void;
}

function Actions({ chatHref, demoHref, labels }: { chatHref: string; demoHref: string; labels: { chat: string; demo: string } }) {
  return <div className="whatsapp-actions"><a className="button button-primary" href={demoHref} rel="noreferrer" target="_blank"><MessageCircle size={17} />{labels.demo}</a><a className="button button-secondary" href={chatHref} rel="noreferrer" target="_blank">{labels.chat}<ArrowRight size={16} /></a></div>;
}

export function HeroSection({ chatHref, demoHref, language, onEnter }: SectionProps) {
  const copy = localizedCopy[language];
  return <RevealSection className="samavet-hero section-shell" id="top" onEnter={onEnter}><div className="hero-copy"><h1 className="hero-reveal-1">{copy.heroTitle[0]}<em>{copy.heroTitle[1]}</em></h1><p className="hero-kicker hero-reveal-2"><Leaf size={18} />{copy.heroEyebrow}</p><p className="hero-description hero-reveal-3">{copy.heroDescription}</p><Actions chatHref={chatHref} demoHref={demoHref} labels={copy} /><div className="hero-signals">{copy.heroSignals.map((signal) => <span key={signal}>{signal}</span>)}</div></div><EpawatiShowcase language={language} /></RevealSection>;
}

export function EpawatiStory({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="epawati-story section-shell" id="epawati" onEnter={onEnter}><div className="story-rule"><span>01</span><i /></div><div className="section-heading"><p className="section-kicker">{copy.receiptKicker}</p><h2>{copy.receiptTitle}</h2><p>{copy.receiptDescription}</p></div><div className="receipt-benefits">{copy.receiptBenefits.map((benefit) => <div key={benefit}><span><Check size={15} /></span><p>{benefit}</p></div>)}</div></RevealSection>;
}

export function IntelligenceSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="intelligence-section section-shell" id="intelligence" onEnter={onEnter}><div className="intelligence-copy"><p className="section-kicker">{copy.eventKicker}</p><h2>{copy.eventTitle}</h2><p>{copy.eventDescription}</p><div className="intelligence-tags"><span><UsersRound size={15} />{language === 'mr' ? 'लाइव्ह हेडकाउंट' : 'Live headcount'}</span><span><BarChart3 size={15} />{language === 'mr' ? 'स्पष्ट इनसाइट्स' : 'Clear insights'}</span></div></div><div className="intelligence-panel" aria-label={language === 'mr' ? 'इव्हेंट इंटेलिजन्सचे उदाहरण' : 'Illustrative event intelligence dashboard'} role="img"><div className="panel-top"><span>LIVE EVENT INTELLIGENCE</span><i>NOW</i></div><div className="panel-metrics"><div><b>1,284</b><small>{language === 'mr' ? 'हेडकाउंट' : 'HEADCOUNT'}</small></div><div><b>74%</b><small>{language === 'mr' ? 'सक्रिय क्षेत्रे' : 'ACTIVE ZONES'}</small></div></div><div className="panel-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div><p>{language === 'mr' ? 'उदाहरणासाठी दाखवलेले आकडे' : 'Illustrative activity signals'}</p></div></RevealSection>;
}

export function ServicesSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const icons = [Radio, Film];
  return <RevealSection className="services-section section-shell" id="services" onEnter={onEnter}><div className="section-heading centered"><p className="section-kicker">{copy.servicesKicker}</p><h2>{copy.servicesTitle}</h2></div><div className="services-grid">{supportingServices[language].map(([title, description], index) => { const Icon = icons[index]; return <article key={title}><span><Icon size={24} /></span><h3>{title}</h3><p>{description}</p><i><ArrowRight size={17} /></i></article>; })}</div></RevealSection>;
}

export function AudienceSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  const icons = [Landmark, Landmark, Sparkles, UsersRound, UsersRound];
  return <RevealSection className="audience-section section-shell" id="organizations" onEnter={onEnter}><div className="section-heading"><p className="section-kicker">{copy.audienceKicker}</p><h2>{copy.audienceTitle}</h2><p>{copy.audienceDescription}</p></div><div className="audience-grid">{audienceGroups[language].map(([name, description], index) => { const Icon = icons[index]; return <article key={name}><Icon size={26} /><h3>{name}</h3><p>{description}</p></article>; })}</div></RevealSection>;
}

export function WorkflowSection({ language, onEnter }: Pick<SectionProps, 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="workflow-section section-shell" id="workflow" onEnter={onEnter}><div className="section-heading centered"><p className="section-kicker">{copy.workflowKicker}</p><h2>{copy.workflowTitle}</h2></div><div className="workflow-list">{workflowSteps[language].map(([title, description], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></RevealSection>;
}

export function ConversionSection({ chatHref, language, onEnter }: Pick<SectionProps, 'chatHref' | 'language' | 'onEnter'>) {
  const copy = localizedCopy[language];
  return <RevealSection className="conversion-section section-shell" id="contact" onEnter={onEnter}><div className="conversion-copy"><p className="section-kicker">{copy.conversionKicker}</p><h2>{copy.conversionTitle}</h2><p>{copy.conversionDescription}</p><a className="conversion-chat" href={chatHref} rel="noreferrer" target="_blank"><MessageCircle size={18} />{copy.chat}<ArrowRight size={16} /></a><small>{copy.formNotice}</small></div><DemoRequestForm language={language} /></RevealSection>;
}
