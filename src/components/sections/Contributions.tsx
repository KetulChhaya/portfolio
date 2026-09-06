'use client';

import { revealViewport } from '@/lib/constants/smooth-animations';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, FileText, Github, Package } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/constants/animations';

export function Contributions() {
    return (
        <section id="contributions" className="section-padding">
            <div className="container-responsive">
                <motion.div
                    variants={stagger}
                    initial="initial"
                    whileInView="animate"
                    viewport={revealViewport}
                    className="mx-auto max-w-6xl"
                >
                    {/* Section Header */}
                    <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
                        <h2 className="text-responsive-xl mb-4 font-bold lg:mb-6">
                            Contributions
                        </h2>
                        <div className="bg-border h-px w-20 lg:w-24"></div>
                    </motion.div>

                    {/* Contributions Grid */}
                    <div className="space-y-6 lg:space-y-8">
                        {/* ACM CI 2026 Poster */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="bg-background/60 hover:bg-background/80 border-border/50 hover:border-border group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 lg:p-8">
                                {/* Content Grid */}
                                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                                    {/* Left: Main Content */}
                                    <div className="lg:col-span-8">
                                        <div className="mb-4 flex items-center gap-3 lg:mb-6">
                                            <Badge variant="outline" className="text-sm">
                                                Poster
                                            </Badge>
                                            <Badge variant="outline" className="text-sm">
                                                Accepted
                                            </Badge>
                                        </div>

                                        <h3 className="group-hover:text-foreground mb-4 text-xl font-semibold transition-colors lg:mb-6 lg:text-2xl">
                                            Evaluating Beyond the Screen: Collective Assessment of AI-Generated Business Plans with Resource-Constrained Entrepreneurs
                                        </h3>

                                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed lg:mb-8 lg:text-base">
                                            Co-authored a poster on group-based evaluation of AI-generated business plans, extending BizChat with a claim-to-input evaluation module and studying its use in think-pair-share workshops with 14 resource-constrained entrepreneurs across Maryland community organizations.
                                        </p>

                                        {/* Technologies/Topics */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Human-AI Collaboration', 'Collective Intelligence', 'GenAI Evaluation', 'Entrepreneurship'].map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="bg-muted text-muted-foreground border-border inline-flex items-center rounded-full border text-xs px-2 py-1 font-normal"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Links */}
                                    <div className="lg:col-span-4">
                                        <div className="bg-muted border-border/50 flex h-full flex-col justify-between rounded-lg border p-6">
                                            <div>
                                                <div className="text-muted-foreground/80 mb-4 text-xs font-medium uppercase tracking-wider">
                                                    Links
                                                </div>
                                                <div className="space-y-3">
                                                    <a
                                                        href="https://arxiv.org/abs/2608.16886"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <FileText size={16} />
                                                        <span className="group-hover:underline">arXiv preprint</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    <a
                                                        href="https://ci.acm.org/2026/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <BookOpen size={16} />
                                                        <span className="group-hover:underline">ACM CI 2026</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mt-6 border-t border-border/50 pt-4">
                                                <div className="text-muted-foreground/80 text-xs font-medium uppercase tracking-wider">
                                                    Publication
                                                </div>
                                                <div className="text-foreground mt-1 text-sm">ACM CI &amp; HCOMP 2026 — Posters &amp; Demos</div>
                                                <div className="text-muted-foreground mt-1 text-xs">Sep 27–30, 2026 • Virginia Tech</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* TokenWise Tracker */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="bg-background/60 hover:bg-background/80 border-border/50 hover:border-border group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 lg:p-8">
                                {/* Content Grid */}
                                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                                    {/* Left: Main Content */}
                                    <div className="lg:col-span-8">
                                        <div className="mb-4 flex items-center gap-3 lg:mb-6">
                                            <Badge variant="outline" className="text-sm">
                                                NPM Package
                                            </Badge>
                                            <Badge variant="outline" className="text-sm">
                                                Open Source
                                            </Badge>
                                        </div>

                                        <h3 className="group-hover:text-foreground mb-4 text-xl font-semibold transition-colors lg:mb-6 lg:text-2xl">
                                            TokenWise Tracker
                                        </h3>

                                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed lg:mb-8 lg:text-base">
                                        Built a lightweight npm package to track OpenAI API token usage, cost, and latency at the application level. Enabled per-user and per-feature cost visibility by logging structured metadata directly into developer-controlled databases.
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {['TypeScript', 'Node.js', 'JavaScript Proxy', 'OpenAI SDK', 'SQLite3', 'Firebase', 'MongoDB'].map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="bg-muted text-muted-foreground border-border inline-flex items-center rounded-full border text-xs px-2 py-1 font-normal"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Links */}
                                    <div className="lg:col-span-4">
                                        <div className="bg-muted border-border/50 flex h-full flex-col justify-between rounded-lg border p-6">
                                            <div>
                                                <div className="text-muted-foreground/80 mb-4 text-xs font-medium uppercase tracking-wider">
                                                    Links
                                                </div>
                                                <div className="space-y-3">
                                                    <a
                                                        href="https://www.npmjs.com/package/tokenwise-tracker"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <Package size={16} />
                                                        <span className="group-hover:underline">npm package</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    <a
                                                        href="https://medium.com/@chhayaketul13/tokenwise-tracker-effortless-openai-cost-monitoring-for-developers-98f333a9161d"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <FileText size={16} />
                                                        <span className="group-hover:underline">Medium article</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    <a
                                                        href="https://github.com/KetulChhaya/TokenWise"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <Github size={16} />
                                                        <span className="group-hover:underline">GitHub repo</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mt-6 border-t border-border/50 pt-4">
                                                <div className="text-muted-foreground/80 text-xs font-medium uppercase tracking-wider">
                                                    Category
                                                </div>
                                                <div className="text-foreground mt-1 text-sm">API Tokens Monitoring</div>
                                                <div className="text-foreground mt-1 text-sm">LLM Cost Tracking</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Research Article */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            <div className="bg-background/60 hover:bg-background/80 border-border/50 hover:border-border group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 lg:p-8">
                                {/* Content Grid */}
                                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                                    {/* Left: Main Content */}
                                    <div className="lg:col-span-8">
                                        <div className="mb-4 flex items-center gap-3 lg:mb-6">
                                            <Badge variant="outline" className="text-sm">
                                                Research Article
                                            </Badge>
                                            <Badge variant="outline" className="text-sm">
                                                Springer Journal
                                            </Badge>
                                        </div>

                                        <h3 className="group-hover:text-foreground mb-4 text-xl font-semibold transition-colors lg:mb-6 lg:text-2xl">
                                            Advent of Big Data Technology in Environment and Water Management Sector
                                        </h3>

                                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed lg:mb-8 lg:text-base">
                                            Co-authored a comprehensive review paper exploring how Big Data technology is transforming environment and water management. The research discusses the integration of IoT devices, computational advances, and real-world applications of Big Data solutions in environmental monitoring and water resource management, along with current challenges and future scope.
                                        </p>

                                        {/* Technologies/Topics */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {['Big Data', 'IoT', 'Water Management', 'Environmental Monitoring', 'Data Analytics', 'Machine Learning'].map((topic) => (
                                                <span
                                                    key={topic}
                                                    className="bg-muted text-muted-foreground border-border inline-flex items-center rounded-full border text-xs px-2 py-1 font-normal"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Links */}
                                    <div className="lg:col-span-4">
                                        <div className="bg-muted border-border/50 flex h-full flex-col justify-between rounded-lg border p-6">
                                            <div>
                                                <div className="text-muted-foreground/80 mb-4 text-xs font-medium uppercase tracking-wider">
                                                    Links
                                                </div>
                                                <div className="space-y-3">
                                                    <a
                                                        href="https://pubmed.ncbi.nlm.nih.gov/33904135/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <BookOpen size={16} />
                                                        <span className="group-hover:underline">PubMed</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                    <a
                                                        href="https://doi.org/10.1007/s11356-021-14017-y"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-foreground text-muted-foreground group flex items-center gap-2 text-sm transition-colors"
                                                    >
                                                        <FileText size={16} />
                                                        <span className="group-hover:underline">DOI</span>
                                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mt-6 border-t border-border/50 pt-4">
                                                <div className="text-muted-foreground/80 text-xs font-medium uppercase tracking-wider">
                                                    Publication
                                                </div>
                                                <div className="text-foreground mt-1 text-sm">Environmental Science and Pollution Research</div>
                                                <div className="text-muted-foreground mt-1 text-xs">2021 • Volume 28</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

