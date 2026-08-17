import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitBy?: 'chars' | 'words';
  animationType?: 'slideUp' | 'fadeIn' | 'blur' | 'slideLeft';
  once?: boolean;
  staggerChildren?: number;
}

const animations: Record<string, { hidden: Variants['hidden']; visible: Variants['visible'] }> = {
  slideUp: {
    hidden: { y: '105%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  slideLeft: {
    hidden: { x: -40, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.6,
  splitBy = 'words',
  animationType = 'slideUp',
  once = true,
  staggerChildren = 0.06,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-10% 0px' });

  const tokens = splitBy === 'chars' ? text.split('') : text.split(' ');
  const anim = animations[animationType];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren,
      },
    },
  };

  const childVariants: Variants = {
    hidden: anim.hidden,
    visible: {
      ...anim.visible,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: splitBy === 'words' ? '0.3em' : undefined }}
        >
          <motion.span
            className="inline-block"
            variants={childVariants}
          >
            {token === ' ' ? '\u00A0' : token}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default SplitText;
