'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { CURIOSITY_PATHS } from './curiosity-paths';
import { easeOutExpo } from '@/lib/constants/smooth-animations';

interface CuriosityMarkProps {
  /** Centre of the mark, in the coordinates of its positioned parent. */
  at: { x: number; y: number } | null;
  /** Side length in px. */
  size?: number;
}

const MIN_HUE_JUMP = 90;
let lastHue = Math.random() * 360;

/** Random hue at least MIN_HUE_JUMP degrees from the previous one. */
function nextHue() {
  const jump = MIN_HUE_JUMP + Math.random() * (360 - 2 * MIN_HUE_JUMP);
  lastHue = (lastHue + jump) % 360;
  return Math.round(lastHue);
}

const SPIRAL_SECONDS = 0.9;
const RING_SECONDS = 0.9;

/**
 * A hand-drawn spiral in a random colour that scribbles itself in, then gets
 * circled by a loose ring. Fades out when `at` goes back to null.
 */
export function CuriosityMark({ at, size = 72 }: CuriosityMarkProps) {
  // Picked once per appearance so each one draws a different line in a new colour.
  const { variant, hue } = useMemo(
    () => ({
      variant:
        CURIOSITY_PATHS[Math.floor(Math.random() * CURIOSITY_PATHS.length)],
      hue: nextHue(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [at !== null]
  );

  return (
    <AnimatePresence>
      {at && (
        <motion.svg
          aria-hidden
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="pointer-events-none absolute z-20 overflow-visible"
          style={{
            left: at.x - size / 2,
            top: at.y - size / 2,
            color: `oklch(var(--curiosity-lightness) 0.19 ${hue})`,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <motion.path
            d={variant.spiral}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: SPIRAL_SECONDS, ease: 'easeInOut' }}
          />
          <motion.path
            d={variant.ring}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: RING_SECONDS,
              delay: SPIRAL_SECONDS,
              ease: easeOutExpo,
            }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}
