'use client';

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Thin reading-progress bar pinned to the top of the viewport.
 *
 * Driven by `useScroll` -> `useSpring`, so it lags the scroll position very
 * slightly and settles smoothly rather than snapping frame to frame.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="bg-foreground/70 pointer-events-none fixed top-0 left-0 z-[60] h-[2px] w-full origin-left"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
