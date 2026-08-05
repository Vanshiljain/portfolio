export const profile = {
  name: "Vanshil Jain",
  role: "Software Engineer",
  roleLong: "Full Stack & AI Engineer",
  focus: "AI Agent Orchestration & Backend Systems",
  pitch:
    "I design multi-agent AI orchestration platforms and the backend systems that let them run enterprises on autopilot.",
  location: "Indore, India",
  phone: "+91 7974763238",
  email: "vanshiljain08@gmail.com",
  linkedin: "linkedin.com/in/vanshil-jain-592666251",
  linkedinUrl: "https://linkedin.com/in/vanshil-jain-592666251",
  resumeFile: "/Vanshil_Jain_Resume.pdf",
};

export const summary =
  "Software Engineer with 3+ years of experience engineering scalable full-stack web applications, backend microservices, and production-grade AI workflow orchestration systems. Specialized across Node.js, NestJS, React.js, TypeScript, PostgreSQL, LangChain, MCP, and Qdrant to build high-throughput REST/GraphQL APIs, interactive user dashboards, and dynamic multi-agent applications across OpenAI, Claude AI, and Gemini. Proven track record at Linkites Infotech driving end-to-end software development and enterprise automation.";

export const stats = [
  { value: "3+", label: "Years shipping production systems" },
  { value: "85%", label: "Fewer input execution failures at OneOrbit" },
  { value: "200+", label: "Automated agent jobs run monthly" },
  { value: "35%", label: "Token consumption cut via prompt optimization" },
];

export const skillGroups = [
  {
    key: "ai",
    label: "AI Engineering",
    items: [
      "LangChain",
      "Model Context Protocol (MCP)",
      "OpenAI API",
      "Claude AI",
      "Gemini API",
      "Prompt Engineering",
      "Semantic Search",
      "Agentic Workflows",
    ],
  },
  {
    key: "backend",
    label: "Backend & Frontend",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "RESTful APIs",
      "GraphQL",
      "WebSockets",
      "React.js",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
  },
  {
    key: "data",
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Qdrant (Vector DB)"],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    items: [
      "AWS Lambda",
      "AWS S3",
      "API Gateway",
      "CloudWatch",
      "GCP Cloud Functions",
      "Docker",
      "GitHub Actions",
      "Git",
      "Linux",
      "NPM Package Publishing",
    ],
  },
  {
    key: "integrations",
    label: "Integrations & Tool Agents",
    items: [
      "Zoho CRM / HR Agent",
      "Slack Agent",
      "Jira Agent",
      "Google Workspace Agents",
      "Webhooks",
      "REST Connectors",
    ],
  },
  {
    key: "languages",
    label: "Languages",
    items: ["Python", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
];

export const experience = [
  {
    company: "Linkites Infotech",
    role: "Software Engineer (Full Stack & AI)",
    period: "June 2025 — Present",
    location: "Indore, India",
    current: true,
    projects: [
      {
        name: "OneOrbit",
        blurb: "Enterprise AI agent orchestration platform — the flagship system.",
        points: [
          "Led the full-stack development of OneOrbit using React.js, NestJS, Node.js, TypeScript, PostgreSQL, LangChain, MCP, and Qdrant, delivering end-to-end functionality.",
          "Engineered an autonomous multi-agent orchestration platform that dynamically analyzes user requests, routes them to specialized AI agents, and automatically creates new agents, prompts, tools, and workflows when required.",
          "Built scalable backend microservices and GraphQL/REST APIs using NestJS and Node.js to manage AI workflows, agent lifecycle, authentication, and enterprise integrations.",
          "Developed responsive React.js interfaces for configuring AI agents, monitoring workflow execution, managing tool integrations, and visualizing orchestration pipelines.",
          "Implemented high-speed vector retrieval using Qdrant and MCP to provide long-term contextual memory and semantic search across OpenAI, Claude, and Gemini models.",
          "Integrated enterprise platforms including Zoho, Jira, Slack, and Google Workspace, enabling seamless end-to-end workflow automation and eliminating 85% of input execution failures.",
          "Optimized prompt management, context caching, and execution pipelines, reducing token consumption by 35% while maintaining sub-second routing latency.",
        ],
      },
    ],
  },
  {
    company: "Linkites Infotech",
    role: "Associate Software Engineer",
    period: "June 2024 — May 2025",
    location: "Indore, India",
    projects: [
      {
        name: "OneReap",
        blurb: "LangChain + Claude + Gemini agent pipeline for enterprise workflow automation.",
        points: [
          "Deployed automated AI pipeline services using LangChain, Claude AI, and Gemini API to handle multi-step operational tasks, executing 200+ background jobs monthly with 99% reliability.",
          "Engineered third-party AI agents using MCP (Model Context Protocol) for Zoho, Slack, Jira, and Google Calendar to auto-create tickets and calendar invites, cutting team administrative overhead by 50%.",
          "Built a custom task scheduler with Redis and Cron triggers to manage periodic workflow execution, reducing job failure rate by 30%.",
        ],
      },
      {
        name: "HR Automation System",
        blurb: "End-to-end recruitment platform from resume screening to live dashboards.",
        points: [
          "Implemented an LLM-based resume evaluation engine utilizing Qdrant vector indexing and semantic scoring, reducing HR manual screening time by 80% and increasing candidate processing throughput.",
          "Developed an automated conversational screening call module processing 100+ weekly candidate interviews with sentiment tracking and structured evaluation summaries.",
          "Designed real-time recruitment tracking dashboards in React.js and TypeScript, giving hiring managers instant visibility into candidate progress metrics.",
        ],
      },
      {
        name: "AI Tutor Agent",
        blurb: "Persistent-state tutoring agent with adaptive learning pathways.",
        points: [
          "Built an interactive educational agent with persistent Redis state management and Qdrant semantic context, serving 500+ active students with tailored learning pathways.",
          "Engineered an automated document and quiz generator producing customized study notes (PDF, Markdown), supporting over 1,000 monthly student sessions.",
        ],
      },
    ],
  },
  {
    company: "Linkites Infotech",
    role: "Junior Software Developer",
    period: "June 2023 — May 2024",
    location: "Indore, India",
    projects: [
      {
        name: "OneTab & Core Infrastructure",
        blurb: "Internal CI/CD standardization and serverless backend foundations.",
        points: [
          "Architected and published a standardized internal NPM package for CI/CD configurations across 5 engineering teams, cutting project setup time by 60%.",
          "Developed backend web services leveraging NestJS and Node.js with REST/GraphQL APIs, maintaining 99.5% uptime while handling 10,000+ daily operational requests.",
          "Built Python backend services to synthesize prototype web layouts directly from specifications, accelerating team prototyping speed by 300%.",
          "Configured 50+ serverless AWS Lambda & GCP Cloud Functions and background cron tasks operating with sub-100ms response latency for reliable backend data processing.",
        ],
      },
    ],
  },
];

export const projects = [
  {
    name: "OneOrbit",
    tag: "Flagship — Agent Orchestration",
    featured: true,
    description:
      "Enterprise AI agent orchestration platform that analyzes user requests, routes them to specialized agents, and auto-creates new agents, prompts, tools, and workflows on demand — with Qdrant-backed long-term memory across OpenAI, Claude, and Gemini.",
    stack: ["React.js", "NestJS", "TypeScript", "PostgreSQL", "LangChain", "MCP", "Qdrant"],
    metric: "85% fewer input failures, 35% lower token spend, sub-second routing",
  },
  {
    name: "OneReap",
    tag: "Agent Pipeline",
    description:
      "LangChain + Claude + Gemini agent pipeline that autonomously handles enterprise workflows — ticketing, scheduling, multi-step reasoning — across Zoho, Slack, Jira, and Google Calendar via MCP.",
    stack: ["LangChain", "Claude AI", "Gemini API", "MCP", "Redis"],
    metric: "200+ jobs automated monthly, 50% less admin overhead",
  },
  {
    name: "HR Automation System",
    tag: "LLM Product",
    description:
      "Recruitment platform automating the full candidate lifecycle: semantic resume screening with Qdrant, AI phone screening, and real-time hiring dashboards.",
    stack: ["Qdrant", "LLM Scoring", "NLP", "React.js", "TypeScript"],
    metric: "80% faster screening, 100+ automated calls weekly",
  },
  {
    name: "AI Tutor Agent",
    tag: "Conversational AI",
    description:
      "Persistent-state tutoring agent with Redis session memory and Qdrant semantic context, generating adaptive quizzes and multi-format study notes on demand.",
    stack: ["LangChain", "Redis", "Qdrant", "Prompt Engineering"],
    metric: "500+ students, 1,000+ monthly study sessions",
  },
  {
    name: "OneTab / Core Infrastructure",
    tag: "Dev Tooling",
    description:
      "Internal CI/CD standardization package plus Python services that scaffold prototype web layouts directly from specifications.",
    stack: ["NestJS", "GraphQL", "AWS Lambda", "GCP Functions", "NPM"],
    metric: "60% faster pipeline setup, 300% faster prototyping",
  },
];

export const education = {
  degree: "Bachelor of Technology, Computer Science & Engineering",
  school: "IPS Academy Institute of Engineering and Science",
  location: "Indore, Madhya Pradesh",
  period: "Graduated 2023",
  detail: "CGPA: 8.3 / 10",
};
