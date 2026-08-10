import { useEffect, useMemo, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { Object3D } from 'three';

import { PageCache, type RenderedPdfPage } from '../ahwalBookUtils';

interface AhwalThreeBookProps {
  coverUrl: string | null;
  currentPage: number;
  onExportReady?: (object: Object3D | null) => void;
  onNext: () => void;
  onPrevious: () => void;
  onStatus?: (message: string) => void;
  onZoomChange: (zoom: number) => void;
  pageCount: number;
  pdfDocument: PDFDocumentProxy;
  singlePage: boolean;
  zoom: number;
}

const RENDER_WINDOW = 5;

export function AhwalThreeBook({ coverUrl, currentPage, onExportReady, onNext, onPrevious, onStatus, onZoomChange, pageCount, pdfDocument, zoom }: AhwalThreeBookProps) {
  const cacheRef = useRef<PageCache | null>(null);
  const [pageMap, setPageMap] = useState<Record<number, RenderedPdfPage>>({});
  const [coverPage, setCoverPage] = useState<RenderedPdfPage | null>(null);
  const totalSheets = Math.ceil(pageCount / 2);
  const coverOpen = currentPage > 0;
  const flippedSheets = currentPage <= 1 ? 0 : Math.floor((currentPage - 1) / 2);
  const firstSheet = Math.max(0, flippedSheets - 1);
  const lastSheet = Math.min(totalSheets - 1, flippedSheets + RENDER_WINDOW - 1);
  const visibleSheets = useMemo(() => {
    const sheets: number[] = [];
    for (let index = firstSheet; index <= lastSheet; index += 1) sheets.push(index);
    return sheets;
  }, [firstSheet, lastSheet]);

  useEffect(() => {
    cacheRef.current?.clear();
    cacheRef.current = new PageCache(pdfDocument, 16);
    setPageMap({});
    setCoverPage(null);
    onExportReady?.(null);
    return () => cacheRef.current?.clear();
  }, [onExportReady, pdfDocument]);

  useEffect(() => {
    const cache = cacheRef.current;
    if (!cache || coverUrl || pageCount <= 0) return;
    let cancelled = false;
    void cache.get(1, 1040).then((page) => {
      if (!cancelled) setCoverPage(page);
    });
    return () => {
      cancelled = true;
    };
  }, [coverUrl, pageCount, pdfDocument]);

  useEffect(() => {
    const cache = cacheRef.current;
    if (!cache) return;
    let cancelled = false;
    const pages = new Set<number>();
    visibleSheets.forEach((sheet) => {
      const front = sheet * 2 + 1;
      const back = front + 1;
      if (front <= pageCount) pages.add(front);
      if (back <= pageCount) pages.add(back);
    });
    pages.add(1);
    const pageList = [...pages];
    onStatus?.(`Preparing page ${pageList[0]}${pageList.length > 1 ? `-${pageList.at(-1)}` : ''}...`);
    void Promise.all(pageList.map((page) => cache.get(page, 1040))).then((renderedPages) => {
      if (cancelled) return;
      setPageMap((current) => {
        const next = { ...current };
        renderedPages.forEach((page) => {
          next[page.pageNumber] = page;
        });
        return next;
      });
      cache.preload(pageList.map((page) => page + 4).filter((page) => page <= pageCount), 1040);
      onStatus?.('');
    });
    return () => {
      cancelled = true;
    };
  }, [onStatus, pageCount, visibleSheets]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrevious();
      else if (event.key === 'ArrowRight') onNext();
      else return;
      event.preventDefault();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onNext, onPrevious]);

  function coverSource() {
    return coverUrl ?? coverPage?.url ?? pageMap[1]?.url ?? '';
  }

  function pageSource(pageNumber: number) {
    return pageMap[pageNumber]?.url ?? '';
  }

  function renderFace(pageNumber: number, side: 'front' | 'back') {
    const src = pageSource(pageNumber);
    return (
      <>
        <span className={`simple-book-edge simple-book-edge--${side}`} aria-hidden="true" />
        {src ? <img alt={`PDF page ${pageNumber}`} className={`simple-book-content simple-book-content--${side}`} src={src} /> : <span className="simple-book-loading">Preparing...</span>}
      </>
    );
  }

  return (
    <section className="simple-book-reader" style={{ '--simple-book-scale': zoom } as React.CSSProperties}>
      <div className="simple-book-toolbar">
        <label>
          Page scale
          <input aria-label="Page scale" max="1.7" min="0.72" onChange={(event) => onZoomChange(Number(event.target.value))} step="0.05" type="range" value={zoom} />
        </label>
      </div>

      <div className="simple-book-viewport">
        <div className={`simple-flip-book${coverOpen ? ' is-open' : ''}`}>
          <button aria-label="Open book" className="simple-book-cover simple-book-cover--front" onClick={onNext} type="button">
            <span className="simple-book-cover-shading" aria-hidden="true" />
            {coverSource() ? <img alt="Book cover" src={coverSource()} /> : <span className="simple-book-loading">Preparing cover...</span>}
          </button>

          {visibleSheets.map((sheetIndex) => {
            const frontPage = sheetIndex * 2 + 1;
            const backPage = frontPage + 1;
            const flipped = sheetIndex < flippedSheets;
            return (
              <div
                className={`simple-book-page${flipped ? ' is-flipped' : ''}`}
                key={sheetIndex}
                style={{ '--sheet-z': flipped ? 20 + sheetIndex : 80 - sheetIndex } as React.CSSProperties}
              >
                <button aria-label={`Open page ${frontPage}`} className="simple-book-face simple-book-face--front" onClick={onNext} type="button">
                  {renderFace(frontPage, 'front')}
                </button>
                <button aria-label={`Back page ${backPage}`} className="simple-book-face simple-book-face--back" onClick={onPrevious} type="button">
                  {backPage <= pageCount ? renderFace(backPage, 'back') : <span className="simple-book-edge simple-book-edge--back" aria-hidden="true" />}
                </button>
              </div>
            );
          })}

          <div className="simple-book-cover simple-book-cover--back" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
