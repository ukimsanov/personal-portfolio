
"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

const Skills = () => {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-16 w-full"
    >
      <h2 className="text-3xl font-bold mb-12">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {resumeData.skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 * index }}
            className="bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm hover:bg-secondary/80 transition-colors"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
