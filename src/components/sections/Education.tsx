'use client';

import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import { Calendar, MapPin, GraduationCap } from 'lucide-react';
import React from 'react';

const educationData = [
  {
    id: 1,
    degree: 'Master of Science',
    title: 'Computer Science',
    subtitle: 'University of Maryland, Baltimore County',
    location: 'Baltimore, MD',
    period: 'Aug 2024 - Present',
    ongoing: true,
    gpa: '4.0',
    technologies: [
      'Design and Analysis of Algorithms',
      'Machine Learning',
      'Cloud Computing',
      'Software Testing',
      'Data Visualization',
      'Advanced Computer Architecture',
    ],
  },
  {
    id: 2,
    degree: 'Bachelor of Technology',
    title: 'Information and Communication Technology',
    subtitle: 'Pandit Deendayal Energy University',
    location: 'Gandhinagar, GJ',
    period: 'Aug 2019 - Jan 2023',
    ongoing: false,
    gpa: '4.0',
    technologies: [
      'Data Structures',
      'Operating Systems',
      'Computer Networks',
      'Big Data',
      'Embedded Systems',
      'Artificial Intelligence',
    ],
  },
];

export function Education() {
  return (
    <section id="education" className="section-padding">
      <div className="container-responsive">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-6xl"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
            <h2 className="text-responsive-xl mb-4 font-bold lg:mb-6">
              Education
            </h2>
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {/* Education Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {educationData.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="relative"
              >
                <motion.div
                  className="bg-background/60 border-border/50 hover:bg-background/80 h-full rounded-xl border p-6 backdrop-blur-sm transition-all duration-200 lg:p-8"
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between lg:mb-6">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="bg-muted/50 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
                        <GraduationCap className="text-foreground h-5 w-5 lg:h-6 lg:w-6" />
                      </div>
                      <div>
                        <h5 className="text-muted-foreground mb-1 text-xs font-normal lg:text-sm">
                          {item.degree}
                        </h5>
                        <h3 className="text-foreground mb-1 text-lg font-semibold lg:text-xl">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm font-medium lg:text-base">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    {item.ongoing && (
                      <span className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold lg:px-3 lg:py-1.5 lg:text-sm">
                        Ongoing
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="text-muted-foreground mb-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-1 lg:gap-2">
                      <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span className="text-xs lg:text-sm">{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1 lg:gap-2">
                      <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                      <span className="text-xs lg:text-sm">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* GPA */}
                  <div className="mb-4 lg:mb-6">
                    <span className="bg-primary text-primary-foreground border-border inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold lg:px-3 lg:py-1.5 lg:text-sm">
                      GPA: {item.gpa} / 4.0
                    </span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 lg:gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-muted text-muted-foreground border-border inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium lg:px-3 lg:py-1.5 lg:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
