import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('renders the contact section after FAQ with every requested field', async () => {
  const [landing, sections] = await Promise.all([
    readFile(new URL('../src/landing/SamavetLanding.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8'),
  ]);
  assert.ok(landing.indexOf('<ContactSection') > landing.indexOf('<FAQSection'));
  assert.match(sections, /name="organization"/);
  assert.match(sections, /name="email"/);
  assert.match(sections, /name="address"/);
  assert.match(sections, /name="phone"/);
  assert.match(sections, /name="message"/);
  assert.match(sections, /mailto:hello@samavet\.in/);
});

test('provides bilingual form copy and optional phone validation', async () => {
  const [content, sections, styles] = await Promise.all([
    readFile(new URL('../src/landing/content.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8'),
  ]);
  assert.match(content, /Organisation \/ trust \/ mandal name/);
  assert.match(content, /संस्था \/ ट्रस्ट \/ मंडळाचे नाव/);
  assert.match(content, /Phone number \(optional\)/);
  assert.match(sections, /values\.phone\.trim\(\) &&/);
  assert.doesNotMatch(styles, /\.contact-section::(?:before|after)/);
  assert.match(styles, /\.contact-form[^}]*background: transparent|\.contact-form input,[\s\S]*background: transparent/);
});
