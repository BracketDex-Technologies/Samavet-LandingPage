import { useEffect, useState, type CSSProperties } from 'react';

interface ProgressiveBlurProps {
  backgroundColor?: string;
  blurAmount?: string;
  className?: string;
  height?: string;
  hideAtPageEnd?: boolean;
  position?: 'top' | 'bottom';
}

export function ProgressiveBlur({
  backgroundColor = 'var(--ep-background)',
  blurAmount = '4px',
  className = '',
  height = '150px',
  hideAtPageEnd = false,
  position = 'top',
}: ProgressiveBlurProps) {
  const [isHidden, setIsHidden] = useState(false);
  const isTop = position === 'top';
  const edgeStyle = isTop ? { top: 0 } : { bottom: 0 };

  useEffect(() => {
    if (!hideAtPageEnd) return;

    const updateVisibility = () => {
      const pageEnd = document.documentElement.scrollHeight - window.innerHeight;
      setIsHidden(window.scrollY >= pageEnd - 12);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [hideAtPageEnd]);

  const style: CSSProperties = {
    ...edgeStyle,
    backdropFilter: `blur(${blurAmount})`,
    background: isTop
      ? `linear-gradient(to top, transparent, ${backgroundColor})`
      : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
    height,
    maskImage: isTop
      ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
      : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
    userSelect: 'none',
    WebkitBackdropFilter: `blur(${blurAmount})`,
    WebkitMaskImage: isTop
      ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
      : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
    WebkitUserSelect: 'none',
  };

  return <div aria-hidden="true" className={`progressive-blur progressive-blur--${position}${isHidden ? ' is-hidden' : ''}${className ? ` ${className}` : ''}`} style={style} />;
}
