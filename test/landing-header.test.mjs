import assert from 'node:assert/strict';
import test from 'node:test';

import { isLandingHeaderCondensed } from '../src/landing/headerState.js';
import { landingNavItems } from '../src/landing/navItems.js';

test('condenses the landing header only after the visitor scrolls past the navbar threshold', () => {
  assert.equal(isLandingHeaderCondensed(0), false);
  assert.equal(isLandingHeaderCondensed(23), false);
  assert.equal(isLandingHeaderCondensed(24), true);
});

test('keeps the landing navbar focused to three primary section links', () => {
  assert.deepEqual(landingNavItems.en, [['#epawati', 'ePawati'], ['#services', 'Services'], ['#contact', 'Contact']]);
  assert.deepEqual(landingNavItems.mr, [['#epawati', 'ई-पावती'], ['#services', 'सेवा'], ['#contact', 'संपर्क']]);
});
