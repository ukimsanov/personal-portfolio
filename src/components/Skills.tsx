
"use client";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [beamHeight, setBeamHeight] = useState(0);
  const [activeCategory, setActiveCategory] = useState<number>(-1);

  useEffect(() => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      setBeamHeight(rect.height);
    }
  }, [contentRef]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 60%"],
  });

  // Apply spring smoothing for Apple-like fluidity
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, beamHeight]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  // Track which category the beam has reached with smooth transitions
  useEffect(() => {
    let rafId: number;
    // Use smoothProgress for smoother category transitions
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Use requestAnimationFrame to smooth out updates
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (contentRef.current) {
          const categoryElements = contentRef.current.querySelectorAll('[data-category-index]');
          let newActiveCategory = -1;

          // Calculate current beam height from smooth progress
          const currentHeight = latest * beamHeight;

          // Only start checking if beam has actually started moving (at least 2% progress)
          if (currentHeight > beamHeight * 0.02) {
            categoryElements.forEach((element, index) => {
              const rect = element.getBoundingClientRect();
              const contentRect = contentRef.current!.getBoundingClientRect();
              const relativeTop = rect.top - contentRect.top;

              // Check if beam has reached this category header
              if (currentHeight >= relativeTop) {
                newActiveCategory = index;
              }
            });
          }

          // Only update if changed to reduce re-renders
          setActiveCategory(prev => prev !== newActiveCategory ? newActiveCategory : prev);
        }
      });
    });

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [smoothProgress, beamHeight]);

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
        duration: shouldReduceMotion ? 0.3 : 0.8,
        // Apple-inspired smooth ease-out curve
        ease: [0.25, 0.46, 0.45, 0.94] as const
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
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.1 }}
      className="py-10 sm:py-14 pb-20 sm:pb-24 w-full overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 10 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.6,
            // Apple-inspired smooth ease-out curve
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-2xl font-bold mb-12 sm:mb-16 text-center"
        >
          Skills
        </motion.h2>
        
        {/* Branch-style layout */}
        <div ref={contentRef} className="relative">
          {/* Central trunk/node with animated tracing beam */}
          <div
            className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent from-[0%] via-border/40 via-[50%] to-transparent to-[100%]"
            style={{ height: beamHeight + "px", overflow: "visible" }}
          >
            {/* Animated gradient beam with subtle glow - using spread radius */}
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
                boxShadow: "0 0 8px 2px rgba(96, 165, 250, 0.5), 0 0 16px 4px rgba(59, 130, 246, 0.3)"
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full"
            />
          </div>

          {/* Categories as branches */}
          <div className="space-y-8 sm:space-y-12">
            {skillCategories.map((category, categoryIndex) => {
              const isLeft = categoryIndex % 2 === 0;

              // Calculate the color based on position in the gradient (top = blue-400, middle = blue-500, bottom = blue-600)
              const totalCategories = skillCategories.length;
              const position = categoryIndex / (totalCategories - 1); // 0 to 1

              // Interpolate between blue-400 (top) and blue-600 (bottom), with blue-500 in middle
              const getGradientColor = (pos: number) => {
                if (pos < 0.5) {
                  // Blue-400 to Blue-500 (top half)
                  const t = pos * 2; // 0 to 1
                  return {
                    r: Math.round(96 + (59 - 96) * t),    // 96 (blue-400) to 59 (blue-500)
                    g: Math.round(165 + (130 - 165) * t), // 165 to 130
                    b: Math.round(250 + (246 - 250) * t), // 250 to 246
                  };
                } else {
                  // Blue-500 to Blue-600 (bottom half)
                  const t = (pos - 0.5) * 2; // 0 to 1
                  return {
                    r: Math.round(59 + (37 - 59) * t),    // 59 (blue-500) to 37 (blue-600)
                    g: Math.round(130 + (99 - 130) * t),  // 130 to 99
                    b: Math.round(246 + (235 - 246) * t), // 246 to 235
                  };
                }
              };

              const color = getGradientColor(position);
              const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
              const glowString = `0 10px 15px -3px rgba(${color.r}, ${color.g}, ${color.b}, 0.4), 0 0 30px rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;

              return (
                <motion.div
                  key={categoryIndex}
                  variants={categoryVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{
                    duration: shouldReduceMotion ? 0.3 : 0.8,
                    delay: shouldReduceMotion ? categoryIndex * 0.08 : categoryIndex * 0.15,
                    // Apple-inspired smooth ease-out curve
                    ease: [0.25, 0.46, 0.45, 0.94] as const
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative"
                  data-category-index={categoryIndex}
                >
                    {/* Desktop: Alternating left/right layout with connecting line */}
                  <div className={`hidden md:flex items-start gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Category header on the beam - lights up with gradient color when beam reaches it */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-50">
                      <div className="flex items-center justify-center">
                        <motion.div
                          initial={false}
                          animate={{
                            borderColor: activeCategory >= categoryIndex
                              ? colorString
                              : "rgba(96, 165, 250, 0.3)",
                            boxShadow: activeCategory >= categoryIndex
                              ? glowString
                              : "0 10px 15px -3px rgba(59, 130, 246, 0.1)"
                          }}
                          transition={{
                            duration: 1.0,
                            // Apple-inspired smooth ease-out curve for glow effect
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          className="bg-background border-2 rounded-full px-4 py-2"
                        >
                          <h3 className="text-sm font-bold text-foreground whitespace-nowrap">
                            {category.title}
                          </h3>
                        </motion.div>
                      </div>
                    </div>

                    {/* Category node with connecting branch */}
                    <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'} mt-16`}>
                      <div className={`inline-block w-full max-w-lg bg-card border border-border rounded-2xl p-5 transition-opacity duration-300 ${isLeft ? 'mr-8' : 'ml-8'}`}>
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
                                  duration: shouldReduceMotion ? 0.2 : 0.5,
                                  delay: shouldReduceMotion ? skillIndex * 0.02 : skillIndex * 0.04,
                                  // Apple-inspired smooth ease-out curve
                                  ease: [0.25, 0.46, 0.45, 0.94] as const
                                }}
                                viewport={{ once: true, amount: 0.3 }}
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
                  <div className="md:hidden bg-card border border-border rounded-xl p-5 sm:p-6 transition-opacity duration-300">
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
