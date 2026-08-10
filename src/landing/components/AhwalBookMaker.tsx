import { ChevronLeft, ChevronRight, FileText, Image, Upload, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useRef, useState, type DragEvent } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';

import { clampMagazinePage, loadPdfDocument } from '../ahwalBookUtils';
import type { LandingLanguage } from '../content';
import { AhwalThreeBook } from './AhwalThreeBook';

interface AhwalBookMakerProps {
  language: LandingLanguage;
}

function releasePdfDocument(document: PDFDocumentProxy | null) {
  const destroyable = document as (PDFDocumentProxy & { destroy?: () => Promise<void> }) | null;
  void destroyable?.destroy?.();
}

function readImageAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read this cover image.'));
    reader.readAsDataURL(file);
  });
}

export function AhwalBookMaker({ language }: AhwalBookMakerProps) {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [coverDragActive, setCoverDragActive] = useState(false);
  const [singlePage, setSinglePage] = useState(() => window.innerWidth < 760);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const pdfDocumentRef = useRef<PDFDocumentProxy | null>(null);
  const isMarathi = language === 'mr';
  const pageCount = pdfDocument?.numPages ?? 0;
  const step = 2;
  const currentSpread = currentPage === 0 ? 0 : Math.floor((currentPage - 1) / 2) + 1;
  const totalSpreads = Math.ceil(pageCount / 2);

  useEffect(() => {
    const updateMode = () => setSinglePage(window.innerWidth < 760);
    updateMode();
    window.addEventListener('resize', updateMode, { passive: true });
    return () => window.removeEventListener('resize', updateMode);
  }, []);

  useEffect(() => {
    setCurrentPage((page) => clampMagazinePage(page, pageCount, false));
  }, [pageCount, singlePage]);

  useEffect(() => () => {
    releasePdfDocument(pdfDocumentRef.current);
  }, []);

  async function handlePdf(file: File) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError(isMarathi ? 'कृपया PDF फाइल निवडा.' : 'Please select a PDF file.');
      return;
    }

    setBusy(true);
    setMessage(isMarathi ? 'PDF वाचत आहे...' : 'Reading PDF...');
    setError('');
    setPdfDocument(null);
    setCurrentPage(0);
    setZoom(1);

    try {
      const document = await loadPdfDocument(file);
      releasePdfDocument(pdfDocumentRef.current);
      pdfDocumentRef.current = document;
      setPdfDocument(document);
      setMessage(isMarathi ? 'पहिली पाने तयार करत आहे...' : 'Preparing first pages...');
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : isMarathi ? 'PDF उघडता आली नाही.' : 'Could not open this PDF.');
      setMessage('');
    } finally {
      setBusy(false);
    }
  }

  async function handleCoverImage(file: File) {
    if (!file.type.startsWith('image/')) {
      setError(isMarathi ? 'कृपया cover साठी image फाइल निवडा.' : 'Please select an image file for the cover.');
      return;
    }

    try {
      setError('');
      setCoverUrl(await readImageAsDataUrl(file));
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : isMarathi ? 'Cover image वाचता आली नाही.' : 'Could not read this cover image.');
    }
  }

  function goNext() {
    setCurrentPage((page) => page === 0 ? 1 : clampMagazinePage(page + step, pageCount, false));
  }

  function goPrevious() {
    setCurrentPage((page) => page <= 1 ? 0 : clampMagazinePage(page - step, pageCount, false));
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) void handlePdf(file);
  }

  function handleCoverDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setCoverDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) void handleCoverImage(file);
  }

  function changeZoom(nextZoom: number) {
    setZoom(Math.max(1, Math.min(2.4, Number(nextZoom.toFixed(2)))));
  }

  return (
    <section className="ahwal-page">
      <div className="landing-container ahwal-layout">
        <div className="ahwal-hero">
          <p className="section-eyebrow">{isMarathi ? 'अहवाल' : 'Ahwal'}</p>
          <h1>{isMarathi ? 'तुमच्या संस्थेचा अहवाल online 3D पुस्तकात बदला' : 'Turn your organization report into a 3D book online'}</h1>
          <p>{isMarathi ? 'टीप: पेज refresh करू नका. Refresh केल्यावर तुमचे पुस्तक हटेल.' : 'Note: do not refresh the page. Your book stays only until the page refreshes.'}</p>
        </div>

        <div className="ahwal-workspace">
          <div className="ahwal-upload-grid">
            <label
              className={`ahwal-upload${dragActive ? ' is-dragging' : ''}`}
              onDragEnter={(event) => { event.preventDefault(); setDragActive(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <input
                accept="application/pdf"
                ref={fileInputRef}
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handlePdf(file);
                  event.currentTarget.value = '';
                }}
              />
              <span className="ahwal-upload__icon"><Upload size={26} /></span>
              <strong>{isMarathi ? 'PDF इथे ड्रॉप करा किंवा निवडा' : 'Drop a PDF here or select one'}</strong>
              <small>{isMarathi ? 'फक्त सध्याच्या browser tab साठी.' : 'Only for the current browser tab.'}</small>
              <button onClick={() => fileInputRef.current?.click()} type="button">{isMarathi ? 'PDF निवडा' : 'Select PDF'}</button>
            </label>

            <label
              className={`ahwal-upload ahwal-upload--cover${coverDragActive ? ' is-dragging' : ''}`}
              onDragEnter={(event) => { event.preventDefault(); setCoverDragActive(true); }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setCoverDragActive(false)}
              onDrop={handleCoverDrop}
            >
              <input
                accept="image/*"
                ref={coverInputRef}
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleCoverImage(file);
                  event.currentTarget.value = '';
                }}
              />
              <span className="ahwal-upload__icon"><Image size={25} /></span>
              <strong>{isMarathi ? 'Cover image जोडा' : 'Add cover image'}</strong>
              <small>{coverUrl ? (isMarathi ? 'Cover image तयार आहे.' : 'Cover image ready.') : (isMarathi ? 'नसल्यास PDF चे पहिले पान cover होईल.' : 'If skipped, page 1 becomes the cover.')}</small>
              <button onClick={() => coverInputRef.current?.click()} type="button">{isMarathi ? 'Cover निवडा' : 'Select Cover'}</button>
            </label>
          </div>

          <div className="ahwal-status" aria-live="polite">
            {busy ? <span><i className="ahwal-spinner" />{message || (isMarathi ? 'अहवाल तयार करत आहे...' : 'Preparing magazine...')}</span> : null}
            {!busy && !pdfDocument ? <span><FileText size={18} />{isMarathi ? 'मोठे PDF हळूहळू render होतील; सर्व पाने एकदम render होत नाहीत.' : 'Large PDFs are rendered progressively; all pages are not rendered upfront.'}</span> : null}
            {error ? <span className="ahwal-status__error">{error}</span> : null}
          </div>

          {pdfDocument ? (
            <div className="ahwal-book-card">
              <div className="ahwal-book-card__stage">
                <AhwalThreeBook
                  coverUrl={coverUrl}
                  currentPage={currentPage}
                  onNext={goNext}
                  onPrevious={goPrevious}
                  onStatus={setMessage}
                  onZoomChange={changeZoom}
                  pageCount={pageCount}
                  pdfDocument={pdfDocument}
                  singlePage={singlePage}
                  zoom={zoom}
                />
                {message ? <div className="ahwal-stage-message"><i className="ahwal-spinner" />{message}</div> : null}
              </div>

              <div className="ahwal-controls" aria-label={isMarathi ? 'पुस्तक नियंत्रण' : 'Magazine controls'}>
                <button onClick={goPrevious} disabled={currentPage <= 0 || busy} type="button"><ChevronLeft size={18} />{currentPage <= 1 ? (isMarathi ? 'बंद करा' : 'Close') : (isMarathi ? 'मागे' : 'Previous')}</button>
                <span>{currentPage === 0 ? (isMarathi ? 'बंद cover' : 'Closed cover') : `${isMarathi ? 'पान' : 'Page'} ${currentPage} / ${pageCount}${singlePage ? '' : ` · ${isMarathi ? 'स्प्रेड' : 'Spread'} ${currentSpread} / ${totalSpreads}`}`}</span>
                <button onClick={goNext} disabled={(currentPage !== 0 && currentPage + step > pageCount) || busy} type="button">{currentPage === 0 ? (isMarathi ? 'पुस्तक उघडा' : 'Open Book') : (isMarathi ? 'पुढे' : 'Next')}<ChevronRight size={18} /></button>
                <button aria-label={isMarathi ? 'झूम कमी करा' : 'Zoom out'} onClick={() => changeZoom(zoom - 0.18)} type="button"><ZoomOut size={18} /></button>
                <button aria-label={isMarathi ? 'झूम reset करा' : 'Reset zoom'} onClick={() => changeZoom(1)} type="button">{Math.round(zoom * 100)}%</button>
                <button aria-label={isMarathi ? 'झूम वाढवा' : 'Zoom in'} onClick={() => changeZoom(zoom + 0.18)} type="button"><ZoomIn size={18} /></button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
