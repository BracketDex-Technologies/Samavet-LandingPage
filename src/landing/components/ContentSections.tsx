import {
  BarChart3,
  Building2,
  Check,
  FileText,
  HeartHandshake,
  Landmark,
  Leaf,
  MessageCircle,
  ReceiptText,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
  UsersRound,
  WalletCards,
} from 'lucide-react';

import epawatiReceipt from '../assets/epawati-receipt.webp';
import ganeshProcession from '../assets/samavet-ganesh-procession.webp';
import { audienceGroups, capabilities, epawatiBenefits, localizedCopy, workflowSteps, type LandingLanguage } from '../content';

interface SharedProps {
  language: LandingLanguage;
  demoHref: string;
  chatHref: string;
}

const audienceIcons = [UsersRound, Landmark, Building2, HeartHandshake, UsersRound];
const capabilityIcons = [UsersRound, FileText, MessageCircle, BarChart3, WalletCards];
const workflowIcons = [UsersRound, ReceiptText, BarChart3];

function WhatsAppActions({ chatHref, demoHref, labels }: { chatHref: string; demoHref: string; labels: { chat: string; demo: string } }) {
  return (
    <div className="whatsapp-actions">
      <a className="button button-primary" href={demoHref} target="_blank" rel="noreferrer"><MessageCircle size={19} />{labels.demo}</a>
      <a className="button button-secondary" href={chatHref} target="_blank" rel="noreferrer"><MessageCircle size={19} />{labels.chat}</a>
    </div>
  );
}

export function HeroSection({ chatHref, demoHref, language }: SharedProps) {
  const copy = localizedCopy[language];
  return (
    <section className="hero-section" id="about">
      <div className="hero-copy">
        <h1>{copy.heroTitle[0]}<br /><em>{copy.heroTitle[1]}</em></h1>
        <p className="hero-tagline"><Leaf size={16} />{copy.heroTagline}</p>
        <p className="hero-description">{copy.heroDescription}</p>
        <WhatsAppActions chatHref={chatHref} demoHref={demoHref} labels={copy} />
        <p className="hero-trust"><ShieldCheck size={17} />{copy.heroTrust}</p>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src={ganeshProcession} alt="" />
      </div>
    </section>
  );
}

export function AudienceSection({ language }: Pick<SharedProps, 'language'>) {
  const copy = localizedCopy[language];
  return (
    <section className="audience-section section-shell" id="organizations">
      <div className="section-heading centered">
        <p className="section-kicker">{copy.audienceKicker}</p>
        <h2>{copy.audienceTitle}</h2>
        <p>{copy.audienceIntro}</p>
      </div>
      <div className="audience-grid">
        {audienceGroups[language].map(([name, description], index) => {
          const Icon = audienceIcons[index];
          return <article key={name} className="audience-item"><Icon size={31} strokeWidth={1.45} /><h3>{name}</h3><p>{description}</p></article>;
        })}
      </div>
    </section>
  );
}

export function EpawatiSection({ language }: Pick<SharedProps, 'language'>) {
  const copy = localizedCopy[language];
  return (
    <section className="epawati-section section-shell" id="epawati">
      <div className="epawati-visual"><img src={epawatiReceipt} alt="Abstract ePawati receipt and confirmation visual" /></div>
      <div className="epawati-copy">
        <p className="section-kicker">EPĀWATI</p>
        <h2>{copy.epawatiTitle[0]} <span>{copy.epawatiTitle[1]}</span></h2>
        <p className="section-description">{copy.epawatiDescription}</p>
        <div className="benefit-list">
          {epawatiBenefits[language].map(([title, description]) => <div key={title}><span><Check size={16} /></span><p><strong>{title}</strong>{description}</p></div>)}
        </div>
      </div>
    </section>
  );
}

export function CapabilitySection({ language }: Pick<SharedProps, 'language'>) {
  const copy = localizedCopy[language];
  return (
    <section className="capability-section section-shell" id="features">
      <div className="section-heading centered"><p className="section-kicker">{copy.capabilitiesKicker}</p><h2>{copy.capabilitiesTitle}</h2></div>
      <div className="capability-grid">
        {capabilities[language].map(([title, description], index) => {
          const Icon = capabilityIcons[index];
          return <article key={title}><Icon size={29} strokeWidth={1.5} /><h3>{title}</h3><p>{description}</p></article>;
        })}
      </div>
    </section>
  );
}

export function WorkflowSection({ language }: Pick<SharedProps, 'language'>) {
  const copy = localizedCopy[language];
  return (
    <section className="workflow-section section-shell" id="how-it-works">
      <div className="section-heading centered"><p className="section-kicker">{copy.workflowKicker}</p><h2>{copy.workflowTitle}</h2></div>
      <div className="workflow-list">
        {workflowSteps[language].map(([title, description], index) => {
          const Icon = workflowIcons[index];
          return <article key={title}><span className="step-number">0{index + 1}</span><Icon size={25} strokeWidth={1.45} /><div><h3>{title}</h3><p>{description}</p></div></article>;
        })}
      </div>
    </section>
  );
}

export function FinalCtaSection({ chatHref, demoHref, language }: SharedProps) {
  const copy = localizedCopy[language];
  return <section className="final-cta section-shell" id="contact"><div><p className="section-kicker">{copy.finalKicker}</p><h2>{copy.finalTitle}</h2><p>{copy.finalDescription}</p></div><WhatsAppActions chatHref={chatHref} demoHref={demoHref} labels={copy} /></section>;
}

export function FeedbackSection({ language, response, onRespond }: { language: LandingLanguage; response: string | null; onRespond: (response: string) => void }) {
  const copy = localizedCopy[language];
  return <section className="feedback-section" aria-live="polite"><p>{response ? copy.feedbackThanks : copy.feedbackPrompt}</p><div>{!response && <><button type="button" onClick={() => onRespond('yes')}><ThumbsUp size={14} />{copy.feedbackYes}</button><button type="button" onClick={() => onRespond('no')}><ThumbsDown size={14} />{copy.feedbackNo}</button></>}</div></section>;
}
