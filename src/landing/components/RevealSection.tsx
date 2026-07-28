import { useEffect, useEffectEvent, useRef, useState, type ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  onEnter?: () => void;
}

export function RevealSection({ children, className = '', id, onEnter }: RevealSectionProps) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reportEnter = useEffectEvent(() => onEnter?.());

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      reportEnter();
      observer.disconnect();
    }, { threshold: 0.16 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <section className={`reveal-section ${visible ? 'is-visible' : ''} ${className}`} id={id} ref={sectionRef}>{children}</section>;
}
