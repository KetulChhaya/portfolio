import { Variants } from 'framer-motion';

// Optimized easing functions for smooth, professional animations
const smoothEase = 'easeOut' as const;
const gentleEase = 'easeInOut' as const;

// Stagger animation for multiple elements with smooth timing
export const smoothStagger: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

// Smooth fade in animation - reduced motion
export const smoothFadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
};

// Smooth slide up animation - reduced motion
export const smoothSlideUp: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
};

// Smooth scale animation
export const smoothScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: smoothEase,
    },
  },
};

// Smooth slide in from left - reduced motion
export const smoothSlideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -15,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
};

// Smooth slide in from right - reduced motion
export const smoothSlideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 15,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
};

// Smooth hover animations - reduced motion
export const smoothHover: Variants = {
  hover: {
    scale: 1.01,
    y: -1,
    transition: {
      duration: 0.1,
      ease: gentleEase,
    },
  },
  tap: {
    scale: 0.99,
    transition: {
      duration: 0.05,
      ease: gentleEase,
    },
  },
};

// Smooth card hover animation - reduced motion
export const smoothCardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -1,
    scale: 1.003,
    transition: {
      duration: 0.1,
      ease: smoothEase,
    },
  },
};

// Smooth text reveal animation - reduced motion
export const smoothTextReveal: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
};

// Smooth page transition - reduced motion
export const smoothPageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
      ease: gentleEase,
    },
  },
};

// Smooth loading animation
export const smoothLoading: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.15,
      ease: gentleEase,
    },
  },
};
