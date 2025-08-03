'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useRouter } from 'next/navigation';
import { Menu, X, Navigation as NavigationIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#stack' },
  { label: 'Experience', href: '#timeline' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
    setIsHovered(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 border-border/20 border-b backdrop-blur-xl'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container-responsive py-4">
          <div className="flex items-center justify-between">
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
            <div className="hidden items-center gap-8 lg:flex">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground relative p-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  className="absolute cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <NavigationIcon className="cursor-pointer" size={18} />
                </motion.div>
              </Button>

              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground relative h-9 w-9 p-0"
              >
                <motion.div
                  className="absolute"
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
                        <X size={18} />
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
                </motion.div>
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Desktop Full-width dropdown menu */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-18 right-0 left-0 z-40 hidden lg:block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="container-responsive">
              <div className="bg-background/90 border-border/20 rounded-2xl border shadow-xl backdrop-blur-xl">
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        onClick={() => handleNavClick(item.href)}
                        className="hover:bg-muted/30 hover:text-foreground focus:bg-muted/30 focus:text-foreground hover:border-border/20 cursor-pointer rounded-xl border border-transparent p-4 text-center transition-all duration-200"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <span className="block text-sm font-medium">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-0 left-0 z-40 lg:hidden"
          >
            <div className="container-responsive">
              <div className="bg-background/95 border-border/20 rounded-2xl border shadow-xl backdrop-blur-xl">
                <div className="p-4">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.label}
                        onClick={() => handleNavClick(item.href)}
                        className="hover:bg-muted/30 hover:text-foreground focus:bg-muted/30 focus:text-foreground w-full cursor-pointer rounded-xl p-4 text-left transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ x: 8 }}
                      >
                        <span className="block text-base font-medium">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
