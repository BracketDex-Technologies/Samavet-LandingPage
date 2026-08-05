import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { ArrowRight, BarChart3, Check, ChevronDown, CircleCheck, FileSpreadsheet, IndianRupee, QrCode, Receipt, ShieldCheck, Smartphone, UsersRound } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { LandingCopy } from '../content';
import { RevealSection } from './RevealSection';

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  copy: LandingCopy;
}

interface HeroProps extends CopyProps {
  portalUrl: string;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HeroSection({ copy, portalUrl }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const reducedMotion = prefersReducedMotion();
    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.hero-reveal, .hero-artwork', { clearProps: 'all' });
        gsap.set('.motif-line', { strokeDashoffset: 0 });
        return;
      }
      gsap.fromTo('.hero-reveal', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 });
      gsap.fromTo('.hero-artwork', { autoAlpha: 0, scale: 0.94, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.to('.motif-line', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.12, delay: 0.25 });
      gsap.to('.motif-flame', { scaleX: 0.94, scaleY: 1.14, transformOrigin: '50% 85%', duration: 1.1, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, hero);

    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return () => context.revert();

    const artwork = hero.querySelector<HTMLElement>('.hero-artwork');
    const layers = Array.from(hero.querySelectorAll<HTMLElement>('[data-depth]'));
    if (!artwork) return () => context.revert();
    const movers = layers.map((layer) => ({
      depth: Number(layer.dataset.depth ?? 0),
      x: gsap.quickTo(layer, 'x', { duration: 1.15, ease: 'power3' }),
      y: gsap.quickTo(layer, 'y', { duration: 1.15, ease: 'power3' }),
      rotateX: gsap.quickTo(layer, 'rotateX', { duration: 1.2, ease: 'power3' }),
      rotateY: gsap.quickTo(layer, 'rotateY', { duration: 1.2, ease: 'power3' }),
    }));
    const moveArtwork = (event: globalThis.PointerEvent) => {
      const bounds = artwork.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      movers.forEach((mover) => {
        mover.x(x * 90 * mover.depth);
        mover.y(y * 60 * mover.depth);
        mover.rotateY(x * 9 * mover.depth);
        mover.rotateX(-y * 9 * mover.depth);
      });
    };
    const resetArtwork = () => movers.forEach((mover) => {
      mover.x(0);
      mover.y(0);
      mover.rotateX(0);
      mover.rotateY(0);
    });
    artwork.addEventListener('pointermove', moveArtwork);
    artwork.addEventListener('pointerleave', resetArtwork);
    return () => {
      artwork.removeEventListener('pointermove', moveArtwork);
      artwork.removeEventListener('pointerleave', resetArtwork);
      context.revert();
    };
  }, [copy.heroTitle]);

  return (
    <section className="hero-section grain" id="top" ref={heroRef}>
      <div className="hero-glow hero-glow--brand" aria-hidden="true" />
      <div className="hero-glow hero-glow--forest" aria-hidden="true" />
      <div className="landing-container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow-pill hero-reveal"><CircleCheck size={14} />{copy.heroEyebrow}</p>
          <h1 className="hero-reveal">{copy.heroTitle[0]}<span>{copy.heroTitle[1]}</span></h1>
          <p className="hero-description hero-reveal">{copy.heroDescription}</p>
          <div className="hero-actions hero-reveal">
            <a className="button button--primary" href={portalUrl}>{copy.portalCta}<ArrowRight size={18} /></a>
            <a className="button button--secondary" href="#portal">{copy.portalPreviewCta}</a>
          </div>
        </div>

        <div className="hero-artwork" aria-hidden="true">
          <div className="hero-orbit" data-depth="0.16" />
          <svg className="hero-motif" data-depth="0.32" viewBox="0 0 200 200" fill="none">
            <defs>
              <radialGradient id="motifGlow" cx="0" cy="0" r="1" gradientTransform="translate(100 104) rotate(90) scale(77)">
                <stop stopColor="var(--ep-brand)" stopOpacity=".32" />
                <stop offset="1" stopColor="var(--ep-brand)" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="flameFill" x1="100" y1="55" x2="100" y2="101" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--ep-gold)" />
                <stop offset="1" stopColor="var(--ep-brand)" />
              </linearGradient>
              <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="8" /></filter>
            </defs>
            <circle cx="100" cy="100" r="78" fill="url(#motifGlow)" />
            <circle className="motif-glow" cx="100" cy="87" r="29" fill="var(--ep-brand)" opacity=".18" filter="url(#softGlow)" />
            <g className="motif-rays" stroke="var(--ep-brand)" strokeLinecap="round">
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M100 19V34" />
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M66 29L74 42" />
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M134 29L126 42" />
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M42 55L56 63" />
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M158 55L144 63" />
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M29 91H46" />
              <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M171 91H154" />
            </g>
            <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M61 118C69 103 81 97 100 97C119 97 131 103 139 118" stroke="var(--ep-forest)" strokeWidth="2.4" />
            <path className="motif-flame" d="M100 98C86 87 94 73 104 57C107 73 118 83 100 98Z" fill="url(#flameFill)" />
            <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M67 117H133L126 152C124 164 114 172 102 172H98C86 172 76 164 74 152L67 117Z" fill="var(--ep-card)" stroke="var(--ep-forest)" strokeWidth="2.5" />
            <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M74 132C90 141 110 141 126 132" stroke="var(--ep-brand)" strokeWidth="2" />
            <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M77 151C92 158 108 158 123 151" stroke="var(--ep-brand)" strokeWidth="2" />
            <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M67 117C52 112 44 100 45 85C58 87 67 94 72 106" stroke="var(--ep-forest)" strokeWidth="2" />
            <path className="motif-line" pathLength="1" strokeDasharray="1" strokeDashoffset="1" d="M133 117C148 112 156 100 155 85C142 87 133 94 128 106" stroke="var(--ep-forest)" strokeWidth="2" />
          </svg>

          <div className="floating-card receipt-card" data-depth="0.72">
            <span className="floating-card__icon"><Receipt size={18} /></span>
            <div><small>{copy.receiptSent}</small><strong>₹2,100</strong><p>{copy.receiptDonor}</p></div>
            <Check className="receipt-card__check" size={16} />
          </div>
          <div className="floating-card qr-card" data-depth="0.9">
            <span className="qr-card__code"><QrCode size={45} strokeWidth={1.35} /></span>
            <div><small>{copy.collectionSource}</small><strong>₹84,600</strong><p>{copy.collectedToday}</p></div>
          </div>
          <span className="hero-coin hero-coin--one" data-depth="1.1">₹</span>
          <span className="hero-coin hero-coin--two" data-depth="0.82">₹</span>
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ copy }: CopyProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const counters = Array.from(section.querySelectorAll<HTMLElement>('[data-count]'));
    const context = gsap.context(() => {
      counters.forEach((counter) => {
        const target = Number(counter.dataset.count);
        const decimals = Number(counter.dataset.decimals ?? 0);
        const suffix = counter.dataset.suffix ?? '';
        const finalValue = counter.textContent;
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 90%', once: true },
          onUpdate: () => { counter.textContent = `${state.value.toFixed(decimals)}${suffix}`; },
          onComplete: () => { counter.textContent = finalValue; },
        });
      });
    }, section);
    return () => context.revert();
  }, [copy.stats]);

  return (
    <section className="stats-section" aria-label="ePawati impact" ref={sectionRef}>
      <div className="landing-container stats-grid">
        {copy.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong data-count={'count' in stat ? stat.count : undefined} data-decimals={'decimals' in stat ? stat.decimals : undefined} data-suffix={'suffix' in stat ? stat.suffix : undefined}>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const featureIcons = [Receipt, IndianRupee, UsersRound, ShieldCheck, BarChart3, FileSpreadsheet];

export function FeaturesSection({ copy }: CopyProps) {
  function tiltCard(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);
    gsap.to(card, { rotateX: (0.5 - y) * 9, rotateY: (x - 0.5) * 11, y: -6, duration: 0.35, ease: 'power2.out', transformPerspective: 900 });
  }
  function resetCard(event: PointerEvent<HTMLElement>) {
    gsap.to(event.currentTarget, { rotateX: 0, rotateY: 0, y: 0, duration: 0.5, ease: 'power3.out' });
  }

  return (
    <RevealSection className="features-section" id="features" revealSelector=".feature-card">
      <div className="landing-container">
        <div className="section-heading">
          <p className="section-eyebrow">{copy.featuresEyebrow}</p>
          <h2>{copy.featuresTitle}</h2>
          <p>{copy.featuresDescription}</p>
        </div>
        <div className="features-grid">
          {copy.features.map(([title, description], index) => {
            const Icon = featureIcons[index];
            return (
              <article className="feature-card reveal-item" key={title} onPointerMove={tiltCard} onPointerLeave={resetCard}>
                <span className="feature-card__glow" aria-hidden="true" />
                <span className="feature-card__icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
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
                    <button aria-controls={`${tabId}-panel`} aria-selected={activeTab === key} className={activeTab === key ? 'is-active' : ''} id={`${tabId}-tab-${index}`} key={key} onClick={() => setActiveTab(key)} onKeyDown={(event) => handleTabKeyDown(event, index)} role="tab" tabIndex={activeTab === key ? 0 : -1} type="button">{copy.portalTabs[index]}</button>
                  ))}
                </div>
                <div aria-labelledby={`${tabId}-tab-${portalTabKeys.indexOf(activeTab)}`} className="portal-rows" id={`${tabId}-panel`} ref={rowsRef} role="tabpanel">
                  {activeRows.map(([name, detail, amount]) => (
                    <div className="portal-row" key={`${activeTab}-${name}`}>
                      <span className="portal-avatar">{activeTab === 'reports' ? <FileSpreadsheet size={16} /> : name.charAt(0)}</span>
                      <span className="portal-row__copy"><strong>{name}</strong><small>{detail}</small></span>
                      <b>{amount}</b>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowSection({ copy }: CopyProps) {
  const icons = [Smartphone, QrCode, BarChart3];
  return (
    <RevealSection className="how-section" id="how" revealSelector=".how-card">
      <div className="landing-container">
        <div className="section-heading section-heading--center">
          <p className="section-eyebrow">{copy.howEyebrow}</p>
          <h2>{copy.howTitle}</h2>
        </div>
        <div className="how-grid">
          {copy.howSteps.map(([title, description], index) => {
            const Icon = icons[index];
            return <article className="how-card reveal-item" key={title}><span className="how-card__number">0{index + 1}</span><span className="how-card__icon"><Icon size={21} /></span><h3>{title}</h3><p>{description}</p></article>;
          })}
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
