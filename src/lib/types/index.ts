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

// SEO types
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}
