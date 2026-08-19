import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('presents the five approved ePawati features', async () => {
  const content = await readFile(new URL('../src/landing/content.ts', import.meta.url), 'utf8');
  for (const title of ['Instant digital receipts', 'Mandal, trust, temple and organisation management', 'Audit-ready PDF exports', '3D flipbook for organisation documents', 'Samavet Murti']) {
    assert.match(content, new RegExp(title.replace(/[&]/g, '\\&')));
  }
  assert.doesNotMatch(content, /UPI & online collection/);
  assert.doesNotMatch(content, /Live collection dashboard/);
});

test('uses an alternating four-feature showcase with screenshot frames', async () => {
  const [source, styles] = await Promise.all([
    readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/samavet.css', import.meta.url), 'utf8'),
  ]);
  assert.match(source, /features-showcase/);
  assert.match(source, /revealSelector="\.feature-row"/);
  assert.match(source, /feature-row--reverse/);
  assert.match(source, /feature-row__visual/);
  assert.match(source, /f-phonemockup\.png/);
  assert.match(source, /f-laptopmockup\.png/);
  assert.doesNotMatch(source, /featurelaptopmock\.png/);
  assert.doesNotMatch(source, /feautrephonemock\.png/);
  assert.doesNotMatch(source, /feature1st\.png/);
  assert.doesNotMatch(source, /feature2nd\.png/);
  assert.match(source, /feature3rd\.png/);
  assert.match(source, /feature4th\.png/);
  assert.doesNotMatch(source, /feature1\.png/);
  assert.doesNotMatch(source, /feature2\.png/);
  assert.doesNotMatch(source, /feature3\.png/);
  assert.doesNotMatch(source, /feature4\.\.png/);
  assert.doesNotMatch(source, /feature5\.png/);
  assert.doesNotMatch(source, /feature6\.png/);
  assert.doesNotMatch(source, /setActiveFeatureIndex/);
  assert.doesNotMatch(source, /role="dialog"/);
  assert.doesNotMatch(source, /feature-modal__image/);
  assert.match(source, /loading="lazy"/);
  assert.doesNotMatch(source, /featureIcons/);
  assert.match(source, /featureVisuals/);
  assert.match(source, /feature-row__visual--/);
  assert.doesNotMatch(source, /feature-device--phone/);
  assert.doesNotMatch(source, /feature-device--laptop/);
  assert.doesNotMatch(source, /feature-card__icon/);
  assert.doesNotMatch(source, /feature-card__number/);
  assert.match(styles, /\.features-showcase/);
  assert.match(styles, /\.feature-row--reverse/);
  assert.match(styles, /\.feature-row__visual/);
  assert.match(styles, /\.feature-row__copy/);
  assert.match(styles, /\.feature-row__visual[^}]*background: transparent/);
  assert.match(styles, /\.feature-row__visual[^}]*border: 0/);
  assert.match(styles, /\.feature-row__visual[^}]*box-shadow: none/);
  assert.match(styles, /\.feature-row__visual--phone/);
  assert.match(styles, /\.feature-row__visual--laptop/);
  assert.match(styles, /\.feature-row__visual--flipbook/);
  assert.doesNotMatch(styles, /\.feature-device__screen/);
  assert.match(styles, /object-fit: contain/);
  assert.doesNotMatch(styles, /\.features-grid/);
  assert.doesNotMatch(styles, /\.feature-modal/);
  assert.doesNotMatch(styles, /\.feature-card::before/);
  assert.doesNotMatch(styles, /\.feature-card::after/);
  assert.doesNotMatch(styles, /\.feature-card__number/);
  assert.doesNotMatch(styles, /feature-card__icon/);
  assert.match(styles, /grid-template-columns: minmax\(360px, 520px\) minmax\(340px, 1fr\)/);
});
