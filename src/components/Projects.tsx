
"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
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
  mobileImageUrls?: string[]; // For mobile screenshots (vertical) - shown in horizontal scrollable row
  desktopImageUrls?: string[]; // For desktop/web app screenshots (horizontal) - shown in vertical stack
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
      className="py-14 pb-24 w-full"
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
      <div className="space-y-8">
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
            <Card className="w-full group md:hover:shadow-lg transition-all duration-200 ease-out md:hover:-translate-y-1 md:hover:border-blue-500/30 dark:md:hover:border-blue-400/30 active:scale-[0.98] md:active:scale-100">
              <div className="flex flex-col lg:flex-row">
                {/* Project Info */}
                <div
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 cursor-pointer"
                  onClick={() => handleProjectClick(index)}
                >
                  <div className="mb-4">
                    <h3 
                      className="text-lg sm:text-xl font-bold md:group-hover:text-blue-600 dark:md:group-hover:text-blue-400 transition-colors inline-block"
                    >
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-muted/50 border border-border rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    {project.description[0]}
                  </p>
                  
                  <div className="flex items-center gap-3 sm:gap-4 pt-2" onClick={(e) => e.stopPropagation()}>
                    {project.link.href && (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 text-blue-600 md:hover:text-blue-700 dark:text-blue-400 dark:md:hover:text-blue-300 active:opacity-70 transition-all text-xs sm:text-sm"
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
                        className="flex items-center gap-1.5 sm:gap-2 text-blue-600 md:hover:text-blue-700 dark:text-blue-400 dark:md:hover:text-blue-300 active:opacity-70 transition-all text-xs sm:text-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Preview */}
                <div className="lg:w-96 px-4 sm:px-6 py-3 sm:py-4 lg:pr-6 lg:pl-0 lg:py-4 flex items-center overflow-hidden">
                  {project.imageUrl ? (
                    <div className="w-full h-40 sm:h-48 lg:h-56 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center group/preview relative">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        quality={90}
                        sizes="(max-width: 1024px) 100vw, 384px"
                        className="object-cover object-top md:group-hover/preview:scale-105 transition-transform duration-300 ease-out cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 sm:h-48 lg:h-56 bg-muted rounded-lg flex items-center justify-center border border-border">
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
          className="sm:max-w-2xl lg:max-w-3xl"
        >
          <div className="flex flex-col h-full max-h-[70vh] sm:max-h-[85vh] overflow-hidden">
            {/* Header - Fixed */}
            <div className="shrink-0 p-5 pb-3 sm:p-6 sm:pb-4 border-b border-border">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 pr-12 sm:pr-0">{projects[selectedProject].title}</h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {projects[selectedProject].techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-2 py-1 bg-muted/50 border border-border rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {projects[selectedProject].link.href && (
                  <a
                    href={projects[selectedProject].link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 md:hover:text-blue-700 dark:text-blue-400 dark:md:hover:text-blue-300 active:opacity-70 transition-all min-h-[44px] sm:min-h-0"
                  >
                    <Github className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">GitHub</span>
                  </a>
                )}
                {projects[selectedProject].websiteUrl && (
                  <a
                    href={projects[selectedProject].websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 md:hover:text-blue-700 dark:text-blue-400 dark:md:hover:text-blue-300 active:opacity-70 transition-all min-h-[44px] sm:min-h-0"
                  >
                    <ExternalLink className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">Website</span>
                  </a>
                )}
              </div>
            </div>

            {/* Content - Scrollable */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 sm:p-6 pb-6 sm:pb-8 overscroll-contain min-h-0">
              <div className="space-y-4 sm:space-y-6">
                {/* Project Description */}
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {projects[selectedProject].description[0]}
                  </p>

                  {/* Detailed bullet points */}
                  <div className="space-y-2 sm:space-y-3">
                    {projects[selectedProject].description.slice(1).map((desc, i) => (
                      <div key={i} className="flex items-start">
                        <span className="text-muted-foreground mr-2 sm:mr-3 shrink-0">•</span>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Image(s) */}
                {(projects[selectedProject].imageUrl || projects[selectedProject].mobileImageUrls || projects[selectedProject].desktopImageUrls) ? (
                  <div className="w-full space-y-4 sm:space-y-5">
                    {/* Show imageUrl first if it exists - always full width */}
                    {projects[selectedProject].imageUrl && (
                      <div className="w-full rounded-lg border border-border bg-muted overflow-hidden relative">
                        <Image
                          src={projects[selectedProject].imageUrl!}
                          alt={projects[selectedProject].title}
                          width={1920}
                          height={1080}
                          quality={95}
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                    )}
                    
                    {/* Show mobile screenshots (mobileImageUrls) if they exist - horizontal scrollable row */}
                    {projects[selectedProject].mobileImageUrls && (
                      <div>
                        <h3 className="text-sm font-medium mb-2 text-muted-foreground">Mobile Screenshots</h3>
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                          {projects[selectedProject].mobileImageUrls!.map((imageUrl, idx) => (
                            <div 
                              key={idx}
                              className="flex-none w-[calc((100%-16px)/3)] sm:w-[calc((100%-24px)/3)] rounded-lg border border-border bg-muted overflow-hidden relative"
                            >
                              <Image
                                src={imageUrl}
                                alt={`${projects[selectedProject].title} - Mobile Screenshot ${idx + 1}`}
                                width={430}
                                height={932}
                                quality={95}
                                className="w-full h-auto object-contain rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                        {projects[selectedProject].mobileImageUrls!.length > 3 && (
                          <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">
                            Swipe to see more screenshots
                          </p>
                        )}
                      </div>
                    )}

                    {/* Show desktop screenshots (desktopImageUrls) if they exist - vertical stack */}
                    {projects[selectedProject].desktopImageUrls && (
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Desktop Screenshots</h3>
                        {projects[selectedProject].desktopImageUrls!.map((imageUrl, idx) => (
                          <div 
                            key={idx}
                            className="w-full rounded-lg border border-border bg-muted overflow-hidden relative min-h-[200px] sm:min-h-[300px]"
                          >
                            <Image
                              src={imageUrl}
                              alt={`${projects[selectedProject].title} - Desktop Screenshot ${idx + 1}`}
                              width={1920}
                              height={1080}
                              quality={95}
                              className="w-full h-auto object-contain rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 sm:h-64 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <span className="text-sm sm:text-base text-muted-foreground">Project Preview</span>
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
