import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('renders the ePawati hero as layered HTML without background SVG artwork', async () => {
  const source = await readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8');
  assert.match(source, /phone_mockup_updated_transparent_4500x3000\.png/);
  assert.match(source, /hero-phone-showcase__image/);
  assert.doesNotMatch(source, /hero-edge-card/);
  assert.doesNotMatch(source, /hero-coin/);
  assert.doesNotMatch(source, /screen\.png/);
  assert.doesNotMatch(source, /hero-phone-showcase__screen/);
  assert.doesNotMatch(source, /className="floating-card receipt-card"/);
  assert.doesNotMatch(source, /className="floating-card qr-card"/);
  assert.doesNotMatch(source, /mobile_vargani_app_ui/);
  assert.doesNotMatch(source, /<svg className="hero-motif"/);
  assert.doesNotMatch(source, /hero-orbit/);
  assert.doesNotMatch(source, /eyebrow-pill/);
  assert.doesNotMatch(source, /samavet-ganesh-hero/);
});

test('uses corrected ePawati branding and the approved live claims', async () => {
  const content = await readFile(new URL('../src/landing/content.ts', import.meta.url), 'utf8');
  assert.match(content, /Donation collection/);
  assert.match(content, /that feels like a celebration\./);
  assert.match(content, /value: '12'/);
  assert.match(content, /value: '33'/);
  assert.match(content, /value: '0\.5h'/);
  assert.doesNotMatch(content, /wPawati/);
});

test('uses the reference display and body typography with Marathi overrides', async () => {
  const styles = await readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8');
  assert.match(styles, /family=Fraunces/);
  assert.match(styles, /family=Plus\+Jakarta\+Sans/);
  assert.match(styles, /--ep-font-display: 'Fraunces'/);
  assert.match(styles, /--ep-font-sans: 'Plus Jakarta Sans'/);
  assert.match(styles, /Noto Sans Devanagari/);
  assert.match(styles, /\.button--secondary[^}]*background: transparent[^}]*text-decoration: underline/);
});
