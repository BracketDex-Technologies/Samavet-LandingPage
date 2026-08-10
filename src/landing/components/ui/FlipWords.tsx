import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

interface FlipWordsProps {
  className?: string;
  duration?: number;
  words: readonly string[];
}

export function FlipWords({ className = '', duration = 3000, words }: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(words[0] ?? '');
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0] || '';
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (words.length <= 1 || isAnimating) return;
    const timeout = window.setTimeout(startAnimation, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, isAnimating, startAnimation, words.length]);

  return (
    <span aria-live="polite" className={`flip-words ${className}`.trim()}>
      <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="flip-words__word"
          exit={{ opacity: 0, y: -40, filter: 'blur(8px)', scale: 2, position: 'absolute' }}
          initial={{ opacity: 0, y: 10 }}
          key={currentWord}
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          {currentWord.split(' ').map((word, wordIndex) => (
            <motion.span
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              className="inline-block whitespace-nowrap"
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              key={`${word}-${wordIndex}`}
              transition={{ delay: wordIndex * 0.3, duration: 0.3 }}
            >
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  className="inline-block"
                  initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                  key={`${word}-${letter}-${letterIndex}`}
                  transition={{ delay: wordIndex * 0.3 + letterIndex * 0.05, duration: 0.2 }}
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
