'use client';

import { motion } from 'framer-motion';
import { smoothFadeIn, smoothStagger } from '@/lib/constants/smooth-animations';

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-responsive">
        <motion.div
          variants={smoothStagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-6xl"
        >
          {/* Section Header */}
          <motion.div variants={smoothFadeIn} className="mb-12 lg:mb-16">
            <h2 className="text-responsive-xl mb-4 font-bold lg:mb-6">
              About Me
            </h2>
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {/* Main Description */}
          <motion.div variants={smoothFadeIn} className="mb-16 lg:mb-20">
            <h3 className="text-responsive-md text-foreground mb-6 leading-relaxed lg:mb-8">
              I specialize in building{' '}
              <span className="font-semibold">scalable</span>,{' '}
              <span className="font-semibold">high-performance</span>{' '}
              applications with a strong focus on usability,{' '}
              <span className="font-semibold">efficiency</span>, and seamless
              user experiences.
            </h3>
          </motion.div>

          {/* Subsections */}
          <div className="space-y-12 lg:space-y-16">
            {/* About Me */}
            <motion.div
              variants={smoothFadeIn}
              className="grid items-start gap-6 md:grid-cols-12 lg:gap-8"
            >
              <div className="md:col-span-3">
                <h4 className="text-muted-foreground/80 mb-2 font-mono text-sm tracking-wider">
                  About me
                </h4>
              </div>
              <div className="md:col-span-9">
                <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
                  With a{' '}
                  <span className="text-foreground font-medium">strong</span>{' '}
                  background in both frontend and backend development, I love
                  turning ideas into functional,{' '}
                  <span className="text-foreground font-medium">
                    user-friendly
                  </span>{' '}
                  solutions. Whether it&apos;s optimizing UI for seamless{' '}
                  <span className="text-foreground font-medium">
                    user experiences
                  </span>{' '}
                  or building{' '}
                  <span className="text-foreground font-medium">
                    robust backend
                  </span>{' '}
                  architectures, I&apos;m always eager to push the boundaries of
                  application development.
                </p>
              </div>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              variants={smoothFadeIn}
              className="grid items-start gap-6 md:grid-cols-12 lg:gap-8"
            >
              <div className="md:col-span-3">
                <h4 className="text-muted-foreground/80 mb-2 font-mono text-sm tracking-wider">
                  Philosophy
                </h4>
              </div>
              <div className="md:col-span-9">
                <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
                  Constantly learning and improving, I aim to create{' '}
                  <span className="text-foreground font-medium">impactful</span>{' '}
                  digital solutions that align with{' '}
                  <span className="text-foreground font-medium">
                    business goals
                  </span>{' '}
                  and enhance user experiences. I believe in writing clean,
                  maintainable code that scales with growth.
                </p>
              </div>
            </motion.div>

            {/* Current Focus */}
            <motion.div
              variants={smoothFadeIn}
              className="grid items-start gap-6 md:grid-cols-12 lg:gap-8"
            >
              <motion.div variants={smoothFadeIn} className="md:col-span-3">
                <h4 className="text-muted-foreground/80 mb-2 font-mono text-sm tracking-wider">
                  Currently
                </h4>
              </motion.div>
              <motion.div variants={smoothFadeIn} className="md:col-span-9">
                <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
                  Exploring modern frameworks and technologies, contributing to
                  open-source projects, and building innovative solutions that
                  make a difference. Always open to new challenges and
                  collaborative opportunities.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
