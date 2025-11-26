'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useRouter } from 'next/navigation';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 50);
          
          // Check if hero section is scrolled past
          const heroSection = document.getElementById('home');
          if (heroSection) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            setHeroScrolled(scrollY > heroBottom - 100);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      // Update URL with section name
      const sectionName = href.replace('#', '');
      const newUrl = `#${sectionName}`;
      router.push(newUrl, { scroll: true });

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-6 sm:px-6 lg:px-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="flex items-center justify-between"
            animate={{
              paddingTop: scrolled ? '5px' : '12px',
              paddingBottom: scrolled ? '5px' : '12px',
              paddingLeft: scrolled ? '10px' : '16px',
              paddingRight: scrolled ? '10px' : '16px',
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-foreground/70 dark:text-foreground/80 hover:text-foreground relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/20 dark:hover:bg-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              
              {/* Social Icons Container - Fixed width to prevent layout shift */}
              <motion.div 
                className="flex items-center gap-2 overflow-hidden"
                animate={{
                  width: heroScrolled ? 110 : 0,
                  opacity: heroScrolled ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ x: 50 }}
                  animate={{ x: heroScrolled ? 0 : 50 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-40 w-full max-w-7xl px-6 sm:px-6 lg:px-8 lg:hidden"
          >
            <motion.div
              className="bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-xl shadow-black/10 dark:shadow-white/5 overflow-hidden"
              style={{
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              } as React.CSSProperties}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-2">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className="text-foreground/80 dark:text-foreground/90 hover:bg-white/30 dark:hover:bg-white/15 hover:text-foreground focus:bg-white/30 dark:focus:bg-white/15 focus:text-foreground w-full cursor-pointer rounded-xl p-3.5 text-left transition-all duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="block text-sm font-medium">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
