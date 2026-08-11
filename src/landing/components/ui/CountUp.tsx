import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  className?: string;
  delay?: number;
  direction?: 'up' | 'down';
  duration?: number;
  from?: number;
  locale?: string;
  onEnd?: () => void;
  onStart?: () => void;
  separator?: string;
  startWhen?: boolean;
  to: number;
}

function getDecimalPlaces(value: number) {
  const [, decimals = ''] = value.toString().split('.');
  return Number.parseInt(decimals, 10) ? decimals.length : 0;
}

export default function CountUp({
  className = '',
  delay = 0,
  direction = 'up',
  duration = 2,
  from = 0,
  locale = 'en-US',
  onEnd,
  onStart,
  separator = '',
  startWhen = true,
  to,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { margin: '0px', once: true });
  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback((latest: number) => {
    const hasDecimals = maxDecimals > 0;
    const formattedNumber = Intl.NumberFormat(locale, {
      maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      minimumFractionDigits: hasDecimals ? maxDecimals : 0,
      useGrouping: Boolean(separator),
    }).format(latest);

    return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
  }, [locale, maxDecimals, separator]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.textContent = formatValue(direction === 'down' ? to : from);
  }, [direction, formatValue, from, to]);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    onStart?.();
    const timeoutId = window.setTimeout(() => {
      motionValue.set(direction === 'down' ? from : to);
    }, delay * 1000);
    const durationTimeoutId = window.setTimeout(() => onEnd?.(), delay * 1000 + duration * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(durationTimeoutId);
    };
  }, [delay, direction, duration, from, isInView, motionValue, onEnd, onStart, startWhen, to]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (!ref.current) return;
      ref.current.textContent = formatValue(latest);
    });

    return () => unsubscribe();
  }, [formatValue, springValue]);

  return <span className={className} ref={ref} />;
}
