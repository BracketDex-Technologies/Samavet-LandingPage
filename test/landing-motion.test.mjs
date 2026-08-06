import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('implements the reference GSAP pointer and scroll interactions', async () => {
  const source = await readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8');
  assert.match(source, /ScrollTrigger/);
  assert.match(source, /scrub: 0\.6/);
  assert.match(source, /rotateX: 14/);
  assert.doesNotMatch(source, /hero-phone-showcase" data-depth/);
  assert.doesNotMatch(source, /addEventListener\('pointermove'/);
});

test('makes motion progressive enhancement for touch and reduced-motion users', async () => {
  const [sections, styles] = await Promise.all([
    readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8'),
  ]);
  assert.match(sections, /prefers-reduced-motion: reduce/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.feature-card:hover/);
});
