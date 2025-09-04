
"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";

const Projects = () => {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="p-10 w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>
                {project.techStack.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {project.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>{project.link.label}</span>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
