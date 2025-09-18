
interface Project {
  title: string;
  techStack: string[];
  description: string[];
  link: {
    label: string;
    href: string;
  };
  imageUrl?: string;
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
  ],
  projects: [
    {
      title: "Multi-Agent Sports Analytics Platform",
      techStack: ["LangChain", "LangGraph", "CrewAI", "SvelteKit", "Python", "FastAPI", "TypeScript"],
      description: [
        "Led the architecture and development of a multi-agent AI system for sports analytics and prediction platform.",
        "Engineered complex prompt chains and agent workflows to process real-time data, steering agent behavior towards accurate outcome prediction for a target user base of over 10,000.",
        "Co-led the full-stack development of cross-platform mobile application using SvelteKit, Capacitor, and TypeScript.",
        "Integrated real-time sports data feeds from SportsDataIO and OptiOdds APIs via backend built with Python, FastAPI, and WebSocket for low-latency communication.",
      ],
      link: {
        label: "github.com",
        href: "", // TODO: Add link
      },
    },
    {
      title: "NSF Cybersecurity Education Platform",
      techStack: ["Next.js", "TypeScript", "FastAPI", "Cloudflare Workers", "D1 Database", "TailwindCSS"],
      description: [
        "Engineered a full-stack cybersecurity education platform for high school students, funded by an NSF grant.",
        "Architected and implemented a scalable, cloud-native backend using Cloudflare Workers and the D1 database, ensuring 99.9% uptime.",
        "Designed and developed over 22 interactive learning modules and JavaScript-based mini-games using TailwindCSS, Shadcn UI.",
        "Analyzed user data from a pilot program of 120+ students, noting a 78% lesson completion rate and achieving a user onboarding time of under 60 seconds.",
      ],
      link: {
        label: "github.com",
        href: "", // TODO: Add link
      },
    },
    {
      title: "Horizon Banking App",
      techStack: ["Next.js", "TypeScript", "Appwrite", "TailwindCSS", "Plaid", "Dwolla"],
      description: [
        "Built core banking UI & real-time transfers for 1,000+ users; onboarding tests showed a 40% jump in engagement.",
        "Designed Appwrite cloud functions for payments, hitting <50 ms median latency across 10k simulated transactions.",
        "Implemented responsive dashboard using TailwindCSS and Chart.js, deployed on Vercel cutting page-load 50% and sustaining 99.9% uptime.",
      ],
      link: {
        label: "github.com",
        href: "", // TODO: Add link
      },
      websiteUrl: "", // TODO: Add website URL
      imageUrl: "", // TODO: Add project image
    },
    {
      title: "YouTube Lecture Notes AI Agent",
      techStack: ["Python", "CrewAI", "LangChain", "OpenAI API", "N8N"],
      description: [
        "Created automated workflow system extracting structured notes from video content using multi-agent collaboration.",
        "Processed 100+ educational videos with 90% accuracy in key concept identification and summarization.",
        "Integrated N8N automation for seamless content pipeline from video input to formatted documentation output.",
      ],
      link: {
        label: "github.com",
        href: "", // TODO: Add link
      },
    },
    {
      title: "Crypto List",
      techStack: ["Python", "FastAPI", "React", "CoinMarketCap API", "TailwindCSS"],
      description: [
        "Developed a simple full-stack cryptocurrency tracker using FastAPI (Python) and React (JavaScript), achieving <1 second average data fetch and render time.",
        "Integrated CoinMarketCap API for real-time market changes, updating prices within 170-200 ms on average.",
        "Implemented responsive UI with Tailwind CSS, reducing layout reflows by approximately 30%.",
        "Achieved over 90% unit test coverage, ensuring reliable end-to-end functionality across the stack.",
      ],
      link: {
        label: "github.com",
        href: "", // TODO: Add link
      },
    },
    {
      title: "MNIST Neural Network Classifier",
      techStack: ["Python", "PyTorch", "NumPy", "Matplotlib", "Jupyter"],
      description: [
        "Engineered a neural network model achieving 91% accuracy on MNIST dataset, implementing custom data preprocessing pipeline for processing 70,000 images.",
        "Optimized model performance through hyperparameter tuning and data normalization techniques, achieving 85% accuracy within first training epoch.",
        "Developed complete ML pipeline with visualization tools using Python, PyTorch, NumPy, Matplotlib and Jupyter, following industry best practices.",
      ],
      link: {
        label: "github.com",
        href: "", // TODO: Add link
      },
    },
  ],
  footer: "© 2025 Ular Kimsanov",
};
