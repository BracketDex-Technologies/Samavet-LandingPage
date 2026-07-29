import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

const LOADER_KEY = 'samavet:landing-loader-complete';
const WORDS = ['SAMAVET', 'समवेत', 'नमस्ते'] as const;
const LOADER_DURATION_MS = 3450;

function hasCompletedLoader() {
  try {
    return window.sessionStorage.getItem(LOADER_KEY) === 'true';
  } catch {
    return false;
  }
}

function markLoaderComplete() {
  try {
    window.sessionStorage.setItem(LOADER_KEY, 'true');
  } catch {
    // Storage can be unavailable in private or restrictive browser contexts.
  }
}

export function SiteLoader() {
  const reduceMotion = useReducedMotion() === true;
  const started = useRef(false);
  const rawId = useId();
  const filterId = `site-loader-goo-${rawId.replaceAll(':', '')}`;
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (started.current) return;
    started.current = true;

    if (hasCompletedLoader()) {
      setVisible(false);
      return;
    }

    markLoaderComplete();
    const revealTimer = window.setTimeout(() => setVisible(false), LOADER_DURATION_MS);
    return () => window.clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Loading Samavet"
          className={`site-loader${reduceMotion ? ' site-loader--reduced-motion' : ''}`}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="status"
          transition={{ duration: reduceMotion ? 0.16 : 0.28, ease: 'easeOut' }}
        >
          <svg aria-hidden="true" className="site-loader__filter" focusable="false">
            <defs>
              <filter id={filterId}>
                <feColorMatrix
                  in="SourceGraphic"
                  result="goo"
                  type="matrix"
                  values="1 0 0 0 0
                          0 1 0 0 0
                          0 0 1 0 0
                          0 0 0 25 -9"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>

          <span aria-live="polite" className="site-loader__morph" style={{ filter: `url(#${filterId})` }}>
            {WORDS.map((word, index) => (
              <span
                className={`site-loader__word site-loader__word--${index}`}
                key={word}
                style={{ '--word-delay': `${(index * 0.95).toFixed(2)}s` } as CSSProperties}
              >
                {word}
              </span>
            ))}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
