import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('uses a structured intelligence dashboard with scroll-triggered UI elements', async () => {
  const [section, styles] = await Promise.all([
    readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8'),
    readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8'),
  ]);

  assert.match(section, /intelligence-dashboard/);
  assert.match(section, /insight-timeline/);
  assert.match(section, /insight-zone-grid/);
  assert.match(styles, /\.reveal-section\.is-visible \.insight-card/);
  assert.doesNotMatch(styles, /\.intelligence-section::before/);
});

test('keeps intelligence dashboard labels and tags simple and unwrapped', async () => {
  const [section, styles] = await Promise.all([
    readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8'),
    readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8'),
  ]);
  const intelligenceSection = section.slice(section.indexOf('export function IntelligenceSection'), section.indexOf('export function ServicesSection'));
  const tagsMarkup = intelligenceSection.slice(intelligenceSection.indexOf('intelligence-tags'), intelligenceSection.indexOf('</div></div><div className="intelligence-dashboard"'));

  assert.doesNotMatch(tagsMarkup, /MarketingText/);
  assert.match(styles, /\.intelligence-dashboard \{[^}]*white-space: nowrap;/);
  assert.match(styles, /\.intelligence-tags span \{[^}]*white-space: nowrap;/);
});
