'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
// import { MusicPlayerWithLRC } from '@/components/ui/mini-music-player';
import { Github, Linkedin, Code2 } from 'lucide-react';
import Link from 'next/link';
import {
  smoothFadeIn,
  smoothStagger,
  smoothSlideUp,
  springSnappy,
  easeOutExpo,
} from '@/lib/constants/smooth-animations';

// three.js is ~150kB of the bundle and is pure decoration — keep it out of the
// critical path so the hero text and photo paint first, then fade the canvas in.
const ThreeScene = dynamic(
  () => import('@/components/ui/three-scene').then((m) => m.ThreeScene),
  { ssr: false }
);
const ThreeBackground = dynamic(
  () => import('@/components/ui/three-background').then((m) => m.ThreeBackground),
  { ssr: false }
);

const TITLES = [
  'Software Engineer',
  'Problem Solver',
  'Code Craftsman',
  'Innovation Seeker',
  'Gadgets Geek',
];

// Animated title component
function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="flex h-10 items-center justify-center sm:h-12 md:h-14 lg:h-16 lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.42, ease: easeOutExpo }}
          className="text-muted-foreground text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          {TITLES[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/** Small nudge telling first-time visitors the page continues below. */
function ScrollCue() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label="Scroll to the About section"
      onClick={() =>
        document
          .getElementById('about')
          ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
      }
      className="text-muted-foreground/70 hover:text-foreground absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 transition-colors lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: easeOutExpo }}
    >
      <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
      <span className="border-border/70 relative h-8 w-5 rounded-full border">
        <motion.span
          className="bg-muted-foreground absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          initial={{ top: 6, opacity: 1 }}
          animate={
            reduceMotion
              ? { top: 6, opacity: 1 }
              : { top: [6, 18, 6], opacity: [1, 0.2, 1] }
          }
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
    </motion.button>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Scene. Both canvases fade in once their chunk lands, so a
          slow network shows no pop-in. */}
      {/* Desktop/Tablet: Full Three.js scene */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-full sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: easeOutExpo }}
      >
        <ThreeScene />
      </motion.div>
      {/* Mobile: Lightweight particle/grid background */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 h-full w-full sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: easeOutExpo }}
      >
        <ThreeBackground />
      </motion.div>

      <div className="container-responsive relative z-10">
        <motion.div
          variants={smoothStagger}
          initial="initial"
          animate="animate"
          className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16"
        >
          {/* Left side - Content */}
          <motion.div
            variants={smoothSlideUp}
            className="order-2 space-y-6 px-2 text-center sm:px-0 lg:order-1 lg:space-y-8 lg:text-left"
          >
            <motion.div
              variants={smoothFadeIn}
              className="space-y-4 lg:space-y-4 mb-2"
            >
              <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-foreground mb-2 block lg:mb-3">
                  Ketul K. Chhaya
                </span>
                <AnimatedTitle />
              </h1>
            </motion.div>

            <motion.div
              variants={smoothFadeIn}
              className="flex items-center justify-between lg:justify-start mb-2"
            >
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl">
                <span className="text-foreground font-semibold">
                  M.S. in Computer Science
                </span>{' '}
                @{' '}
                <span className="text-foreground font-semibold">
                  <Link href="https://umbc.edu" target="_blank" rel="noopener noreferrer" className='underline'>UMBC</Link>
                </span>
              </p>
              <Image
                src="/images/umbc-mascot.png"
                alt="UMBC Mascot"
                width={30}
                height={30}
                className="ml-2 h-10 w-10"
              />
            </motion.div>

            <motion.p
              variants={smoothFadeIn}
              className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl lg:mx-0"
            >
              An engineer who thinks in products, builds systems, and loves solving real problems at scale
            </motion.p>

            <motion.div
              variants={smoothFadeIn}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <motion.a
                  href="/web-resume"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-sm px-6 py-3 text-center text-sm font-medium transition-colors sm:px-8 sm:text-base"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  Resume
                </motion.a>

                <div className="flex items-center justify-center gap-3">
                <motion.a
                  href="https://github.com/KetulChhaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-12 w-12 items-center justify-center rounded-sm border transition-colors"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/ketul-chhaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-12 w-12 items-center justify-center rounded-sm border transition-colors"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://leetcode.com/u/chhayaketul13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-12 w-12 items-center justify-center rounded-sm border transition-colors"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springSnappy}
                >
                  <Code2 size={20} />
                </motion.a>
               
              </div>
              </div>


            </motion.div>

            {/* Mini Music Player */}
            {/* <motion.div variants={smoothFadeIn} className="mt-2 lg:mt-4">
              <MusicPlayerWithLRC
                audioUrl="/audio/all-around-the-world.mp3"
                lrcUrl="/audio/all-around-the-world"
                songTitle="All Around the World (La La La)"
                artist="R3HAB & A Touch of Class"
                fallbackLyrics={[
                  "The kisses of the sun were sweet, I didn't blink",
                  'Just la la la la la, it goes around the world',
                  "It's all around the world just",
                  'The sound of night is gone, still it goes on and on',
                  'La la la la la, la la la la la la la',
                ]}
                className="mx-auto w-full max-w-md lg:mx-0"
              />
            </motion.div> */}
          </motion.div>

          {/* Right side - Image with Glassmorphism */}
          <motion.div
            variants={smoothSlideUp}
            className="order-1 flex justify-center lg:order-2"
          >
            <GlassmorphismCard
              className="w-full max-w-[280px] p-1 sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[440px]"
              intensity="medium"
            >
              <div className="relative w-full">
                {/* Profile image - Fully responsive */}
                <div className="from-muted/20 to-muted/40 border-border/50 relative z-10 mx-auto h-[280px] w-full overflow-hidden rounded-2xl border bg-gradient-to-br shadow-2xl sm:h-[320px] md:h-[360px] lg:h-[400px] xl:h-[440px]">
                  <Image
                    src="/images/photo.jpeg"
                    alt="Ketul Chhaya"
                    width={440}
                    height={440}
                    className="h-full w-full object-cover"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, (max-width: 1280px) 400px, 440px"
                  />
                </div>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}
