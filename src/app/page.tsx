'use client';

import { Navigation } from '@/components/layout/Navigation';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { TechStack } from '@/components/sections/TechStack';
import { Timeline } from '@/components/sections/Timeline';
import { Contributions } from '@/components/sections/Contributions';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  // No artificial loading gate: the hero is server-rendered markup and an
  // image, so holding it behind a timer only delayed LCP. The three.js scene
  // loads lazily and fades in on top once it is ready.
  return (
    <div className="bg-background">
      <ScrollProgress />
      <div className="sticky top-0 z-50">
        <Navigation />
      </div>
      <main className="min-h-screen">
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Timeline />
        <Contributions />
        <Projects />
        {/* <ResearchCertifications /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
