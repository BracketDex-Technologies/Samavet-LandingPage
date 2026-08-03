import { animate } from 'motion/react';
import { memo, useCallback, useEffect, useRef, type CSSProperties } from 'react';

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: 'default' | 'white';
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

type GlowStyle = CSSProperties & Record<`--${string}`, string | number>;

export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = 'default',
  glow = false,
  className = '',
  movementDuration = 2,
  borderWidth = 1,
  disabled = true,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(0);

  const handleMove = useCallback((event?: MouseEvent | { x: number; y: number }) => {
    if (!containerRef.current) return;

    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      const element = containerRef.current;
      if (!element) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = event?.x ?? lastPosition.current.x;
      const mouseY = event?.y ?? lastPosition.current.y;

      if (event) lastPosition.current = { x: mouseX, y: mouseY };

      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const inactiveRadius = Math.min(width, height) * inactiveZone * 0.5;

      if (Math.hypot(mouseX - centerX, mouseY - centerY) < inactiveRadius) {
        element.style.setProperty('--active', '0');
        return;
      }

      const isActive = mouseX > left - proximity
        && mouseX < left + width + proximity
        && mouseY > top - proximity
        && mouseY < top + height + proximity;

      element.style.setProperty('--active', isActive ? '1' : '0');
      if (!isActive) return;

      const currentAngle = Number.parseFloat(element.style.getPropertyValue('--start')) || 0;
      const targetAngle = Math.atan2(mouseY - centerY, mouseX - centerX) * 180 / Math.PI + 90;
      const angleDifference = ((targetAngle - currentAngle + 180) % 360) - 180;

      animate(currentAngle, currentAngle + angleDifference, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => element.style.setProperty('--start', String(value)),
      });
    });
  }, [inactiveZone, movementDuration, proximity]);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => handleMove();
    const handlePointerMove = (event: PointerEvent) => handleMove(event);

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }, [disabled, handleMove]);

  const gradient = variant === 'white'
    ? 'repeating-conic-gradient(from 236.84deg at 50% 50%, #fff, #fff 5%)'
    : 'radial-gradient(circle, #db9553 10%, transparent 20%), radial-gradient(circle at 40% 40%, #bc8710 5%, transparent 15%), radial-gradient(circle at 60% 60%, #3c6431 10%, transparent 20%), radial-gradient(circle at 40% 60%, #a84d29 10%, transparent 20%), repeating-conic-gradient(from 236.84deg at 50% 50%, #db9553 0%, #bc8710 5%, #3c6431 10%, #a84d29 15%, #db9553 20%)';
  const style: GlowStyle = {
    '--active': '0',
    '--blur': `${blur}px`,
    '--glow-border-width': `${borderWidth}px`,
    '--glow-gradient': gradient,
    '--spread': spread,
    '--start': '0',
  };

  return (
    <div
      aria-hidden="true"
      className={`glowing-effect-border${glow ? ' glowing-effect-border--glow' : ''}${className ? ` ${className}` : ''}`}
      ref={containerRef}
      style={style}
    >
      <div className="glowing-effect-border__glow" />
    </div>
  );
});
