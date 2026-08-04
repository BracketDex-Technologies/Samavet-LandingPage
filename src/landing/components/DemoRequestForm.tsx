import { useState, type ChangeEvent, type FormEvent } from 'react';

import { DEMO_REQUEST_EMAIL, buildDemoRequestMailto, validateDemoRequest } from '../demoRequest.js';
import type { LandingLanguage } from '../content';

type DemoValues = { email: string; name: string; organization: string; request: string };

const initialValues: DemoValues = { email: '', name: '', organization: '', request: '' };

const marathiErrors: Record<string, string> = {
  'Enter a valid email address.': 'कृपया योग्य ईमेल पत्ता लिहा.',
  'Enter your name.': 'कृपया तुमचे नाव लिहा.',
  'Enter your organization name.': 'कृपया संस्थेचे नाव लिहा.',
  'Tell us what you need help with.': 'कृपया तुमची विनंती लिहा.',
};

export function DemoRequestForm({ language }: { language: LandingLanguage }) {
  const [values, setValues] = useState<DemoValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const isMarathi = language === 'mr';
  const labels = isMarathi
    ? { email: 'ईमेल', name: 'तुमचे नाव', organization: 'संस्था किंवा मंडळाचे नाव', request: 'तुमची विनंती', submit: 'ईमेल विनंती तयार करा' }
    : { email: 'Email address', name: 'Your name', organization: 'Organization or mandal name', request: 'What would you like to explore?', submit: 'Prepare email request' };

  function updateValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof DemoValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateDemoRequest(values);
    setErrors({ ...result.errors });
    if (!result.valid) return;

    setSubmitted(true);
    window.location.href = buildDemoRequestMailto(values);
  }

  function fieldError(name: keyof DemoValues) {
    const message = errors[name];
    return message ? <span className="demo-request-error" id={`${name}-error`}>{isMarathi ? marathiErrors[message] ?? message : message}</span> : null;
  }

  return (
    <form className="demo-request-form" noValidate onSubmit={submit}>
      <div className="demo-request-heading">
        <span>{isMarathi ? 'डेमो विनंती' : 'Demo request'}</span>
        <h3>{isMarathi ? 'तुमच्या संस्थेबद्दल आम्हाला सांगा' : 'Tell us about your organization'}</h3>
      </div>
      <div className="demo-request-grid">
        <label>{labels.name}<input aria-describedby={errors.name ? 'name-error' : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" name="name" onChange={updateValue} required value={values.name} />{fieldError('name')}</label>
        <label>{labels.organization}<input aria-describedby={errors.organization ? 'organization-error' : undefined} aria-invalid={Boolean(errors.organization)} autoComplete="organization" name="organization" onChange={updateValue} required value={values.organization} />{fieldError('organization')}</label>
      </div>
      <label>{labels.email}<input aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" name="email" onChange={updateValue} required type="email" value={values.email} />{fieldError('email')}</label>
      <label>{labels.request}<textarea aria-describedby={errors.request ? 'request-error' : undefined} aria-invalid={Boolean(errors.request)} name="request" onChange={updateValue} required rows={4} value={values.request} />{fieldError('request')}</label>
      <button className="button button-primary" type="submit">{labels.submit}</button>
      <p aria-live="polite" className="demo-request-note">{submitted ? <>{isMarathi ? 'तुमच्या ईमेल अ‍ॅपमध्ये विनंती उघडली नाही?' : 'Did your email app not open?'} <a href={`mailto:${DEMO_REQUEST_EMAIL}`}>{DEMO_REQUEST_EMAIL}</a></> : isMarathi ? 'सबमिट केल्यानंतर तुमचे ईमेल अ‍ॅप उघडेल.' : 'Submitting opens a prepared request in your email app.'}</p>
    </form>
  );
}
