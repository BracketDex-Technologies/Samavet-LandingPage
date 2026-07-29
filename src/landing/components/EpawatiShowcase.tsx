import { useRef, type PointerEvent } from 'react';

import mandalReceiptBooklet from '../assets/epawati-mandal-receipt-booklet.webp';
import mobileReceipt from '../assets/epawati-mobile-receipt.webp';
import type { LandingLanguage } from '../content';

export function EpawatiShowcase({ language }: { language: LandingLanguage }) {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isMarathi = language === 'mr';

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || !showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    showcaseRef.current.style.setProperty('--parallax-x', `${x}px`);
    showcaseRef.current.style.setProperty('--parallax-y', `${y}px`);
  }

  function resetParallax() {
    showcaseRef.current?.style.setProperty('--parallax-x', '0px');
    showcaseRef.current?.style.setProperty('--parallax-y', '0px');
  }

  return (
    <div
      className="epawati-object"
      onPointerLeave={resetParallax}
      onPointerMove={handlePointerMove}
      ref={showcaseRef}
    >
      <div className="epawati-object-orbit" aria-hidden="true" />
      <figure className="epawati-object-booklet">
        <img alt={isMarathi ? 'गणेश मंडळ ई-पावतीचे उदाहरण' : 'Illustrative Ganesh mandal ePawati receipt'} src={mandalReceiptBooklet} />
      </figure>
      <figure className="epawati-object-mobile">
        <img alt={isMarathi ? 'मोबाइलवरील ई-पावतीचे उदाहरण' : 'Illustrative mobile ePawati receipt'} src={mobileReceipt} />
      </figure>
    </div>
  );
}
