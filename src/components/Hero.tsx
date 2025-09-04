
"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-10"
    >
      <h1 className="text-5xl font-bold">{resumeData.name}</h1>
      <p className="text-xl mt-4">{resumeData.title}</p>
    </motion.section>
  );
};

export default Hero;
