import assert from 'node:assert/strict';
import test from 'node:test';

import { buildDemoRequestMailto, validateDemoRequest } from '../src/landing/demoRequest.js';
import { buildWhatsAppLink, PORTAL_URL, shouldRenderSamavetLanding, WHATSAPP_PHONE } from '../src/landing/links.js';

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

test('links Portal Login to the ePawati portal', () => {
  assert.equal(PORTAL_URL, 'https://epawati.samavet.in/');
});

test('uses the official WhatsApp number for landing social links', () => {
  assert.equal(WHATSAPP_PHONE, '+919172227878');
});

test('rejects incomplete demo requests before opening an email draft', () => {
  assert.deepEqual(
    validateDemoRequest({ email: 'not-an-email', name: '', organization: '', request: '' }),
    {
      errors: {
        email: 'Enter a valid email address.',
        name: 'Enter your name.',
        organization: 'Enter your organization name.',
        request: 'Tell us what you need help with.',
      },
      valid: false,
    },
  );
});

test('creates a prefilled email draft for a valid demo request', () => {
  assert.equal(
    buildDemoRequestMailto({
      email: 'asha@example.com',
      name: 'Asha',
      organization: 'Pragati Mandal',
      request: 'Need an ePawati demo.',
    }),
    'mailto:bracketdevs.teams@gmail.com?subject=Samavet%20demo%20request%20from%20Pragati%20Mandal&body=Name%3A%20Asha%0AOrganization%3A%20Pragati%20Mandal%0AEmail%3A%20asha%40example.com%0A%0ARequest%3A%0ANeed%20an%20ePawati%20demo.',
  );
});
