'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText, Award, Calendar, Users, BookOpen } from 'lucide-react';
import { fadeInUp, stagger } from '@/lib/constants/animations';

const researchData = [
    {
        id: 1,
        type: 'research',
        title: 'Advent of Big Data technology in environment and water management sector',
        journal: 'Springer Journal',
        authors: ['Ketul Chhaya', 'Jay Gohil', 'Jay Patel', 'Jay Chopra', 'Jimmy Taravia', 'Manan Shah'], // Replace with actual co-authors
        publishedDate: '2021', // Replace with actual date
        doi: 'https://doi.org/10.1007/s11356-021-14017-y    ', // Replace with actual DOI
        abstract: "Big Data is on the verge of explosion in terms of popularity in recent decades, and such a trend is not going to stop anytime soon as it has a lot of room to grow. The increased integration of IoT devices, faster access to the Internet, and advances in the computational power of mainstream devices have drastically increased the feasibility for the same while making it more practical to implement gradually. The reach and applicability of Big Data are diversified, yet widespread, and one of its key implementations falls under the environment arena. In an attempt to provide novel Big Data allied solutions in one or more aspects of water management sector, a substantial amount of research work has been carried out in recent years. This paper discusses how Big Data influences the abovementioned arenas and the extent of importance that it has. Several aspects of this field are uprooted, are discussed, and have seen real-world applicability. Various presently deployed applications, in the sub-fields of environment and water management are studied, and given an inclusive review. Finally, the current challenges and limitations pertaining to Big Data are discussed and proper (in theory) solutions are proposed which seem to have promising results. The future scope of Big Data is also considered with its viability taken into consideration. Several assessments and opinions are then cited.",
        keywords: ['Big Data', 'Environment', 'Water Management', 'Machine Learning', 'Internet of Things'],
        citations: 29, // Replace with actual citation count
        status: 'Published'
    }
];

const certificationsData = [
    {
        id: 1,
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        issueDate: '2024',
        expiryDate: '2027',
        credentialId: 'AWS-CSA-2024-001', // Replace with actual ID
        verificationUrl: 'https://aws.amazon.com/verification', // Replace with actual URL
        skills: ['Cloud Architecture', 'AWS Services', 'System Design', 'Security'],
        level: 'Professional'
    },
    {
        id: 2,
        title: 'Google Cloud Professional Data Engineer',
        issuer: 'Google Cloud',
        issueDate: '2023',
        expiryDate: '2025',
        credentialId: 'GCP-PDE-2023-001', // Replace with actual ID
        verificationUrl: 'https://cloud.google.com/certification', // Replace with actual URL
        skills: ['Data Engineering', 'BigQuery', 'Machine Learning', 'ETL Pipelines'],
        level: 'Professional'
    },
    {
        id: 3,
        title: 'Interactivity with JavaScript',
        issuer: 'Coursera',
        issueDate: '2021',
        // expiryDate: '',
        credentialId: '7ae69b7a058494e95172cb9fbfb2ba60', // Replace with actual ID
        verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/7ae69b7a058494e95172cb9fbfb2ba60', // Replace with actual URL
        skills: ['JavaScript', 'HTML', 'CSS', 'Interactivity'],
        level: 'Foundational'
    }
];

function ResearchCard({ research }: { research: typeof researchData[0] }) {
    return (
        <motion.div variants={fadeInUp}>
            <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg">
                <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <Badge variant="secondary" className="mb-2">
                                    {research.status}
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                    {research.journal}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.a
                                href={research.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-foreground"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink className="h-4 w-4" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {research.title}
                    </h3>

                    {/* Authors and Date */}
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{research.authors.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{research.publishedDate}</span>
                        </div>
                    </div>

                    {/* Abstract */}
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {research.abstract}
                    </p>

                    {/* Keywords */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {research.keywords.map((keyword) => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                                {keyword}
                            </Badge>
                        ))}
                    </div>

                    {/* Citations */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span>{research.citations} citations</span>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

function CertificationCard({ certification }: { certification: typeof certificationsData[0] }) {
    const isExpired = certification.expiryDate ? new Date(certification.expiryDate) < new Date() : false;

    return (
        <motion.div variants={fadeInUp}>
            <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80 hover:shadow-lg">
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Award className="h-6 w-6" />
                            </div>
                            <div>
                                <Badge
                                    variant={isExpired ? "destructive" : "secondary"}
                                    className="mb-2"
                                >
                                    {certification.level}
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                    {certification.issuer}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <motion.a
                                href={certification.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-foreground"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink className="h-4 w-4" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {certification.title}
                    </h3>

                    {/* Dates */}
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Issued: {certification.issueDate}</span>
                        </div>
                        {certification.expiryDate && <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                                <span className={isExpired ? "text-destructive" : ""}>
                                    Expires: {certification.expiryDate}
                                </span>
                            
                        </div>}
                    </div>

                    {/* Skills */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {certification.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                            </Badge>
                        ))}
                    </div>

                    {/* Credential ID */}
                    <div className="pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                            Credential ID: {certification.credentialId}
                        </p>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

export function ResearchCertifications() {
    return (
        <section id="research-certifications" className="section-padding">
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
                            Research & Certifications
                        </h2>
                        <div className="bg-border h-px w-20 lg:w-24"></div>
                    </motion.div>

                    {/* Research Section */}
                    <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
                        {/* <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2 text-foreground">
                Published Research
              </h3>
              <p className="text-muted-foreground">
                Peer-reviewed publications and academic contributions
              </p>
            </div> */}

                        <motion.div
                            variants={stagger}
                            className="grid gap-6 lg:gap-8"
                        >
                            {researchData.map((research) => (
                                <ResearchCard key={research.id} research={research} />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Certifications Section */}
                    <motion.div variants={fadeInUp}>
                        {/* <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-2 text-foreground">
                Professional Certifications
              </h3>
              <p className="text-muted-foreground">
                Industry-recognized credentials and technical certifications
              </p>
            </div> */}

                        <motion.div
                            variants={stagger}
                            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                        >
                            {certificationsData.map((certification) => (
                                <CertificationCard key={certification.id} certification={certification} />
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
