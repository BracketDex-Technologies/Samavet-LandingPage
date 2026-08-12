import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight, Check, ChevronDown, CircleCheck, FileSpreadsheet, Receipt } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { AnimatePresence, motion as motionReact } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import featurePhoneMockup from '../assets/f-phonemockup.png';
import featureLaptopMockup from '../assets/f-laptopmockup.png';
import feature3Screenshot from '../assets/feature3rd.png';
import feature4Flipbook from '../assets/feature4th.png';
import heroMockup from '../assets/phone_mockup_updated_transparent_4500x3000.png';
import heroCtaIcon1 from '../assets/icon1.svg';
import heroCtaIcon2 from '../assets/icon2.svg';
import heroCtaIcon3 from '../assets/icon3.svg';
import heroCtaIcon4 from '../assets/icon4.svg';
import type { LandingCopy } from '../content';
import { RevealSection } from './RevealSection';
import CountUp from './ui/CountUp';
import { FlipWords } from './ui/FlipWords';

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  copy: LandingCopy;
}

interface HeroProps extends CopyProps {
  portalUrl: string;
}

interface FeatureScrollCharacterProps {
  centerIndex: number;
  char: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}

const featureVisuals = [
  { kind: 'phone', src: featurePhoneMockup },
  { kind: 'laptop', src: featureLaptopMockup },
  { kind: 'screenshot', src: feature3Screenshot },
  { kind: 'flipbook', src: feature4Flipbook },
] as const;
const heroCtaIcons = [heroCtaIcon1, heroCtaIcon2, heroCtaIcon3, heroCtaIcon4];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function splitTextCharacters(text: string) {
  if (typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
}

function parseStatValue(value: string) {
  const digitMap: Record<string, string> = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
  const match = value.match(/^([\d०-९,]+)(.*)$/);
  if (!match) return null;

  const numericText = match[1].replace(/[०-९]/g, (digit) => digitMap[digit]).replace(/,/g, '');
  const target = Number(numericText);
  if (!Number.isFinite(target)) return null;

  return {
    locale: /[०-९]/.test(match[1]) ? 'mr-IN-u-nu-deva' : 'en-US',
    separator: value.includes(',') ? ',' : '',
    suffix: match[2],
    target,
  };
}

function FeatureScrollCharacter({ centerIndex, char, index, scrollYProgress }: FeatureScrollCharacterProps) {
  const isSpace = char === ' ';
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.72], [distanceFromCenter * 44, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.72], [distanceFromCenter * 42, 0]);

  return (
    <motion.span
      className={`feature-scroll-title__char${isSpace ? ' feature-scroll-title__space' : ''}`}
      style={{ x, rotateX }}
    >
      {isSpace ? '\u00a0' : char}
    </motion.span>
  );
}

function FeatureScrollTitle({ text }: { text: string }) {
  const targetRef = useRef<HTMLHeadingElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 88%', 'center 45%'],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, { damping: 26, mass: 0.45, stiffness: 85 });
  let characterIndex = 0;
  const tokens = (text.match(/\S+|\s+/g) ?? [text]).map((segment) => {
    const chars = splitTextCharacters(segment).map((char) => ({ char, index: characterIndex++ }));
    return { chars, isSpace: /^\s+$/.test(segment) };
  });
  const centerIndex = Math.floor(characterIndex / 2);

  if (reducedMotion) return <h2>{text}</h2>;

  return (
    <h2 aria-label={text} className="feature-scroll-title" ref={targetRef}>
      <span aria-hidden="true">
        {tokens.map((token, tokenIndex) => (
          <span className={token.isSpace ? 'feature-scroll-title__word feature-scroll-title__word--space' : 'feature-scroll-title__word'} key={`${tokenIndex}-${token.chars[0]?.index ?? 0}`}>
            {token.chars.map(({ char, index }) => (
              <FeatureScrollCharacter centerIndex={centerIndex} char={char} index={index} key={`${char}-${index}`} scrollYProgress={smoothScrollYProgress} />
            ))}
          </span>
        ))}
      </span>
    </h2>
  );
}

export function HeroSection({ copy, portalUrl }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reducedMotion = prefersReducedMotion();
      const context = gsap.context(() => {
        if (reducedMotion) {
        gsap.set('.hero-reveal', { clearProps: 'all' });
        return;
      }
      gsap.fromTo('.hero-reveal', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 });
    }, hero);
    return () => context.revert();
  }, [copy.heroTitle]);

  return (
    <section className="hero-section grain" id="top" ref={heroRef}>
      <div className="hero-glow hero-glow--brand" aria-hidden="true" />
      <div className="hero-glow hero-glow--forest" aria-hidden="true" />
      <div className="landing-container hero-layout">
        <div className="hero-copy">
          <h1 className="hero-reveal">
            <span className="hero-title-main">{copy.heroTitle[0]}</span>
            <span className="hero-title-line">
              {copy.heroTitle[1] ? <span>{copy.heroTitle[1]}</span> : null}
              <FlipWords words={copy.heroAudienceWords} />
            </span>
            <span className="hero-title-support">{copy.heroTitle[2]}</span>
            <span className="hero-title-final">{copy.heroTitle[3]}</span>
          </h1>
          <p className="hero-description hero-reveal">{copy.heroDescription}</p>
          <div className="hero-actions hero-reveal">
            <a className="button button--primary hero-cta-button" href={portalUrl}>
              <span className="btn-text">{copy.portalCta}</span>
              <span className="hero-cta-icons" aria-hidden="true">
                <ArrowRight className="hero-cta-icon hero-cta-icon--default hero-cta-icon--1" size={22} />
                {heroCtaIcons.map((icon, index) => <img alt="" className={`hero-cta-icon hero-cta-icon--${index + 2}`} key={icon} src={icon} />)}
              </span>
            </a>
            <a className="button button--secondary" href="/portal">{copy.portalPreviewCta}</a>
          </div>
        </div>

        <div className="hero-artwork" aria-hidden="true">
          <div className="hero-phone-showcase">
            <img className="hero-phone-showcase__image" src={heroMockup} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndianMashupDivider() {
  return (
    <div aria-hidden="true" className="custom-divider">
      <svg className="custom-divider__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1200 80" preserveAspectRatio="xMidYMid meet">
        <g fill="#e65100">
          <circle cx="60" cy="60" r="3" opacity="0.3" />
          <circle cx="85" cy="60" r="3" opacity="0.4" />
          <circle cx="110" cy="60" r="3" opacity="0.5" />
          <circle cx="135" cy="60" r="3" opacity="0.6" />
          <circle cx="160" cy="60" r="3" opacity="0.7" />
          <circle cx="185" cy="60" r="3" opacity="0.8" />
          <circle cx="210" cy="60" r="3" opacity="0.9" />
          <circle cx="235" cy="60" r="3" />
          <circle cx="260" cy="60" r="3" />
          <circle cx="285" cy="60" r="3" />
          <circle cx="310" cy="60" r="3" />
          <circle cx="335" cy="60" r="3" />
          <circle cx="360" cy="60" r="3" />
          <circle cx="385" cy="60" r="3" />
          <circle cx="410" cy="60" r="3" />
          <circle cx="435" cy="60" r="3.5" />
          <circle cx="460" cy="60" r="3.5" />
          <circle cx="485" cy="60" r="3.5" />
          <circle cx="510" cy="60" r="4" />
          <circle cx="535" cy="60" r="4" />
          <circle cx="560" cy="60" r="4.5" />
        </g>
        <g transform="translate(600, 60)" fill="#ff6b00">
          <path d="M 0,-25 C 10,-12 10,-5 0,0 C -10,-5 -10,-12 0,-25 Z" fill="#e65100" />
          <path d="M -20,-15 C -10,-15 -5,-5 0,0 C -10,0 -20,-5 -20,-15 Z" fill="#ff6b00" />
          <path d="M 20,-15 C 10,-15 5,-5 0,0 C 10,0 20,-5 20,-15 Z" fill="#ff6b00" />
          <path d="M -28,5 C -20,-2 -10,0 0,0 C -10,8 -20,10 -28,5 Z" fill="#ff8c00" />
          <path d="M 28,5 C 20,-2 10,0 0,0 C 10,8 20,10 28,5 Z" fill="#ff8c00" />
          <circle cx="0" cy="0" r="4.5" fill="#ffb74d" />
        </g>
        <g fill="#e65100">
          <circle cx="640" cy="60" r="4.5" />
          <circle cx="665" cy="60" r="4" />
          <circle cx="690" cy="60" r="4" />
          <circle cx="715" cy="60" r="3.5" />
          <circle cx="740" cy="60" r="3.5" />
          <circle cx="765" cy="60" r="3.5" />
          <circle cx="790" cy="60" r="3" />
          <circle cx="815" cy="60" r="3" />
          <circle cx="840" cy="60" r="3" />
          <circle cx="865" cy="60" r="3" />
          <circle cx="890" cy="60" r="3" />
          <circle cx="915" cy="60" r="3" />
          <circle cx="940" cy="60" r="3" />
          <circle cx="965" cy="60" r="3" />
          <circle cx="990" cy="60" r="3" opacity="0.9" />
          <circle cx="1015" cy="60" r="3" opacity="0.8" />
          <circle cx="1040" cy="60" r="3" opacity="0.7" />
          <circle cx="1065" cy="60" r="3" opacity="0.6" />
          <circle cx="1090" cy="60" r="3" opacity="0.5" />
          <circle cx="1115" cy="60" r="3" opacity="0.4" />
          <circle cx="1140" cy="60" r="3" opacity="0.3" />
        </g>
      </svg>
    </div>
  );
}

export function MandalaDotDivider() {
  const leftDots = [
    [60, 3, 0.3], [85, 3, 0.4], [110, 3, 0.5], [135, 3, 0.6], [160, 3, 0.7], [185, 3, 0.8], [210, 3, 0.9],
    [235, 3], [260, 3], [285, 3], [310, 3], [335, 3], [360, 3], [385, 3], [410, 3], [435, 3.5], [460, 3.5], [485, 3.5], [510, 4], [535, 4], [560, 4.5],
  ] as const;
  const rightDots = [
    [640, 4.5], [665, 4], [690, 4], [715, 3.5], [740, 3.5], [765, 3.5], [790, 3], [815, 3], [840, 3], [865, 3], [890, 3], [915, 3], [940, 3], [965, 3],
    [990, 3, 0.9], [1015, 3, 0.8], [1040, 3, 0.7], [1065, 3, 0.6], [1090, 3, 0.5], [1115, 3, 0.4], [1140, 3, 0.3],
  ] as const;

  return (
    <div aria-hidden="true" className="mandala-dot-divider">
      <svg className="mandala-dot-divider__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 20 1200 80" preserveAspectRatio="xMidYMid meet">
        <g fill="#e65100">
          {leftDots.map(([cx, r, opacity]) => <circle cx={cx} cy="60" key={cx} opacity={opacity} r={r} />)}
        </g>
        <g transform="translate(600, 60)">
          <path d="M 0,-20 L 5,-5 L 20,0 L 5,5 L 0,20 L -5,5 L -20,0 L -5,-5 Z" fill="#ff6b00" />
          <circle cx="0" cy="0" r="5" fill="#e65100" />
        </g>
        <g fill="#e65100">
          {rightDots.map(([cx, r, opacity]) => <circle cx={cx} cy="60" key={cx} opacity={opacity} r={r} />)}
        </g>
      </svg>
    </div>
  );
}

export function StatsSection({ copy }: CopyProps) {
  return (
    <section className="stats-section" aria-label="ePawati impact">
      <div className="landing-container stats-grid">
        {copy.stats.map((stat) => {
          const count = parseStatValue(stat.value);
          return (
            <div className="stat" key={stat.label}>
              <strong aria-label={stat.value}>
                {count ? <CountUp duration={1.6} locale={count.locale} separator={count.separator} to={count.target} /> : stat.value}
                {count?.suffix ? <span aria-hidden="true" className="stat-value__suffix">{count.suffix}</span> : null}
              </strong>
              <span>{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function FeaturesSection({ copy }: CopyProps) {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = featuresRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      gsap.set(section.querySelectorAll('.feature-row__copy'), { clearProps: 'all' });
      return;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.feature-row').forEach((row) => {
        const copyBlock = row.querySelector<HTMLElement>('.feature-row__copy');
        if (!copyBlock) return;

        const appearsFromLeft = row.classList.contains('feature-row--reverse');
        const revealDistance = window.innerWidth < 768 ? '84px' : '42vw';
        gsap.fromTo(copyBlock, {
          autoAlpha: 0,
          filter: 'blur(14px)',
          x: appearsFromLeft ? `-${revealDistance}` : revealDistance,
        }, {
          autoAlpha: 1,
          duration: 1.15,
          ease: 'power3.out',
          filter: 'blur(0px)',
          scrollTrigger: {
            end: 'top 36%',
            scrub: 0.75,
            start: 'top 90%',
            trigger: row,
          },
          x: 0,
        });
      });
    }, section);

    return () => context.revert();
  }, [copy.features]);

  return (
    <RevealSection className="features-section" id="features" revealSelector=".feature-row">
      <div className="landing-container" ref={featuresRef}>
        <div className="section-heading section-heading--center">
          <p className="section-eyebrow">{copy.featuresEyebrow}</p>
          <FeatureScrollTitle text={copy.featuresTitle} />
          <p>{copy.featuresDescription}</p>
        </div>
        <div className="features-showcase">
          {copy.features.map(([title, description], index) => {
            const visual = featureVisuals[index];
            return (
              <article className={`feature-row reveal-item${index % 2 === 1 ? ' feature-row--reverse' : ''}`} key={title}>
                <div className={`feature-row__visual${visual ? ` feature-row__visual--${visual.kind}` : ''}`} aria-hidden="true">
                  {visual && <img className="feature-row__image" alt="" loading="lazy" src={visual.src} />}
                </div>
                <div className="feature-row__copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

type PortalTab = 'collections' | 'donors' | 'reports';
const portalTabKeys: PortalTab[] = ['collections', 'donors', 'reports'];
const chartHeights = [36, 53, 46, 71, 62, 84, 94];

export function PortalSection({ copy }: CopyProps) {
  const [activeTab, setActiveTab] = useState<PortalTab>('collections');
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const tabId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const browser = section?.querySelector('.portal-browser');
    if (!section || !browser || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      gsap.fromTo(browser, { rotateX: 14, y: 60, scale: 0.94, autoAlpha: 0.6 }, {
        rotateX: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 25%', scrub: 0.6 },
      });
    }, section);
    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!rowsRef.current || prefersReducedMotion()) return;
    const context = gsap.context(() => {
      gsap.fromTo('.portal-row', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.05 });
    }, rowsRef);
    return () => context.revert();
  }, [activeTab]);

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + direction + portalTabKeys.length) % portalTabKeys.length;
    setActiveTab(portalTabKeys[nextIndex]);
    document.getElementById(`${tabId}-tab-${nextIndex}`)?.focus();
  }

  const activeRows = copy.portalRows[activeTab];
  return (
    <section className="portal-section" id="portal" ref={sectionRef}>
      <div className="landing-container">
        <div className="section-heading">
          <p className="section-eyebrow">{copy.portalEyebrow}</p>
          <h2>{copy.portalTitle}</h2>
        </div>
        <div className="portal-perspective">
          <div className="portal-browser">
            <div className="browser-bar">
              <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="browser-address">{copy.portalUrlLabel}</span>
              <span className="browser-live"><i />LIVE</span>
            </div>
            <div className="portal-dashboard">
              <div className="portal-summary">
                <p>{copy.portalTotalLabel}</p>
                <strong>{copy.portalTotal}</strong>
                <span>{copy.portalGrowth}</span>
                <div className="portal-chart">
                  <small>{copy.chartLabel}</small>
                  <div className="chart-bars" aria-hidden="true">
                    {chartHeights.map((height, index) => <i key={`${height}-${index}`} style={{ '--bar-height': `${height}%` } as CSSProperties} />)}
                  </div>
                  <div className="chart-days" aria-hidden="true"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                </div>
              </div>
              <div className="portal-activity">
                <div className="portal-tabs" role="tablist" aria-label={copy.portalEyebrow}>
                  {portalTabKeys.map((key, index) => (
                    <button aria-controls={`${tabId}-panel`} aria-selected={activeTab === key} className={activeTab === key ? 'is-active' : ''} id={`${tabId}-tab-${index}`} key={key} onClick={() => setActiveTab(key)} onKeyDown={(event) => handleTabKeyDown(event, index)} role="tab" tabIndex={activeTab === key ? 0 : -1} type="button">
                      {activeTab === key ? <motionReact.span className="portal-tabs__active-surface" layoutId={`${tabId}-portal-tab-surface`} transition={reduceMotion ? { duration: 0 } : { damping: 24, stiffness: 260, type: 'spring' }} /> : null}
                      <span className="portal-tabs__label">{copy.portalTabs[index]}</span>
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motionReact.div
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    aria-labelledby={`${tabId}-tab-${portalTabKeys.indexOf(activeTab)}`}
                    className="portal-rows"
                    exit={reduceMotion ? { opacity: 0 } : { filter: 'blur(5px)', opacity: 0, y: -5 }}
                    id={`${tabId}-panel`}
                    initial={reduceMotion ? { opacity: 0 } : { filter: 'blur(6px)', opacity: 0, y: 8 }}
                    key={activeTab}
                    ref={rowsRef}
                    role="tabpanel"
                    transition={reduceMotion ? { duration: 0.12 } : { damping: 22, stiffness: 210, type: 'spring' }}
                  >
                    {activeRows.map(([name, detail, amount]) => (
                      <div className="portal-row" key={`${activeTab}-${name}`}>
                        <span className="portal-avatar">{activeTab === 'reports' ? <FileSpreadsheet size={16} /> : name.charAt(0)}</span>
                        <span className="portal-row__copy"><strong>{name}</strong><small>{detail}</small></span>
                        <b>{amount}</b>
                      </div>
                    ))}
                  </motionReact.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowSection({ copy }: CopyProps) {
  return (
    <RevealSection className="how-section" id="how" revealSelector=".how-step">
      <div className="landing-container">
        <div className="section-heading section-heading--center">
          <p className="section-eyebrow">{copy.howEyebrow}</p>
          <h2>{copy.howTitle}</h2>
        </div>
        <div className="how-flow">
          {copy.howSteps.map(([title, description], index) => (
            <article aria-label={`Step ${index + 1}: ${title}`} className="how-step reveal-item" key={title}>
              <span className="how-step__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

export function ComparisonSection({ copy }: CopyProps) {
  return (
    <RevealSection className="comparison-section" revealSelector=".comparison-card">
      <div className="landing-container">
        <div className="section-heading section-heading--center"><h2>{copy.compareTitle}</h2></div>
        <div className="comparison-grid">
          <article className="comparison-card comparison-card--old reveal-item">
            <span className="comparison-card__label"><Receipt size={18} />{copy.oldWayTitle}</span>
            <ul>{copy.oldWay.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}</ul>
          </article>
          <article className="comparison-card comparison-card--new reveal-item">
            <span className="comparison-card__label"><CircleCheck size={18} />{copy.newWayTitle}</span>
            <ul>{copy.newWay.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </article>
        </div>
      </div>
    </RevealSection>
  );
}

export function FAQSection({ copy }: CopyProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqId = useId();
  return (
    <RevealSection className="faq-section" id="faq" revealSelector=".faq-item">
      <div className="landing-container faq-layout">
        <div className="section-heading">
          <p className="section-eyebrow">{copy.faqEyebrow}</p>
          <h2>{copy.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {copy.faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;
            return (
              <article className={`faq-item reveal-item${isOpen ? ' is-open' : ''}`} key={question}>
                <h3><button aria-controls={`${faqId}-answer-${index}`} aria-expanded={isOpen} id={`${faqId}-question-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)} type="button"><span>{question}</span><ChevronDown size={19} /></button></h3>
                <div aria-hidden={!isOpen} aria-labelledby={`${faqId}-question-${index}`} className="faq-answer" id={`${faqId}-answer-${index}`} role="region"><div><p>{answer}</p></div></div>
              </article>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}

type ContactField = 'organization' | 'email' | 'address' | 'phone' | 'message';
type ContactValues = Record<ContactField, string>;

const emptyContactValues: ContactValues = {
  organization: '',
  email: '',
  address: '',
  phone: '',
  message: '',
};

export function ContactSection({ copy }: CopyProps) {
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const formId = useId();

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<ContactField, string>> = {};
    const phoneDigits = values.phone.replace(/\D/g, '');

    if (!values.organization.trim()) nextErrors.organization = copy.contactErrors.organization;
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) nextErrors.email = copy.contactErrors.email;
    if (!values.address.trim()) nextErrors.address = copy.contactErrors.address;
    if (values.phone.trim() && (phoneDigits.length < 10 || phoneDigits.length > 15)) nextErrors.phone = copy.contactErrors.phone;
    if (!values.message.trim()) nextErrors.message = copy.contactErrors.message;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Samavet enquiry from ${values.organization.trim()}`;
    const body = [
      `Organisation: ${values.organization.trim()}`,
      `Email: ${values.email.trim()}`,
      `Address: ${values.address.trim()}`,
      `Phone: ${values.phone.trim() || 'Not provided'}`,
      '',
      'Message:',
      values.message.trim(),
    ].join('\n');
    setSubmitted(true);
    window.location.href = `mailto:Samavetofficial@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function fieldError(field: ContactField) {
    return errors[field] ? `${formId}-${field}-error` : undefined;
  }

  return (
    <RevealSection className="contact-section" id="contact" revealSelector=".contact-reveal">
      <div className="landing-container contact-layout">
        <div className="section-heading contact-reveal">
          <p className="section-eyebrow">{copy.contactEyebrow}</p>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactDescription}</p>
        </div>

        <form className="contact-form contact-reveal" noValidate onSubmit={submitContact}>
          <div className="contact-form__grid">
            <label>
              <span>{copy.contactFields.organization}</span>
              <input aria-describedby={fieldError('organization')} aria-invalid={Boolean(errors.organization)} autoComplete="organization" name="organization" onChange={(event) => updateField('organization', event.target.value)} placeholder={copy.contactPlaceholders.organization} value={values.organization} />
              {errors.organization ? <small className="contact-error" id={`${formId}-organization-error`}>{errors.organization}</small> : null}
            </label>
            <label>
              <span>{copy.contactFields.email}</span>
              <input aria-describedby={fieldError('email')} aria-invalid={Boolean(errors.email)} autoComplete="email" name="email" onChange={(event) => updateField('email', event.target.value)} placeholder={copy.contactPlaceholders.email} type="email" value={values.email} />
              {errors.email ? <small className="contact-error" id={`${formId}-email-error`}>{errors.email}</small> : null}
            </label>
            <label>
              <span>{copy.contactFields.address}</span>
              <input aria-describedby={fieldError('address')} aria-invalid={Boolean(errors.address)} autoComplete="street-address" name="address" onChange={(event) => updateField('address', event.target.value)} placeholder={copy.contactPlaceholders.address} value={values.address} />
              {errors.address ? <small className="contact-error" id={`${formId}-address-error`}>{errors.address}</small> : null}
            </label>
            <label>
              <span>{copy.contactFields.phone}</span>
              <input aria-describedby={fieldError('phone')} aria-invalid={Boolean(errors.phone)} autoComplete="tel" inputMode="tel" name="phone" onChange={(event) => updateField('phone', event.target.value)} placeholder={copy.contactPlaceholders.phone} type="tel" value={values.phone} />
              {errors.phone ? <small className="contact-error" id={`${formId}-phone-error`}>{errors.phone}</small> : null}
            </label>
          </div>
          <label className="contact-form__message">
            <span>{copy.contactFields.message}</span>
            <textarea aria-describedby={fieldError('message')} aria-invalid={Boolean(errors.message)} name="message" onChange={(event) => updateField('message', event.target.value)} placeholder={copy.contactPlaceholders.message} rows={5} value={values.message} />
            {errors.message ? <small className="contact-error" id={`${formId}-message-error`}>{errors.message}</small> : null}
          </label>
          <div className="contact-form__actions">
            <button className="contact-submit" type="submit">{copy.contactSubmit}<ArrowRight size={17} /></button>
            <p aria-live="polite">{submitted ? copy.contactStatus : ''}</p>
          </div>
        </form>
      </div>
    </RevealSection>
  );
}
