import type { PDFDocumentProxy } from 'pdfjs-dist';

export interface RenderedPdfPage {
  aspectRatio: number;
  height: number;
  pageNumber: number;
  url: string;
  width: number;
}

function setPdfWorker(pdfjs: typeof import('pdfjs-dist')) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
}

export async function loadPdfDocument(file: File) {
  const pdfjs = await import('pdfjs-dist');
  setPdfWorker(pdfjs);
  const data = await file.arrayBuffer();
  return pdfjs.getDocument({ data }).promise;
}

export async function renderPdfPageImage(pdfDocument: PDFDocumentProxy, pageNumber: number, targetWidth: number) {
  const page = await pdfDocument.getPage(pageNumber);
  const initialViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(1.5, Math.max(0.58, targetWidth / initialViewport.width));
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not prepare PDF renderer.');
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  await page.render({ canvas, canvasContext: context, viewport }).promise;
  return {
    aspectRatio: canvas.width / canvas.height,
    height: canvas.height,
    pageNumber,
    url: canvas.toDataURL('image/jpeg', 0.82),
    width: canvas.width,
  } satisfies RenderedPdfPage;
}

export class PageCache {
  private readonly cache = new Map<number, RenderedPdfPage>();
  private readonly pending = new Map<number, Promise<RenderedPdfPage>>();
  private readonly maxItems: number;
  private readonly pdfDocument: PDFDocumentProxy;

  constructor(pdfDocument: PDFDocumentProxy, maxItems = 12) {
    this.pdfDocument = pdfDocument;
    this.maxItems = maxItems;
  }

  async get(pageNumber: number, targetWidth: number) {
    const cached = this.cache.get(pageNumber);
    if (cached) {
      this.cache.delete(pageNumber);
      this.cache.set(pageNumber, cached);
      return cached;
    }

    const pending = this.pending.get(pageNumber);
    if (pending) return pending;

    const request = renderPdfPageImage(this.pdfDocument, pageNumber, targetWidth).then((page) => {
      this.pending.delete(pageNumber);
      this.cache.set(pageNumber, page);
      this.trim();
      return page;
    });
    this.pending.set(pageNumber, request);
    return request;
  }

  preload(pageNumbers: number[], targetWidth: number) {
    for (const pageNumber of pageNumbers) {
      if (pageNumber > 0 && pageNumber <= this.pdfDocument.numPages) void this.get(pageNumber, targetWidth);
    }
  }

  clear() {
    this.cache.clear();
    this.pending.clear();
  }

  private trim() {
    while (this.cache.size > this.maxItems) {
      const oldestKey = this.cache.keys().next().value;
      if (typeof oldestKey !== 'number') return;
      this.cache.delete(oldestKey);
    }
  }
}

export function getVisiblePages(currentPage: number, pageCount: number, singlePage: boolean) {
  if (pageCount <= 0) return [];
  const first = Math.max(1, Math.min(pageCount, currentPage));
  if (singlePage || first === pageCount) return [first];
  return [first, first + 1];
}

export function getPrefetchPages(currentPage: number, pageCount: number, singlePage: boolean) {
  const step = singlePage ? 1 : 2;
  const pages = new Set<number>(getVisiblePages(currentPage, pageCount, singlePage));
  for (const offset of [-step * 2, -step, step, step * 2]) {
    getVisiblePages(currentPage + offset, pageCount, singlePage).forEach((page) => pages.add(page));
  }
  return [...pages].filter((page) => page >= 1 && page <= pageCount);
}

export function clampMagazinePage(pageNumber: number, pageCount: number, singlePage: boolean) {
  if (pageCount <= 0) return 0;
  if (pageNumber <= 0) return 0;
  const clamped = Math.max(1, Math.min(pageCount, pageNumber));
  return singlePage ? clamped : clamped % 2 === 1 ? clamped : Math.max(1, clamped - 1);
}

export function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}
