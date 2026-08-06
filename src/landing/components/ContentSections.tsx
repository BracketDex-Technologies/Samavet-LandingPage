import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight, BarChart3, Check, ChevronDown, CircleCheck, FileSpreadsheet, QrCode, Receipt, Smartphone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import feature1Image from '../assets/feature1.png';
import feature2Image from '../assets/feature2.png';
import feature3Image from '../assets/feature3.png';
import feature4Image from '../assets/feature4..png';
import feature5Image from '../assets/feature5.png';
import feature6Image from '../assets/feature6.png';
import heroMockup from '../assets/mockup2.png';
import type { LandingCopy } from '../content';
import { RevealSection } from './RevealSection';

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  copy: LandingCopy;
}

interface HeroProps extends CopyProps {
  portalUrl: string;
}

const featureImages = [feature1Image, feature2Image, feature3Image, feature4Image, feature5Image, feature6Image];

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
        return;
      }
      gsap.fromTo('.hero-reveal', { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09 });
      gsap.fromTo('.hero-artwork', { autoAlpha: 0, scale: 0.94, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
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
          <h1 className="hero-reveal">{copy.heroTitle[0]}<span>{copy.heroTitle[1]}</span></h1>
          <p className="hero-description hero-reveal">{copy.heroDescription}</p>
          <div className="hero-actions hero-reveal">
            <a className="button button--primary" href={portalUrl}>{copy.portalCta}<ArrowRight size={18} /></a>
            <a className="button button--secondary" href="#portal">{copy.portalPreviewCta}</a>
          </div>
        </div>

        <div className="hero-artwork" aria-hidden="true">
          <div className="hero-phone-showcase" data-depth="0.34">
            <img className="hero-phone-showcase__image" src={heroMockup} alt="" />
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

export function FeaturesSection({ copy }: CopyProps) {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(null);
  const featureDialogTitleId = useId();
  const activeFeature = activeFeatureIndex === null ? null : {
    description: copy.features[activeFeatureIndex][1],
    src: featureImages[activeFeatureIndex],
    title: copy.features[activeFeatureIndex][0],
  };

  useEffect(() => {
    if (activeFeatureIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') setActiveFeatureIndex(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeFeatureIndex]);

  return (
    <>
      <RevealSection className="features-section" id="features" revealSelector=".feature-card">
        <div className="landing-container">
          <div className="section-heading">
            <p className="section-eyebrow">{copy.featuresEyebrow}</p>
            <h2>{copy.featuresTitle}</h2>
            <p>{copy.featuresDescription}</p>
          </div>
          <div className="features-grid">
            {copy.features.map(([title, description], index) => (
              <button className="feature-card reveal-item" key={title} onClick={() => setActiveFeatureIndex(index)} type="button">
                <div className="feature-card__media">
                  <img alt="" loading="lazy" src={featureImages[index]} />
                </div>
                <div className="feature-card__content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </RevealSection>

      {activeFeature && (
        <div className="feature-modal" role="presentation">
          <button aria-label="Close feature preview" className="feature-modal__backdrop" onClick={() => setActiveFeatureIndex(null)} type="button" />
          <div aria-labelledby={featureDialogTitleId} aria-modal="true" className="feature-modal__dialog" role="dialog">
            <button className="feature-modal__close" onClick={() => setActiveFeatureIndex(null)} type="button">Close</button>
            <div className="feature-modal__image">
              <img alt={activeFeature.title} src={activeFeature.src} />
            </div>
            <div className="feature-modal__content">
              <h3 id={featureDialogTitleId}>{activeFeature.title}</h3>
              <p>{activeFeature.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
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
            return <article aria-label={`Step ${index + 1}: ${title}`} className="how-card reveal-item" key={title}><div className="how-card__heading"><span className="how-card__icon"><Icon size={20} strokeWidth={1.7} /></span><h3>{title}</h3></div><p>{description}</p></article>;
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
    window.location.href = `mailto:hello@samavet.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
