import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('implements the audit title, description, canonical, hreflang, and social metadata', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /Samavet \| Digital Vargani, ePawati &amp; Pawati Software for Mandals/);
  assert.match(html, /Digital Vargani, ePawati and Pawati software/);
  assert.match(html, /digital vargani/);
  assert.match(html, /digital pawati/);
  assert.match(html, /digital pavati/);
  assert.match(html, /डिजिटल वर्गणी/);
  assert.match(html, /rel="canonical" href="https:\/\/www\.samavet\.in\/"/);
  assert.match(html, /hreflang="en"/);
  assert.match(html, /hreflang="mr"/);
  assert.match(html, /hreflang="x-default"/);
  assert.match(html, /property="og:image:alt"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
});

test('embeds Organization and SoftwareApplication structured data', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const schemaText = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(schemaText);
  const schema = JSON.parse(schemaText);
  const types = schema['@graph'].map((item) => item['@type']);
  assert.deepEqual(types, ['Organization', 'SoftwareApplication', 'WebSite']);
  assert.equal(schema['@graph'][1].name, 'ePawati by Samavet');
  assert.deepEqual(schema['@graph'][1].alternateName.slice(0, 3), ['Digital Pawati', 'Digital Pavati', 'Digital Vargani']);
  assert.match(schema['@graph'][1].keywords, /Ganesh mandal receipt software/);
});

test('publishes robots and sitemap entries for every indexable route', async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL('../public/robots.txt', import.meta.url), 'utf8'),
    readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8'),
  ]);
  assert.match(robots, /Sitemap: https:\/\/www\.samavet\.in\/sitemap\.xml/);
  for (const route of ['blog']) {
    assert.match(sitemap, new RegExp(`https://www\\.samavet\\.in/${route}`));
  }
  for (const removedRoute of ['epawati-for-ganesh-mandals', 'temple-donation-management-software', 'ngo-digital-receipt-system']) {
    assert.doesNotMatch(sitemap, new RegExp(`https://www\\.samavet\\.in/${removedRoute}`));
  }
  assert.match(sitemap, /hreflang="mr"/);
  assert.match(sitemap, /https:\/\/www\.samavet\.in\/mr/);
});

test('keeps one semantic hero heading without duplicate overlay text', async () => {
  const sections = await readFile(new URL('../src/landing/components/ContentSections.tsx', import.meta.url), 'utf8');
  const hero = sections.slice(sections.indexOf('export function HeroSection'), sections.indexOf('export function StatsSection'));
  assert.equal((hero.match(/<h1/g) ?? []).length, 1);
  assert.equal((hero.match(/copy\.heroTitle\[0\]/g) ?? []).length, 1);
});

test('generates route-specific static metadata after the Vite build', async () => {
  const [packageJson, script] = await Promise.all([
    readFile(new URL('../package.json', import.meta.url), 'utf8'),
    readFile(new URL('../scripts/prerender-seo.mjs', import.meta.url), 'utf8'),
  ]);
  assert.match(packageJson, /node scripts\/prerender-seo\.mjs/);
  assert.match(script, /Generated SEO HTML/);
});
