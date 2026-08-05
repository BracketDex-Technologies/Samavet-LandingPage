import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('presents all six approved ePawati features', async () => {
  const content = await readFile(new URL('../src/landing/content.ts', import.meta.url), 'utf8');
  for (const title of ['Instant digital receipts', 'UPI & online collection', 'Donor records that last', 'Roles for every volunteer', 'Live collection dashboard', 'Audit-ready exports']) {
    assert.match(content, new RegExp(title.replace(/[&]/g, '\\&')));
  }
});

test('uses a responsive six-card grid with pointer spotlight styling', async () => {
  const [source, styles] = await Promise.all([
    readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8'),
  ]);
  assert.match(source, /feature-card__glow/);
  assert.match(source, /--mx/);
  assert.match(styles, /\.features-grid/);
  assert.match(styles, /radial-gradient\(320px circle/);
  assert.match(styles, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
});
