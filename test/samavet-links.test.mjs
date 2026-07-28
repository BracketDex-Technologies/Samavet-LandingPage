import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { buildWhatsAppLink, shouldRenderSamavetLanding } from '../src/landing/links.js';

test('creates a prefilled WhatsApp URL for a demo request', () => {
  assert.equal(
    buildWhatsAppLink('917-222-7878', 'Hello Samavet, I would like to book a demo.'),
    'https://wa.me/919172227878?text=Hello%20Samavet%2C%20I%20would%20like%20to%20book%20a%20demo.',
  );
});

test('mounts the public page only for the Samavet host or local preview path', () => {
  assert.equal(shouldRenderSamavetLanding('samavet.in', '/'), true);
  assert.equal(shouldRenderSamavetLanding('www.samavet.in', '/'), true);
  assert.equal(shouldRenderSamavetLanding('samvet.vercel.app', '/'), true);
  assert.equal(shouldRenderSamavetLanding('localhost', '/samavet'), true);
  assert.equal(shouldRenderSamavetLanding('digital-vargani-landing-page.vercel.app', '/'), false);
});

test('wraps the protected portal app in its React Query provider', async () => {
  const bootstrap = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');

  assert.match(bootstrap, /import\s+\{\s*QueryClientProvider\s*\}\s+from\s+['"]@tanstack\/react-query['"]/);
  assert.match(bootstrap, /import\s+\{\s*queryClient\s*\}\s+from\s+['"]\.\/lib\/queryClient\.ts['"]/);
  assert.match(
    bootstrap,
    /<QueryClientProvider client=\{queryClient\}>\s*<App\s*\/>\s*<\/QueryClientProvider>/,
  );
});
