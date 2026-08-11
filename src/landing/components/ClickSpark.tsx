import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from 'react';

interface Spark {
  angle: number;
  color: string;
  startTime: number;
  x: number;
  y: number;
}

interface ClickSparkProps {
  children: ReactNode;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-in-out' | 'ease-out';
  extraScale?: number;
  sparkColor?: string;
  sparkCount?: number;
  sparkRadius?: number;
  sparkSize?: number;
}

function resolveSparkColor(fallback: string) {
  const page = document.querySelector<HTMLElement>('.epawati-page');
  const color = page ? getComputedStyle(page).getPropertyValue('--ep-click-spark').trim() : '';
  return color || fallback;
}

export function ClickSpark({
  children,
  duration = 300,
  easing = 'ease-out',
  extraScale = 1,
  sparkColor = '#95462c',
  sparkCount = 8,
  sparkRadius = 18,
  sparkSize = 6,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);
    return () => mediaQuery.removeEventListener('change', updateReducedMotion);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const nextWidth = Math.round(window.innerWidth * window.devicePixelRatio);
      const nextHeight = Math.round(window.innerHeight * window.devicePixelRatio);
      if (canvas.width === nextWidth && canvas.height === nextHeight) return;
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const easeFunc = useCallback((progress: number) => {
    switch (easing) {
      case 'linear':
        return progress;
      case 'ease-in':
        return progress * progress;
      case 'ease-in-out':
        return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      default:
        return progress * (2 - progress);
    }
  }, [easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let animationId = 0;
    const draw = (timestamp: number) => {
      const scale = window.devicePixelRatio || 1;
      context.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const eased = easeFunc(elapsed / duration);
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = (spark.x + distance * Math.cos(spark.angle)) * scale;
        const y1 = (spark.y + distance * Math.sin(spark.angle)) * scale;
        const x2 = (spark.x + (distance + lineLength) * Math.cos(spark.angle)) * scale;
        const y2 = (spark.y + (distance + lineLength) * Math.sin(spark.angle)) * scale;

        context.strokeStyle = spark.color;
        context.lineWidth = 2 * scale;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [duration, easeFunc, extraScale, sparkRadius, sparkSize]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (reducedMotionRef.current) return;

    const now = performance.now();
    const color = resolveSparkColor(sparkColor);
    const newSparks = Array.from({ length: sparkCount }, (_, index) => ({
      angle: (2 * Math.PI * index) / sparkCount,
      color,
      startTime: now,
      x: event.clientX,
      y: event.clientY,
    }));

    sparksRef.current.push(...newSparks);
  }

  return (
    <div className="click-spark" onClick={handleClick}>
      <canvas aria-hidden="true" className="click-spark__canvas" ref={canvasRef} />
      {children}
    </div>
  );
}
