'use client';

import { motion } from 'framer-motion';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';

const timelineData = [
  {
    id: 1,
    type: 'work',
    title: 'Software Engineer Intern',
    subtitle: 'BizChat',
    companyLink: 'https://bizchat-io.vercel.app',
    location: 'Baltimore, MD',
    period: 'May 2025 - Present',
    ongoing: true,
    description:
      'Built a scalable analytics logger, tracking user-AI chat events and navigation flow. Led authentication flows and dynamic survey workflows. Implemented cost monitoring system for AI API calls with real-time usage tracking.',
    icon: Briefcase,
    technologies: [
      'Analytics',
      'Authentication',
      'AI Integration',
      'Real-time Systems',
      'Data Structures',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Software Engineer',
    subtitle: 'Aavenir',
    companyLink: 'https://aavenir.com',
    location: 'Ahmedabad, GJ',
    period: 'Jan 2023 - Aug 2024',
    ongoing: false,
    description:
      'Architected C++ based metadata extractor processing 8,000+ contracts (30% faster than Python). Optimized workflows reducing approval time by 50%. Implemented real-time user review feature and ServiceNow API automation portal.',
    icon: Briefcase,
    technologies: [
      'C++',
      'Linux',
      'ServiceNow API',
      'Word Add-In',
      'Parallel Processing',
      'Automation',
    ],
  },
  {
    id: 3,
    type: 'work',
    title: 'Full Stack Developer',
    subtitle: 'ClosestCloset',
    companyLink: 'https://closestcloset.com',
    location: 'Chicago, IL (Remote)',
    period: 'Nov 2022 - Jun 2023',
    ongoing: false,
    description:
      'Built adaptive e-commerce frontend with React.js, increasing revenue by 30%. Implemented JWT authentication and unique hanger credit system. Integrated WebSocket messaging and advanced search filtering.',
    icon: Briefcase,
    technologies: [
      'React.js',
      'JWT',
      'WebSocket',
      'E-commerce',
      'SEO',
      'Performance Optimization',
    ],
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="section-padding">
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
              Work Experience
            </h2>
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="bg-border absolute top-0 bottom-0 left-4 w-0.5 transform md:left-1/2 md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-8 lg:space-y-12">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`border-background bg-foreground absolute left-4 z-10 flex h-6 w-6 transform items-center justify-center rounded-full border-4 md:left-1/2 md:-translate-x-1/2 lg:h-8 lg:w-8`}
                  >
                    <item.icon className="text-background h-3 w-3 lg:h-4 lg:w-4" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-5/12 lg:ml-16 ${
                      index % 2 === 0
                        ? 'md:mr-auto md:pr-6 lg:pr-8'
                        : 'md:ml-auto md:pl-6 lg:pl-8'
                    }`}
                  >
                    <motion.div
                      className="bg-background/60 border-border/50 hover:bg-background/80 rounded-xl border p-5 backdrop-blur-sm transition-all duration-200 lg:p-6"
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      {/* Header */}
                      <div className="mb-3 flex items-start justify-between lg:mb-4">
                        <div>
                          <h3 className="text-foreground mb-1 text-lg font-semibold lg:text-xl">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <a
                              href={item.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground group flex items-center gap-1 text-sm font-medium transition-colors duration-200 lg:text-base"
                            >
                              {item.subtitle}
                              <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                            </a>
                          </div>
                        </div>
                        {item.ongoing && (
                          <span className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold lg:px-3 lg:py-1.5 lg:text-sm">
                            Ongoing
                          </span>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="text-muted-foreground mb-3 flex flex-col gap-2 text-sm sm:flex-row sm:items-center lg:mb-4 lg:gap-4">
                        <div className="flex items-center gap-1 lg:gap-2">
                          <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span className="text-xs lg:text-sm">
                            {item.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-2">
                          <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span className="text-xs lg:text-sm">
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed lg:mb-6 lg:text-base">
                        {item.description}
                      </p>

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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
