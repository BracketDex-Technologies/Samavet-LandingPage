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
