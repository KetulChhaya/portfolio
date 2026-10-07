'use client';

import { useEffect, useState, type RefObject } from 'react';

export interface IdlePointer {
  /** Pointer position relative to the container's top-left corner. */
  x: number;
  y: number;
  /** Element under the pointer when it went idle. */
  target: Element | null;
}

/**
 * Reports where the pointer rests once it has been still for `delay` ms inside
 * `ref`. Returns null while the pointer is moving, outside the container, on
 * touch devices, or when the user prefers reduced motion.
 */
export function useIdlePointer<T extends HTMLElement>(
  ref: RefObject<T | null>,
  delay = 3000
): IdlePointer | null {
  const [idle, setIdle] = useState<IdlePointer | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
      return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
      clearTimeout(timer);
      setIdle((current) => (current ? null : current));
    };

    const onMove = (e: PointerEvent) => {
      reset();
      timer = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setIdle({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          target: document.elementFromPoint(e.clientX, e.clientY),
        });
      }, delay);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', reset);
    window.addEventListener('scroll', reset, { passive: true });
    return () => {
      clearTimeout(timer);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', reset);
    };
  }, [ref, delay]);

  return idle;
}
