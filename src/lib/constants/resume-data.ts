// ─── Resume data ─────────────────────────────────────────────────────────────
// Edit this file to update the web resume at /web-resume.
// The Drive link below also controls the PDF download button.

export const resumeHeader = {
  name: 'Ketul Kishorbhai Chhaya',
  role: '',
  location: 'Germantown, MD (open to relocation)',
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
    title: 'Software Engineer',
    company: 'BizChat',
    companyLink: 'https://bizchat-io.vercel.app',
    location: 'Baltimore, MD',
    period: 'May 2025 – Present',
    current: true,
    bullets: [
      'Optimized Firestore read volume 108x (2,800 to 26 per query) by architecting an inverted index served through a Next.js API, with weekly incremental rebuilds on Cloud Run that skip unchanged records via content hash diffing.',
      'Engineered zero-loss model switching for 220+ entrepreneurs by building a multi-provider LLM router across OpenAI, Claude, Mistral, and Llama with persistent session state in Firebase.',
      'Reduced monthly LLM token spend 40% by replacing a custom Puppeteer scraper with the Tavily API, removing full page HTML from model inputs, traced via tokenwise-tracker, an open-source proxy I built.',
      'Cut AI suggestion latency 72% (8s to 2.2s) by engineering a ProseMirror streaming pipeline in Next.js and TypeScript that renders NDJSON chunks as inline diff decorations with zero layout shift or document history pollution.',
      'Quantified the user acceptance, revision, and retention patterns behind a CHI publication by piping 100K+ Firestore telemetry events into BigQuery and surfacing SQL results through an auto refreshing data connector.',
      'Owned an end-to-end testing and release safety net across Chromium, Firefox, and WebKit, cutting QA triage time by 60% by automating a Playwright CI/CD pipeline with Slack alerts and hosted reports to catch pre-production regressions.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Aavenir',
    companyLink: 'https://aavenir.com',
    location: 'Ahmedabad, GJ',
    period: 'Jan 2023 – Jun 2024',
    current: false,
    bullets: [
      'Overhauled contract migration from two weeks to five days across 8,000+ contracts by running AI metadata extraction in parallel with per document timeouts and fallback handling, built on Python ETL pipelines and Spring Boot REST services.',
      'Developed a NestJS approval microservice that routes contracts through parallel review then sequential executive sign off by contract value and department, reducing legal approval cycle time 50%.',
      'Prevented 6+ concurrent edit collisions on shared enterprise contracts by engineering real-time presence detection and distributed lock webhooks between Office.js Word add-ins and the core web app.',
      'Automated new client instance provisioning with a Node.js toolkit that standardizes contract models, templates, fields, views, and business rules, saving 110+ engineering hours of manual setup across 4 deployments.',
      'Decreased administrative setup overhead by 35% by developing an AngularJS administration console featuring drag-and-drop workflow builders, interactive audit logs, and form validation.',
    ],
  },
  {
    title: 'Full Stack Engineer Intern',
    company: 'ClosestCloset',
    companyLink: 'https://closestcloset.com',
    location: 'Remote (Chicago, IL)',
    period: 'Jun 2022 – Dec 2022',
    current: false,
    bullets: [
      'Diagnosed a 5s MongoDB ranking bottleneck and cut query latency 84% to 800ms via automated score precomputation using Node.js based cron jobs and Redis caching.',
      'Reduced customer support tickets by 40% by adding a buyer-seller chat portal using Node.js, Azure Web PubSub, and React with automated offline email fallbacks.',
      'Unblocked the marketing operations team with a modular internal CMS in React/Redux featuring preview rendering, scheduling, and reusable UI components, removing 12 recurring developer support requests per week.',
    ],
  },
];

export const resumeProjects = [
  {
    name: 'PayPipe',
    tech: ['FastAPI', 'Apache Kafka', 'Docker', 'Python'],
    link: 'https://github.com/KetulChhaya/PayPipe',
    linkLabel: 'github.com/KetulChhaya/PayPipe',
    bullet:
      'Engineered a fault-tolerant, event driven payment pipeline achieving exactly once processing via Redis SETNX idempotency keys, with exponential backoff retries and a dead-letter queue isolating failures.',
  },
  {
    name: 'Repo Graph',
    tech: ['TypeScript', 'ts-morph', 'SQLite'],
    link: 'https://github.com/KetulChhaya/repo-graph',
    linkLabel: 'github.com/KetulChhaya/repo-graph',
    bullet:
      'Built a TypeScript MCP server that parses a codebase into an import dependency graph, highlighting circular imports and tracing the blast radius of a file change across 1,448 files in 1.1s.',
  },
  {
    name: 'CiteSight – GEO Agent',
    tech: ['FastAPI', 'LangGraph', 'Temporal', 'pgvector', 'Docker'],
    link: 'https://github.com/KetulChhaya/GEO-Agent',
    linkLabel: 'github.com/KetulChhaya/GEO-Agent',
    bullet:
      "Orchestrated a LangGraph and Temporal pipeline that embeds a company site into pgvector, probes Claude, GPT, and Gemini with buyer intent questions, and scores brand visibility by measuring engine answers against the site's own content.",
  },
  {
    name: 'Scheduler Reflow',
    tech: ['TypeScript', 'Luxon', 'Vitest'],
    link: 'https://github.com/KetulChhaya/scheduler-reflow',
    linkLabel: 'github.com/KetulChhaya/scheduler-reflow',
    bullet:
      "Implemented a TypeScript based scheduling engine that reflows orders around delays and maintenance windows via Kahn's topological sort and greedy shift-aware placement.",
  },
];

export const resumeSkills = [
  {
    label: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'Angular', 'TailwindCSS', 'ProseMirror', 'Redux', 'Zustand', 'Webpack', 'Turborepo', 'WCAG', 'Figma'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'NestJS', 'Express', 'FastAPI', 'Spring Boot', 'REST APIs', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Firestore', 'BigQuery', 'SQLite', 'Redis', 'Kafka', 'Temporal', 'WebSockets', 'Caching', 'ElasticSearch'],
  },
  {
    label: 'Cloud / DevOps',
    items: ['AWS', 'GCP', 'Azure', 'ServiceNow', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Datadog', 'Linux', 'JUnit', 'Jest', 'Vitest', 'Playwright'],
  },
  {
    label: 'AI / LLM',
    items: ['AWS Bedrock', 'OpenAI', 'Anthropic', 'LangChain', 'LangGraph', 'RAG', 'MCP'],
  },
];

export const resumeEducation = [
  {
    degree: 'M.S. in Computer Science',
    gpa: 'GPA: 4.0/4.0',
    note: 'ranked #1 in cohort',
    school: 'University of Maryland, Baltimore County',
    location: 'Baltimore, MD',
    period: 'Aug 2024 – May 2026',
  },
  {
    degree: 'B.Tech. in Information & Communication Technology',
    gpa: 'GPA: 9.65/10',
    note: 'Top 5 in cohort',
    school: 'Pandit Deendayal Energy University',
    location: 'Gandhinagar, GJ',
    period: 'Aug 2019 – Dec 2022',
  },
];
