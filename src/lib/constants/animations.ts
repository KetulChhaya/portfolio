import { Variants } from 'framer-motion';

// Smooth easing functions for consistent animations
const smoothEase = 'easeOut' as const;
const gentleEase = 'easeInOut' as const;

// Stagger animation for multiple elements
export const stagger: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.01,
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

// Fade in up animation - minimal motion to prevent scrollbars
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

// Fade in animation
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: gentleEase,
    },
  },
};

// Slide up animation - minimal motion to prevent scrollbars
export const slideUp: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

// Scale animation
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: smoothEase,
    },
  },
};

// Hover animations - very subtle
export const hoverScale: Variants = {
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.12,
      ease: gentleEase,
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.08,
      ease: gentleEase,
    },
  },
};

// Card hover animation - minimal motion
export const cardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -1,
    scale: 1.002,
    transition: {
      duration: 0.12,
      ease: smoothEase,
    },
  },
};

// Text reveal animation - minimal motion
export const textReveal: Variants = {
  initial: {
    opacity: 0,
    y: 4,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
};

// Page transition animation - minimal motion
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 4,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.25,
      ease: gentleEase,
    },
  },
};
