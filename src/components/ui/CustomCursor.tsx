import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor — Buttery smooth, physically convincing cursor system.
 *
 * Architecture:
 * - Two DOM elements: dot (near-instant) + ring (spring-delayed)
 * - Velocity tracking for dynamic ring stretch
 * - Zero React state updates on mousemove — pure requestAnimationFrame at 120fps
 * - Cursor variants: default → link → button → card
 * - Disabled on touch/coarse devices
 * - Respects prefers-reduced-motion
 *
 * Physics model:
 *   Dot   — lerp 0.85 (very fast, near instant, slight smoothing)
 *   Ring  — lerp 0.10 (soft spring follow, physically convincing delay)
 *   Scale — lerp 0.14 (smooth size transitions)
 */

interface CursorState {
  // Current positions
  dotX: number;
  dotY: number;
  ringX: number;
  ringY: number;
  // Target (raw mouse)
  targetX: number;
  targetY: number;
  // Scale states
  dotScale: number;
  ringScale: number;
  dotTargetScale: number;
  ringTargetScale: number;
  // Velocity (for ring stretch)
  vx: number;
  vy: number;
  prevTargetX: number;
  prevTargetY: number;
  // Hover state
  isHoveringLink: boolean;
  isHoveringButton: boolean;
  isHoveringCard: boolean;
  // Visibility
  isActive: boolean;
}

const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({
    dotX: -300, dotY: -300,
    ringX: -300, ringY: -300,
    targetX: -300, targetY: -300,
    dotScale: 1, ringScale: 1,
    dotTargetScale: 1, ringTargetScale: 1,
    vx: 0, vy: 0,
    prevTargetX: -300, prevTargetY: -300,
    isHoveringLink: false,
    isHoveringButton: false,
    isHoveringCard: false,
    isActive: false,
  });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // ── Touch / coarse pointer → disabled ──────────────────────────
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity  = '1';
    ring.style.opacity = '1';
    document.documentElement.style.cursor = 'none';

    const state = stateRef.current;

    // ── Physics constants ────────────────────────────────────────────
    // Reduced-motion: no spring lag
    const LERP_DOT   = reducedMotion ? 1    : 0.85;
    const LERP_RING  = reducedMotion ? 1    : 0.10;
    const LERP_SCALE = reducedMotion ? 1    : 0.14;
    const LERP_VEL   = reducedMotion ? 0    : 0.18;  // velocity smoothing

    // ── Mouse tracking ────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      state.targetX = e.clientX;
      state.targetY = e.clientY;
      state.isActive = true;
    };

    const onMouseLeave = () => {
      state.isActive = false;
    };

    // ── Cursor state detection ─────────────────────────────────────
    const updateHoverState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;
      const isButton = !!target.closest('button, [role="button"], input, textarea, select');
      const isLink   = !!target.closest('a, [role="link"]') && !isButton;
      const isCard   = !!target.closest('.project-card, .compact-project-card, .bento-card');

      state.isHoveringButton = isButton;
      state.isHoveringLink   = isLink && !isCard;
      state.isHoveringCard   = isCard;
    };

    const onMouseOver = (e: MouseEvent) => updateHoverState(e.target);
    const onMouseOut  = (e: MouseEvent) => {
      // Only clear if leaving to an element that doesn't match
      const related = e.relatedTarget;
      if (!related || !(related instanceof Element)) {
        state.isHoveringLink   = false;
        state.isHoveringButton = false;
        state.isHoveringCard   = false;
      } else {
        updateHoverState(related);
      }
    };

    // ── Main animation loop at ~120fps ────────────────────────────
    let running = true;

    const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

    const animate = () => {
      if (!running) return;

      if (state.isActive) {
        // Track velocity (smoothed)
        const rawVx = state.targetX - state.prevTargetX;
        const rawVy = state.targetY - state.prevTargetY;
        state.vx = lerp(state.vx, rawVx, LERP_VEL);
        state.vy = lerp(state.vy, rawVy, LERP_VEL);
        state.prevTargetX = state.targetX;
        state.prevTargetY = state.targetY;

        // Dot — fast near-instant follow
        state.dotX = lerp(state.dotX, state.targetX, LERP_DOT);
        state.dotY = lerp(state.dotY, state.targetY, LERP_DOT);

        // Ring — physically delayed spring follow
        state.ringX = lerp(state.ringX, state.targetX, LERP_RING);
        state.ringY = lerp(state.ringY, state.targetY, LERP_RING);
      } else {
        // Cursor left window: both return to -300
        state.dotX  = lerp(state.dotX,  -300, 0.08);
        state.dotY  = lerp(state.dotY,  -300, 0.08);
        state.ringX = lerp(state.ringX, -300, 0.05);
        state.ringY = lerp(state.ringY, -300, 0.05);
        state.vx = lerp(state.vx, 0, 0.12);
        state.vy = lerp(state.vy, 0, 0.12);
      }

      // ── Resolve target scales from hover state ─────────────────
      if (state.isHoveringButton) {
        state.dotTargetScale  = 0.5;
        state.ringTargetScale = 1.55;
      } else if (state.isHoveringLink) {
        state.dotTargetScale  = 1.15;
        state.ringTargetScale = 1.38;
      } else if (state.isHoveringCard) {
        state.dotTargetScale  = 0.75;
        state.ringTargetScale = 1.65;
      } else {
        state.dotTargetScale  = 1;
        state.ringTargetScale = 1;
      }

      state.dotScale  = lerp(state.dotScale,  state.dotTargetScale,  LERP_SCALE);
      state.ringScale = lerp(state.ringScale, state.ringTargetScale, LERP_SCALE * 0.75);

      // ── Velocity-driven ring stretch (subtle squash & stretch) ──
      const speed = Math.hypot(state.vx, state.vy);
      // Subtle elongation in direction of motion
      const stretchAmount = Math.min(speed * 0.022, 0.28);
      const angle = speed > 0.5 ? Math.atan2(state.vy, state.vx) : 0;

      // ── Apply transforms ──────────────────────────────────────
      dot.style.transform = `translate3d(${state.dotX.toFixed(2)}px, ${state.dotY.toFixed(2)}px, 0) scale(${state.dotScale.toFixed(3)})`;

      // Ring: position + scale + velocity stretch
      const scaleX = (state.ringScale + stretchAmount).toFixed(3);
      const scaleY = (state.ringScale - stretchAmount * 0.4).toFixed(3);
      ring.style.transform = `translate3d(${state.ringX.toFixed(2)}px, ${state.ringY.toFixed(2)}px, 0) rotate(${(angle * 180 / Math.PI).toFixed(1)}deg) scale(${scaleX}, ${scaleY})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.style.cursor = '';
      if (dot)  dot.style.opacity  = '0';
      if (ring) ring.style.opacity = '0';
    };
  }, []);

  return (
    <>
      {/* Dot — precise point, near-instant */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: '#3730a3',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          willChange: 'transform',
          transform: 'translate3d(-300px, -300px, 0)',
          marginLeft: '-2.5px',
          marginTop: '-2.5px',
        }}
      />

      {/* Ring — spring-delayed, velocity-stretched */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1px solid rgba(79, 70, 229, 0.38)',
          background: 'rgba(99, 102, 241, 0.03)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          willChange: 'transform',
          transform: 'translate3d(-300px, -300px, 0)',
          marginLeft: '-15px',
          marginTop: '-15px',
        }}
      />
    </>
  );
};

export default CustomCursor;
