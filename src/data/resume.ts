
interface Project {
  title: string;
  techStack: string[];
  description: string[];
  link?: {
    label: string;
    href: string;
  };
  imageUrl?: string;
  mobileImageUrls?: string[]; // For mobile screenshots (vertical) - shown in horizontal scrollable row
  desktopImageUrls?: string[]; // For desktop/web app screenshots (horizontal) - shown in vertical stack
  websiteUrl?: string;
}

export const resumeData: {
  name: string;
  title: string;
  contact: {
    email: string;
    tel: string;
    socials: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
  };
  education: {
    school: string;
    degree: string;
    expected: string;
    gpa: string;
  };
  skills: string[];
  projects: Project[];
  footer: string;
} = {
  name: "Ular Kimsanov",
  title: "Software Engineer | Full Stack Developer",
  contact: {
    email: "ularkimsanov7@gmail.com",
    tel: "+12676253611",
    socials: [
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/ukimsanov",
        icon: "Linkedin",
      },
      {
        name: "GitHub",
        url: "https://github.com/ukimsanov",
        icon: "Github",
      },
    ],
  },
  education: {
    school: "Arcadia University - Glenside, PA",
    degree: "Bachelor of Science in Computer Science",
    expected: "Expected May 2027",
    gpa: "3.94 / 4.00",
  },
  skills: [
    "Prompt Engineering",
    "LangChain",
    "LangGraph",
    "CrewAI",
    "Multi-Agent Systems",
    "LangSmith",
    "OpenAI API",
    "RAG",
    "NLP",
    "Machine Learning",
    "PyTorch",
    "TensorFlow",
    "Computer Vision",
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C/C++",
    "HTML/CSS",
    "SQL",
    "Bash",
    "Swift",
    "React",
    "Next.js",
    "SvelteKit",
    "FastAPI",
    "Node.js",
    "TailwindCSS",
    "Shadcn UI",
    "Aceternity UI",
    "Material UI",
    "Express.js",
    "Google Cloud Platform",
    "AWS",
    "Vercel",
    "Cloudflare Workers",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "PostgreSQL",
    "MySQL",
    "Supabase",
    "Cloudflare D1",
    "SQLite",
    "MongoDB",
    "Git",
    "WebSocket",
    "Capacitor",
    "N8N",
    "ClickUp",
    "Zendesk",
    "Jira",
    "Figma",
    "Jupyter",
    "SSE",
    "Swagger",
    "RESTful APIs",
    "GraphQL",
    "Agile",
  ],
  projects: [
    {
      title: "Multi-Agent Sports Analytics App",
      imageUrl: "/projects/multi-agent-sports/betsmart-preview.png",
      mobileImageUrls: [
        "/projects/multi-agent-sports/betsmart-preview1.png", 
        "/projects/multi-agent-sports/betsmart-preview2.png",
        "/projects/multi-agent-sports/betsmart-preview3.png",
      ],
      techStack: ["LangChain", "LangGraph", "CrewAI", "SvelteKit", "Python", "FastAPI", "TypeScript"],
      description: [
        "Led the architecture and development of a multi-agent AI system for sports analytics and prediction app.",
        "Engineered using LangChain, LangGraph, and CrewAI, the complex prompt chains to steer agent behavior for sports prediction app potentially serving 50,000+ users with SSE connections.",
        "Co-led the full-stack development of cross-platform mobile application using SvelteKit, Capacitor, and TypeScript.",
        "Integrated real-time sports data feeds from SportsDataIO and OptiOdds APIs via backend built with Python, FastAPI, and SSE for low-latency communication.",
        "Mentored 8+ junior interns in full-stack development, AI agent orchestration, and agile methodologies, accelerating team onboarding by 50%.",
      ],
    },
    {
      title: "NSF Cybersecurity Platform",
      imageUrl: "/projects/nsf-cybersecurity/cyberford-preview.png",
      techStack: ["Next.js", "TypeScript", "FastAPI", "Cloudflare Workers", "D1 Database", "TailwindCSS"],
      description: [
        "Engineered a full-stack cybersecurity education platform for high school students, funded by an NSF grant.",
        "Architected and implemented a scalable, cloud-native backend using Cloudflare Workers and the D1 database, ensuring 99.9% uptime.",
        "Designed and developed over 22 interactive learning modules and JavaScript-based mini-games using TailwindCSS, Shadcn UI.",
        "Analyzed user data from a pilot program of 120+ students, noting a 78% lesson completion rate and achieving a user onboarding time of under 60 seconds.",
      ],
    },
    {
      title: "Horizon Banking App",
      imageUrl: "/projects/horzobank/horzobank-preview.png",
      desktopImageUrls: [
        "/projects/horzobank/horzobank-screen1.png",
        "/projects/horzobank/horzobank-screen2.png",
        "/projects/horzobank/horzobank-screen3.png",
        "/projects/horzobank/horzobank-screen4.png",
        "/projects/horzobank/horzobank-screen5.png",
      ],
      techStack: ["Next.js", "TypeScript", "Appwrite", "TailwindCSS", "Plaid", "Dwolla"],
      description: [
        "Built full-stack banking platform with real-time fund transfers using Dwolla API and Plaid for multi-bank integration.",
        "Engineered server-side payment processing with Next.js Server Actions and Appwrite, implementing secure session management and transaction tracking across linked accounts.",
        "Developed responsive dashboard with TailwindCSS and Chart.js visualizations; deployed on Vercel with edge runtime optimization and Sentry monitoring for 99.9% uptime.",
      ],
      link: {
        label: "github.com",
        href: "https://github.com/ukimsanov/horzo-bank",
      },
      websiteUrl: "https://horzobank.vercel.app",
    },
    {
      title: "LectureFlow - AI Lecture Notes",
      imageUrl: "/projects/lectureflow/lectureflow-preview.png",
      desktopImageUrls: [
        "/projects/lectureflow/lectureflow-preview1.png",
        "/projects/lectureflow/lectureflow-preview2.png",
        "/projects/lectureflow/lectureflow-preview3.png",
      ],
      techStack: ["Python", "FastAPI", "LangGraph", "Next.js", "PostgreSQL", "Gemini 2.5 Flash", "GPT-4o-mini"],
      description: [
        "Developed multi-agent orchestration system using LangGraph with Gemini 2.5 Flash and GPT-4o-mini, processing videos through parallel agent execution for lecture summarization and AI tool extraction.",
        "Engineered real-time SSE streaming architecture with smart PostgreSQL caching, achieving 99% cost reduction on repeat videos and sub-1-second response times for cached results.",
        "Built production-ready full-stack application with Next.js 15, implementing Server Components, TanStack Table for history management, PDF export, and cross-browser compatible UI (Safari 16.4+, Chrome 120+).",
      ],
      link: {
        label: "github.com",
        href: "https://github.com/ukimsanov/lectureflow",
      },
    },
    {
      title: "CryptoLive",
      imageUrl: "/projects/cryptolive/cryptolive-preview.png",
      techStack: ["React", "FastAPI", "WebSockets", "Tailwind CSS", "Ant Design", "Kraken API", "lightweight-charts"],
      description: [
        "Built a real-time cryptocurrency tracking platform with TradingView-style candlestick charts, live WebSocket price streaming, and advanced search functionality using React, FastAPI, and Kraken WebSocket API.",
        "Engineered real-time price updates via Kraken WebSocket v2, achieving <170ms latency for live market data streaming.",
        "Developed interactive financial charts with 7 timeframes (1m-1D) using lightweight-charts library, featuring zoom, pan, and OHLC candlestick visualization with responsive data caching.",
        "Designed modern glassmorphic UI with Tailwind CSS and Ant Design, implementing skeleton loading states, error boundaries, and mobile-responsive layouts with smooth CSS animations.",
      ],
      link: {
        label: "github.com",
        href: "https://github.com/ukimsanov/crypto-live",
      },
      websiteUrl: "https://crypto-live-omega.vercel.app",
    },
    {
      title: "Neural Digit Canvas",
      imageUrl: "/projects/digitcanvas/digitcanvas-preview.png",
      techStack: ["Python", "PyTorch", "Next.js", "AWS Lambda", "Docker", "FastAPI", "ECR", "GitHub Actions"],
      description: [
        "Built production-ready full-stack ML application with interactive digit classification, achieving 98.2% accuracy on MNIST using CNN architecture.",
        "Deployed serverless backend on AWS Lambda with FastAPI, handling real-time inference at ~8ms per prediction.",
        "Engineered complete ML pipeline from model training to cloud deployment: containerized PyTorch models with Docker, implemented ECR/Lambda deployment, and created Next.js 15 frontend with canvas drawing interface.",
        "Designed dual-model system (Linear: 92.4%, CNN: 98.2%) with comprehensive evaluation metrics, training visualization tools, and automated CI/CD pipelines using GitHub Actions.",
      ],
      link: {
        label: "github.com",
        href: "https://github.com/ukimsanov/neural-digit-canvas",
      },
      websiteUrl: "https://neural-digit-canvas.vercel.app",
    },
  ],
  footer: "© 2025 Ular Kimsanov. All rights reserved.",
};
