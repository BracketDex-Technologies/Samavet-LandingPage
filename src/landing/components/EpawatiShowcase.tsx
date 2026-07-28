import { useRef, type PointerEvent } from 'react';

import type { LandingLanguage } from '../content';

export function EpawatiShowcase({ language }: { language: LandingLanguage }) {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isMarathi = language === 'mr';

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || !showcaseRef.current) return;
    const rect = showcaseRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    showcaseRef.current.style.setProperty('--parallax-x', `${x}px`);
    showcaseRef.current.style.setProperty('--parallax-y', `${y}px`);
  }

  function resetParallax() {
    showcaseRef.current?.style.setProperty('--parallax-x', '0px');
    showcaseRef.current?.style.setProperty('--parallax-y', '0px');
  }

  return (
    <div className="epawati-object" aria-label={isMarathi ? 'ई-पावती डिजिटल देणगी पावतीचे उदाहरण' : 'Example ePawati digital donation receipt'} onPointerLeave={resetParallax} onPointerMove={handlePointerMove} ref={showcaseRef} role="img">
      <div className="epawati-object-orbit" aria-hidden="true" />
      <div className="epawati-object-receipt" aria-hidden="true">
        <span>EPĀWATI / RECEIPT</span>
        <i />
        <small>{isMarathi ? 'समुदाय देणगी' : 'Community offering'}</small>
        <strong>₹ 1,251</strong>
        <em>{isMarathi ? 'पावती क्र. १२८५७' : 'Receipt ref. 12857'}</em>
        <b>{isMarathi ? 'धन्यवाद' : 'Thank you'}</b>
      </div>
      <div className="epawati-object-phone" aria-hidden="true">
        <div className="epawati-object-notch" />
        <div className="epawati-object-screen">
          <b>ePawati</b>
          <span>{isMarathi ? 'डिजिटल देणगी पावती' : 'Digital donation receipt'}</span>
          <i className="epawati-object-check" />
          <strong>{isMarathi ? 'धन्यवाद' : 'Thank you'}</strong>
          <small>{isMarathi ? 'तुमची देणगी नोंदवली आहे.' : 'Your donation has been received.'}</small>
          <i className="epawati-object-qr" />
          <em>{isMarathi ? 'व्हॉट्सअॅपसाठी तयार' : 'Ready for WhatsApp'}</em>
        </div>
      </div>
      <div className="epawati-object-leaf leaf-one" aria-hidden="true" />
      <div className="epawati-object-leaf leaf-two" aria-hidden="true" />
      <div className="epawati-object-leaf leaf-three" aria-hidden="true" />
    </div>
  );
}
