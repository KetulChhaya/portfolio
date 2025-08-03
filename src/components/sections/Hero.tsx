'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GlassmorphismCard } from '@/components/ui/glassmorphism-card';
import { ThreeScene } from '@/components/ui/three-scene';
import { MusicPlayerWithLRC } from '@/components/ui/mini-music-player';
import {
  smoothFadeIn,
  smoothStagger,
  smoothSlideUp,
} from '@/lib/constants/smooth-animations';

// Animated title component
function AnimatedTitle() {
  const titles = [
    'Software Engineer',
    'Problem Solver',
    'Code Craftsman',
    'Innovation Seeker',
    'Gadgets Geek',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="flex h-10 items-center justify-center sm:h-12 md:h-14 lg:h-16 lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="text-muted-foreground text-lg font-medium sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        >
          {titles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Scene */}
      <div className="absolute top-0 right-0 h-full w-full">
        <ThreeScene />
      </div>

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
              className="space-y-4 lg:space-y-6"
            >
              <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-foreground mb-2 block lg:mb-3">
                  Ketul K. Chhaya
                </span>
                <AnimatedTitle />
              </h1>
            </motion.div>

            <motion.p
              variants={smoothFadeIn}
              className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl lg:mx-0"
            >
              Hey there! I&apos;m a passionate{' '}
              <span className="text-foreground font-semibold">
                Software Engineer
              </span>{' '}
              with <br className="hidden sm:block" />{' '}
              <span className="text-foreground font-semibold">2+ years</span> of
              professional experience turning ideas into reality, crafting{' '}
              <span className="text-foreground font-semibold">
                digital experiences
              </span>{' '}
              that matter.
            </motion.p>

            <motion.div
              variants={smoothFadeIn}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <motion.a
                href={
                  process.env.NEXT_PUBLIC_RESUME_URL ||
                  'https://drive.google.com/file/d/11ShXTCzDhkrfcFCH5YLznlLnBcAh7fG2/view?usp=sharing'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-sm px-6 py-3 text-center text-sm font-medium transition-colors sm:px-8 sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="border-border text-foreground hover:bg-muted/50 rounded-sm border px-6 py-3 text-center text-sm font-medium transition-colors sm:px-8 sm:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Mini Music Player */}
            <motion.div variants={smoothFadeIn} className="mt-2 lg:mt-4">
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
            </motion.div>
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
    </section>
  );
}
