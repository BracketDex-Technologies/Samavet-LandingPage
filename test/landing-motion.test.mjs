import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('keeps entrance motion without mounting a global click effect', async () => {
  const source = await readFile(path.join(root, 'src', 'landing', 'SamavetLanding.tsx'), 'utf8');

  assert.match(source, /MotionConfig/);
  assert.doesNotMatch(source, /LandingClickEffects/);
  await assert.rejects(access(path.join(root, 'src', 'landing', 'components', 'LandingClickEffects.tsx')));
});

test('mounts a session-only three-word Samavet loader', async () => {
  const [landing, loader, styles] = await Promise.all([
    readFile(path.join(root, 'src', 'landing', 'SamavetLanding.tsx'), 'utf8'),
    readFile(path.join(root, 'src', 'landing', 'components', 'SiteLoader.tsx'), 'utf8'),
    readFile(path.join(root, 'src', 'landing', 'samavet.css'), 'utf8'),
  ]);

  assert.match(landing, /SiteLoader/);
  assert.match(loader, /SAMAVET[\s\S]*समवेत[\s\S]*नमस्ते/);
  assert.match(loader, /sessionStorage/);
  assert.match(styles, /site-loader[\s\S]*backdrop-filter/);
});

test('uses Motion Primitives fade-in-blur for landing marketing copy', async () => {
  const content = await readFile(path.join(root, 'src', 'landing', 'components', 'ContentSections.tsx'), 'utf8');

  assert.match(content, /TextEffect/);
  assert.match(content, /preset=['"]fade-in-blur['"]/);
  assert.match(content, /speedReveal=\{1\.1\}/);
  assert.match(content, /speedSegment=\{0\.3\}/);
});

test('keeps TextEffect assistive copy visually hidden without Tailwind source scanning', async () => {
  const effect = await readFile(path.join(root, 'components', 'motion-primitives', 'text-effect.tsx'), 'utf8');

  assert.doesNotMatch(effect, /className='sr-only'/);
  assert.match(effect, /clipPath: 'inset\(50%\)'/);
});
