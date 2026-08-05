import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('builds an interactive and accessible portal preview', async () => {
  const source = await readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8');
  assert.match(source, /role="tablist"/);
  assert.match(source, /role="tabpanel"/);
  assert.match(source, /aria-selected/);
  assert.match(source, /ArrowLeft/);
  assert.match(source, /ArrowRight/);
  assert.match(source, /portalRows\[activeTab\]/);
});
