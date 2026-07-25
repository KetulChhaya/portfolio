'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { easeOutExpo } from '@/lib/constants/smooth-animations';

export function ThemeToggle() {
  // This used to add/remove the `dark` class on <html> by hand. next-themes
  // owns that class, so its in-memory state never learned about the switch —
  // which is why anything reading `useTheme()` (the three.js scenes) kept
  // rendering the previous theme's palette until a reload.
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  const applyTheme = (next: 'light' | 'dark') => {
    // next-themes writes the class from an effect, which the View Transition
    // callback must not wait for — flush it, then assert the class directly so
    // the "after" snapshot is guaranteed to be the new theme.
    flushSync(() => setTheme(next));
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
  };

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // One GPU-composited cross-fade instead of transitioning every element.
    // Not supported in Firefox yet — there the theme just switches instantly.
    if (!document.startViewTransition || prefersReducedMotion) {
      applyTheme(next);
      return;
    }

    document.startViewTransition(() => applyTheme(next));
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="text-muted-foreground hover:text-foreground relative h-9 w-9 p-0"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="absolute cursor-pointer"
      >
        <Sun size={18} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        className="absolute cursor-pointer"
      >
        <Moon size={16} />
      </motion.div>
    </Button>
  );
}
