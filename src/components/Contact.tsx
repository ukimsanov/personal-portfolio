
"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Phone, Linkedin, Github, FileText } from "lucide-react";

const Contact = () => {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="p-10 w-full text-center"
    >
      <h2 className="text-3xl font-bold mb-6">Contact</h2>
      <div className="flex justify-center gap-6">
        <a href={`mailto:${resumeData.contact.email}`} className="flex items-center gap-2">
          <Mail />
          <span>Email</span>
        </a>
        <a href={`tel:${resumeData.contact.tel}`} className="flex items-center gap-2">
          <Phone />
          <span>Phone</span>
        </a>
        <a
          href={resumeData.contact.socials[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Linkedin />
          <span>LinkedIn</span>
        </a>
        <a
          href={resumeData.contact.socials[1].url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Github />
          <span>GitHub</span>
        </a>
        <a href="/Resume Latestttt.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <FileText />
            <span>Resume</span>
        </a>
      </div>
    </motion.section>
  );
};

export default Contact;
