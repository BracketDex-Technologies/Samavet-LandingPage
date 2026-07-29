import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentPath = path.join(root, 'src', 'landing', 'components', 'EpawatiShowcase.tsx');
const assetDirectory = path.join(root, 'src', 'landing', 'assets');

test('hero receipt showcase uses the approved printed and mobile mockups', async () => {
  await Promise.all([
    access(path.join(assetDirectory, 'epawati-mandal-receipt-booklet.webp')),
    access(path.join(assetDirectory, 'epawati-mobile-receipt.webp')),
  ]);

  const component = await readFile(componentPath, 'utf8');

  assert.match(component, /epawati-mandal-receipt-booklet\.webp/);
  assert.match(component, /epawati-mobile-receipt\.webp/);
  assert.match(component, /alt=\{isMarathi \? 'गणेश मंडळ ई-पावतीचे उदाहरण' : 'Illustrative Ganesh mandal ePawati receipt'/);
  assert.match(component, /alt=\{isMarathi \? 'मोबाइलवरील ई-पावतीचे उदाहरण' : 'Illustrative mobile ePawati receipt'/);
});
