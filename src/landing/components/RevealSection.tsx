import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useEffectEvent, useRef, useState, type ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  onEnter?: () => void;
}

export function RevealSection({ children, className = '', id, onEnter }: RevealSectionProps) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
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

  return (
    <motion.section
      animate={reduceMotion || visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      className={`reveal-section ${visible ? 'is-visible' : ''} ${className}`}
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      ref={sectionRef}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.72, ease: [0.2, 0.75, 0.28, 1] }}
    >
      {children}
    </motion.section>
  );
}
