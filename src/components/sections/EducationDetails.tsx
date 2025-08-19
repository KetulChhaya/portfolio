'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import { 
  GraduationCap, 
  Users, 
  Calendar,
  MapPin,
  ChevronRight,
  BookOpen,
  Star,
  Award,
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ChevronsDown, ChevronsUp } from 'lucide-react';

// Education data with detailed transcript information
const educationData = [
  {
    id: 1,
    degree: 'Master of Science',
    title: 'Computer Science',
    institution: 'University of Maryland, Baltimore County',
    location: 'Baltimore, MD',
    period: 'Aug 2024 - Present',
    ongoing: true,
    gpa: '4.0',
    semesters: [
      {
        name: 'Fall 2025',
        courses: [
          { code: 'CMSC 611', name: 'Advanced Computer Architecture', grade: 'In Progress', credits: 3 },
          { code: 'CMSC 643', name: 'Quantum Computation', grade: 'In Progress', credits: 3 },
          { code: 'CMSC 691', name: 'Active Cyberdefense', grade: 'In Progress', credits: 3 },
        ]
      },
      {
        name: 'Spring 2025',
        courses: [
          { code: 'CMSC 636', name: 'Data Visualization', grade: 'A', credits: 3 },
          { code: 'SENG 740', name: 'Fundamentals of Software Testing', grade: 'A', credits: 3 },
          { code: 'CMSC 691', name: 'Cloud Computing', grade: 'A', credits: 3 },
        ]
      },
      {
        name: 'Fall 2024',
        courses: [
          { code: 'CMSC 641', name: 'Design & Analysis of Algorithms', grade: 'A', credits: 3 },
          { code: 'CMSC 678', name: 'Introduction to Machine Learning', grade: 'A', credits: 3 },
          { code: 'CMSC 691', name: 'Introduction to Data Science', grade: 'A', credits: 3 },
        ]
      }
    ],
    totalCredits: 18,
    cumulativeGPA: 4.0
  },
  {
    id: 2,
    degree: 'Bachelor of Technology',
    title: 'Information and Communication Technology',
    institution: 'Pandit Deendayal Energy University',
    location: 'Gandhinagar, GJ',
    period: 'Aug 2019 - Jan 2023',
    ongoing: false,
    gpa: '9.65',
    semesters: [
      {
        name: 'Semester VIII (Final)',
        courses: [
          { code: '20TP421', name: 'Comprehensive Project', grade: 'A+', credits: 10 },
        ]
      },
      {
        name: 'Semester VII',
        courses: [
          { code: 'TP310', name: 'Industrial Training', grade: 'O', credits: 2 },
          { code: '20IC401T', name: 'Internet of Things', grade: 'A+', credits: 2 },
          { code: '20IC401P', name: 'Internet of Things - Lab', grade: 'O', credits: 1 },
          { code: '20IC402T', name: 'Digital CMOS VLSI Circuits', grade: 'O', credits: 2 },
          { code: '20IC402P', name: 'Digital CMOS VLSI Circuits Lab', grade: 'O', credits: 1 },
          { code: '20IC410T', name: 'Elective: Real Time Operating System', grade: 'O', credits: 2 },
          { code: '20IC410P', name: 'Elective: Real Time Operating System - Lab', grade: 'O', credits: 1 },
          { code: '20IC406T', name: 'Elective: Computer Vision', grade: 'O', credits: 2 },
          { code: '20IC406P', name: 'Elective: Computer Vision Lab', grade: 'A+', credits: 1 },
          { code: '20IC404T', name: 'Elective: Big Data Analytics and Computing', grade: 'O', credits: 2 },
          { code: '20IC404P', name: 'Elective: Big Data Analytics and Computing Lab', grade: 'A', credits: 1 },
          { code: '20TP410', name: 'Mini Project', grade: 'A+', credits: 3 },
        ]
      },
      {
        name: 'Semester VI',
        courses: [
          { code: 'MOOC', name: 'NPTEL Course/MOOC', grade: 'O', credits: 3 },
          { code: '20HS301P', name: 'Communication Skills - III', grade: 'O', credits: 1 },
          { code: '20IC304T', name: 'Embedded Systems', grade: 'A+', credits: 3 },
          { code: '20IC304P', name: 'Embedded Systems Lab', grade: 'A', credits: 1 },
          { code: '20IC305T', name: 'AI Systems', grade: 'O', credits: 3 },
          { code: '20IC305P', name: 'AI Systems Lab', grade: 'O', credits: 1 },
          { code: '20IC306T', name: 'Computer Communication and Networking', grade: 'O', credits: 3 },
          { code: '20IC306P', name: 'Computer Communication and Networking Lab', grade: 'O', credits: 1 },
          { code: '20IC313T', name: 'Elective: Machine Learning', grade: 'A+', credits: 2 },
          { code: '20IC313P', name: 'Elective: Machine Learning Lab', grade: 'O', credits: 1 },
          { code: '20IC316T', name: 'Elective: Cloud Architecture and Services', grade: 'A+', credits: 2 },
          { code: '20IC316P', name: 'Elective: Cloud Architecture and Services Lab', grade: 'O', credits: 1 },
        ]
      },
      {
        name: 'Semester V',
        courses: [
          { code: 'TP210', name: 'Industrial Orientation', grade: 'O', credits: 1 },
          { code: '20IC301T', name: 'Operating System', grade: 'O', credits: 3 },
          { code: '20IC301P', name: 'Operating System Lab', grade: 'O', credits: 1 },
          { code: '20IC302T', name: 'RF Engineering', grade: 'O', credits: 3 },
          { code: '20IC302P', name: 'RF Engineering Lab', grade: 'O', credits: 1 },
          { code: '20IC303T', name: 'Digital Communication', grade: 'O', credits: 3 },
          { code: '20IC303P', name: 'Digital Communication Lab', grade: 'O', credits: 1 },
          { code: '20IC308T', name: 'Elective: Computer Based Financial System Analysis', grade: 'O', credits: 2 },
          { code: '20IC308P', name: 'Elective: Computer Based Financial System Analysis Lab', grade: 'O', credits: 1 },
          { code: '20IC310T', name: 'Elective: Information Security', grade: 'O', credits: 2 },
          { code: '20IC310P', name: 'Elective: Information Security Lab', grade: 'O', credits: 1 },
          { code: '20CP312T', name: 'Introduction to Data Mining', grade: 'A+', credits: 3 },
        ]
      },
      {
        name: 'Semester IV',
        courses: [
          { code: '20A435', name: 'Educational Psychology', grade: 'O', credits: 3 },
          { code: '20IC207T', name: 'Analog Circuit Design', grade: 'O', credits: 3 },
          { code: '20IC207P', name: 'Analog Circuit Design - Lab', grade: 'O', credits: 1 },
          { code: '20IC208T', name: 'Database Management Systems', grade: 'O', credits: 2 },
          { code: '20IC208P', name: 'Database Management Systems - Lab', grade: 'O', credits: 1 },
          { code: '20IC209T', name: 'Computer Organization and Design', grade: 'O', credits: 2 },
          { code: '20IC209P', name: 'Computer Organization and Design - Lab', grade: 'O', credits: 1 },
          { code: '20IC210T', name: 'Digital Signal Processing', grade: 'A+', credits: 3 },
          { code: '20IC210P', name: 'Digital Signal Processing - Lab', grade: 'A+', credits: 1 },
          { code: '20IF201T', name: 'Industry 4.0', grade: 'O', credits: 2 },
          { code: '20IF201P', name: 'Industry 4.0 Lab', grade: 'O', credits: 1 },
        ]
      },
      {
        name: 'Semester III',
        courses: [
          { code: '16TP110', name: 'Civic and Social Services Internship (CSSI)', grade: 'O', credits: 3 },
          { code: '20MA206T', name: 'Discrete Mathematical Structures', grade: 'O', credits: 4 },
          { code: '20IC201T', name: 'Data Structure and Algorithms', grade: 'O', credits: 3 },
          { code: '20IC201P', name: 'Data Structure and Algorithms Lab', grade: 'O', credits: 1 },
          { code: '20IC202T', name: 'Fundamentals of Signal Processing and Communication', grade: 'O', credits: 3 },
          { code: '20IC203T', name: 'Object Oriented Concepts and Programming', grade: 'O', credits: 2 },
          { code: '20IC203P', name: 'Object Oriented Concepts and Programming Lab', grade: 'O', credits: 1 },
          { code: '20IC204T', name: 'Digital Logic Design and HDL', grade: 'O', credits: 3 },
          { code: '20IC204P', name: 'Digital Logic Design and HDL Lab', grade: 'O', credits: 1 },
          { code: '20CP205T', name: 'Programming Methodology and Data Structures', grade: 'A+', credits: 3 },
          { code: '20HS201P', name: 'Communication Skills - II', grade: 'A+', credits: 1 },
        ]
      },
      {
        name: 'Semester II',
        courses: [
          { code: '16EE102T', name: 'Basic Electronics', grade: 'A+', credits: 3 },
          { code: '16MA106P', name: 'Computer Programming (Practical)', grade: 'A+', credits: 1 },
          { code: '16CE106T', name: 'Elements of Civil Engineering and Mechanics', grade: 'O', credits: 4 },
          { code: '16ME101T', name: 'Engineering Graphics', grade: 'O', credits: 1 },
          { code: '16ME101P', name: 'Engineering Graphics (Practical)', grade: 'O', credits: 1 },
          { code: '16SP203', name: 'Sports - II', grade: 'O', credits: 1 },
          { code: '16MA103T', name: 'Mathematics - II', grade: 'O', credits: 4 },
          { code: '16HS108T', name: 'Environmental Studies', grade: 'O', credits: 3 },
          { code: '16SC102T', name: 'Physics', grade: 'O', credits: 3 },
          { code: '16SC102P', name: 'Physics (Practical)', grade: 'O', credits: 1 },
        ]
      },
      {
        name: 'Semester I',
        courses: [
          { code: '16MA101T', name: 'Mathematics-I', grade: 'A+', credits: 4 },
          { code: '16BSC101T', name: 'Chemistry', grade: 'O', credits: 3 },
          { code: '16SC101P', name: 'Chemistry (Practical)', grade: 'O', credits: 1 },
          { code: '16ME106T', name: 'Elements of Mechanical Engineering', grade: 'A+', credits: 3 },
          { code: '16HS109T', name: 'Professional Ethics and Human Values', grade: 'A+', credits: 1 },
          { code: '16SP103', name: 'Sports - I', grade: 'A', credits: 1 },
          { code: '16EE106T', name: 'Elements of Electrical Engineering', grade: 'O', credits: 3 },
          { code: '16ME103P', name: 'Workshop Practice', grade: 'O', credits: 1 },
          { code: '19HS101', name: 'Communication Skills', grade: 'O', credits: 1 },
        ]
      }
    ],
    totalCredits: 159,
    cumulativeGPA: 9.65
  }
];

// Activities and extracurricular data
const activitiesData = [
  {
    category: 'Technical Activities',
    items: [
      {
        title: 'Hackathon Participation',
        description: 'Participated in 5+ hackathons including MLH Local Hack Day and CodeChef contests',
        period: '2021 - 2023',
        achievements: ['2nd Place - AI/ML Challenge', 'Best Innovation Award']
      },
      {
        title: 'Open Source Contributions',
        description: 'Active contributor to various open-source projects on GitHub',
        period: '2020 - Present',
        achievements: ['100+ commits', '15+ repositories', '5+ pull requests merged']
      },
      {
        title: 'Technical Blog Writing',
        description: 'Published technical articles on Medium and personal blog',
        period: '2021 - Present',
        achievements: ['20+ articles', '5k+ reads', 'Featured in tech newsletters']
      }
    ]
  },
  {
    category: 'Leadership & Organization',
    items: [
      {
        title: 'Student Chapter President',
        description: 'Led the IEEE Student Branch with 50+ active members',
        period: '2021 - 2022',
        achievements: ['Organized 10+ technical events', 'Increased membership by 40%']
      },
      {
        title: 'Technical Team Lead',
        description: 'Led development team for college website redesign project',
        period: '2022 - 2023',
        achievements: ['Managed 8 developers', 'Delivered project 2 weeks early']
      },
      {
        title: 'Mentor & Tutor',
        description: 'Mentored junior students in programming and web development',
        period: '2020 - 2023',
        achievements: ['Mentored 25+ students', '95% success rate in placements']
      }
    ]
  }
];

// Recognition and achievements data
const recognitionData = [
  {
    category: 'Academic Excellence',
    items: [
      {
        title: 'Dean\'s List',
        description: 'Consistently maintained excellent academic performance with 9.65 CPI across 8 semesters',
        period: '2019 - 2023',
        icon: CheckCircle
      },
      {
        title: 'Merit Scholarship',
        description: 'Received merit-based scholarship for outstanding academic performance',
        period: '2020 - 2023',
        icon: Award
      },
      {
        title: 'Best Final Year Project',
        description: 'Awarded for innovative AI-powered recommendation system',
        period: '2023',
        icon: Target
      }
    ]
  },
  {
    category: 'Technical Competitions',
    items: [
      {
        title: 'Google Code Jam',
        description: 'Qualified for Round 2 in Google Code Jam 2022',
        period: '2022',
        icon: Target
      },
      {
        title: 'HackerRank',
        description: 'Achieved 5-star rating in Problem Solving and Python',
        period: '2021 - 2023',
        icon: Star
      },
      {
        title: 'LeetCode',
        description: 'Solved 300+ problems with 80%+ acceptance rate',
        period: '2020 - Present',
        icon: BookOpen
      }
    ]
  },
  {
    category: 'Professional Recognition',
    items: [
      {
        title: 'Microsoft Student Partner',
        description: 'Selected as Microsoft Student Partner for technical leadership',
        period: '2022 - 2023',
        icon: Award
      },
      {
        title: 'GitHub Campus Expert',
        description: 'Recognized as GitHub Campus Expert for open source advocacy',
        period: '2021 - 2023',
        icon: BookOpen
      },
      {
        title: 'LinkedIn Top Voice',
        description: 'Featured in LinkedIn\'s Top Voices for Technology',
        period: '2023',
        icon: Star
      }
    ]
  }
];

export function EducationDetails() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedSemesters, setExpandedSemesters] = useState<Set<number>>(new Set()); // Will be set based on active tab

  const tabs = [
    { id: 0, label: 'Master\'s Degree', degree: 'MS Computer Science' },
    { id: 1, label: 'Bachelor\'s Degree', degree: 'BTech ICT' }
  ];

  const toggleSemester = (semesterIndex: number) => {
    setExpandedSemesters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(semesterIndex)) {
        newSet.delete(semesterIndex);
      } else {
        newSet.add(semesterIndex);
      }
      return newSet;
    });
  };

  const toggleAllSemesters = () => {
    const totalSemesters = educationData[activeTab].semesters.length;
    const allIndices = educationData[activeTab].semesters.map((_, index) => index);
    
    if (expandedSemesters.size === totalSemesters) {
      // If all are expanded, collapse all
      setExpandedSemesters(new Set());
    } else {
      // Otherwise, expand all
      setExpandedSemesters(new Set(allIndices));
    }
  };

  // Set default expanded semesters when tab changes
  useEffect(() => {
    const totalSemesters = educationData[activeTab].semesters.length;
    if (totalSemesters > 0) {
      // For Master's: Open first 2 semesters (Spring 2025 and Fall 2024)
      // For Bachelor's: Open first 2 semesters (Semester VIII and VII)
      const firstTwoIndices = [0, 1].filter(i => i < totalSemesters);
      setExpandedSemesters(new Set(firstTwoIndices));
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive py-8 sm:py-12 lg:py-16">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-8xl relative"
        >
          {/* Back to Home Button */}
          <motion.div variants={fadeInUp} className="absolute top-0 left-0 z-10">
            <Link href="/">
              <Button variant="outline" className="group">
                <ChevronRight className="mr-2 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                <span className="hidden sm:block">Back</span>
              </Button>
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div variants={fadeInUp} className="mb-8 text-center sm:mb-12 lg:mb-16">
            <div className="mb-6 flex justify-center">
              <div className="bg-muted/30 flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
                <GraduationCap className="text-foreground h-8 w-8 sm:h-10 sm:w-10" />
              </div>
            </div>
            <h1 className="text-responsive-2xl mb-4 font-bold sm:mb-6">
              Education
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg lg:text-xl">
              Overview of my academic journey and extracurricular activities
            </p>
            <div className="bg-border/60 mx-auto mt-6 h-0.5 w-24 sm:w-32 rounded-full"></div>
          </motion.div>

          {/* Tabbed Navigation */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="relative mx-auto max-w-md">
              {/* Glassmorphism Container */}
              <div className="relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-60"></div>
                
                {/* Tab Container */}
                <div className="relative flex p-1">
                  {/* Active Tab Indicator */}
                  <motion.div
                    className="absolute inset-y-1 left-1 w-[calc(50%-2px)] rounded-xl bg-primary/90 backdrop-blur-sm border border-primary/30"
                    initial={false}
                    animate={{
                      x: activeTab === 0 ? 0 : '100%',
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                  
                  {/* Tab Buttons */}
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative z-10 flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-primary-foreground font-semibold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{tab.label}</div>
                        <div className="text-xs opacity-80 mt-1">{tab.degree}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="initial"
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              {/* Education Transcript */}
              <Card className="border-2 border-border/60 bg-background/80 backdrop-blur-sm">
                <CardHeader className="border-b-2 border-border/50 pb-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted/60 border-2 border-border/50 flex h-12 w-12 items-center justify-center rounded-full">
                          <GraduationCap className="text-foreground h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold sm:text-xl lg:text-2xl">
                              {educationData[activeTab].degree}
                            </h3>
                            {educationData[activeTab].ongoing && (
                              <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1">
                                Ongoing
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                            {educationData[activeTab].title}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">{educationData[activeTab].institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-muted-foreground">{educationData[activeTab].location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{educationData[activeTab].period}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">
                          {educationData[activeTab].cumulativeGPA} <span className="text-xs text-muted-foreground">
                            /{activeTab === 0 ? '4.0' : '10.0'}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activeTab === 0 ? 'GPA' : 'CPI'}
                        </div>
                       
                      </div>
                      <div className="flex items-center justify-between w-full gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={toggleAllSemesters}
                          className="flex items-center gap-2"
                        >
                          {expandedSemesters.size === educationData[activeTab].semesters.length ? (
                            <>
                              <ChevronsUp className="h-4 w-4" />
                              Collapse All
                            </>
                          ) : (
                            <>
                              <ChevronsDown className="h-4 w-4" />
                              Expand All
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {educationData[activeTab].semesters.map((semester, index) => (
                      <div key={index} className="space-y-4">
                        <button
                          onClick={() => toggleSemester(index)}
                          className="w-full text-left hover:bg-muted/30 rounded-lg p-3 transition-colors border border-border/40 hover:border-border/60"
                        >
                          <div className="flex items-center justify-between border-b-2 border-border/50 pb-3">
                            <div className="flex items-center gap-3">
                              <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                                {semester.name}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {semester.courses.length} courses
                              </Badge>
                            </div>
                            {expandedSemesters.has(index) ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </button>
                                                <AnimatePresence>
                          {expandedSemesters.has(index) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="space-y-3 overflow-hidden"
                            >
                            {semester.courses.map((course, courseIndex) => (
                              <div key={courseIndex} className="flex flex-col gap-3 rounded-lg bg-muted/30 p-4 border-2 border-border/50 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1 space-y-1">
                                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <span className="text-muted-foreground font-mono text-sm">{course.code}</span>
                                    <span className="font-medium text-sm sm:text-base">{course.name}</span>
                                  </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                  <Badge variant="outline" className="text-xs px-2 py-1">
                                    {course.credits} Credits
                                  </Badge>
                                  <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                                    {course.grade}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Activities and Leadership */}
          {/* <motion.div variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl mb-7 font-bold">Activities & Leadership</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {activitiesData.map((category, index) => (
                <Card key={index} className="border-2 border-border/60 bg-background/80 backdrop-blur-sm shadow-xl">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="flex items-center gap-2">
                      {category.category === 'Technical Activities' ? (
                        <BookOpen className="h-5 w-5" />
                      ) : (
                        <Users className="h-5 w-5" />
                      )}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-3 rounded-lg bg-muted/30 p-4 border-2 border-border/50 shadow-md">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm sm:text-base">{item.title}</h4>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                          <p className="text-muted-foreground text-xs">{item.period}</p>
                        </div>
                        {item.achievements.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                              Key Achievements:
                            </p>
                            <ul className="space-y-1">
                              {item.achievements.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-center gap-2 text-sm">
                                  <ArrowRight className="text-foreground h-3 w-3" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div> */}

          {/* Recognition and Achievements */}
          {/* <motion.div variants={fadeInUp}>
            <h2 className="text-2xl mb-7 font-bold">Recognition & Achievements</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {recognitionData.map((category, index) => (
                <Card key={index} className="border-2 border-border/60 bg-background/80 backdrop-blur-sm shadow-xl">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="flex items-center gap-2">
                      {category.category === 'Academic Excellence' ? (
                        <Award className="h-5 w-5" />
                      ) : category.category === 'Technical Competitions' ? (
                        <Target className="h-5 w-5" />
                      ) : (
                        <Star className="h-5 w-5" />
                      )}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={itemIndex} className="space-y-3 rounded-lg bg-muted/30 p-4 border-2 border-border/50 shadow-md">
                          <div className="flex items-start gap-3">
                            <IconComponent className="text-foreground h-5 w-5 flex-shrink-0" />
                            <div className="flex-1 space-y-1">
                              <h4 className="font-semibold text-sm sm:text-base">{item.title}</h4>
                              <p className="text-muted-foreground text-sm">{item.description}</p>
                              <p className="text-muted-foreground text-xs">{item.period}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </div>
  );
}
