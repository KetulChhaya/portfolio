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
      'Shipped a multi-provider model router adopted by 64% of active users, enabling mid-session switching across OpenAI, Claude, Mistral, and Llama with zero context loss via Firebase-persisted session state.',
      'Engineered a Firestore aggregation pipeline normalizing 100K+ heterogeneous usage events into structured competency metrics, surfaced via a React dashboard that backed an accepted CHI publication.',
      'Open sourced tokenwise-tracker, a TypeScript proxy logging LLM cost, latency, and metadata per endpoint, exposing a custom scraping endpoint that drove 40% of token spend and cutting monthly LLM cost 25% after migrating it to Tavily.',
      'Raised business-plan exports 70% by building a section-revision pipeline using TypeScript and Next.js with human-in-the-loop evaluation tied to user onboarding context.',
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
      'Cut contract migration from two weeks to five days with a Python ETL pipeline on ServiceNow workers that moved 8,000+ contracts into ContractFlow using AI metadata extraction.',
      'Prevented 6+ concurrent redlining collisions on shared contracts with a JavaScript webhook based locking and presence system between the Office.js Word add-in and ContractFlow portal.',
      'Designed a provisioning engine that aggregated config across existing client environments into a reusable baseline, auto setting up new ContractFlow clients and saving 100+ engineering hours across 4 deployments.',
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
      'Optimized MongoDB ranking API from 5s to 800ms by offloading a global aggregation to a Node.js cron job that precomputed and cached scores every 2 hours.',
      'Launched a real-time Node.js chat service on Azure Web PubSub with a React client linking buyers and sellers, with email fallback for offline users, cutting order-status support tickets by 40%.',
      'Built an internal CMS in React, Express, and MongoDB that let marketing self-publish campaign pages and edit site content, removing roughly 12 engineering tickets per week.',
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
      'Built an event-driven payment service with FastAPI and Kafka that prevents double charges using Redis SETNX idempotency keys, with exponential backoff retries and a dead-letter queue.',
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
  {
    name: 'Spotify Mixer',
    tech: ['React', 'TypeScript', 'Web Audio API'],
    link: 'https://github.com/KetulChhaya/spotify-mixer',
    linkLabel: 'github.com/KetulChhaya/spotify-mixer',
    bullet:
      'Developed a browser-based DJ mixer in React and TypeScript that crossfades and beat-syncs two live Spotify decks in real time through a Web Audio API graph of gain and filter nodes.',
  },
];

export const resumeSkills = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'React', 'Next.js', 'Angular', 'REST APIs', 'GraphQL', 'WebSockets', 'Microservices', 'ServiceNow'],
  },
  {
    label: 'Data',
    items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase/Firestore', 'Kafka'],
  },
  {
    label: 'DevOps',
    items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Datadog', 'Linux', 'Git', 'Jest', 'Playwright', 'Agile/Scrum'],
  },
  {
    label: 'AI / LLM',
    items: ['AWS Bedrock', 'OpenAI', 'Anthropic', 'LangChain', 'MCP', 'RAG', 'Hugging Face'],
  },
];

export const resumeEducation = [
  {
    degree: 'M.S. in Computer Science',
    gpa: 'GPA: 4.0/4.0',
    note: 'ranked #1 in cohort',
    school: 'University of Maryland, Baltimore County',
    location: 'Baltimore, MD',
    period: 'Aug. 2024 – May 2026',
  },
  {
    degree: 'B.Tech. in Information & Communication Technology',
    gpa: 'GPA: 9.65/10',
    note: 'Top 5',
    school: 'Pandit Deendayal Energy University',
    location: 'Gandhinagar, GJ',
    period: 'Aug. 2019 – Dec. 2022',
  },
];
