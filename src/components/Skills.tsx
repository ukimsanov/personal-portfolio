
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { resumeData } from "@/data/resume";

// Skill badges mapping with accurate brand colors and logos
const skillBadges: Record<string, string> = {
  // AI/ML & Frameworks - Using official brand colors and accurate representations
  "Machine Learning": "https://img.shields.io/badge/Machine_Learning-FF6F00?style=flat&logo=tensorflow&logoColor=white",
  "PyTorch": "https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white",
  "TensorFlow": "https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white",
  "Computer Vision": "https://img.shields.io/badge/Computer_Vision-5C3EE8?style=flat&logo=opencv&logoColor=white",
  "OpenAI API": "https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white",
  // LangChain official brand color: #823A45 (Lotus)
  "LangChain": "https://img.shields.io/badge/LangChain-823A45?style=flat&logo=chainlink&logoColor=white",
  "LangGraph": "https://img.shields.io/badge/LangGraph-823A45?style=flat&logo=graphql&logoColor=white",
  // CrewAI - Using professional blue color with team/collaboration theme
  "CrewAI": "https://img.shields.io/badge/CrewAI-2563EB?style=flat&logo=teamwork&logoColor=white",
  "Multi-Agent Systems": "https://img.shields.io/badge/Multi--Agent_Systems-8B5CF6?style=flat&logo=sitemap&logoColor=white",
  "LangSmith": "https://img.shields.io/badge/LangSmith-823A45?style=flat&logo=googleanalytics&logoColor=white",
  "RAG": "https://img.shields.io/badge/RAG-FF6B35?style=flat&logo=elasticsearch&logoColor=white",
  "NLP": "https://img.shields.io/badge/NLP-4B8BBE?style=flat&logo=python&logoColor=white",
  "Prompt Engineering": "https://img.shields.io/badge/Prompt_Engineering-10A37F?style=flat&logo=openai&logoColor=white",

  // Programming Languages
  "Python": "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white",
  "JavaScript": "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black",
  "TypeScript": "https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white", 
  "Java": "https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white",
  "C/C++": "https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white",
  "HTML/CSS": "https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white",
  "Swift": "https://img.shields.io/badge/Swift-F05138?style=flat&logo=swift&logoColor=white",
  "SQL": "https://img.shields.io/badge/SQL-4479A1?style=flat&logo=mysql&logoColor=white",
  "Bash": "https://img.shields.io/badge/Shell_Script-121011?style=flat&logo=gnu-bash&logoColor=white",

  // Frontend Frameworks & Libraries - Using official brand colors
  "React": "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black",
  "Next.js": "https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white",
  "SvelteKit": "https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white",
  "TailwindCSS": "https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white",
  // Shadcn UI - Using black theme consistent with their branding
  "Shadcn UI": "https://img.shields.io/badge/shadcn%2Fui-000000?style=flat&logo=shadcnui&logoColor=white",
  // Aceternity UI - Using professional blue theme  
  "Aceternity UI": "https://img.shields.io/badge/Aceternity_UI-000000?style=flat&logo=react&logoColor=white",
  "Material UI": "https://img.shields.io/badge/Material--UI-007FFF?style=flat&logo=mui&logoColor=white",

  // Backend & APIs - Using official brand colors
  "Node.js": "https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white",
  "Express.js": "https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white",
  "FastAPI": "https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white",
  "GraphQL": "https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white",
  "RESTful APIs": "https://img.shields.io/badge/REST-02569B?style=flat&logo=fastapi&logoColor=white",
  "WebSocket": "https://img.shields.io/badge/WebSocket-010101?style=flat&logo=socketdotio&logoColor=white",
  "SSE": "https://img.shields.io/badge/Server_Sent_Events-FF6B6B?style=flat&logo=html5&logoColor=white",
  "Swagger": "https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black",

  // Cloud & DevOps - Using official brand colors
  "AWS": "https://img.shields.io/badge/Amazon_AWS-FF9900?style=flat&logo=amazon-aws&logoColor=white",
  "Google Cloud Platform": "https://img.shields.io/badge/Google_Cloud-4285F4?style=flat&logo=google-cloud&logoColor=white",
  "Vercel": "https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white",
  "Cloudflare Workers": "https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat&logo=cloudflare&logoColor=white",
  "Docker": "https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white",
  "Kubernetes": "https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white",
  "CI/CD": "https://img.shields.io/badge/CI%2FCD-2088FF?style=flat&logo=github-actions&logoColor=white",

  // Databases - Using official brand colors  
  "PostgreSQL": "https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white",
  "MySQL": "https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white",
  "SQLite": "https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white",
  "MongoDB": "https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white",
  // Supabase official brand color: #3ECF8E (Shamrock)
  "Supabase": "https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white",
  "Cloudflare D1": "https://img.shields.io/badge/Cloudflare_D1-F38020?style=flat&logo=cloudflare&logoColor=white",

  // Tools & Platforms - Using official brand colors
  "Git": "https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white",
  "Figma": "https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white",
  "Jupyter": "https://img.shields.io/badge/Jupyter-F37626?style=flat&logo=jupyter&logoColor=white",
  "Jira": "https://img.shields.io/badge/Jira-0052CC?style=flat&logo=jira&logoColor=white",
  "ClickUp": "https://img.shields.io/badge/ClickUp-7B68EE?style=flat&logo=clickup&logoColor=white",
  "Zendesk": "https://img.shields.io/badge/Zendesk-03363D?style=flat&logo=zendesk&logoColor=white",
  "N8N": "https://img.shields.io/badge/n8n-EA4B71?style=flat&logo=n8n&logoColor=white",
  "Capacitor": "https://img.shields.io/badge/Capacitor-119EFF?style=flat&logo=capacitor&logoColor=white",
  "Agile": "https://img.shields.io/badge/Agile-239120?style=flat&logo=agile&logoColor=white",
};

// Skill categories with organized grouping
const skillCategories = [
  {
    title: "AI / ML & Agents",
    skills: ["Prompt Engineering", "LangChain", "LangGraph", "CrewAI", "Multi-Agent Systems", "LangSmith", "OpenAI API", "RAG", "NLP", "Machine Learning", "PyTorch", "TensorFlow", "Computer Vision"]
  },
  {
    title: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "Swift", "SQL", "Bash", "HTML/CSS"]
  },
  {
    title: "Frontend & Frameworks",
    skills: ["React", "Next.js", "SvelteKit", "TailwindCSS", "Shadcn UI", "Aceternity UI", "Material UI"]
  },
  {
    title: "Backend & APIs",
    skills: ["Node.js", "FastAPI", "Express.js", "GraphQL", "RESTful APIs", "WebSocket", "SSE", "Swagger"]
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Google Cloud Platform", "Vercel", "Cloudflare Workers", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Cloudflare D1", "SQLite"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Capacitor", "N8N", "ClickUp", "Zendesk", "Jira", "Figma", "Jupyter", "Agile"]
  }
];

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  // Mobile-optimized animation variants
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 10 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 5 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.5,
        delay: shouldReduceMotion ? 0.1 : 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  const categoryVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 10 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0 
    }
  };

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.2 }}
      className="py-10 sm:py-14 w-full overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.h2 
          variants={headerVariants}
          className="text-2xl font-bold mb-8 sm:mb-12 text-center"
        >
          Skills
        </motion.h2>
        
        {/* Branch-style layout */}
        <div className="relative">
          {/* Central trunk/node */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-blue-500/20 -translate-x-1/2" />
          
          {/* Categories as branches */}
          <div className="space-y-8 sm:space-y-12">
            {skillCategories.map((category, categoryIndex) => {
              const isLeft = categoryIndex % 2 === 0;
              
              return (
                <motion.div
                  key={categoryIndex}
                  variants={categoryVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? categoryIndex * 0.05 : categoryIndex * 0.1,
                    ease: [0.25, 0.1, 0.25, 1] as const
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative"
                >
                    {/* Desktop: Alternating left/right layout with connecting line */}
                  <div className={`hidden md:flex items-start gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Category node with connecting branch */}
                    <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block w-full max-w-lg bg-card border-2 border-blue-500/30 rounded-2xl p-5 hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20 ${isLeft ? 'mr-8' : 'ml-8'}`}>
                        {/* Category Header */}
                        <div className={`mb-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-lg font-bold text-foreground">
                            {category.title}
                          </h3>
                        </div>
                        
                        {/* Skills flowing from category */}
                        <div className="flex flex-wrap gap-2 justify-start">
                          {category.skills.map((skill, skillIndex) => {
                            const badgeUrl = skillBadges[skill];
                            
                            return (
                              <motion.div
                                key={skillIndex}
                                initial={{ 
                                  opacity: 0, 
                                  scale: 0.8,
                                  x: isLeft ? 20 : -20
                                }}
                                whileInView={{ 
                                  opacity: 1, 
                                  scale: 1,
                                  x: 0
                                }}
                                transition={{ 
                                  duration: shouldReduceMotion ? 0.15 : 0.3,
                                  delay: shouldReduceMotion ? skillIndex * 0.01 : skillIndex * 0.03,
                                  ease: [0.25, 0.1, 0.25, 1] as const
                                }}
                                viewport={{ once: true }}
                                className="hover:scale-105 transition-transform"
                              >
                                {badgeUrl ? (
                                  <img
                                    src={badgeUrl}
                                    alt={skill}
                                    className="h-7 rounded-md"
                                  />
                                ) : (
                                  <div className="bg-secondary/50 text-secondary-foreground rounded-md px-2.5 py-1 text-sm font-medium hover:bg-secondary/70 transition-colors">
                                    {skill}
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile: Stacked cards */}
                  <div className="md:hidden bg-card border border-border rounded-xl p-4 hover:border-blue-500/30 dark:hover:border-blue-400/40 transition-all duration-300">
                    <div className="mb-3">
                      <h3 className="text-base font-semibold text-foreground">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => {
                        const badgeUrl = skillBadges[skill];
                        
                        return (
                          <motion.div
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.2,
                              delay: skillIndex * 0.02
                            }}
                            viewport={{ once: true }}
                            className="active:scale-95 transition-transform"
                          >
                            {badgeUrl ? (
                              <img
                                src={badgeUrl}
                                alt={skill}
                                className="h-6 rounded-md"
                              />
                            ) : (
                              <div className="bg-secondary/50 text-secondary-foreground rounded-md px-2.5 py-1 text-xs font-medium">
                                {skill}
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
