'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/constants/animations';

const projects = [
  {
    id: 1,
    title: "Multi-Threaded Pollard's Factoring Algorithms",
    category: 'Cryptography & Parallel Computing',
    description:
      "Architected and implemented a high-throughput parallel computing framework in C++ and GMP to execute advanced integer factorization algorithms (Pollard's rho, p-1), successfully factoring RSA moduli up to 140 bits and demonstrating a practical capability to identify and exploit cryptographic weaknesses.",
    technologies: [
      'C++',
      'GMP',
      'Python',
      'Parallel Computing',
      'Cryptography',
      'RSA',
      'Integer Factorization',
    ],
    link: 'https://github.com/KetulChhaya',
    github: 'https://github.com/KetulChhaya',
    status: 'Featured Project',
  },
  {
    id: 2,
    title: 'Fault Analysis for Wind Turbines',
    category: 'Machine Learning & Data Science',
    description:
      'Conducted data preprocessing and applied advanced machine learning techniques - Random Forest, One-Class SVM, and XGBoost - for classification and predictive analysis, focusing on detecting and diagnosing turbine faults.',
    technologies: [
      'Scikit-Learn',
      'Machine Learning',
      'Python',
      'Random Forest',
      'One-Class SVM',
      'XGBoost',
      'Data Preprocessing',
    ],
    link: '#',
    github: '#',
    status: 'ML Project',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    category: 'Web Development',
    description:
      'Modern, responsive portfolio website showcasing creative work with smooth animations and optimized performance. Built with Next.js, TypeScript, and Tailwind CSS.',
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React',
    ],
    link: '#',
    github: '#',
    status: 'Personal Project',
  },
];

export function Projects() {
  return (
    <section id="projects" className="section-padding">
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
              Projects
            </h2>
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={stagger}
            className="grid-responsive-3 gap-6 lg:gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Card className="bg-background/60 hover:bg-background/80 border-border/50 hover:border-border group h-full border p-6 transition-all duration-300 lg:p-8">
                  <div className="flex h-full flex-col">
                    {/* Project Header */}
                    <div className="mb-4 lg:mb-6">
                      <div className="mb-3 flex items-center justify-between lg:mb-4">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <div className="flex items-center space-x-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <motion.a
                            href={project.link}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hover:bg-muted/50 rounded-lg p-1.5 transition-colors"
                          >
                            <ExternalLink
                              size={16}
                              className="text-muted-foreground hover:text-foreground"
                            />
                          </motion.a>
                          <motion.a
                            href={project.github}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hover:bg-muted/50 rounded-lg p-1.5 transition-colors"
                          >
                            <Github
                              size={16}
                              className="text-muted-foreground hover:text-foreground"
                            />
                          </motion.a>
                        </div>
                      </div>
                      <h3 className="group-hover:text-foreground mb-2 text-lg font-semibold transition-colors lg:mb-3 lg:text-xl">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed lg:mb-6 lg:text-base">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mt-auto">
                      <div className="mb-3 flex flex-wrap gap-1.5 lg:mb-4 lg:gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-muted text-muted-foreground border-border inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium lg:px-3 lg:py-1.5 lg:text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-muted-foreground/80 font-mono text-xs lg:text-sm">
                        {project.status}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
