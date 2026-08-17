import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  hover?: boolean;
  glowColor?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  hover = true,
  glowColor = 'rgba(99, 102, 241, 0.12)',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hover) return;
    const rect = ref.current.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [hover]);

  return (
    <motion.div
      ref={ref}
      className={`bento-card relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : {}}
    >
      {/* Cursor glow effect */}
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(240px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      {children}
    </motion.div>
  );
};

export default BentoCard;
