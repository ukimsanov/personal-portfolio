
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { Mail, Linkedin, Github, FileText, Calendar } from "lucide-react";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Button } from "@/components/ui/button";
import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [calLoaded, setCalLoaded] = useState(false);

  // Initialize Cal.com for quick booking
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "hero-15min" });
        cal("ui", {
          theme: "auto",
          styles: { branding: { brandColor: "#3b82f6" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        setCalLoaded(true);
      } catch (error) {
        console.error('[Cal.com] Error initializing quick booking:', error);
      }
    })();
  }, []);

  const handleQuickBook = async () => {
    try {
      const cal = await getCalApi({ namespace: "hero-15min" });
      cal("modal", {
        calLink: "ukimsanov/15min",
        config: {
          layout: "month_view",
        }
      });
    } catch (error) {
      console.error('[Cal.com] Error opening booking modal:', error);
    }
  };

  const titleVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 1.2,
        delay: shouldReduceMotion ? 0 : 0.2,
        ease: "easeOut" as const
      }
    }
  };

  const descriptionVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 0.7,
        delay: shouldReduceMotion ? 0 : 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const iconsContainerVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 0.4,
        delay: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut" as const
      }
    }
  };

  const iconVariants = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    animate: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        delay: shouldReduceMotion ? 0 : 0.5 + index * 0.1,
        ease: "easeOut" as const
      }
    })
  };
  return (
    <section className="mt-16 w-full">
      <div className="text-left mb-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          {resumeData.name}
        </motion.h1>
        <motion.div
          className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl"
          variants={descriptionVariants}
          initial="initial"
          animate="animate"
        >
          <TypingAnimation
            duration={55}
            startOnView={false}
            delay={1200}
          >
            {resumeData.title}
          </TypingAnimation>
        </motion.div>
      </div>
      
      {/* Contact Icons in Circles */}
      <motion.div
        className="flex items-center gap-4 mb-8 flex-wrap"
        variants={iconsContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.a
          href={`mailto:${resumeData.contact.email}`}
          title="Email"
          className="p-4 rounded-full border border-border/70 hover:border-border hover:shadow-md"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          custom={0}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        >
          <Mail className="w-4 h-4" />
        </motion.a>

        <motion.a
          href={resumeData.contact.socials[1].url}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="p-4 rounded-full border border-border/70 hover:border-border hover:shadow-md"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          custom={1}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        >
          <Github className="w-4 h-4" />
        </motion.a>

        <motion.a
          href={resumeData.contact.socials[0].url}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="p-4 rounded-full border border-border/70 hover:border-border hover:shadow-md"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          custom={2}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        <motion.a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          title="Resume/CV"
          className="p-4 rounded-full border border-border/70 hover:border-border hover:shadow-md"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          custom={3}
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
          whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
        >
          <FileText className="w-4 h-4" />
        </motion.a>

        {/* Quick Book Button */}
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          custom={4}
          className="w-full sm:w-auto sm:ml-auto"
        >
          <Button
            onClick={handleQuickBook}
            disabled={!calLoaded}
            variant="outline"
            size="default"
            className="gap-2 w-full sm:w-auto"
            title="Book a 15-minute call"
          >
            <Calendar className="w-4 h-4" />
            Book w me
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
