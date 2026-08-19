import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor — Ultra-sleek, minimal, high-precision cursor.
 *
 * Design & Physics:
 * - Crisp precision center dot with instant zero-latency tracking (lerp 0.92)
 * - Clean geometric follower halo (lerp 0.22) — no wobbly jelly stretching or cringy distortions
 * - Responsive tactile feedback on click (mousedown compression)
 * - Smooth contextual scaling on links, buttons, cards, and text inputs
 * - 120fps requestAnimationFrame with zero React re-renders during mouse movement
 * - Disabled gracefully on touch/coarse devices and respects reduced motion
 */

interface CursorState {
  // Positions
  dotX: number;
  dotY: number;
  ringX: number;
  ringY: number;
  targetX: number;
  targetY: number;

  // Scales & Opacities
  dotScale: number;
  dotTargetScale: number;
  ringScale: number;
  ringTargetScale: number;
  ringOpacity: number;
  ringTargetOpacity: number;

  // Interaction flags
  isMouseDown: boolean;
  isHoveringLink: boolean;
  isHoveringButton: boolean;
  isHoveringCard: boolean;
  isHoveringInput: boolean;
  isActive: boolean;
}

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({
    dotX: -100,
    dotY: -100,
    ringX: -100,
    ringY: -100,
    targetX: -100,
    targetY: -100,
    dotScale: 1,
    dotTargetScale: 1,
    ringScale: 1,
    ringTargetScale: 1,
    ringOpacity: 0,
    ringTargetOpacity: 0.7,
    isMouseDown: false,
    isHoveringLink: false,
    isHoveringButton: false,
    isHoveringCard: false,
    isHoveringInput: false,
    isActive: false,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch / coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.style.cursor = 'none';

    const state = stateRef.current;

    // Physics constants
    const LERP_DOT = reducedMotion ? 1 : 0.92;
    const LERP_RING = reducedMotion ? 1 : 0.22;
    const LERP_SCALE = reducedMotion ? 1 : 0.18;
    const LERP_OPACITY = reducedMotion ? 1 : 0.15;

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      if (!state.isActive) {
        state.isActive = true;
        state.dotX = e.clientX;
        state.dotY = e.clientY;
        state.ringX = e.clientX;
        state.ringY = e.clientY;
      }
    };

    const onMouseLeave = () => {
      state.isActive = false;
    };

    const onMouseEnter = () => {
      state.isActive = true;
    };

    const onMouseDown = () => {
      state.isMouseDown = true;
    };

    const onMouseUp = () => {
      state.isMouseDown = false;
    };

    // Cursor state detection
    const updateHoverState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;

      const isInput = !!target.closest('input, textarea, select, [contenteditable="true"]');
      const isButton = !!target.closest('button, [role="button"], .interactive-btn') && !isInput;
      const isLink = !!target.closest('a, [role="link"]') && !isButton && !isInput;
      const isCard = !!target.closest('.project-card, .compact-project-card, .bento-card') && !isButton && !isLink;

      state.isHoveringInput = isInput;
      state.isHoveringButton = isButton;
      state.isHoveringLink = isLink;
      state.isHoveringCard = isCard;
    };

    const onMouseOver = (e: MouseEvent) => updateHoverState(e.target);
    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget;
      if (!related || !(related instanceof Element)) {
        state.isHoveringInput = false;
        state.isHoveringLink = false;
        state.isHoveringButton = false;
        state.isHoveringCard = false;
      } else {
        updateHoverState(related);
      }
    };

    // Animation Loop
    let running = true;
    const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

    const animate = () => {
      if (!running) return;

      if (state.isActive) {
        // Fast, high-precision dot follow
        state.dotX = lerp(state.dotX, state.targetX, LERP_DOT);
        state.dotY = lerp(state.dotY, state.targetY, LERP_DOT);

        // Smooth follower halo
        state.ringX = lerp(state.ringX, state.targetX, LERP_RING);
        state.ringY = lerp(state.ringY, state.targetY, LERP_RING);

        // Target scale and opacity calculations
        if (state.isMouseDown) {
          state.dotTargetScale = 0.7;
          state.ringTargetScale = 0.8;
          state.ringTargetOpacity = 0.9;
        } else if (state.isHoveringButton) {
          state.dotTargetScale = 0.5;
          state.ringTargetScale = 1.6;
          state.ringTargetOpacity = 0.85;
        } else if (state.isHoveringLink) {
          state.dotTargetScale = 0.75;
          state.ringTargetScale = 1.4;
          state.ringTargetOpacity = 0.8;
        } else if (state.isHoveringCard) {
          state.dotTargetScale = 0.85;
          state.ringTargetScale = 1.7;
          state.ringTargetOpacity = 0.75;
        } else if (state.isHoveringInput) {
          state.dotTargetScale = 0.6;
          state.ringTargetScale = 0.6;
          state.ringTargetOpacity = 0.3;
        } else {
          state.dotTargetScale = 1;
          state.ringTargetScale = 1;
          state.ringTargetOpacity = 0.65;
        }
      } else {
        state.ringTargetOpacity = 0;
      }

      state.dotScale = lerp(state.dotScale, state.dotTargetScale, LERP_SCALE);
      state.ringScale = lerp(state.ringScale, state.ringTargetScale, LERP_SCALE);
      state.ringOpacity = lerp(state.ringOpacity, state.ringTargetOpacity, LERP_OPACITY);

      // Apply transforms
      const dotOpacity = state.isActive ? 1 : 0;
      dot.style.opacity = dotOpacity.toString();
      dot.style.transform = `translate3d(${state.dotX}px, ${state.dotY}px, 0) scale(${state.dotScale})`;

      ring.style.opacity = state.ringOpacity.toFixed(3);
      ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) scale(${state.ringScale.toFixed(3)})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Precision Dot — Ultra-clean point */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#4f46e5',
          boxShadow: '0 0 6px rgba(99, 102, 241, 0.4)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform, opacity',
          marginLeft: '-3px',
          marginTop: '-3px',
          transition: 'background-color 0.2s ease',
        }}
      />

      {/* Follower Halo Ring — Sleek, minimal glass ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: '1.25px solid rgba(99, 102, 241, 0.45)',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.01) 70%)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          willChange: 'transform, opacity',
          marginLeft: '-13px',
          marginTop: '-13px',
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;
