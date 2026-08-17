import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

export interface WordConfig {
  text: string;
  className?: string;
  gradient?: boolean;
}

export interface VariableProximityProps {
  label?: string;
  wordsConfig?: WordConfig[];
  className?: string;
  containerClassName?: string;
  radius?: number;
  maxShiftX?: number;
  maxShiftY?: number;
  maxScale?: number;
  maxRotate?: number;
  lerpSpeed?: number;
  staggerDelay?: number;
  initialDelay?: number;
  ariaLabel?: string;
  gradient?: boolean;
}

interface LetterState {
  currentX: number;
  currentY: number;
  currentScale: number;
  currentRotate: number;
  targetX: number;
  targetY: number;
  targetScale: number;
  targetRotate: number;
  rect: DOMRect | null;
}

/**
 * VariableProximity — Cursor-reactive kinetic typography.
 * Uses 120fps requestAnimationFrame loop + direct DOM transforms
 * for physics-based spring response with ZERO React re-renders during mouse moves.
 */
export const VariableProximity: React.FC<VariableProximityProps> = ({
  label,
  wordsConfig,
  className = '',
  containerClassName = '',
  radius = 220,
  maxShiftX = 13,
  maxShiftY = 16,
  maxScale = 0.13,
  maxRotate = 3.5,
  lerpSpeed = 0.14,
  staggerDelay = 0.035,
  initialDelay = 0.15,
  ariaLabel,
  gradient = false,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statesRef = useRef<LetterState[]>([]);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const rafIdRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-5% 0px' });

  // Resolve list of words with their styling
  const resolvedWords: WordConfig[] = useMemo(() => {
    if (wordsConfig && wordsConfig.length > 0) {
      return wordsConfig;
    }
    if (label) {
      return label.split(' ').map((w) => ({
        text: w,
        className,
        gradient,
      }));
    }
    return [];
  }, [wordsConfig, label, className, gradient]);

  // Full accessible text
  const fullText = useMemo(() => {
    return ariaLabel || resolvedWords.map((w) => w.text).join(' ');
  }, [ariaLabel, resolvedWords]);

  // Flattened characters for indexing
  const characters = useMemo(() => {
    const chars: { char: string; wordIndex: number; charIndex: number; wordConfig: WordConfig }[] = [];
    resolvedWords.forEach((wordConf, wIdx) => {
      wordConf.text.split('').forEach((c, cIdx) => {
        chars.push({ char: c, wordIndex: wIdx, charIndex: cIdx, wordConfig: wordConf });
      });
    });
    return chars;
  }, [resolvedWords]);

  // Initialize physics states for each character
  useEffect(() => {
    statesRef.current = characters.map(() => ({
      currentX: 0,
      currentY: 0,
      currentScale: 1,
      currentRotate: 0,
      targetX: 0,
      targetY: 0,
      targetScale: 1,
      targetRotate: 0,
      rect: null,
    }));
  }, [characters]);

  // Update cached bounding rects
  const updateRects = useCallback(() => {
    letterRefs.current.forEach((el, index) => {
      if (el && statesRef.current[index]) {
        statesRef.current[index].rect = el.getBoundingClientRect();
      }
    });
  }, []);

  useEffect(() => {
    updateRects();
    window.addEventListener('resize', updateRects, { passive: true });
    window.addEventListener('scroll', updateRects, { passive: true });
    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects);
    };
  }, [updateRects]);

  // Mouse / Touch event handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosRef.current.x = e.clientX;
    mousePosRef.current.y = e.clientY;
    mousePosRef.current.active = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      mousePosRef.current.x = e.touches[0].clientX;
      mousePosRef.current.y = e.touches[0].clientY;
      mousePosRef.current.active = true;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current.active = false;
  }, []);

  // Main animation loop
  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;

      const { x: mouseX, y: mouseY, active } = mousePosRef.current;
      const states = statesRef.current;
      const refs = letterRefs.current;

      for (let i = 0; i < states.length; i++) {
        const state = states[i];
        const el = refs[i];
        if (!el) continue;

        let rect = state.rect;
        if (!rect) {
          rect = el.getBoundingClientRect();
          state.rect = rect;
        }

        if (active && rect) {
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dx = mouseX - charCenterX;
          const dy = mouseY - charCenterY;
          const distance = Math.hypot(dx, dy);

          if (distance < radius) {
            // Proximity intensity curve (smooth dropoff)
            const factor = Math.max(0, 1 - distance / radius);
            const intensity = Math.pow(factor, 1.3);

            // Gravitational subtle repulsion & upward dynamic float
            const angle = Math.atan2(dy, dx);
            state.targetX = -Math.cos(angle) * maxShiftX * intensity;
            state.targetY = -Math.sin(angle) * maxShiftY * intensity - intensity * 4;
            state.targetScale = 1 + maxScale * intensity;
            state.targetRotate = (dx > 0 ? -1 : 1) * maxRotate * intensity;
          } else {
            state.targetX = 0;
            state.targetY = 0;
            state.targetScale = 1;
            state.targetRotate = 0;
          }
        } else {
          state.targetX = 0;
          state.targetY = 0;
          state.targetScale = 1;
          state.targetRotate = 0;
        }

        // Spring / Lerp integration
        state.currentX += (state.targetX - state.currentX) * lerpSpeed;
        state.currentY += (state.targetY - state.currentY) * lerpSpeed;
        state.currentScale += (state.targetScale - state.currentScale) * lerpSpeed;
        state.currentRotate += (state.targetRotate - state.currentRotate) * lerpSpeed;

        // Apply hardware-accelerated 3D transform
        el.style.transform = `translate3d(${state.currentX.toFixed(2)}px, ${state.currentY.toFixed(2)}px, 0) scale(${state.currentScale.toFixed(3)}) rotate(${state.currentRotate.toFixed(2)}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, [handleMouseMove, handleTouchMove, handleMouseLeave, radius, maxShiftX, maxShiftY, maxScale, maxRotate, lerpSpeed]);

  let globalCharIndex = 0;

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap select-none ${containerClassName}`}
      aria-label={fullText}
    >
      {resolvedWords.map((wordConf, wordIdx) => {
        const wordChars = wordConf.text.split('');
        const isWordGradient = wordConf.gradient ?? gradient;
        const wordClass = wordConf.className || className;

        return (
          <span
            key={`word-${wordIdx}`}
            className="inline-flex flex-nowrap mr-[0.24em] last:mr-0"
          >
            {wordChars.map((char) => {
              const currIdx = globalCharIndex++;
              const charDelay = initialDelay + currIdx * staggerDelay;

              return (
                <span
                  key={`char-${currIdx}`}
                  className="inline-block relative overflow-visible"
                >
                  <motion.span
                    ref={(el) => {
                      letterRefs.current[currIdx] = el;
                    }}
                    className={`inline-block will-change-transform ${isWordGradient ? 'gradient-text' : ''} ${wordClass}`}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: charDelay,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{
                      transformOrigin: '50% 80%',
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export default VariableProximity;
