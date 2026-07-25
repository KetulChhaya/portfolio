'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { springSnappy, easeOutExpo } from '@/lib/constants/smooth-animations';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#stack' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Contributions', href: '#contributions' },
  { label: 'Projects', href: '#projects' },
  // { label: 'Research', href: '#research-certifications' },
  { label: 'Contact', href: '#contact' },
];

const COLOR_THEMES = ['default', 'mint', 'currant', 'ube', 'pistachio', 'almond'] as const;
type ColorTheme = typeof COLOR_THEMES[number];

const THEME_SWATCHES: Record<ColorTheme, { light: string; label: string }> = {
  default:     { light: 'oklch(0.12 0.008 85)',    label: 'Default'     },
  mint:        { light: 'oklch(0.7 0.16 186.47)',  label: 'Mint'        },
  currant:     { light: 'oklch(0.76 0.13 258.76)', label: 'Currant'     },
  ube:         { light: 'oklch(0.79 0.12 293.71)', label: 'Ube'         },
  pistachio:   { light: 'oklch(0.78 0.13 138.5)',    label: 'Pistachio'   },
  almond:      { light: 'oklch(0.74 0.09 78.3)',    label: 'Almond'      },
};

function useColorTheme() {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');

  useEffect(() => {
    const saved = (localStorage.getItem('color-theme') as ColorTheme) || 'default';
    setColorThemeState(saved);
    if (saved !== 'default') {
      document.documentElement.setAttribute('data-color-theme', saved);
    }
  }, []);

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('color-theme', theme);
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-color-theme');
    } else {
      document.documentElement.setAttribute('data-color-theme', theme);
    }
  };

  return { colorTheme, setColorTheme };
}

const NAV_OFFSET = 96; // floating header height + breathing room

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // False on sub-pages (/education, /web-resume), where the nav anchors point
  // at sections that only exist on the landing page.
  const [hasSections, setHasSections] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const { colorTheme, setColorTheme } = useColorTheme();

  useEffect(() => {
    let ticking = false;
    // All layout reads are cached here and refreshed on resize, so the scroll
    // handler itself never touches the layout (no per-frame reflow).
    let heroBottom = 0;
    let offsets: { id: string; top: number }[] = [];

    const measure = () => {
      const heroSection = document.getElementById('home');
      heroBottom = heroSection
        ? heroSection.offsetTop + heroSection.offsetHeight
        : 0;

      offsets = navItems
        .map((item) => {
          const el = document.querySelector<HTMLElement>(item.href);
          return el ? { id: item.href.replace('#', ''), top: el.offsetTop } : null;
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      setHasSections(offsets.length > 0);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 50);
        setHeroScrolled(heroBottom > 0 && scrollY > heroBottom - 100);

        if (offsets.length) {
          // The current section is the last one whose top has crossed the nav.
          // An IntersectionObserver ranked by intersectionRatio was wrong here:
          // ratio is relative to each section's own height, so a short section
          // fully inside the band always outranks a tall one that fills it.
          const line = scrollY + NAV_OFFSET + 1;
          let current = offsets[0].id;
          for (const section of offsets) {
            if (section.top <= line) current = section.id;
            else break;
          }

          // Anything within a viewport of the bottom means the last section is
          // as visible as it will ever get — highlight it rather than leaving
          // the pill stuck on the second-to-last item.
          const atBottom =
            window.innerHeight + scrollY >=
            document.documentElement.scrollHeight - 2;
          if (atBottom) current = offsets[offsets.length - 1].id;

          setActiveSection(current);
        }

        ticking = false;
      });
    };

    measure();
    handleScroll();

    // Sections grow as async content (GitHub repos, LeetCode stats) lands, so
    // the cached offsets have to be refreshed when the document height moves.
    const resizeObserver = new ResizeObserver(() => {
      measure();
      handleScroll();
    });
    resizeObserver.observe(document.body);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    setIsMobileMenuOpen(false);

    // On a sub-page the target section doesn't exist — send the visitor to the
    // landing page anchor instead of silently doing nothing.
    if (!element) {
      window.location.href = `/${href}`;
      return;
    }

    const offsetPosition =
      element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    // replaceState rather than router.push: pushing a hash makes Next jump the
    // scroll position instantly, which cancels the smooth scroll below.
    window.history.replaceState(null, '', href);
    setActiveSection(href.replace('#', ''));

    window.scrollTo({
      top: offsetPosition,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, []);

  // Close the theme picker on outside click / Escape.
  useEffect(() => {
    if (!showThemePicker) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowThemePicker(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-theme-picker]')) {
        setShowThemePicker(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [showThemePicker]);

  // Lock body scroll while the mobile menu is open so the page behind it
  // doesn't scroll under the overlay.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-6 sm:px-6 lg:px-8"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.1 }}
      >
        <motion.nav
          className={`relative rounded-2xl will-change-[background-color,border-color,backdrop-filter] ${
            scrolled
              ? 'nav-glass border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-white/5'
              : 'bg-transparent border-transparent'
          }`}
          style={
            scrolled
              ? ({
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                } as React.CSSProperties)
              : {
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                }
          }
          animate={{
            backgroundColor: scrolled 
              ? undefined // Let CSS handle it via nav-glass class
              : 'transparent',
          }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        >
          <motion.div 
            className="flex items-center justify-between"
            animate={{
              paddingTop: scrolled ? '5px' : '12px',
              paddingBottom: scrolled ? '5px' : '12px',
              paddingLeft: scrolled ? '10px' : '16px',
              paddingRight: scrolled ? '10px' : '16px',
            }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            {/* Logo */}
            <motion.button
              className="text-xl font-semibold tracking-tight transition-opacity duration-200 hover:opacity-80"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-transparent">
                K2L
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-4 lg:flex lg:gap-6">
              <div className="flex items-center gap-1 lg:gap-2">
                {navItems.map((item) => {
                  const isActive =
                    hasSections && activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-foreground'
                          : 'text-foreground/70 dark:text-foreground/80 hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={springSnappy}
                    >
                      {/* Shared layoutId lets the pill glide between items
                          instead of cross-fading in place. */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-lg bg-black/[0.06] dark:bg-white/10"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Social Icons Container - Fixed width to prevent layout shift */}
              <motion.div 
                className="flex items-center gap-2 overflow-hidden"
                animate={{
                  width: heroScrolled ? 110 : 0,
                  opacity: heroScrolled ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ x: 50 }}
                  animate={{ x: heroScrolled ? 0 : 50 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                >
                  <div className="h-6 w-px bg-border/50 mx-2" />
                  <motion.a
                    href="https://github.com/KetulChhaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 dark:text-foreground/80 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/20 dark:hover:bg-white/10"
                  >
                    <Github size={16} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/ketul-chhaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 dark:text-foreground/80 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/20 dark:hover:bg-white/10"
                  >
                    <Linkedin size={16} />
                  </motion.a>
                  <div className="h-6 w-px bg-border/50 mx-2" />
                </motion.div>
              </motion.div>
              
              {/* Color theme picker */}
              <div className="relative" data-theme-picker>
                <motion.button
                  onClick={() => setShowThemePicker(p => !p)}
                  className="h-9 w-9 flex items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/20 dark:hover:bg-white/10"
                  title="Color theme"
                  aria-expanded={showThemePicker}
                  aria-haspopup="menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springSnappy}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-border/50 transition-all duration-200"
                    style={{ background: THEME_SWATCHES[colorTheme].light }}
                  />
                </motion.button>
                <AnimatePresence>
                  {showThemePicker && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: easeOutExpo }}
                      className="absolute right-0 top-11 z-50 rounded-xl border border-white/20 dark:border-white/10 shadow-xl p-2 flex flex-col gap-1 min-w-[120px]"
                      style={{
                        transformOrigin: 'top right',
                        background: 'var(--background)',
                        backdropFilter: 'blur(16px)',
                      }}
                    >
                      {COLOR_THEMES.map(t => (
                        <button
                          key={t}
                          onClick={() => { setColorTheme(t); setShowThemePicker(false); }}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-150 hover:bg-white/10 dark:hover:bg-white/10 w-full text-left"
                          style={{ color: 'var(--foreground)', fontWeight: t === colorTheme ? 600 : 400 }}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-border/60 shrink-0"
                            style={{ background: THEME_SWATCHES[t].light, opacity: t === 'default' ? 0.5 : 1 }}
                          />
                          {THEME_SWATCHES[t].label}
                          {t === colorTheme && <span className="ml-auto text-xs opacity-60">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground/70 dark:text-foreground/80 hover:text-foreground relative h-9 w-9 flex items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/20 dark:hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.nav>
      </motion.header>



      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Scrim: gives the menu a clear surface to sit on and makes
                tap-outside-to-close discoverable. */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/45 backdrop-blur-[3px] lg:hidden"
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-28 left-1/2 -translate-x-1/2 z-40 w-full max-w-7xl px-6 sm:px-6 lg:px-8 lg:hidden"
            >
              <motion.div
                className="bg-white/85 dark:bg-neutral-900/85 border border-black/5 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 dark:shadow-black/40 overflow-hidden"
                style={
                  {
                    transformOrigin: 'top center',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  } as React.CSSProperties
                }
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              >
                <div className="p-2">
                  <div className="space-y-1">
                    {navItems.map((item, index) => {
                      const isActive =
                        hasSections &&
                        activeSection === item.href.replace('#', '');
                      return (
                        <motion.button
                          key={item.label}
                          onClick={() => handleNavClick(item.href)}
                          aria-current={isActive ? 'true' : undefined}
                          className={`w-full cursor-pointer rounded-xl p-3.5 text-left transition-colors duration-200 ${
                            isActive
                              ? 'text-foreground bg-white/40 dark:bg-white/15'
                              : 'text-foreground/80 dark:text-foreground/90 hover:bg-white/30 dark:hover:bg-white/15 hover:text-foreground focus:bg-white/30 dark:focus:bg-white/15 focus:text-foreground'
                          }`}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.035,
                            type: 'spring',
                            stiffness: 400,
                            damping: 32,
                          }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="block text-sm font-medium">
                            {item.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
