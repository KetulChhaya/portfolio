// ─── Resume data ─────────────────────────────────────────────────────────────
// Edit this file to update the web resume at /web-resume.
// The Drive link below also controls the PDF download button.

export const resumeHeader = {
  name: 'Ketul Kishorbhai Chhaya',
  role: '',
  location: 'Germantown, MD',
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
      'Reduced Firestore reads by 108x (2,800 to 26 per query) by building an inverted index, rebuilt weekly by a scheduled Cloud Run function that uses content hashing to update only changed records, and served through a Next.js API.',
      'Shipped a multi-provider model router adopted by 64% of active users, enabling zero-loss mid-session switching across OpenAI, Claude, Mistral, and Llama via Firebase persistence.',
      'Engineered a TypeScript/Firestore pipeline aggregating 100K+ telemetry events into human-AI collaboration metrics, surfaced via a React dashboard for a CHI publication.',
      'Reduced monthly LLM costs by migrating a scraping workload that drove 40% of token spend, identified via a self-built open-source TypeScript proxy, tokenwise-tracker.',
      'Built a streaming AI edit pipeline in TypeScript, Next.js, and AWS Bedrock, where the LLM emits NDJSON ops against a custom ProseMirror section schema, replacing a 700-line fuzzy matcher.',
      'Automated an end-to-end Playwright test suite covering the full user journey across Chromium, Firefox, and WebKit, with Slack alerts and report links that caught regressions before production.',
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
      'Reduced contract migration time from two weeks to five days by building Python ETL pipelines and Spring Boot REST services, processing 8,000+ contracts with AI-driven metadata extraction.',
      'Prevented 6+ concurrent redlining collisions on shared contracts with a JavaScript webhook based locking and presence system between the Office.js Word add-in and ContractFlow portal.',
      'Designed a Spring Boot provisioning service using dependency injection and modular service abstractions to aggregate configuration across client environments, saving 100+ engineering hours across 4 deployments.',
      'Scaled a NestJS approval microservice to route contracts through parallel or sequential approver chains by value, cutting approval turnaround 50% over the prior manual process.',
      'Implemented an AngularJS admin console to configure approvals, triggers, delegations, and audit timelines, cutting manual workflow effort 35%.',
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
      'Optimized MongoDB ranking API from 5s to 800ms by precomputing and caching scores via Node.js cron job, reducing query latency by 84%.',
      'Launched a real-time Node.js chat service on Azure Web PubSub with a React client linking buyers and sellers, with email fallback for offline users, cutting order-status support tickets by 40%.',
      'Built internal CMS in React, Express, and MongoDB enabling marketing to self-publish campaign pages and edit site content, eliminating 12 engineering tickets per week.',
    ],
  },
];

export const resumeProjects = [
  {
    name: 'CiteSight – GEO Agent',
    tech: ['FastAPI', 'React', 'LangGraph', 'Postgres', 'Docker'],
    link: 'https://github.com/KetulChhaya/GEO-Agent',
    linkLabel: 'github.com/KetulChhaya/GEO-Agent',
    bullet:
      'Building a LangGraph and Temporal pipeline that crawls sites into pgvector, probes Claude/GPT/Gemini in parallel on buyer intent questions, and scores brand visibility via cosine similarity gaps with sourced fixes.',
  },
  {
    name: 'PayPipe',
    tech: ['FastAPI', 'Apache Kafka', 'Docker', 'Python'],
    link: 'https://github.com/KetulChhaya/PayPipe',
    linkLabel: 'github.com/KetulChhaya/PayPipe',
    bullet:
      'Designed a fault-tolerant, event-driven payment pipeline (FastAPI, Kafka) achieving exactly-once processing guarantees via Redis SETNX idempotency keys, with exponential backoff retries and a dead-letter queue to isolate failures.',
  },
  {
    name: 'Repo Graph',
    tech: ['TypeScript', 'ts-morph', 'SQLite'],
    link: 'https://github.com/KetulChhaya/repo-graph',
    linkLabel: 'github.com/KetulChhaya/repo-graph',
    bullet:
      'Built a TypeScript MCP server that parses a codebase into an import dependency graph, helping AI agents catch circular imports that break builds and trace what a file change affects across 1,448 files in 1.1s.',
  },
  {
    name: 'Scheduler Reflow',
    tech: ['TypeScript', 'Luxon', 'Vitest'],
    link: 'https://github.com/KetulChhaya/scheduler-reflow',
    linkLabel: 'github.com/KetulChhaya/scheduler-reflow',
    bullet:
      "Designed a TypeScript production-scheduling engine that reflows orders around delays and maintenance windows via Kahn's topological sort and greedy shift-aware placement, covered by 16 Vitest cases.",
  },
];

export const resumeSkills = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    label: 'Frameworks',
    items: ['Node.js', 'NestJS', 'Express', 'FastAPI', 'React', 'Next.js', 'Angular', 'Spring Boot', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Data & Systems',
    items: ['PostgreSQL', 'MongoDB', 'Firestore', 'Redis', 'Kafka', 'Temporal', 'WebSockets', 'Distributed Caching'],
  },
  {
    label: 'Cloud & DevOps',
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
