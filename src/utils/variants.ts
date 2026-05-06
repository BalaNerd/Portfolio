import { Variants } from 'framer-motion';

// High-refresh-rate optimized fluid easing curve
const smoothEase = [0.22, 1, 0.36, 1] as const;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

export const slideInVariants: Variants = {
  hidden: { x: -25, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};
