export const profile = {
  name: "Vanshil Jain",
  role: "Software Engineer",
  focus: "AI Systems & Backend Automation",
  pitch:
    "I design agent pipelines and backend systems that turn multi-step busywork into infrastructure that runs itself.",
  location: "Indore, India",
  phone: "+91 7974763238",
  email: "vanshiljain08@gmail.com",
  linkedin: "linkedin.com/in/vanshil-jain-592666251",
  linkedinUrl: "https://linkedin.com/in/vanshil-jain-592666251",
  resumeFile: "/Vanshil_Jain_Resume.pdf",
};

export const summary =
  "Results-driven Software Engineer with 3+ years of hands-on experience designing and implementing scalable backend systems, AI-driven applications, and enterprise automation solutions. Proven expertise in full-stack development using Node.js, NestJS, React, and GraphQL. Specialized in integrating large language models (LangChain, OpenAI, Claude) for intelligent agent pipelines and enterprise workflow automation. Strong proficiency in cloud infrastructure (AWS, GCP), CI/CD automation, and serverless architectures.";

export const stats = [
  { value: "3+", label: "Years shipping production systems" },
  { value: "10K+", label: "Daily API requests served at 99.5% uptime" },
  { value: "200+", label: "Automated workflows run monthly" },
  { value: "80%", label: "Screening time cut with LLM scoring" },
];

export const skillGroups = [
  {
    key: "backend",
    label: "Backend",
    items: ["Node.js", "NestJS", "Express.js", "GraphQL", "REST APIs", "WebSockets", "Socket.io", "Python"],
  },
  {
    key: "frontend",
    label: "Frontend",
    items: ["React.js", "Redux Toolkit", "JavaScript ES6+", "TypeScript", "HTML5", "CSS3"],
  },
  {
    key: "data",
    label: "Databases",
    items: ["MongoDB", "PostgreSQL", "MySQL", "NoSQL Design Patterns"],
  },
  {
    key: "cloud",
    label: "Cloud & Serverless",
    items: ["AWS Lambda", "AWS S3", "Google Cloud Functions", "API Gateway"],
  },
  {
    key: "ai",
    label: "AI & Machine Learning",
    items: ["LangChain", "OpenAI API", "Claude AI", "Prompt Engineering", "LLM Integration", "Semantic Analysis"],
  },
  {
    key: "devops",
    label: "DevOps & Automation",
    items: ["GitHub Actions", "CI/CD Pipelines", "NPM Package Publishing", "Docker", "Linux"],
  },
  {
    key: "integrations",
    label: "API Integrations",
    items: ["Zoho", "Slack", "Jira", "Google Workspace", "GitHub APIs", "RESTful Services"],
  },
  {
    key: "tools",
    label: "Tooling",
    items: ["VS Code", "Git", "GitHub", "Postman", "AWS Console"],
  },
];

export const experience = [
  {
    company: "Linkites",
    role: "Software Engineer",
    period: "June 2023 — Present",
    location: "Indore, India",
    projects: [
      {
        name: "OneTab",
        blurb: "AI-assisted CI/CD tooling and codegen for internal engineering teams.",
        points: [
          "Designed and published a custom NPM package for CI/CD integration, standardizing pipeline configs across 5+ internal projects and cutting setup time by 60%.",
          "Architected the OneCode module, using AI to generate fully functional websites in minutes — a 300% faster prototyping workflow.",
          "Built REST/GraphQL backend services on NestJS and Node.js processing 10,000+ daily requests at 99.5% uptime.",
          "Built Python-based AI modules integrating GPT models for code analysis and generation, improving dev velocity by 40%.",
          "Integrated GitHub APIs to surface repo data, pipeline status, and CI/CD logs as AI-driven insight for dev teams.",
          "Deployed and optimized AWS Lambda functions running 50+ scheduled jobs with sub-100ms execution times.",
        ],
      },
      {
        name: "OneReap",
        blurb: "LangChain + Claude agent pipeline for enterprise workflow automation.",
        points: [
          "Architected and deployed an AI agent pipeline using LangChain and Claude AI, processing 200+ automated workflows monthly.",
          "Engineered multi-system integrations connecting agents to Zoho, Slack, Jira, and Google Calendar for autonomous ticketing and scheduling.",
          "Designed modular agent workflows using chain-of-thought reasoning for complex multi-step tasks, cutting manual intervention by 75%.",
        ],
      },
      {
        name: "HR Automation System",
        blurb: "End-to-end recruitment platform from job post to candidate communication.",
        points: [
          "Built an end-to-end recruitment automation platform covering job posting, resume screening, interview invites, and communication.",
          "Implemented an LLM-powered resume screening engine using semantic analysis, cutting screening time by 80% while improving candidate quality.",
          "Developed an AI phone-screening system handling 100+ candidate calls weekly with NLP and sentiment analysis.",
          "Engineered an email personalization engine generating context-aware, role- and profile-specific candidate communication.",
          "Created an HR dashboard with real-time analytics for recruitment pipeline visibility and candidate tracking.",
        ],
      },
      {
        name: "AI Tutor Agent",
        blurb: "Conversational tutoring agent with persistent learning state.",
        points: [
          "Developed a conversational tutoring agent with persistent learning state, personalizing lessons for 500+ students.",
          "Engineered a dynamic test/quiz generation engine supporting custom queries for adaptive learning.",
          "Implemented automated study notes and summaries in multiple formats (PDF, Markdown), supporting 1,000+ monthly study sessions.",
        ],
      },
    ],
  },
];

export const projects = [
  {
    name: "OneReap",
    tag: "Agent Pipeline",
    description:
      "LangChain + Claude agent pipeline that autonomously handles enterprise workflows — ticketing, scheduling, multi-step reasoning — across Zoho, Slack, Jira, and Google Calendar.",
    stack: ["LangChain", "Claude AI", "Node.js", "Zoho API", "Slack API"],
    metric: "200+ workflows automated monthly, 75% less manual intervention",
  },
  {
    name: "HR Automation System",
    tag: "LLM Product",
    description:
      "Recruitment platform automating the full candidate lifecycle: job posting, semantic resume screening, AI phone screening, and personalized outreach.",
    stack: ["LLM Scoring", "NLP", "Sentiment Analysis", "React", "Node.js"],
    metric: "80% faster screening, 100+ automated calls weekly",
  },
  {
    name: "OneTab / OneCode",
    tag: "Dev Tooling",
    description:
      "Internal CI/CD standardization package plus an AI module that scaffolds fully functional websites from a prompt in minutes.",
    stack: ["NestJS", "GraphQL", "AWS Lambda", "GPT", "NPM"],
    metric: "60% faster pipeline setup, 300% faster prototyping",
  },
  {
    name: "AI Tutor Agent",
    tag: "Conversational AI",
    description:
      "Persistent-state tutoring agent generating adaptive quizzes and multi-format study notes on demand for 500+ students.",
    stack: ["LangChain", "OpenAI API", "Prompt Engineering"],
    metric: "500+ students, 1,000+ monthly study sessions",
  },
];

export const education = {
  degree: "Bachelor of Technology, Computer Science & Engineering",
  school: "IPS Academy Institute of Engineering and Science",
  location: "Indore, Madhya Pradesh",
  period: "Graduated June 2023",
  detail: "CGPA: 8.3 / 10",
};
