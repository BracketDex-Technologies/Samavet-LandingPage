import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentPath = path.join(root, 'src', 'landing', 'components', 'EpawatiShowcase.tsx');
const heroBackgroundPath = path.join(root, 'src', 'landing', 'assets', 'samavet-ganesh-hero.webp');

test('hero does not mount the ePawati showcase media', async () => {
  const contentSections = await readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8');

  assert.doesNotMatch(contentSections, /EpawatiShowcase/);
  await assert.rejects(access(componentPath));
});

test('hero does not render the right-side background line object', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');

  assert.doesNotMatch(styles, /\.samavet-hero::before/);
});

test('hero uses the Ganesh procession image as its CSS background', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');

  await access(heroBackgroundPath);
  assert.match(styles, /samavet-ganesh-hero\.webp/);
  assert.match(styles, /\.samavet-hero[\s\S]*background-image/);
});

test('hero copy follows the reference hierarchy and WhatsApp action labels', async () => {
  const content = await readFile(path.join(root, 'src', 'landing', 'content.ts'), 'utf8');
  const sections = await readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8');

  assert.match(content, /heroTitle: \['Together in Tradition\.', 'Stronger in Purpose\.'\]/);
  assert.match(content, /heroEyebrow: 'Digital by Choice\. Community by Heart\.'/);
  assert.match(content, /demo: 'Book Demo on WhatsApp'/);
  assert.match(content, /chat: 'Chat on WhatsApp'/);
  assert.match(content, /heroSignals: \['Trusted by communities across India'\]/);
  assert.match(sections, /hero-description-strong/);
});

test('hero copy uses a standard landing-page scale', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');
  const sections = await readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8');

  assert.doesNotMatch(styles, /\.samavet-hero h1 \{ font-size: 92px/);
  assert.doesNotMatch(styles, /\.hero-kicker \{ font-size: 28px/);
  assert.doesNotMatch(styles, /\.hero-description \{ font-size: 22px/);
  assert.doesNotMatch(styles, /\.samavet-hero \.button[\s\S]*min-height: 84px/);
  assert.doesNotMatch(sections, /hero-kicker-rule/);
  assert.match(styles, /\.hero-kicker \{[^}]*margin-top: 21px;[^}]*margin-bottom: 2px;/);
  assert.match(styles, /\.hero-description \{[^}]*margin-top: 22px;/);
  assert.match(styles, /\.samavet \.hero-kicker \{ margin-top: 21px; margin-bottom: 2px; \}/);
  assert.match(styles, /\.samavet \.hero-description \{ margin-top: 22px; \}/);
});

test('hero WhatsApp actions use compact simple buttons', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');
  const sections = await readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8');

  assert.match(sections, /MessageCircle size=\{18\}/);
  assert.match(styles, /\.samavet-hero \.button \{[^}]*border-radius: 999px;[^}]*font-size: 14px;[^}]*min-height: 44px;[^}]*min-width: 0;/);
  assert.doesNotMatch(styles, /\.samavet-hero \.button[\s\S]*min-height: 60px/);
  assert.doesNotMatch(styles, /\.samavet-hero \.button[\s\S]*min-width: 290px/);
});

test('ePawati story is rebuilt as a simple two-column section', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');
  const sections = await readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8');

  assert.match(sections, /epawati-story-copy/);
  assert.match(sections, /receipt-benefit-list/);
  assert.match(sections, /receipt-benefit-item/);
  assert.doesNotMatch(sections, /className="story-rule"/);
  assert.doesNotMatch(sections, /receipt-benefit-item[^;]*MarketingText/);
  assert.match(styles, /\.epawati-story \{[^}]*grid-template-columns: minmax\(0, \.82fr\) minmax\(320px, \.78fr\);/);
  assert.match(styles, /\.receipt-benefit-list \{/);
  assert.match(styles, /\.receipt-benefit-item \{/);
});

test('footer wordmark is reduced by four pixels from the previous desktop scale', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');

  assert.match(styles, /\.footer-wordmark strong \{[^}]*font-size: clamp\(68px, calc\(17\.5vw - 4px\), 261px\);/);
  assert.doesNotMatch(styles, /\.footer-wordmark strong \{[^}]*font-size: clamp\(72px, 17\.5vw, 265px\);/);
});

test('footer credits BracketDex on the right without showing the raw domain label', async () => {
  const footer = await readFile(path.join(root, 'src', 'landing', 'components', 'LandingFooter.tsx'), 'utf8');
  const leftColumn = footer.slice(footer.indexOf('footer-bottom-left'), footer.indexOf('footer-credit-link'));

  assert.doesNotMatch(leftColumn, /by BracketDex Technologies/);
  assert.match(footer, /className="footer-credit-link"/);
  assert.match(footer, /href="https:\/\/bracketdex\.com"/);
  assert.match(footer, /by <span>BracketDex<\/span> Technologies/);
  assert.doesNotMatch(footer, />bracketdex\.com<\/a>/);
});

test('English landing typography uses Outfit and PT Sans while preserving Marathi font overrides', async () => {
  const styles = await readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8');

  assert.match(styles, /@import url\('https:\/\/fonts\.googleapis\.com\/css2\?family=Outfit:wght@400;700&family=PT\+Sans:wght@400;700&display=swap'\);/);
  assert.match(styles, /:root \{[\s\S]*--heading-font: 'Outfit', sans-serif;[\s\S]*--body-font: 'PT Sans', sans-serif;[\s\S]*\}/);
  assert.match(styles, /--heading-font: 'Outfit', sans-serif;/);
  assert.match(styles, /--body-font: 'PT Sans', sans-serif;/);
  assert.match(styles, /\.samavet:not\(\.samavet--mr\) \{ font-family: var\(--body-font\); \}/);
  assert.match(styles, /\.samavet:not\(\.samavet--mr\) h1, \.samavet:not\(\.samavet--mr\) h2 \{ font-family: var\(--heading-font\); font-weight: 700; \}/);
  assert.match(styles, /\.samavet:not\(\.samavet--mr\) \.landing-brand-name, \.samavet:not\(\.samavet--mr\) \.hero-kicker \{ font-family: var\(--heading-font\); font-weight: 700; \}/);
  assert.match(styles, /\.samavet--mr, \.samavet--mr h1, \.samavet--mr h2, \.samavet--mr h3 \{ font-family: 'Noto Sans Devanagari', sans-serif; \}/);
  assert.doesNotMatch(styles, /Melodrama|Bonny|PT Serif|Quicksand|Cormorant Garamond|Moonscape Serif|DM Serif Display|IBM Plex Mono/);
});
