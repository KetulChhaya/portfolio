import { Transition, Variants } from 'framer-motion';

/**
 * Motion system.
 *
 * Reveals use springs rather than fixed durations so elements settle instead of
 * stopping dead, and so an interrupted animation (fast scroll, rapid hover)
 * blends from its current velocity instead of restarting.
 *
 * `ease` values are cubic-beziers rather than keyword easings — keywords give
 * the same curve to a 60px slide and a 4px nudge, which is what made the old
 * timings read as mechanical.
 */

// Slow-out curve: quick departure, long gentle settle. Good for entrances.
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
// Symmetric curve for state changes that should feel reversible.
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

/** Reveal spring: no overshoot, generous settle. */
export const springReveal: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

/** Snappier spring for interactive feedback (hover, tap, toggles). */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 0.6,
};

/** Soft spring with a touch of overshoot, for playful accents. */
export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 18,
  mass: 0.8,
};

/** Shared viewport config so every section reveals at the same trigger point. */
export const revealViewport = { once: true, amount: 0.15, margin: '-80px' };

// Stagger container. Children inherit the reveal spring.
export const smoothStagger: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
      duration: 0.5,
      ease: easeOutExpo,
    },
  },
};

/** Tighter stagger for dense grids (tech chips, project cards). */
export const smoothStaggerFast: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
};

export const smoothFadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
};

export const smoothSlideUp: Variants = {
  initial: {
    opacity: 0,
    y: 28,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
};

export const smoothScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springReveal,
  },
};

export const smoothSlideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -28,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: springReveal,
  },
};

export const smoothSlideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 28,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: springReveal,
  },
};

export const smoothHover: Variants = {
  hover: {
    scale: 1.03,
    y: -3,
    transition: springSnappy,
  },
  tap: {
    scale: 0.97,
    transition: springSnappy,
  },
};

export const smoothCardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -6,
    scale: 1.01,
    transition: springSnappy,
  },
  tap: {
    y: -2,
    scale: 0.995,
    transition: springSnappy,
  },
};

export const smoothTextReveal: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
};

export const smoothPageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springReveal,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: easeInOutQuint },
  },
};

export const smoothLoading: Variants = {
  initial: {
    opacity: 0,
    scale: 0.94,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springReveal,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.2, ease: easeInOutQuint },
  },
};
