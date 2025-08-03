'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiOpencv,
  SiTailwindcss,
  SiGithub,
  SiPostman,
  SiPycharm,
  SiEclipseide,
  SiDocker,
  SiVercel,
  SiApachekafka,
  SiLinux,
  SiFigma,
  SiJunit5,
  SiJest,
  SiOpenai,
} from 'react-icons/si';
import {
  FaDatabase,
  FaShieldAlt,
  FaChartLine,
  FaPalette,
  FaCogs,
  FaCode,
  FaJava,
  FaAws,
  FaFileSignature,
} from 'react-icons/fa';

import { TbBrandVscode } from 'react-icons/tb';

// Icon mapping for technologies with brand colors
const techIcons: {
  [key: string]: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
  };
} = {
  // Languages and Databases
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  Python: { icon: SiPython, color: '#3776AB' },
  Java: { icon: FaJava, color: '#ED8B00' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss3, color: '#1572B6' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },

  // Frameworks & Libraries
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  'React.js': { icon: SiReact, color: '#61DAFB' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  Numpy: { icon: SiNumpy, color: '#013243' },
  Pandas: { icon: SiPandas, color: '#150458' },
  'Scikit-Learn': { icon: SiScikitlearn, color: '#F7931E' },
  OpenCV: { icon: SiOpencv, color: '#5C3EE8' },
  'Material-UI': { icon: FaPalette, color: '#0081CB' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },

  // Tools & Platforms
  GitHub: { icon: SiGithub, color: '#181717' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  'VS Code': { icon: TbBrandVscode, color: '#007ACC' },
  PyCharm: { icon: SiPycharm, color: '#000000' },
  Eclipse: { icon: SiEclipseide, color: '#2C2255' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  Vercel: { icon: SiVercel, color: '#000000' },
  Kafka: { icon: SiApachekafka, color: '#231F20' },
  AWS: { icon: FaAws, color: '#FF9900' },
  Linux: { icon: SiLinux, color: '#FCC624' },
  ServiceNow: { icon: FaCogs, color: '#00B5D4' },
  Figma: { icon: SiFigma, color: '#F24E1E' },

  // Security & Testing
  JWT: { icon: FaShieldAlt, color: '#000000' },
  JUnit: { icon: SiJunit5, color: '#25A162' },
  Jest: { icon: SiJest, color: '#C21325' },

  // AI/ML & APIs
  'OPENAI API': { icon: SiOpenai, color: '#412991' },
  'Docusign Integration': { icon: FaFileSignature, color: '#FFCC22' },

  // Generic icons for categories without specific icons
  OAuth: { icon: FaShieldAlt, color: '#000000' },
  'Web Security Best Practices': { icon: FaShieldAlt, color: '#000000' },
  'Shell Scripting': { icon: FaCode, color: '#000000' },
  'Object-Oriented Programming (OOP)': { icon: FaCode, color: '#000000' },
  'Systems Programming': { icon: FaCode, color: '#000000' },
  'Low-Latency Design': { icon: FaCogs, color: '#000000' },
  'Agile/SCRUM': { icon: FaCogs, color: '#000000' },
  SDLC: { icon: FaCogs, color: '#000000' },
  'CI/CD (GitHub Actions)': { icon: FaCogs, color: '#000000' },
  'SEO (Core Web Vitals, CMS, Accessibility)': {
    icon: FaCogs,
    color: '#000000',
  },
  'Distributed Systems': { icon: FaCogs, color: '#000000' },
  'Data Preprocessing': { icon: FaDatabase, color: '#000000' },
  'Data Visualization': { icon: FaChartLine, color: '#000000' },
  'Data-Driven Modeling': { icon: FaChartLine, color: '#000000' },
  'Machine Learning': { icon: FaChartLine, color: '#000000' },
  'UI/UX Design': { icon: FaPalette, color: '#000000' },
  'RESTful APIs': { icon: FaCode, color: '#000000' },
  'Web API': { icon: FaCode, color: '#000000' },
  'Chat Engine': { icon: FaCode, color: '#000000' },
};

const techCategories = [
  {
    id: 'languages-databases',
    title: 'Languages and Databases',
    technologies: [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
      'HTML5',
      'CSS3',
      'MongoDB',
      'MySQL',
      'Firebase',
    ],
  },
  {
    id: 'frameworks-libraries',
    title: 'Frameworks & Libraries',
    technologies: [
      'Next.js',
      'React.js',
      'Node.js',
      'Express.js',
      'Numpy',
      'Pandas',
      'Scikit-Learn',
      'OpenCV',
      'Material-UI',
      'Tailwind CSS',
    ],
  },
  {
    id: 'tools-platforms',
    title: 'Tools & Platforms',
    technologies: [
      'GitHub',
      'Postman',
      'VS Code',
      'PyCharm',
      'Eclipse',
      'Docker',
      'Vercel',
      'Kafka',
      'AWS',
      'Linux',
      'ServiceNow',
      'Figma',
    ],
  },
  {
    id: 'practices-methodologies',
    title: 'Practices & Methodologies',
    technologies: [
      'Object-Oriented Programming (OOP)',
      'Systems Programming',
      'Low-Latency Design',
      'Agile/SCRUM',
      'SDLC',
      'CI/CD (GitHub Actions)',
      'SEO (Core Web Vitals, CMS, Accessibility)',
      'Distributed Systems',
    ],
  },
  {
    id: 'security-testing',
    title: 'Security & Testing',
    technologies: [
      'JWT',
      'OAuth',
      'Web Security Best Practices',
      'Shell Scripting',
      'JUnit',
      'Jest',
    ],
  },
  {
    id: 'data-science-ml',
    title: 'Data Science & ML',
    technologies: [
      'Data Preprocessing',
      'Data Visualization',
      'Data-Driven Modeling',
      'Machine Learning',
    ],
  },
  {
    id: 'ui-ux-web',
    title: 'UI/UX & Web Technologies',
    technologies: [
      'UI/UX Design',
      'RESTful APIs',
      'Web API',
      'OPENAI API',
      'Chat Engine',
      'Docusign Integration',
    ],
  },
];

export function TechStack() {
  return (
    <section id="stack" className="section-padding bg-muted/30">
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
              My Stack
            </h2>
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {/* Tech Categories */}
          <div className="space-y-12 lg:space-y-16">
            {techCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                className="space-y-4 lg:space-y-6"
              >
                <h3 className="text-muted-foreground/80 font-mono text-sm tracking-wider">
                  {category.title}
                </h3>

                <motion.div
                  className="flex flex-wrap gap-2 lg:gap-3"
                  variants={stagger}
                >
                  {category.technologies.map((tech) => {
                    const techData = techIcons[tech] || {
                      icon: FaCode,
                      color: '#000000',
                    };
                    const IconComponent = techData.icon;
                    return (
                      <motion.div
                        key={tech}
                        variants={fadeInUp}
                        whileHover={{
                          scale: 1.03,
                          transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          },
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-background/60 hover:bg-background/80 border-border/50 hover:border-border group flex items-center gap-2 border px-3 py-2 text-xs transition-all duration-200 lg:px-4 lg:text-sm"
                        >
                          <IconComponent className="h-3 w-3 transition-all duration-200 group-hover:scale-110 lg:h-4 lg:w-4" />
                          {tech}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
