'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { EducationDetails } from '@/components/sections/EducationDetails';
import { Footer } from '@/components/sections/Footer';
import { smoothPageTransition } from '@/lib/constants/smooth-animations';

export default function EducationPage() {
  return (
    <div className="bg-background min-h-screen">
      <ScrollProgress />

      {/* Sticky navigation */}
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>

      {/* Main content */}
      <motion.main
        className="pt-20"
        variants={smoothPageTransition}
        initial="initial"
        animate="animate"
      >
        <EducationDetails />
      </motion.main>

      <Footer />
    </div>
  );
}
