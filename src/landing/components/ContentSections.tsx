import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight, Check, ChevronDown, CircleCheck, FileSpreadsheet, Receipt } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import featurePhoneMockup from '../assets/f-phonemockup.png';
import featureLaptopMockup from '../assets/f-laptopmockup.png';
import feature3Screenshot from '../assets/feature3rd.png';
import feature4Flipbook from '../assets/feature4th.png';
import heroMockup from '../assets/phone_mockup_updated_transparent_4500x3000.png';
import type { LandingCopy } from '../content';
import { RevealSection } from './RevealSection';

gsap.registerPlugin(ScrollTrigger);

interface CopyProps {
  copy: LandingCopy;
}

interface HeroProps extends CopyProps {
  portalUrl: string;
}

const featureVisuals = [
  { kind: 'phone', src: featurePhoneMockup },
  { kind: 'laptop', src: featureLaptopMockup },
  { kind: 'screenshot', src: feature3Screenshot },
  { kind: 'flipbook', src: feature4Flipbook },
] as const;

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
          <h1 className="hero-reveal">{copy.heroTitle[0]}<span>{copy.heroTitle[1]}</span></h1>
          <p className="hero-description hero-reveal">{copy.heroDescription}</p>
          <div className="hero-actions hero-reveal">
            <a className="button button--primary" href={portalUrl}>{copy.portalCta}<ArrowRight size={18} /></a>
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

export function StatsSection({ copy }: CopyProps) {
  return (
    <section className="stats-section" aria-label="ePawati impact">
      <div className="landing-container stats-grid">
        {copy.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturesSection({ copy }: CopyProps) {
  return (
    <RevealSection className="features-section" id="features" revealSelector=".feature-row">
      <div className="landing-container">
        <div className="section-heading section-heading--center">
          <p className="section-eyebrow">{copy.featuresEyebrow}</p>
          <h2>{copy.featuresTitle}</h2>
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
