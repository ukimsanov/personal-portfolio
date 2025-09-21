
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  const shouldReduceMotion = useReducedMotion();

  const headerVariants = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: "easeOut" as const
      }
    }
  };
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const startPosition = window.pageYOffset;
      const targetPosition = element.offsetTop - 80; // Add some offset for header
      const distance = targetPosition - startPosition;
      const duration = 1200; // Slower duration (1.2 seconds)
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Easing function for smooth animation
      function ease(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    smoothScrollTo(targetId);
  };

  return (
    <motion.header 
      className="flex items-center justify-between w-full py-6"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <nav className="flex items-center gap-6">
        <a 
          href="#projects" 
          onClick={(e) => handleNavClick(e, 'projects')}
          className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
        >
          Projects
        </a>
        <a 
          href="#skills" 
          onClick={(e) => handleNavClick(e, 'skills')}
          className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
        >
          Skills
        </a>
      </nav>
      <ThemeToggler />
    </motion.header>
  );
};

export default Header;
