// ─── Resume data ─────────────────────────────────────────────────────────────
// Edit this file to update the web resume at /web-resume.
// The Drive link below also controls the PDF download button.

export const resumeHeader = {
  name: 'Ketul Kishorbhai Chhaya',
  role: '',
  location: 'New York City, NY',
  email: 'chhayaketul.dev@gmail.com',
  phone: '443-851-9503',
  portfolio: { label: 'ketulchhaya.com', href: 'https://www.ketulchhaya.com' },
  linkedin: { label: 'LinkedIn', href: 'https://linkedin.com/in/ketul-chhaya' },
  github: { label: 'GitHub', href: 'https://github.com/KetulChhaya' },
  summary:
    "AI-focused backend engineer. Architected BizChat, an LLM platform serving 220+ Baltimore entrepreneurs via the Mayor's Office, with routing across Bedrock/OpenAI/Anthropic and an open-source observability package.",
  drivePdf:
    'https://drive.google.com/file/d/11ShXTCzDhkrfcFCH5YLznlLnBcAh7fG2/view?usp=sharing',
};

export const resumeExperiences = [
  {
    title: 'Software Engineer – Platform & AI',
    company: 'BizChat',
    companyLink: 'https://bizchat-io.vercel.app',
    location: 'Baltimore, MD',
    period: 'May 2025 – May 2026',
    current: true,
    bullets: [
      'Architected a provider-agnostic AI module across AWS Bedrock, OpenAI, and Hugging Face, routing Claude, Llama, and GPT by content type and user profile, lifting first-draft acceptance from 45% to 72%.',
      'Shipped a section-level revision pipeline with human-in-loop using LangChain for approve/edit/skip diff flow, enabling targeted AI re-prompts instead of full plan regeneration and cutting per-revision cost up to 65%.',
      'Created Playwright-based scraper auto-detecting static/SPA sites and using OpenAI to extract structured business data from arbitrary URLs, with robots.txt compliance and manual-entry fallback, cutting entrepreneur onboarding from 24 to 4 mins.',
      'Engineered a research analytics subsystem aggregating 100K+ events into per-participant journey views across onboarding, AI interactions, plan revisions, and survey responses, accessible to non-technical researchers without writing queries.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Aavenir',
    companyLink: 'https://aavenir.com',
    location: 'Ahmedabad, GJ',
    period: 'Jan 2023 – Jun. 2024',
    current: false,
    bullets: [
      'Built a Python ETL pipeline orchestrating AI-driven metadata extraction, field mapping, document attachment, and lifecycle status updates across 8,000+ legacy contracts (MSAs, NDAs, BAAs), compressing migration time from 2 weeks to 5 days.',
      'Maintained GitHub Actions CI/CD pipeline with automated test gates, environment-specific deployments, and build failure alerts, reducing manual deployment steps and catching regressions before production.',
      'Designed and implemented a NestJS approval workflow engine supporting hybrid parallel and sequential routing with amount-based rules, automating 72+ contract approvals/month and reducing processing time by 45%.',
      'Built an approval system UI using Angular with workflow configuration, trigger controls, and approval history timeline.',
    ],
  },
  {
    title: 'Full Stack Engineer Intern',
    company: 'ClosestCloset LLC',
    companyLink: 'https://closestcloset.com',
    location: 'Remote (Chicago, IL)',
    period: 'Oct 2022 – Dec 2022',
    current: false,
    bullets: [
      'Replaced per-request MongoDB user ranking aggregations with a scheduled precompute job storing results in Redis, cutting API response time from 5s to 800ms on the my-profile and product comparison pages.',
      'Built a Node.js order-status chat service connecting buyers and sellers in real time on Azure Web PubSub, with custom WebSocket reconnection and email fallback for offline users, cutting support tickets 38%.',
      'Developed a full-stack CMS with React, Express, and MongoDB enabling marketing to publish landing pages, banners, and promotions independently, eliminating 12 engineering tickets per week.',
      'Orchestrated GraphQL API for ClosestCloset connecting 3 backend services across 4 feature modules, standardizing query contracts and decoupling the client from recommendation and data providers.',
    ],
  },
];

export const resumeOpenSource = [
  {
    name: 'Tokenwise Tracker',
    tech: ['Node.js', 'OpenAI SDK', 'Observability'],
    link: 'https://npmjs.com/package/tokenwise-tracker',
    linkLabel: 'npmjs.com/package/tokenwise-tracker',
    bullet:
      'Open-sourced production observability middleware for OpenAI APIs logging per-request token usage, latency, and cost; aggregate dashboards flag expensive prompts and model misroutings before they hit production budgets.',
  },
  {
    name: 'Repo Graph',
    tech: ['Node.js', 'TypeScript', 'SQLite', 'MCP'],
    link: 'https://github.com/KetulChhaya/repo-graph',
    linkLabel: 'github.com/KetulChhaya/repo-graph',
    bullet:
      'TypeScript code-graph engine (CLI, MCP server, dashboard) that parses JS/TS monorepos and runs BFS blast-radius, Tarjan cycle detection, and git-diff impact analysis; indexes 1,400+ files in 1.1s, exposes deterministic structural queries to AI coding agents over MCP.',
  },
  {
    name: 'Production Reflow',
    tech: ['TypeScript', 'Java', 'Luxon'],
    link: 'https://github.com/KetulChhaya/scheduler-reflow',
    linkLabel: 'github.com/KetulChhaya/scheduler-reflow',
    bullet:
      "Scheduling algorithm rescheduling manufacturing work orders after disruptions using Kahn's algorithm for topological ordering over a dependency DAG, then greedily assigning time slots respecting work-center exclusivity, shift boundaries, and maintenance windows.",
  },
];

export const resumeSkills = [
  {
    label: 'Languages & Frontend',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'React', 'Angular', 'HTML', 'CSS'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'NestJS', 'Express', 'GraphQL', 'REST APIs', 'WebSockets', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'AI / LLM',
    items: ['AWS Bedrock', 'OpenAI', 'Anthropic', 'Hugging Face', 'RAG', 'LangChain', 'MCP', 'LLM Observability'],
  },
  {
    label: 'Cloud & Tools',
    items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'ServiceNow', 'Playwright', 'Linux', 'Git'],
  },
];

export const resumeEducation = [
  {
    degree: 'M.S. in Computer Science',
    gpa: 'GPA: 4.0/4.0',
    note: 'ranked #1 in graduating cohort',
    school: 'University of Maryland, Baltimore County',
    location: 'Baltimore, MD',
    period: 'Aug. 2024 – May 2026',
  },
  {
    degree: 'B.Tech. in Information and Communication Technology',
    gpa: 'GPA: 9.65/10',
    note: 'Top 5',
    school: 'Pandit Deendayal Energy University',
    location: 'Gandhinagar, GJ',
    period: 'Aug. 2019 – Dec. 2022',
  },
];
