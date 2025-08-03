// Site Configuration
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Full-Stack Developer',
  description:
    'Passionate Full-Stack Web Developer with 3+ years of professional experience turning ideas into reality.',
  url: 'https://your-portfolio.com',
  author: 'Your Name',
  keywords: [
    'Full-Stack Developer',
    'Web Developer',
    'React',
    'Next.js',
    'TypeScript',
  ],
} as const;

// Social Links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'your.email@example.com',
} as const;

// Navigation Items
export const NAV_ITEMS = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#stack', label: 'MY STACK' },
  { href: '#projects', label: 'PROJECTS' },
  { href: '#contact', label: 'CONTACT' },
] as const;

// Tech Stack Categories
export const TECH_STACK = {
  frontend: [
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'TailwindCSS', icon: 'tailwind' },
  ],
  backend: [
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Express.js', icon: 'express' },
    { name: 'RESTful APIs', icon: 'api' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'MongoDB', icon: 'mongodb' },
  ],
  tools: [
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Figma', icon: 'figma' },
    { name: 'VS Code', icon: 'vscode' },
  ],
} as const;
