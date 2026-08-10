import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('routes legal markdown pages and keeps the Samavet watermark', async () => {
  const [main, legalPages, legalPage, footer, sitemap] = await Promise.all([
    readFile(new URL('../src/main.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/legalPages.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/LegalPage.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/LandingFooter.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8'),
  ]);

  for (const route of [
    'privacy-policy',
    'terms-and-conditions',
    'refund-and-cancellation-policy',
    'cookie-policy',
    'acceptable-use-policy',
    'donation-disclaimer',
  ]) {
    assert.match(legalPages, new RegExp(`/${route}`));
    assert.match(footer, new RegExp(`/${route}`));
    assert.match(sitemap, new RegExp(`https://www\\.samavet\\.in/${route}`));
  }

  assert.match(main, /legalPagePaths\.has\(pathname\)/);
  assert.match(legalPage, /samavet-logo\.jpeg/);
});
