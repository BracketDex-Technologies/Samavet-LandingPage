import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { landingNavItems } from '../src/landing/navItems.js';

test('uses the approved bilingual landing navigation', () => {
  assert.deepEqual(landingNavItems.en, [['/features', 'Platform'], ['/portal', 'ePawati'], ['/ahwal', 'Ahwal'], ['/how', 'Services'], ['/contact', 'Contact']]);
  assert.deepEqual(landingNavItems.mr, [['/features', 'व्यासपीठ'], ['/portal', 'ई-पावती'], ['/ahwal', 'अहवाल'], ['/how', 'सेवा'], ['/contact', 'संपर्क']]);
});

test('keeps language, responsive menu, and portal controls in the header', async () => {
  const source = await readFile(new URL('../src/landing/components/LandingHeader.tsx', import.meta.url), 'utf8');
  assert.match(source, /epawati-theme/);
  assert.match(source, /return 'light'/);
  assert.doesNotMatch(source, /prefers-color-scheme: dark/);
  assert.match(source, /aria-pressed/);
  assert.match(source, /aria-expanded/);
  assert.match(source, /samavet-logo-transparent\.png/);
  assert.match(source, /isMarathi \? 'समवेत' : 'SAMAVET'/);
  assert.match(source, /Portal login/);
  assert.match(source, /landing-nav__item/);
  assert.match(source, /aria-hidden="true">\|<\/i>/);
  assert.doesNotMatch(source, /aria-hidden="true">\/<\/i>/);
  assert.match(source, /floating-theme-toggle/);
  assert.match(source, /window\.scrollY > 20/);
  assert.match(source, /is-scrolled/);
  assert.doesNotMatch(source, /<strong>ePawati<\/strong><small>/);
});

test('keeps Instagram, email, and WhatsApp social actions in the footer', async () => {
  const source = await readFile(new URL('../src/landing/components/LandingFooter.tsx', import.meta.url), 'utf8');
  assert.match(source, /Instagram/);
  assert.match(source, /https:\/\/www\.instagram\.com\/samavetofficial\//);
  assert.match(source, /Email/);
  assert.match(source, /mailto:bracketdevs\.teams@gmail\.com/);
  assert.match(source, /data-social="instagram"/);
  assert.match(source, /data-social="email"/);
  assert.match(source, /data-social="whatsapp"/);
  assert.match(source, /className="filled"/);
  assert.match(source, /className="tooltip"/);
  assert.match(source, /Mail/);
  assert.match(source, /MessageCircle/);
  assert.match(source, /samavet-logo-transparent\.png/);
  assert.doesNotMatch(source, /<strong>\{isMarathi \? 'समवेत' : 'SAMAVET'\}<\/strong>/);
  assert.doesNotMatch(source, /Facebook/);
  assert.doesNotMatch(source, /Linkedin|LinkedIn/);
});
