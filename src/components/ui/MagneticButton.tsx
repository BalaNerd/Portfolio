import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  intensity?: number;
  as?: 'button' | 'a';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  style,
  onClick,
  href,
  target,
  rel,
  intensity = 0.35,
  as: Tag = 'button',
  type = 'button',
  disabled = false,
  id,
  'aria-label': ariaLabel,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - cx) * intensity,
      y: (e.clientY - cy) * intensity,
    });
  }, [intensity, disabled]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const motionProps = {
    ref: ref as React.RefObject<any>,
    className,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 350, damping: 20, mass: 0.5 },
    whileTap: { scale: 0.96 },
  };

  if (Tag === 'a') {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={target}
        rel={rel}
        id={id}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      type={type}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;
