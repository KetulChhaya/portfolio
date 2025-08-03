'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { TechStack } from '@/components/sections/TechStack';
import { Timeline } from '@/components/sections/Timeline';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Much faster loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Reduced from 800ms to 300ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-background fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                className="from-foreground to-muted-foreground mb-4 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              >
                K2L
              </motion.div>
              <motion.div
                className="border-muted-foreground/30 border-t-foreground mx-auto h-6 w-6 rounded-full border-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <Navigation />
            <main>
              <Hero />
              <About />
              <Education />
              <TechStack />
              <Timeline />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
