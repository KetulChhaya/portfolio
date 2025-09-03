'use client';

// import { motion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import { EducationDetails } from '@/components/sections/EducationDetails';
import { Footer } from '@/components/sections/Footer';

export default function EducationPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Sticky navigation */}
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      
      {/* Main content */}
      <main className="pt-20">
        <EducationDetails />
      </main>
      
      <Footer />
    </div>
  );
}
