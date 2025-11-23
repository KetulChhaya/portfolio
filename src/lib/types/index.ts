// Navigation types
export interface NavItem {
  href: string;
  label: string;
}

// Tech stack types
export interface TechItem {
  name: string;
  icon: string;
}

export interface TechStack {
  frontend: TechItem[];
  backend: TechItem[];
  tools: TechItem[];
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'personal' | 'team' | 'client';
  featured?: boolean;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  platform: 'medium' | 'hashnode' | 'dev';
  publishedAt: string;
  readTime?: number;
}

// Contact form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// GitHub API types
export interface GitHubRepository {
  id: string;
  name: string;
  description: string;
  language: string;
  stargazers: number;
  forks: number;
  updatedAt: string;
  url: string;
  isPrivate: boolean;
  dependencies?: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  };
}

// SEO types
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}
