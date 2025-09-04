
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
      className="p-10 w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Skills</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {resumeData.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm"
          >
            {skill}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Skills;
