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
      'Architected a provider-agnostic AI proxy platform engine using Node.js and AWS Bedrock, improving first-draft payload acceptance from 45% to 72% by designing a dynamic runtime routing layer based on content schemas, latency profiles, and fallback thresholds.',
      'Shipped section-level agents pipeline with human-in-loop using LangGraph, LangChain and TypeScript for approve/edit/skip actions, enabling targeted AI re-prompts instead of full regeneration, cutting per-revision cost up to 65%.',
      'Created and open-sourced a TypeScript observability npm package tracking token usage, latency, and per-endpoint cost; deployed in BizChat, surfacing a 37% cost overrun fixed via model rerouting.',
      'Built an event-driven analytics dashboard using React and Firestore, scaling data ingestion to process 100K+ live events without query degradation, reducing internal product debugging times for researchers.',
      'Built an automated test suite using Playwright for distinct features, integrating it into CI pipelines across multiple environments with Slack and email failure alerts to prevent production regressions.',
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
      'Designed a high-throughput asynchronous ETL pipeline in Python, compressing enterprise data migration time from 14 days to 5 days by implementing parallel workers and optimizing batch metadata writes across 8,000+ relational entities.',
      'Implemented a real-time concurrency management layer using JavaScript webhooks, completely eliminating document write collisions across 6+ simultaneous reviewers by synchronizing live session states into ServiceNow.',
      'Authored a core approval engine microservice utilizing distributed RESTful APIs, automating over 72 critical enterprise approvals monthly and cutting system processing latency by 45% through conditional parallel and sequential evaluation trees.',
      'Implemented workflow administration console using AngularJS supporting approval configuration, trigger orchestration, delegation management, and audit timeline visualization, reducing manual workflow management effort by 35%.',
    ],
  },
  {
    title: 'Full Stack Engineer Intern',
    company: 'ClosestCloset',
    companyLink: 'https://closestcloset.com',
    location: 'Remote (Chicago, IL)',
    period: 'Oct 2022 – Dec 2022',
    current: false,
    bullets: [
      'Optimized database throughput by replacing heavy, per-request MongoDB aggregations with scheduled cron pre-computations and a Redis caching tier, accelerating API response times from 5,000ms to 800ms on high-traffic product profile pages.',
      'Built an order-status chat service using Node.js and Azure Web PubSub, connecting buyers and sellers, with custom WebSocket reconnection and email fallback for offline users, cutting support tickets 38%.',
      'Headed the full-stack migration of core content assets from WordPress to an internal React, Express, and MongoDB CMS, enabling seamless self-service marketing deployment while saving 12 engineering tickets weekly in engineering operational overhead.',
      'Developed robust unit and functional tests using Jest and Supertest for backend microservices and RESTful API endpoints, working under senior supervision to increase release confidence by 38%.',
    ],
  },
];

export const resumeProjects = [
  {
    name: 'TokenWise Tracker',
    tech: ['TypeScript', 'Node.js', 'OpenAI SDK'],
    link: 'https://npmjs.com/package/tokenwise-tracker',
    linkLabel: 'npmjs.com/package/tokenwise-tracker',
    bullet:
      'Developed an open source TypeScript middleware package tracking LLM token usage, latency, and costs inside database logging layers to provide a plug and play telemetry and observability module.',
  },
  {
    name: 'PayPipe',
    tech: ['FastAPI', 'Apache Kafka', 'Docker', 'Python'],
    link: 'https://github.com/KetulChhaya/PayPipe',
    linkLabel: 'github.com/KetulChhaya/PayPipe',
    bullet:
      'Engineered an event driven payment architecture using FastAPI and Apache Kafka, implementing distributed consumer idempotency to safely prevent duplicate transaction processing across Docker microservices.',
  },
  {
    name: 'Repo Graph',
    tech: ['TypeScript', 'Node.js', 'MCP Server'],
    link: 'https://github.com/KetulChhaya/repo-graph',
    linkLabel: 'github.com/KetulChhaya/repo-graph',
    bullet:
      'Architected a TypeScript monorepo engine and MCP server indexing 1,400+ files in 1.1 seconds, running algorithms to detect circular dependency cycles across file imports and exports for structural AI queries.',
  },
];

export const resumeSkills = [
  {
    label: 'Languages / Databases',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'Firebase/Firestore', 'NoSQL'],
  },
  {
    label: 'Frameworks / Libraries',
    items: ['Node.js', 'NestJS', 'Express', 'Spring Boot', 'FastAPI', 'React', 'Angular', 'RESTful APIs', 'GraphQL', 'WebSockets', 'Tailwind CSS'],
  },
  {
    label: 'Cloud / Tools',
    items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Datadog', 'Linux', 'Git', 'Jest', 'Supertest'],
  },
  {
    label: 'AI / ML / LLM',
    items: ['AWS Bedrock', 'OpenAI', 'Anthropic', 'Hugging Face', 'LangChain', 'MCP', 'RAG', 'LLM Observability'],
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
