import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('presents the four Samavet services in a bento grid', async () => {
  const [content, section, styles] = await Promise.all([
    readFile(path.join(root, 'src', 'landing', 'content.ts'), 'utf8'),
    readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8'),
    readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8'),
  ]);

  assert.match(content, /Digital Vargani Slips/);
  assert.match(content, /Event Intelligence/);
  assert.match(content, /24×7 Live Streaming/);
  assert.match(content, /Podcast & Media/);
  assert.match(section, /services-bento/);
  assert.match(styles, /\.services-bento/);
  assert.match(styles, /grid-template-columns: repeat\(12, minmax\(0, 1fr\)\)/);
});
