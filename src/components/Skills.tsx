
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { resumeData } from "@/data/resume";

// Skill logos mapping with accurate brand-colored icons
const skillLogos: Record<string, { icon: string; color?: string; invertInDark?: boolean }> = {
  // AI/ML & Frameworks
  "Machine Learning": { icon: "tensorflow", color: "#FF6F00" },
  "PyTorch": { icon: "pytorch", color: "#EE4C2C" },
  "TensorFlow": { icon: "tensorflow", color: "#FF6F00" },
  "Computer Vision": { icon: "opencv", color: "#5C3EE8" },
  "OpenAI API": { icon: "openai", color: "#412991" },
  "LangChain": { icon: "langchain", color: "#1C3C3C" },
  "LangGraph": { icon: "graphql", color: "#E10098" },
  "CrewAI": { icon: "openai", color: "#FF6B35" }, // Using OpenAI icon as placeholder
  "Multi-Agent Systems": { icon: "codeberg", color: "#2185D0" },
  "LangSmith": { icon: "googleanalytics", color: "#E37400" },
  "RAG": { icon: "elasticsearch", color: "#005571" },
  "NLP": { icon: "python", color: "#3776AB" },
  "Prompt Engineering": { icon: "openai", color: "#10A37F" },

  // Programming Languages
  "Python": { icon: "python", color: "#3776AB" },
  "JavaScript": { icon: "javascript", color: "#F7DF1E" },
  "TypeScript": { icon: "typescript", color: "#3178C6" },
  "Java": { icon: "openjdk", color: "#437291" },
  "C/C++": { icon: "cplusplus", color: "#00599C" },
  "HTML/CSS": { icon: "html5", color: "#E34F26" },
  "Swift": { icon: "swift", color: "#F05138" },
  "SQL": { icon: "mysql", color: "#4479A1" },
  "Bash": { icon: "gnubash", color: "#4EAA25" },

  // Frontend Frameworks & Libraries
  "React": { icon: "react", color: "#61DAFB" },
  "Next.js": { icon: "nextdotjs", color: "#000000", invertInDark: true },
  "SvelteKit": { icon: "svelte", color: "#FF3E00" },
  "TailwindCSS": { icon: "tailwindcss", color: "#06B6D4" },
  "Shadcn UI": { icon: "shadcnui", color: "#000000", invertInDark: true },
  "Aceternity UI": { icon: "react", color: "#61DAFB" },
  "Material UI": { icon: "mui", color: "#007FFF" },

  // Backend & APIs
  "Node.js": { icon: "nodedotjs", color: "#339933" },
  "Express.js": { icon: "express", color: "#000000", invertInDark: true },
  "FastAPI": { icon: "fastapi", color: "#009688" },
  "GraphQL": { icon: "graphql", color: "#E10098" },
  "RESTful APIs": { icon: "fastapi", color: "#009688" },
  "WebSocket": { icon: "socketdotio", color: "#010101", invertInDark: true },
  "SSE": { icon: "html5", color: "#E34F26" },
  "Swagger": { icon: "swagger", color: "#85EA2D" },

  // Cloud & DevOps
  "AWS": { icon: "aws", color: "#FF9900" },
  "Google Cloud Platform": { icon: "googlecloud", color: "#4285F4" },
  "Vercel": { icon: "vercel", color: "#000000", invertInDark: true },
  "Cloudflare Workers": { icon: "cloudflare", color: "#F38020" },
  "Docker": { icon: "docker", color: "#2496ED" },
  "Kubernetes": { icon: "kubernetes", color: "#326CE5" },
  "CI/CD": { icon: "githubactions", color: "#2088FF" },

  // Databases
  "PostgreSQL": { icon: "postgresql", color: "#4169E1" },
  "MySQL": { icon: "mysql", color: "#4479A1" },
  "SQLite": { icon: "sqlite", color: "#003B57" },
  "MongoDB": { icon: "mongodb", color: "#47A248" },
  "Supabase": { icon: "supabase", color: "#3ECF8E" },
  "Cloudflare D1": { icon: "cloudflare", color: "#F38020" },

  // Tools & Platforms
  "Git": { icon: "git", color: "#F05032" },
  "Figma": { icon: "figma", color: "#F24E1E" },
  "Jupyter": { icon: "jupyter", color: "#F37626" },
  "Jira": { icon: "jira", color: "#0052CC" },
  "ClickUp": { icon: "clickup", color: "#7B68EE" },
  "Zendesk": { icon: "zendesk", color: "#03363D" },
  "N8N": { icon: "n8n", color: "#EA4B71" },
  "Capacitor": { icon: "capacitor", color: "#119EFF" },
  "Agile": { icon: "scrumalliance", color: "#009FDA" }, // Using Scrum Alliance icon as Agile representation
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
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border/20 via-border/40 to-border/20 -translate-x-1/2" />
          
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
                      <div className={`inline-block w-full max-w-lg bg-card border border-border rounded-2xl p-5 transition-opacity duration-300 ${isLeft ? 'mr-8' : 'ml-8'}`}>
                        {/* Category Header */}
                        <div className={`mb-4 ${isLeft ? 'text-right' : 'text-left'}`}>
                          <h3 className="text-lg font-bold text-foreground">
                            {category.title}
                          </h3>
                        </div>
                        
                        {/* Skills flowing from category */}
                        <div className="flex flex-wrap gap-2 justify-start">
                          {category.skills.map((skill, skillIndex) => {
                            const skillData = skillLogos[skill];
                            const iconSlug = skillData?.icon;
                            const iconColor = skillData?.color;
                            const invertInDark = skillData?.invertInDark;

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
                                className="group hover:scale-105 transition-transform"
                              >
                                <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 hover:border-foreground/20 hover:bg-muted/50 transition-all">
                                  {iconSlug && (
                                    <img
                                      src={`https://cdn.simpleicons.org/${iconSlug}${iconColor ? `/${iconColor.replace('#', '')}` : ''}`}
                                      alt={skill}
                                      className={`w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity ${invertInDark ? 'dark:invert' : ''}`}
                                    />
                                  )}
                                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                    {skill}
                                  </span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile: Stacked cards */}
                  <div className="md:hidden bg-card border border-border rounded-xl p-4 transition-opacity duration-300">
                    <div className="mb-3">
                      <h3 className="text-base font-semibold text-foreground">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => {
                        const skillData = skillLogos[skill];
                        const iconSlug = skillData?.icon;
                        const iconColor = skillData?.color;
                        const invertInDark = skillData?.invertInDark;

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
                            className="group active:scale-95 transition-transform"
                          >
                            <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-2.5 py-1.5 active:border-foreground/20 active:bg-muted/50 transition-all">
                              {iconSlug && (
                                <img
                                  src={`https://cdn.simpleicons.org/${iconSlug}${iconColor ? `/${iconColor.replace('#', '')}` : ''}`}
                                  alt={skill}
                                  className={`w-3.5 h-3.5 opacity-80 group-active:opacity-100 transition-opacity ${invertInDark ? 'dark:invert' : ''}`}
                                />
                              )}
                              <span className="text-xs font-medium text-foreground/80 group-active:text-foreground transition-colors">
                                {skill}
                              </span>
                            </div>
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
