import React, { useEffect, useRef } from 'react';

/**
 * BlueprintCanvas — Architectural Dot-Grid Background
 * Subtle 24px grid that softly illuminates within 260px around pointer.
 */
const BlueprintCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isVisible = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const updatePosition = () => {
      if (containerRef.current) {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;

        containerRef.current.style.setProperty('--cursor-x', `${currentX}px`);
        containerRef.current.style.setProperty('--cursor-y', `${currentY}px`);
        containerRef.current.style.opacity = isVisible ? '1' : '0.4';
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 overflow-hidden"
      style={{
        // 24px architectural dot-grid pattern
        backgroundImage: `radial-gradient(circle, rgba(15, 23, 42, 0.11) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        // 260px soft radial illumination mask around cursor
        WebkitMaskImage: `radial-gradient(260px circle at var(--cursor-x, -999px) var(--cursor-y, -999px), rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.35) 60%, transparent 100%)`,
        maskImage: `radial-gradient(260px circle at var(--cursor-x, -999px) var(--cursor-y, -999px), rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.35) 60%, transparent 100%)`,
      }}
      aria-hidden="true"
    />
  );
};

export default BlueprintCanvas;
