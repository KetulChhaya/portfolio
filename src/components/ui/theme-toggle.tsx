'use client';

import { useEffect, useState } from 'react';
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

  const toggleTheme = () => {
    // Colour transitions are scoped rather than global (see globals.css), so
    // opt the whole tree into a one-off cross-fade for the length of the swap.
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 420);

    setTheme(isDark ? 'light' : 'dark');
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
