import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  revealSelector?: string;
}

export function RevealSection({ children, className = '', id, revealSelector = '.reveal-item' }: RevealSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll(revealSelector);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(items, { clearProps: 'all' });
      return;
    }
    const context = gsap.context(() => {
      gsap.fromTo(items, { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      });
    }, section);
    return () => context.revert();
  }, [revealSelector]);

  return <section className={className} id={id} ref={sectionRef}>{children}</section>;
}
