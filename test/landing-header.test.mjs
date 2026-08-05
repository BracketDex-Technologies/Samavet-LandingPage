import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { landingNavItems } from '../src/landing/navItems.js';

test('uses the approved bilingual landing navigation', () => {
  assert.deepEqual(landingNavItems.en, [['#features', 'Features'], ['#portal', 'Portal'], ['#how', 'How it works'], ['#faq', 'FAQ']]);
  assert.deepEqual(landingNavItems.mr, [['#features', 'वैशिष्ट्ये'], ['#portal', 'पोर्टल'], ['#how', 'कसे चालते'], ['#faq', 'प्रश्नोत्तरे']]);
});

test('keeps theme, language, mobile menu, and Blog controls in the header', async () => {
  const source = await readFile(new URL('../src/landing/components/LandingHeader.tsx', import.meta.url), 'utf8');
  assert.match(source, /epawati-theme/);
  assert.match(source, /prefers-color-scheme: dark/);
  assert.match(source, /aria-pressed/);
  assert.match(source, /aria-expanded/);
  assert.match(source, /href="\/blog"/);
});
