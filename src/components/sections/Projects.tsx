'use client';

import { useEffect, useState } from 'react';
import { revealViewport } from '@/lib/constants/smooth-animations';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ExternalLink, FileText, Github } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/constants/animations';

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  medium?: string;
  status: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'CiteSight – GEO Agent',
    category: 'AI / LLM Engineering',
    description:
      'Building a LangGraph and Temporal pipeline that crawls sites into pgvector, probes Claude/GPT/Gemini in parallel on buyer intent questions, and scores brand visibility via cosine similarity gaps with sourced fixes.',
    technologies: ['FastAPI', 'React', 'LangGraph', 'Postgres', 'Docker'],
    github: 'https://github.com/KetulChhaya/GEO-Agent',
    status: 'AI Agent',
  },
  {
    id: 2,
    title: 'PayPipe',
    category: 'Distributed Systems',
    description:
      'Designed a fault-tolerant, event-driven payment pipeline (FastAPI, Kafka) achieving exactly-once processing guarantees via Redis SETNX idempotency keys, with exponential backoff retries and a dead-letter queue to isolate failures.',
    technologies: ['FastAPI', 'Apache Kafka', 'Redis', 'Docker', 'Python'],
    github: 'https://github.com/KetulChhaya/PayPipe',
    status: 'Backend Service',
  },
  {
    id: 3,
    title: 'Repo Graph',
    category: 'Developer Tools',
    description:
      'Built a TypeScript MCP server that parses a codebase into an import dependency graph, helping AI agents catch circular imports that break builds and trace what a file change affects across 1,448 files in 1.1s.',
    technologies: ['TypeScript', 'ts-morph', 'SQLite', 'MCP'],
    github: 'https://github.com/KetulChhaya/repo-graph',
    status: 'MCP Server',
  },
  {
    id: 4,
    title: 'Scheduler Reflow',
    category: 'Algorithms & Systems',
    description:
      "Designed a TypeScript production-scheduling engine that reflows orders around delays and maintenance windows via Kahn's topological sort and greedy shift-aware placement, covered by 16 Vitest cases.",
    technologies: ['TypeScript', 'Luxon', 'Vitest'],
    github: 'https://github.com/KetulChhaya/scheduler-reflow',
    status: 'Engine',
  },
  {
    id: 5,
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
    id: 6,
    title: 'Pole to Podium: Visualizing F1 Performance',
    category: 'Data Visualization',
    description:
      "Built a visualization tool to make Formula 1 race data easier to understand. F1 generates tons of data during races, but it's hard to make sense of it all in real-time. I processed and transformed the raw data to create clear visualizations that show driver and car performance in a way that's actually useful for fans.",
    technologies: [
      'D3.js',
      'React',
      'Data Processing',
      'Data Transformation',
    ],
    link: 'https://formula-v.netlify.app',
    github: 'https://github.com/KetulChhaya/Formula-V',
    status: 'Web App',
  },
  {
    id: 7,
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section id="projects" className="section-padding section-alt-bg">
      <div className="container-responsive">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={revealViewport}
          className="mx-auto max-w-6xl"
        >
          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            className="mb-12 flex items-end justify-between lg:mb-16"
          >
            <div>
              <h2 className="text-responsive-xl mb-4 font-bold lg:mb-6">
                Projects
              </h2>
              <div className="bg-border h-px w-20 lg:w-24"></div>
            </div>
            {count > 1 && (
              <div className="flex items-center gap-1.5 pb-1.5">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'bg-foreground/70 w-4'
                        : 'bg-muted-foreground/25 hover:bg-muted-foreground/40 w-1.5'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Projects Carousel */}
          <motion.div variants={fadeInUp}>
            <Carousel
              opts={{ align: 'start', loop: false }}
              setApi={setApi}
              className="w-full"
            >
              <CarouselContent className="-ml-6 lg:-ml-8">
                {projects.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3 lg:pl-8"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="h-full"
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
                          {project.medium && (
                            <motion.a
                              href={project.medium}
                              target="_blank"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="hover:bg-muted/50 rounded-lg p-1.5 transition-colors"
                            >
                              <FileText size={16} />
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
              </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-muted-foreground hover:text-foreground -left-4 sm:-left-6 lg:-left-12" />
              <CarouselNext className="text-muted-foreground hover:text-foreground -right-4 sm:-right-6 lg:-right-12" />
            </Carousel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
