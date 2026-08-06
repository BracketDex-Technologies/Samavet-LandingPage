import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('presents all six approved ePawati features', async () => {
  const content = await readFile(new URL('../src/landing/content.ts', import.meta.url), 'utf8');
  for (const title of ['Instant digital receipts', 'UPI & online collection', 'Donor records that last', 'Roles for every volunteer', 'Live collection dashboard', 'Audit-ready exports']) {
    assert.match(content, new RegExp(title.replace(/[&]/g, '\\&')));
  }
});

test('uses a responsive six-card grid with image-led icon-free cards', async () => {
  const [source, styles] = await Promise.all([
    readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8'),
  ]);
  assert.match(source, /className="feature-card reveal-item"/);
  assert.match(source, /setActiveFeatureIndex/);
  assert.match(source, /role="dialog"/);
  assert.match(source, /feature-modal__image/);
  assert.match(source, /feature1\.png/);
  assert.match(source, /feature2\.png/);
  assert.match(source, /feature3\.png/);
  assert.match(source, /feature4\.\.png/);
  assert.match(source, /feature5\.png/);
  assert.match(source, /feature6\.png/);
  assert.match(source, /feature-card__media/);
  assert.match(source, /loading="lazy"/);
  assert.doesNotMatch(source, /featureIcons/);
  assert.doesNotMatch(source, /feature-card__icon/);
  assert.doesNotMatch(source, /feature-card__number/);
  assert.match(styles, /\.features-grid/);
  assert.match(styles, /\.feature-card__media/);
  assert.match(styles, /\.feature-card__content/);
  assert.match(styles, /\.feature-modal/);
  assert.match(styles, /object-fit: contain/);
  assert.doesNotMatch(styles, /\.feature-card::before/);
  assert.doesNotMatch(styles, /\.feature-card::after/);
  assert.doesNotMatch(styles, /\.feature-card__number/);
  assert.doesNotMatch(styles, /feature-card__icon/);
  assert.match(styles, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
});
