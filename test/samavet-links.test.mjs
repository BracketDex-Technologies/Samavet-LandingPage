import assert from 'node:assert/strict';
import test from 'node:test';

import { buildWhatsAppLink, PORTAL_URL, shouldRenderSamavetLanding } from '../src/landing/links.js';

test('creates a prefilled WhatsApp URL for a demo request', () => {
  assert.equal(
    buildWhatsAppLink('917-222-7878', 'Hello Samavet, I would like to book a demo.'),
    'https://wa.me/919172227878?text=Hello%20Samavet%2C%20I%20would%20like%20to%20book%20a%20demo.',
  );
});

test('uses the public landing page as the entry point on every host', () => {
  assert.equal(shouldRenderSamavetLanding('samavet.in', '/'), true);
  assert.equal(shouldRenderSamavetLanding('www.samavet.in', '/'), true);
  assert.equal(shouldRenderSamavetLanding('samvet.vercel.app', '/'), true);
  assert.equal(shouldRenderSamavetLanding('localhost', '/'), true);
  assert.equal(shouldRenderSamavetLanding('digital-vargani-portal.vercel.app', '/'), true);
});

test('links Portal Login to the separately deployed portal', () => {
  assert.equal(PORTAL_URL, 'https://digital-vargani-portal.vercel.app/');
});
