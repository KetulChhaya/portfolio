'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/constants/animations';

const projects = [
  {
    id: 1,
    title: "TokenWise Tracker",
    category: "LLM Cost Tracking",
    description:
      "This package uses a JavaScript Proxy to non-intrusively wrap your OpenAI client. It intercepts calls to 'chat.completions.create', records the start and end times, calculates the cost based on the model and token usage, and logs the results (including any custom metadata) to the database. It's designed to have zero impact on your existing code's logic.",
    technologies: [
      "TypeScript",
      "Node.js",
      "SQLite",
      "OpenAI SDK",
      "Commander",
    ],
    link: "https://www.npmjs.com/package/tokenwise-tracker",
    github: "https://github.com/KetulChhaya/TokenWise",
    status: "NPM Package"
  },
  {
    id: 2,
    title: "Multi-Threaded Pollard's Factoring Algorithms",
    category: 'Cryptography & Parallel Computing',
    description:
      "Architected and implemented a high-throughput parallel computing framework in C++ and GMP to execute advanced integer factorization algorithms (Pollard's rho, p-1), successfully factoring RSA moduli up to 140 bits and demonstrating a practical capability to identify and exploit cryptographic weaknesses.",
    technologies: [
      'C++',
      'GMP',
      'Python',
      'Parallel Computing',
      'Integer Factorization',
    ],
    github: 'https://github.com/KetulChhaya/MT-Pollards-Factoring',
    status: 'Algorithms',
  },
  {
    id: 3,
    title: 'Fault Analysis for Wind Turbines',
    category: 'Machine Learning & Data Science',
    description:
      'Conducted data preprocessing and applied advanced machine learning techniques - Random Forest, One-Class SVM, and XGBoost - for classification and predictive analysis, focusing on detecting and diagnosing turbine faults.',
    technologies: [
      'Scikit-Learn',
      'Random Forest',
      'One-Class SVM',
      'XGBoost',
      'Data Preprocessing',
    ],
    link: 'https://drive.google.com/drive/folders/1szpuATeZ0wYAdVssqzZ00Q3pZiUvAdJQ',
    status: 'Machine Learning',
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
              Contributions
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
                        <Badge variant="outline" className="text-sm">
                          {project.status}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          {project.link && (
                            <motion.a
                              href={project.link}
                              target="_blank"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="hover:bg-muted/50 rounded-lg p-1.5 transition-colors"
                            >
                              <ExternalLink
                                size={16}
                                className="text-muted-foreground hover:text-foreground"
                              />
                            </motion.a>
                          )}
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="hover:bg-muted/50 rounded-lg p-1.5 transition-colors"
                            >
                              <Github
                                size={16}
                                className="text-muted-foreground hover:text-foreground"
                              />
                            </motion.a>
                          )}
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
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-muted text-muted-foreground border-border inline-flex items-center rounded-full border text-xs px-2 py-1 font-normal"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-muted-foreground/80 font-mono text-xs lg:text-sm mt-5">
                        {project.category}
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
