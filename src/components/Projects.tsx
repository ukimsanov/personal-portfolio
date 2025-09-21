
"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { resumeData } from "@/data/resume";
import { Card } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import Modal from "@/components/ui/modal-drop";

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

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const projects = resumeData.projects as Project[];

  const handleProjectClick = (index: number) => {
    setSelectedProject(index);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="projects"
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 20 : 50 
      }}
      animate={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{ 
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
        delay: shouldReduceMotion ? 0.2 : 0.4 
      }}
      className="py-14 w-full"
    >
      <motion.h2 
        initial={{ 
          opacity: 0, 
          y: shouldReduceMotion ? 10 : 30 
        }}
        animate={{ 
          opacity: 1, 
          y: 0 
        }}
        transition={{ 
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.25 : 0.5,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        className="text-2xl font-bold mb-8"
      >
        Projects
      </motion.h2>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0, 
              y: shouldReduceMotion ? 10 : 30 
            }}
            {...(index === 0 
              ? {
                  animate: { 
                    opacity: 1, 
                    y: 0 
                  },
                  transition: { 
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? 0.3 : 0.6,
                    ease: [0.25, 0.1, 0.25, 1] as const
                  }
                }
              : {
                  whileInView: { 
                    opacity: 1, 
                    y: 0 
                  },
                  transition: { 
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay: shouldReduceMotion ? index * 0.05 : index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1] as const
                  },
                  viewport: { once: true, amount: 0.1 }
                }
            )}
          >
            <Card className="w-full hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row">
                {/* Project Info */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 
                      className="text-lg sm:text-xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer inline-block"
                      onClick={() => handleProjectClick(index)}
                    >
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                    {project.techStack.join(" • ")}
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    {project.description[0]}
                  </p>
                  
                  <div className="flex items-center gap-3 sm:gap-4 pt-2">
                    {project.link.href && (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-xs sm:text-sm"
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {/* Add website link if available */}
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Preview */}
                <div className="lg:w-72 p-4 sm:p-6 lg:pr-6 lg:pl-0 lg:py-6 flex items-center">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg border border-border"
                    />
                  ) : (
                    <div className="w-full h-32 sm:h-40 lg:h-48 bg-muted rounded-lg flex items-center justify-center border border-border">
                      <span className="text-muted-foreground text-xs sm:text-sm">Preview</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject !== null && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          type="blur"
          animationType="scale"
          allowEasyClose={true}
          showCloseButton={true}
          showEscText={false}
          disablePadding={true}
          className="max-w-4xl max-h-[80vh]"
        >
          <div className="flex flex-col h-full max-h-[80vh]">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 p-6 pb-4 border-b border-border">
              <h2 className="text-2xl font-bold mb-2">{projects[selectedProject].title}</h2>
              <div className="text-sm text-muted-foreground mb-4">
                {projects[selectedProject].techStack.join(" • ")}
              </div>
              
              {/* Links */}
              <div className="flex items-center gap-4">
                {projects[selectedProject].link.href && (
                  <a
                    href={projects[selectedProject].link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {projects[selectedProject].websiteUrl && (
                  <a
                    href={projects[selectedProject].websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Project Description */}
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {projects[selectedProject].description[0]}
                  </p>
                  
                  {/* Detailed bullet points */}
                  <div className="space-y-3">
                    {projects[selectedProject].description.slice(1).map((desc, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-blue-500 dark:text-blue-400 mr-3 mt-1.5 flex-shrink-0">•</span>
                        <p className="text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Image */}
                {projects[selectedProject].imageUrl ? (
                  <div>
                    <img
                      src={projects[selectedProject].imageUrl}
                      alt={projects[selectedProject].title}
                      className="w-full max-h-96 object-cover rounded-lg border border-border"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <span className="text-muted-foreground">Project Preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </motion.section>
  );
}

export default Projects;
