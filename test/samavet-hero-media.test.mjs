import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('renders the ePawati hero as layered HTML and inline ceremonial SVG', async () => {
  const source = await readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8');
  assert.match(source, /viewBox="0 0 200 200"/);
  assert.match(source, /className="motif-flame"/);
  assert.match(source, /className="floating-card receipt-card"/);
  assert.match(source, /className="floating-card qr-card"/);
  assert.doesNotMatch(source, /samavet-ganesh-hero/);
});

test('uses corrected ePawati branding and the approved live claims', async () => {
  const content = await readFile(new URL('../src/landing/content.ts', import.meta.url), 'utf8');
  assert.match(content, /Donation collection/);
  assert.match(content, /that feels like a celebration\./);
  assert.match(content, /1,153\+/);
  assert.match(content, /4\.6L\+/);
  assert.match(content, /23h/);
  assert.doesNotMatch(content, /wPawati/);
});

test('uses the reference display and body typography with Marathi overrides', async () => {
  const styles = await readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8');
  assert.match(styles, /family=Fraunces/);
  assert.match(styles, /family=Plus\+Jakarta\+Sans/);
  assert.match(styles, /--ep-font-display: 'Fraunces'/);
  assert.match(styles, /--ep-font-sans: 'Plus Jakarta Sans'/);
  assert.match(styles, /Noto Sans Devanagari/);
});
