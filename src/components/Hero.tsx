
"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Phone, Linkedin, Github, FileText } from "lucide-react";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 w-full"
    >
      <div className="text-left mb-8">
        <h1 className="text-6xl font-bold mb-8">{resumeData.name}</h1>
        <p className="text-xl text-foreground/70 max-w-3xl">{resumeData.title}</p>
      </div>
      
      {/* Contact Icons in Circles */}
      <div className="flex items-center gap-4 mb-8">
        <motion.a
          href={`mailto:${resumeData.contact.email}`}
          className="p-4 rounded-full border border-border/70 hover:border-border transition-all duration-300 ease-in-out hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4 duration-300" />
        </motion.a>
        
        <motion.a
          href={resumeData.contact.socials[1].url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full border border-border/70 hover:border-border transition-all duration-300 ease-in-out hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="w-4 h-4 duration-300" />
        </motion.a>
        
        <motion.a
          href={resumeData.contact.socials[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full border border-border/70 hover:border-border transition-all duration-300 ease-in-out hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="w-4 h-4 duration-300" />
        </motion.a>
        
        <motion.a
          href="/Resume Latestttt.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full border border-border/70 hover:border-border transition-all duration-300 ease-in-out hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FileText className="w-4 h-4 duration-300" />
        </motion.a>
        
        <motion.a
          href={`tel:${resumeData.contact.tel}`}
          className="p-4 rounded-full border border-border/70 hover:border-border transition-all duration-300 ease-in-out hover:shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="w-4 h-4 duration-300" />
        </motion.a>
      </div>
    </motion.section>
  );
};

export default Hero;
