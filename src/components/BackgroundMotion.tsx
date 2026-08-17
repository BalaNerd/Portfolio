import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

/**
 * BackgroundMotion — Light Aurora atmosphere
 * Multi-layer atmospheric blends with cursor-following subtle depth and scroll parallax.
 * GPU-friendly, buttery 60-120fps with zero layout thrashing.
 */
const BackgroundMotion: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Scroll parallax depth for layers
  const layer1ScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const layer2ScrollY = useTransform(scrollYProgress, [0, 1], ['0%',  '10%']);
  const layer3ScrollX = useTransform(scrollYProgress, [0, 1], ['0%',   '6%']);

  // Cursor-driven subtle atmospheric parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Different spring dampings for spatial depth
  const spring1X = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const spring1Y = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const spring2X = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const spring2Y = useSpring(mouseY, { stiffness: 30, damping: 30 });

  const spring3X = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const spring3Y = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Coordinated layer offset transforms
  const layer1CursorX = useTransform(spring1X, [-0.5, 0.5], [-20, 20]);
  const layer1CursorY = useTransform(spring1Y, [-0.5, 0.5], [-20, 20]);

  const layer2CursorX = useTransform(spring2X, [-0.5, 0.5], [25, -25]);
  const layer2CursorY = useTransform(spring2Y, [-0.5, 0.5], [25, -25]);

  const layer3CursorX = useTransform(spring3X, [-0.5, 0.5], [-12, 12]);
  const layer3CursorY = useTransform(spring3Y, [-0.5, 0.5], [-12, 12]);

  // Subtle cursor light field
  const cursorLightRef = useRef<HTMLDivElement>(null);

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
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);

      targetX = e.clientX;
      targetY = e.clientY;
      isVisible = true;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const updateCursorLight = () => {
      if (cursorLightRef.current) {
        // Smooth lerp for cursor atmospheric illumination
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        cursorLightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        cursorLightRef.current.style.opacity = isVisible ? '1' : '0';
      }
      rafId = requestAnimationFrame(updateCursorLight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updateCursorLight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="aurora-bg" aria-hidden="true">
      {/* Dynamic soft cursor atmospheric field */}
      <div
        ref={cursorLightRef}
        className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none transition-opacity duration-500 will-change-transform z-0"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.14) 0%, rgba(99, 102, 241, 0.06) 40%, transparent 70%)',
          filter: 'blur(45px)',
          opacity: 0,
        }}
      />

      {/* Layer 1 — soft lavender & pale indigo (top-left) */}
      <motion.div
        className="aurora-layer aurora-layer-1"
        style={{
          y: layer1ScrollY,
          x: layer1CursorX,
          translateY: layer1CursorY,
        }}
      />

      {/* Layer 2 — pale violet & soft blue (bottom-right) */}
      <motion.div
        className="aurora-layer aurora-layer-2"
        style={{
          y: layer2ScrollY,
          x: layer2CursorX,
          translateY: layer2CursorY,
        }}
      />

      {/* Layer 3 — soft cyan (mid-left) */}
      <motion.div
        className="aurora-layer aurora-layer-3"
        style={{
          x: layer3ScrollX,
          translateX: layer3CursorX,
          translateY: layer3CursorY,
        }}
      />

      {/* Layer 4 — subtle coral / peach warmth */}
      <div className="aurora-layer aurora-layer-4" />

      {/* Atmospheric noise grain texture */}
      <div className="aurora-noise" />
    </div>
  );
};

export default BackgroundMotion;
