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
      'Architected a scalable, provider-agnostic AI service exposing RESTful APIs across AWS Bedrock, OpenAI, and Hugging Face, routing Claude, Llama, and GPT by content type and user profile, lifting first-draft acceptance from 45% to 72%.',
      'Shipped a section-level revision pipeline with human-in-loop using LangChain and TypeScript for approve/edit/skip actions, enabling targeted AI re-prompts instead of full plan regeneration and cutting per-revision cost up to 65%.',
      'Instrumented Datadog APM observability with distributed tracing across AI request pipelines, tracking model latency, provider failures/fault tolerance, and token consumption to cut production triage time by 60%.',
      'Engineered event-driven operational dashboards with React over a Firestore events layer, giving researchers real-time visibility into 100K+ onboarding, plan-generation, and survey events without writing queries.',
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
      'Built a Python asynchronous ETL data pipeline orchestrating AI-driven metadata extraction, field mapping, and lifecycle updates across 8,000+ legacy contracts, compressing migration from 2 weeks to 5 days.',
      'Created health monitoring and alerting workflows for contract approval services, exposing workflow bottlenecks and reducing incident resolution time through proactive operational visibility.',
      'Maintained GitHub Actions CI/CD pipeline with automated test gates, environment-specific deployments, and build failure alerts, reducing manual deployment steps and catching regressions before production.',
      'Designed and implemented a NestJS approval microservice with RESTful APIs supporting hybrid parallel/sequential routing and amount-based rules, automating 72+ approvals/month and cutting processing time 45%.',
      'Implemented an approval system UI using Angular with workflow configuration, trigger controls, and approval history timeline.',
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
      'Replaced per-request MongoDB ranking aggregations with a scheduled precompute job and Redis caching layer, improving scalability and cutting API response from 5s to 800ms on profile and comparison pages.',
      'Built a Node.js order-status chat service connecting buyers and sellers in real time on Azure Web PubSub, with custom WebSocket reconnection and email fallback for offline users, cutting support tickets 38%.',
      'Developed a full-stack CMS with React, Express, and MongoDB enabling marketing to publish landing pages, banners, and promotions independently, eliminating 12 engineering tickets per week.',
      'Developed unit and integration test suites for user and product API endpoints, increasing release confidence 38% and preventing regressions during frequent deployments.',
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
      'Built observability middleware inspired by Datadog APM, collecting request traces, token usage, latency distributions, and cost metrics for OpenAI-powered applications, enabling proactive performance monitoring and anomaly detection.',
  },
  {
    name: 'Repo Graph',
    tech: ['Node.js', 'TypeScript', 'SQLite', 'MCP'],
    link: 'https://github.com/KetulChhaya/repo-graph',
    linkLabel: 'github.com/KetulChhaya/repo-graph',
    bullet:
      'Designed a TypeScript code-graph engine (CLI, MCP server, dashboard) that parses JavaScript/TypeScript monorepos and runs BFS blast-radius, Tarjan cycle detection, and git-diff impact analysis; indexes 1,400+ files in 1.1s, exposes deterministic structural queries to AI coding agents over MCP.',
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
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C# (.NET)', 'SQL', 'React', 'Angular', 'HTML', 'CSS'],
  },
  {
    label: 'Backend & Data',
    items: ['Node.js', 'NestJS', 'Express', 'FastAPI', 'GraphQL', 'REST/RESTful APIs', 'WebSockets', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase/Firestore', 'NoSQL'],
  },
  {
    label: 'AI / LLM',
    items: ['AWS Bedrock', 'OpenAI', 'Anthropic', 'Hugging Face', 'RAG', 'LangChain', 'MCP', 'LLM Observability'],
  },
  {
    label: 'Cloud & Tools',
    items: ['AWS', 'Azure', 'Terraform', 'Datadog', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Linux', 'Git', 'Jest'],
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

export const resumePublications = [
  {
    title: 'Advent of Big Data Technology in Environment & Water Management',
    venue: 'Springer ESPR',
    year: '2021',
    note: '34 citations',
    link: 'https://link.springer.com/article/10.1007/s11356-021-14017-y',
  },
];
