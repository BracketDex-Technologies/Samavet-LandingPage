import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('routes /ahwal to the Ahwal page', async () => {
  const main = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');
  assert.match(main, /import AhwalPage/);
  assert.match(main, /pathname === '\/ahwal' \? <AhwalPage \/>/);
});

test('implements client-only PDF to 3D Ahwal book maker', async () => {
  const [page, maker, stage, utils, styles] = await Promise.all([
    readFile(new URL('../src/landing/AhwalPage.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/AhwalBookMaker.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/AhwalThreeBook.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/ahwalBookUtils.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/ahwal.css', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /AhwalBookMaker/);
  assert.match(page, /path: '\/ahwal'/);
  assert.match(maker, /accept="application\/pdf"/);
  assert.match(maker, /onDrop=/);
  assert.match(maker, /loadPdfDocument\(file\)/);
  assert.match(utils, /new Map<number, RenderedPdfPage>/);
  assert.match(utils, /getPrefetchPages/);
  assert.match(utils, /renderPdfPageImage/);
  assert.match(maker, /GLTFExporter/);
  assert.match(maker, /USDZExporter/);
  assert.match(maker, /Download GLB/);
  assert.match(maker, /Download GLTF/);
  assert.match(maker, /Download USDZ/);
  assert.match(utils, /pdfjs-dist/);
  assert.match(utils, /pdf\.worker\.min\.mjs/);
  assert.match(stage, /simple-book-reader/);
  assert.match(stage, /simple-flip-book/);
  assert.match(stage, /simple-book-cover--front/);
  assert.match(stage, /simple-book-page/);
  assert.match(stage, /is-flipped/);
  assert.match(stage, /RENDER_WINDOW/);
  assert.match(stage, /Page scale/);
  assert.match(stage, /ArrowLeft/);
  assert.match(stage, /ArrowRight/);
  assert.match(utils, /clampMagazinePage/);
  assert.match(styles, /\.ahwal-page/);
  assert.match(styles, /\.simple-book-reader/);
  assert.match(styles, /\.simple-flip-book\.is-open/);
  assert.match(styles, /\.simple-book-page\.is-flipped/);
  assert.match(styles, /backface-visibility: hidden/);
});

test('keeps Ahwal free of backend storage and public sharing logic', async () => {
  const source = await Promise.all([
    readFile(new URL('../src/landing/AhwalPage.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/AhwalBookMaker.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/components/AhwalThreeBook.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/landing/ahwalBookUtils.ts', import.meta.url), 'utf8'),
  ]).then((files) => files.join('\n'));

  assert.doesNotMatch(source, /apiRequest|Supabase|supabase|Prisma|MandalBookManager|PublishedBookReader/);
  assert.doesNotMatch(source, /publish|unpublish|metadataPath|session|share token|viewCount/);
  assert.doesNotMatch(source, /localStorage|sessionStorage|indexedDB/);
});
