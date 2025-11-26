'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { TechTooltip } from '@/components/ui/tech-tooltip';
import { fadeInUp, stagger } from '@/lib/constants/animations';
import { fetchGitHubRepositoriesWithDependencies } from '@/lib/api/github';
import { PROFILES } from '@/lib/constants/profiles';
import type { GitHubRepository } from '@/lib/api/github';
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiTailwindcss,
  SiMui,
  SiBootstrap,
  SiRedux,
  SiReactquery,
  SiReacthookform,
  SiFormik,
  SiZod,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFastapi,
  SiDjango,
  SiFlask,
  SiJsonwebtokens,
  SiAuth0,
  SiPassport,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSqlite,
  SiPrisma,
  SiSequelize,
  SiMongoose,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiGitlab,
  SiBitbucket,
  SiAmazon,
  SiFirebase,
  SiGooglecloud,
  SiOpenai,
  SiHuggingface,
  SiLangchain,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiJest,
  SiCypress,
  SiMocha,
  SiSocketdotio,
  SiApachekafka,
  SiRabbitmq,
  SiPrometheus,
  SiGrafana,
  SiSentry,
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
} from 'react-icons/fa';
import { useTheme } from 'next-themes';

// Note: The included repositories list is now secured on the backend
// See src/app/api/github/route.ts for the list


// Icon mapping for technologies with brand colors
const techIcons: {
  [key: string]: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
  };
} = {
  // All Technologies (no categories)
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  Python: { icon: SiPython, color: '#3776AB' },
  Java: { icon: FaJava, color: '#ED8B00' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  HTML5: { icon: SiHtml5, color: '#E34F26' },
  CSS3: { icon: SiCss3, color: '#1572B6' },
  React: { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#000000' },
  Angular: { icon: SiAngular, color: '#DD0031' },
  'Vue.js': { icon: SiVuedotjs, color: '#4FC08D' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Material UI': { icon: SiMui, color: '#007FFF' },
  'Chakra UI': { icon: FaPalette, color: '#319795' },
  'ShadCN UI': { icon: FaPalette, color: '#000000' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  'Redux Toolkit': { icon: SiRedux, color: '#764ABC' },
  Zustand: { icon: FaCogs, color: '#FF6B35' },
  'React Query': { icon: SiReactquery, color: '#FF4154' },
  'TanStack Query': { icon: SiReactquery, color: '#FF4154' },
  SWR: { icon: FaCode, color: '#000000' },
  'React Hook Form': { icon: SiReacthookform, color: '#EC5990' },
  Formik: { icon: SiFormik, color: '#172B4D' },
  Zod: { icon: SiZod, color: '#3E63DD' },
  Yup: { icon: FaCode, color: '#FF6B35' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express.js': { icon: SiExpress, color: '#000000' },
  NestJS: { icon: SiNestjs, color: '#E0234E' },
  Fastify: { icon: FaCogs, color: '#000000' },
  FastAPI: { icon: SiFastapi, color: '#009688' },
  Django: { icon: SiDjango, color: '#092E20' },
  Flask: { icon: SiFlask, color: '#000000' },
  JWT: { icon: SiJsonwebtokens, color: '#000000' },
  OAuth2: { icon: SiAuth0, color: '#EB5424' },
  'Passport.js': { icon: SiPassport, color: '#34E27A' },
  bcrypt: { icon: FaShieldAlt, color: '#000000' },
  PostgreSQL: { icon: SiPostgresql, color: '#336791' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  Redis: { icon: SiRedis, color: '#DC382D' },
  SQLite: { icon: SiSqlite, color: '#003B57' },
  Prisma: { icon: SiPrisma, color: '#2D3748' },
  TypeORM: { icon: FaDatabase, color: '#E83524' },
  Sequelize: { icon: SiSequelize, color: '#52B0E7' },
  Mongoose: { icon: SiMongoose, color: '#880000' },
  'Knex.js': { icon: FaDatabase, color: '#D26B38' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  'Docker Compose': { icon: SiDocker, color: '#2496ED' },
  Kubernetes: { icon: SiKubernetes, color: '#326CE5' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  'GitLab CI': { icon: SiGitlab, color: '#FCA326' },
  'Bitbucket Pipelines': { icon: SiBitbucket, color: '#0052CC' },
  'AWS SDK': { icon: SiAmazon, color: '#FF9900' },
  'Firebase Admin SDK': { icon: SiFirebase, color: '#FFCA28' },
  'Google Cloud SDK': { icon: SiGooglecloud, color: '#4285F4' },
  'Azure SDK': { icon: FaAws, color: '#0078D4' },
  'OpenAI SDK': { icon: SiOpenai, color: '#412991' },
  'HuggingFace Transformers': { icon: SiHuggingface, color: '#FF9D00' },
  LangChain: { icon: SiLangchain, color: '#1C3C3C' },
  LlamaIndex: { icon: FaCode, color: '#FF6B35' },
  vLLM: { icon: FaCode, color: '#000000' },
  PyTorch: { icon: SiPytorch, color: '#EE4C2C' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  'Scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  NumPy: { icon: SiNumpy, color: '#013243' },
  Pandas: { icon: SiPandas, color: '#150458' },
  Jest: { icon: SiJest, color: '#C21325' },
  'React Testing Library': { icon: SiJest, color: '#E33332' },
  Cypress: { icon: SiCypress, color: '#17202C' },
  Playwright: { icon: FaCode, color: '#2EAD33' },
  Mocha: { icon: SiMocha, color: '#8D6748' },
  Chai: { icon: FaCode, color: '#A30701' },
  PyTest: { icon: FaCode, color: '#0A9EDC' },
  Supertest: { icon: FaCode, color: '#000000' },
  'Socket.io': { icon: SiSocketdotio, color: '#010101' },
  WebSockets: { icon: FaCode, color: '#000000' },
  Kafka: { icon: SiApachekafka, color: '#231F20' },
  RabbitMQ: { icon: SiRabbitmq, color: '#FF6600' },
  'Redis Pub/Sub': { icon: SiRedis, color: '#DC382D' },
  Prometheus: { icon: SiPrometheus, color: '#E6522C' },
  Grafana: { icon: SiGrafana, color: '#F46800' },
  OpenTelemetry: { icon: FaChartLine, color: '#425CC7' },
  Sentry: { icon: SiSentry, color: '#362D59' },
  'New Relic': { icon: FaChartLine, color: '#008C99' },
  ESLint: { icon: FaCode, color: '#4B32C3' },
  Prettier: { icon: FaCode, color: '#F7B93E' },
  Vite: { icon: FaCode, color: '#646CFF' },
  Webpack: { icon: FaCode, color: '#8DD6F9' },
  Babel: { icon: FaCode, color: '#F9DC3E' },
  PostCSS: { icon: FaCode, color: '#DD3A0A' },
  Sass: { icon: FaCode, color: '#CF649A' },
};

// Technology to repository matching logic
function matchTechToRepos(
  tech: string,
  repositories: GitHubRepository[]
): GitHubRepository[] {
  const techLower = tech.toLowerCase();
  const matches: GitHubRepository[] = [];

  // Direct language matches
  const languageMap: { [key: string]: string[] } = {
    javascript: ['javascript', 'js', 'typescript', 'ts'],
    typescript: ['typescript', 'ts', 'javascript', 'js'],
    python: ['python', 'py'],
    java: ['java'],
    'c++': ['c++', 'cpp', 'c'],
    html5: ['html', 'html5'],
    css3: ['css', 'css3'],
    mongodb: ['mongodb', 'mongo'],
    mysql: ['mysql', 'sql'],
    firebase: ['firebase'],
  };

  // Framework/library matches
  const frameworkMap: { [key: string]: string[] } = {
    'next.js': ['next', 'nextjs', 'next.js'],
    'react.js': ['react', 'reactjs', 'react.js', 'react-dom'],
    'node.js': ['node', 'nodejs', 'node.js'],
    'express.js': ['express', 'expressjs', 'express.js'],
    'tailwind css': ['tailwind', 'tailwindcss', 'tailwind-css'],
    prisma: ['prisma', '@prisma'],
    redux: ['redux', '@reduxjs'],
    webpack: ['webpack'],
    vite: ['vite', '@vitejs'],
    graphql: ['graphql', 'apollo', '@apollo', 'graphql-request'],
    'socket.io': ['socket.io', 'socketio', 'socket'],
    redis: ['redis', 'ioredis', 'node-redis'],
    'material-ui': ['material-ui', '@mui', 'mui', '@material-ui'],
    bootstrap: ['bootstrap', 'react-bootstrap'],
    framer: ['framer-motion', 'framer'],
    zod: ['zod'],
    axios: ['axios'],
    eslint: ['eslint', '@eslint'],
    prettier: ['prettier'],
    numpy: ['numpy', 'np'],
    pandas: ['pandas', 'pd'],
    'scikit-learn': ['scikit', 'sklearn', 'scikit-learn', 'machine-learning', 'ml'],
    opencv: ['opencv', 'cv2', 'computer-vision', 'image-processing'],
    docker: ['docker', 'dockerfile', 'container'],
    kafka: ['kafka', 'apache-kafka', 'streaming'],
    aws: ['aws', 'amazon', 's3', 'ec2', 'lambda', 'aws-sdk'],
    vercel: ['vercel', 'deployment'],
    firebase: ['firebase', 'firestore', 'realtime-database', '@firebase'],
    mongodb: ['mongodb', 'mongo', 'mongoose'],
    mysql: ['mysql', 'sql', 'database', 'mysql2'],
    jest: ['jest', 'testing', 'test', '@testing-library'],
    'openai api': ['openai', 'gpt', 'llm', 'ai', '@openai'],
  };

  // Check repository language, name, and description
  repositories.forEach((repo) => {
    const repoLang = repo.language?.toLowerCase() || '';
    const repoName = repo.name.toLowerCase();
    const repoDesc = repo.description?.toLowerCase() || '';

    // Check language matches
    if (languageMap[techLower]) {
      const possibleLangs = languageMap[techLower];
      if (
        possibleLangs.some((lang) => repoLang.includes(lang)) ||
        possibleLangs.some((lang) => repoName.includes(lang)) ||
        possibleLangs.some((lang) => repoDesc.includes(lang))
      ) {
        matches.push(repo);
        return;
      }
    }

    // Check framework matches
    if (frameworkMap[techLower]) {
      const possibleFrameworks = frameworkMap[techLower];
      if (
        possibleFrameworks.some((fw) => repoName.includes(fw)) ||
        possibleFrameworks.some((fw) => repoDesc.includes(fw)) ||
        possibleFrameworks.some((fw) => repoLang.includes(fw))
      ) {
        matches.push(repo);
        return;
      }
    }

    // Direct name/description match (fallback)
    if (
      repoName.includes(techLower) ||
      repoDesc.includes(techLower) ||
      repoLang.includes(techLower)
    ) {
      if (!matches.some((m) => m.id === repo.id)) {
        matches.push(repo);
      }
    }
  });

  // Remove duplicates and sort by stars (most popular first)
  const uniqueMatches = Array.from(
    new Map(matches.map((repo) => [repo.id, repo])).values()
  );
  return uniqueMatches.sort((a, b) => (b.stargazers || 0) - (a.stargazers || 0));
}

interface TechWithRepos {
  name: string;
  repos: GitHubRepository[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

// Function to analyze dependencies from repositories (now done on frontend)
function analyzeDependenciesFromRepos(repos: GitHubRepository[]): Map<string, GitHubRepository[]> {
  const techToRepos = new Map<string, GitHubRepository[]>();
  const frameworkMap = getFrameworkMap();

  repos.forEach((repo) => {
    // No need to check exclusion here since API already filtered
    if (!repo.dependencies) return;

    // Collect all dependencies
    const allDeps = {
      ...repo.dependencies.dependencies,
      ...repo.dependencies.devDependencies,
      ...repo.dependencies.peerDependencies,
    };

    // Match dependencies to technologies
    Object.keys(allDeps).forEach((dep) => {
      const originalDep = dep;
      const depLower = dep.toLowerCase();
      const depWithoutScope = depLower.replace(/^@[^/]+\//, ''); // Remove @scope/ prefix
      
      // Check each technology
      Object.keys(techIcons).forEach((tech) => {
        const techLower = tech.toLowerCase();
        
        if (frameworkMap[techLower]) {
          const keywords = frameworkMap[techLower];
          const matched = keywords.some((keyword) => {
            const keywordLower = keyword.toLowerCase();
            // Multiple matching strategies
            return depLower === keywordLower || 
                   depWithoutScope === keywordLower ||
                   depLower.includes(keywordLower) || 
                   keywordLower.includes(depLower) ||
                   originalDep === keyword; // Exact case-sensitive match
          });
          
          if (matched) {
            if (!techToRepos.has(tech)) {
              techToRepos.set(tech, []);
            }
            const existingRepos = techToRepos.get(tech) || [];
            if (!existingRepos.some((r) => r.id === repo.id)) {
              existingRepos.push(repo);
              techToRepos.set(tech, existingRepos);
            }
          }
        }
      });
    });
  });

  return techToRepos;
}

function getFrameworkMap(): { [key: string]: string[] } {
  return {
    // Frontend Core Frameworks (exact matches first, then partial)
    react: ['react', 'react-dom', 'types/react'],
    'next.js': ['next'],
    angular: ['angular', '@angular/core', '@angular/common'],
    'vue.js': ['vue', '@vue/cli'],

    // UI / Styling Libraries
    'tailwind css': ['tailwindcss', 'tailwind'],
    'material ui': ['@mui/material', '@mui/core', '@material-ui/core', 'material-ui'],
    'chakra ui': ['@chakra-ui/react', '@chakra-ui/core', 'chakra-ui'],
    'shadcn ui': ['@shadcn/ui', 'shadcn'],
    bootstrap: ['bootstrap', 'react-bootstrap'],

    // State Management
    'redux toolkit': ['@reduxjs/toolkit', 'redux'],
    zustand: ['zustand'],
    'react query': ['@tanstack/react-query', 'react-query'],
    'tanstack query': ['@tanstack/react-query'],
    swr: ['swr'],

    // Forms & Validation
    'react hook form': ['react-hook-form'],
    formik: ['formik'],
    zod: ['zod'],
    yup: ['yup'],

    // Backend Node & API Frameworks
    'node.js': ['node', 'nodejs'],
    'express.js': ['express'],
    nestjs: ['@nestjs/core', '@nestjs/common', 'nestjs'],
    fastify: ['fastify'],

    // Python Backend (these won't match in package.json but kept for completeness)
    fastapi: ['fastapi'],
    django: ['django'],
    flask: ['flask'],

    // Authentication & Security
    jwt: ['jsonwebtoken', 'jwt-decode', '@types/jsonwebtoken'],
    oauth2: ['oauth2-server', 'passport-oauth2'],
    'passport.js': ['passport', 'passport-local', 'passport-jwt'],
    bcrypt: ['bcrypt', 'bcryptjs', '@types/bcrypt'],

    // Databases
    postgresql: ['pg', 'postgres', '@types/pg'],
    mysql: ['mysql', 'mysql2', '@types/mysql'],
    mongodb: ['mongodb'],
    redis: ['redis', 'ioredis'],
    sqlite: ['sqlite3', 'better-sqlite3'],

    // ORMs / Query Builders
    prisma: ['@prisma/client', 'prisma'],
    typeorm: ['typeorm'],
    sequelize: ['sequelize'],
    mongoose: ['mongoose', '@types/mongoose'],
    'knex.js': ['knex'],

    // DevOps - Containers & Orchestration (most won't be in package.json)
    docker: ['docker'],
    'docker compose': ['docker-compose'],
    kubernetes: ['kubernetes'],

    // CI/CD (most won't be in package.json)
    'github actions': ['@actions/core', '@actions/github'],
    'gitlab ci': ['gitlab-ci'],
    'bitbucket pipelines': ['bitbucket-pipelines'],

    // Cloud SDKs
    'aws sdk': ['@aws-sdk/client-s3', '@aws-sdk/client-lambda', 'aws-sdk'],
    'firebase admin sdk': ['firebase-admin', 'firebase'],
    'google cloud sdk': ['@google-cloud/storage', '@google-cloud/functions'],
    'azure sdk': ['@azure/storage-blob', '@azure/functions'],

    // AI / ML - LLM / AI SDKs
    'openai sdk': ['openai'],
    'huggingface transformers': ['@huggingface/transformers', 'transformers'],
    langchain: ['langchain', '@langchain/core'],
    llamaindex: ['llamaindex'],
    vllm: ['vllm'],

    // ML Libraries (most are Python, won't be in package.json)
    pytorch: ['torch'],
    tensorflow: ['@tensorflow/tfjs', 'tensorflow'],
    'scikit-learn': ['scikit-learn'],
    numpy: ['numpy'],
    pandas: ['pandas'],

    // Testing
    jest: ['jest', '@types/jest'],
    'react testing library': ['@testing-library/react', '@testing-library/jest-dom'],
    cypress: ['cypress'],
    playwright: ['@playwright/test', 'playwright'],
    mocha: ['mocha', '@types/mocha'],
    chai: ['chai', '@types/chai'],
    pytest: ['pytest'],
    supertest: ['supertest', '@types/supertest'],
    
    // Additional common dependencies
    typescript: ['typescript', '@types/node'],
    javascript: ['javascript'],
    eslint: ['eslint', '@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'],
    prettier: ['prettier'],
    vite: ['vite', '@vitejs/plugin-react'],
    webpack: ['webpack', 'webpack-cli'],
    babel: ['@babel/core', '@babel/preset-env', '@babel/preset-react'],
    postcss: ['postcss', 'autoprefixer'],
    sass: ['sass', 'node-sass'],

    // Real-Time / Messaging
    'socket.io': ['socket.io', 'socket.io-client'],
    websockets: ['ws', 'websocket'],
    kafka: ['kafkajs'],
    rabbitmq: ['amqplib'],
    'redis pub/sub': ['redis', 'ioredis'],

    // Observability / Monitoring
    prometheus: ['prom-client'],
    grafana: ['grafana'],
    opentelemetry: ['@opentelemetry/api', '@opentelemetry/sdk-node'],
    sentry: ['@sentry/node', '@sentry/react', '@sentry/nextjs'],
    'new relic': ['newrelic'],
  };
}

export function TechStack() {
  const { resolvedTheme } = useTheme();
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [dependencyTechs, setDependencyTechs] = useState<Map<string, GitHubRepository[]>>(new Map());
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipPlacement, setTooltipPlacement] = useState<'top' | 'bottom'>('top');
  const [isLoading, setIsLoading] = useState(true);
  const hoveredElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setIsLoading(true);
        // Fetch repositories with dependencies from the API
        // The included repositories list is secured on the backend
        const repos = await fetchGitHubRepositoriesWithDependencies(
          PROFILES.github
        );
        setRepositories(repos);
        
        // Analyze dependencies on the frontend (no need for exclusion here since API already filtered)
        const deps = analyzeDependenciesFromRepos(repos);
        setDependencyTechs(deps);
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRepositories();
  }, []);

  // Filter and organize technologies that have matching repositories
  const techsWithRepos = useMemo(() => {
    if (repositories.length === 0) return [];

    const techs: TechWithRepos[] = [];

    // Check each technology
    Object.entries(techIcons).forEach(([techName, techData]) => {
      // First check repository-based matching
      const matchedRepos = matchTechToRepos(techName, repositories);
      
      // Also check dependency-based matching
      const depRepos = dependencyTechs.get(techName) || [];
      
      // Combine and deduplicate
      const allRepos = Array.from(
        new Map([...matchedRepos, ...depRepos].map((repo) => [repo.id, repo])).values()
      );

      if (allRepos.length > 0) {
        techs.push({
          name: techName,
          repos: allRepos,
          icon: techData.icon,
          color: techData.color,
        });
      }
    });

    // Sort by number of repos (most used first)
    return techs.sort((a, b) => b.repos.length - a.repos.length);
  }, [repositories, dependencyTechs]);

  const handleMouseEnter = (
    tech: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // Check both repository-based and dependency-based matches
    const repoMatches = matchTechToRepos(tech, repositories);
    const depMatches = dependencyTechs.get(tech) || [];
    const totalMatches = [...repoMatches, ...depMatches];
    
    if (totalMatches.length > 0) {
      setHoveredTech(tech);
      hoveredElementRef.current = event.currentTarget;
      updateTooltipPosition(event.currentTarget);
    }
  };

  const handleMouseMove = (_event: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredTech && hoveredElementRef.current) {
      updateTooltipPosition(hoveredElementRef.current);
    }
  };

  const handleMouseLeave = () => {
    setHoveredTech(null);
    hoveredElementRef.current = null;
  };

  const updateTooltipPosition = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const tooltipHeight = 120;
    
    const spaceAbove = rect.top;
    const spaceBelow = viewportHeight - rect.bottom;
    const shouldPlaceBelow = spaceAbove < tooltipHeight && spaceBelow > spaceAbove;
    
    setTooltipPlacement(shouldPlaceBelow ? 'bottom' : 'top');
    // Use getBoundingClientRect which gives viewport coordinates (perfect for fixed positioning)
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: shouldPlaceBelow ? rect.bottom : rect.top,
    });
  };

  const getMatchedRepos = (tech: string) => {
    // Get repos from both repository matching and dependency matching
    const repoMatches = matchTechToRepos(tech, repositories);
    const depMatches = dependencyTechs.get(tech) || [];
    
    // Combine and deduplicate
    const allRepos = Array.from(
      new Map([...repoMatches, ...depMatches].map((repo) => [repo.id, repo])).values()
    );
    
    return allRepos;
  };

  // No categories needed anymore

  if (isLoading) {
    return (
      <section id="stack" className="section-padding">
        <div className="container-responsive">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 lg:mb-16">
              <h2 className="text-responsive-xl mb-4 font-bold lg:mb-6">
                Tech Stack
              </h2>
              <div className="bg-border h-px w-20 lg:w-24"></div>
            </div>
            <div className="flex items-center justify-center py-20">
              <div className="text-muted-foreground">Loading technologies...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasTechs = techsWithRepos.length > 0;

  return (
    <section id="stack" className="section-padding">
      <div className="container-responsive">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-7xl"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-12 lg:mb-16">
            <h2 className="text-responsive-xl mb-4 font-bold lg:mb-6">
              Tech Stack
            </h2>
           
            <div className="bg-border h-px w-20 lg:w-24"></div>
          </motion.div>

          {techsWithRepos.length === 0 ? (
            <motion.div variants={fadeInUp} className="py-20 text-center">
              <p className="text-muted-foreground">
                Loading repository data...
              </p>
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
                {techsWithRepos.map((tech, index) => {
                  const IconComponent = tech.icon;
                  const repoCount = tech.repos.length;

                  return (
                    <motion.div
                      key={tech.name}
                      variants={fadeInUp}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      whileHover={{
                        scale: 1.05,
                        y: -8,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={(e) => handleMouseEnter(tech.name, e)}
                      onMouseMove={(e) => {
                        if (hoveredTech === tech.name) {
                          handleMouseMove(e);
                        }
                      }}
                      onMouseLeave={handleMouseLeave}
                      className="group relative cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-border/30 bg-background/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5">
                        {/* Content */}
                        <div className="relative flex flex-col items-center gap-3 text-center">
                          {/* Icon with brand color on hover */}
                          <div className="relative">
                            <div
                              className="h-6 w-6 lg:h-7 lg:w-7 transition-all duration-300 group-hover:scale-110"
                              style={{
                                color: hoveredTech === tech.name ? tech.color : 'rgb(var(--foreground) / 0.6)',
                              }}
                            >
                              <IconComponent className="h-full w-full" />
                            </div>
                            {/* Subtle glow effect */}
                            <div 
                              className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20"
                              style={{ backgroundColor: tech.color }}
                            />
                          </div>
                          
                          {/* Tech name */}
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold leading-tight text-foreground/80 transition-colors duration-200 group-hover:text-foreground lg:text-sm">
                              {tech.name}
                            </h4>
                            
                            {/* Repository count */}
                            <div className="flex items-center justify-center">
                              <span className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground transition-all duration-200 group-hover:bg-muted/70 group-hover:text-foreground/70">
                                {repoCount} {repoCount === 1 ? 'repo' : 'repos'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Subtle animated border on hover */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                          style={{
                            background: `linear-gradient(135deg, ${tech.color}20, transparent 70%)`,
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'xor',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            padding: '1px',
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Tooltip */}
      {hoveredTech && (
        <TechTooltip
          repositories={getMatchedRepos(hoveredTech).filter((repo) => !repo.isPrivate)}
          totalCount={getMatchedRepos(hoveredTech).length}
          privateRepoCount={getMatchedRepos(hoveredTech).filter((repo) => repo.isPrivate).length}
          isVisible={true}
          position={tooltipPosition}
          placement={tooltipPlacement}
          techColor={
            // techIcons[hoveredTech]?.color ||
             resolvedTheme === 'dark' ? '#000000' : '#ffffff'}
        />
      )}
    </section>
  );
}
