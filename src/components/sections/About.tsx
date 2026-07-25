'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { smoothFadeIn, smoothStagger, revealViewport } from '@/lib/constants/smooth-animations';
import { Consistency } from './Consistency';
import { PROFILES } from '@/lib/constants/profiles';

export function About() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <section id="about" className="section-padding">
      <div className="container-responsive">
        <motion.div
          variants={smoothStagger}
          initial="initial"
          whileInView="animate"
          viewport={revealViewport}
          className="mx-auto max-w-6xl"
        >
          {/* Section Header with Toggle */}
          <motion.div variants={smoothFadeIn} className="mb-12 lg:mb-16">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-responsive-xl font-bold">
                About Me
              </h2>
              
              <div className="flex items-center">
                <div className="grid w-auto grid-cols-2 bg-muted p-1 h-9 rounded-full border border-border/50">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
                      activeTab === 'about' 
                        ? 'bg-background text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Info
                  </button>
                  <button
                    onClick={() => setActiveTab('consistency')}
                    className={`px-4 py-1 text-sm font-medium rounded-full transition-all duration-300 ${
                      activeTab === 'consistency' 
                        ? 'bg-background text-foreground shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Stats
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {/* Tab Content */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {/* Main Description */}
              <div className="mb-16 lg:mb-20">
                <h3 className="text-responsive-md text-foreground mb-6 leading-relaxed lg:mb-8">
                    I focus on building thoughtful, user-first software with clean architecture and performance in mind.
                </h3>
              </div>

              {/* Subsections */}
              <div className="space-y-12 lg:space-y-16">
                {/* About Me */}
                <div
                 
                  className="grid items-start gap-6 md:grid-cols-12 lg:gap-8"
                >
                  <div className="md:col-span-3">
                    <h4 className="text-muted-foreground/80 mb-2 font-mono text-sm tracking-wider">
                      About me
                    </h4>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
                    I enjoy building across the stack and turning rough ideas into clean, usable products. I care about how things work behind the scenes and how they feel in the hands of real users, and I’m constantly working on improving both.
                    </p>
                  </div>
                </div>

                {/* Philosophy */}
                <div
                 
                  className="grid items-start gap-6 md:grid-cols-12 lg:gap-8"
                >
                  <div className="md:col-span-3">
                    <h4 className="text-muted-foreground/80 mb-2 font-mono text-sm tracking-wider">
                      Philosophy
                    </h4>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
                    I think good software is built the same way good products are: with clarity, intention, and long-term thinking. I care about clean systems, predictable behavior, and writing code that another engineer can trust and build on without fighting it :)
                    </p>
                  </div>
                </div>

                {/* Current Focus */}
                <div
                 
                  className="grid items-start gap-6 md:grid-cols-12 lg:gap-8"
                >
                  <div className="md:col-span-3">
                    <h4 className="text-muted-foreground/80 mb-2 font-mono text-sm tracking-wider">
                      Currently
                    </h4>
                  </div>
                  <div className="md:col-span-9">
                    <p className="text-muted-foreground text-base leading-relaxed lg:text-lg">
                    Building and refining full-stack projects while experimenting with AI-driven tools. Learning how real-world systems evolve through usage, traffic, and constraints. Always open to meaningful problems and working with thoughtful, curious builders.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'consistency' && (
            <motion.div
              key="consistency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <Consistency 
                leetcodeUsername={PROFILES.leetcode}
                githubUsername={PROFILES.github}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
