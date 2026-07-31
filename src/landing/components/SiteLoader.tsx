import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import samavetVideo from '../assets/samavet.mp4';

const LOADER_KEY = 'samavet:landing-loader-complete';
const LOGO_HOLD_MS = 900;

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    if (started.current) return;
    started.current = true;

    if (hasCompletedLoader()) {
      setVisible(false);
      return;
    }

    markLoaderComplete();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 2;
    video.play().catch(() => {});
  }, [visible, reduceMotion]);

  useEffect(() => {
    if (!reduceMotion || !visible) return;
    const timer = window.setTimeout(() => setVisible(false), 500);
    return () => window.clearTimeout(timer);
  }, [reduceMotion, visible]);

  function handleVideoEnded() {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setTimeout(() => setVisible(false), LOGO_HOLD_MS);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Loading Samavet"
          className="site-loader"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          role="status"
          transition={{ duration: reduceMotion ? 0.16 : 0.45, ease: 'easeOut' }}
        >
          <video
            ref={videoRef}
            className="site-loader__video"
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            src={samavetVideo}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
