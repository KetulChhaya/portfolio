/**
 * Legacy animation names.
 *
 * This file used to hold a second, slightly-different copy of the motion
 * system, which is why the resume page felt snappier than the landing page.
 * It is now a thin alias layer over `smooth-animations` so there is one source
 * of truth; the old export names are kept so callers don't have to change.
 */
export {
  smoothStagger as stagger,
  smoothStaggerFast as staggerFast,
  smoothFadeIn as fadeInUp,
  smoothScale as scaleIn,
  smoothSlideUp as slideUp,
  smoothHover as hoverScale,
  smoothCardHover as cardHover,
  smoothTextReveal as textReveal,
  smoothPageTransition as pageTransition,
  revealViewport,
  springReveal,
  springSnappy,
  springBouncy,
  easeOutExpo,
  easeInOutQuint,
} from './smooth-animations';

import { Variants } from 'framer-motion';
import { easeOutExpo } from './smooth-animations';

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.35, ease: easeOutExpo },
  },
};
