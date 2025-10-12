
"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import { ThemeToggler } from "./ThemeToggler";
import { useState, useEffect } from "react";

const Header = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Use a smaller threshold to trigger the animation earlier
      if (latest > 10) {
        setIsScrolled(true);
      } else if (latest < 5) {
        // Only set back to false when very close to top
        setIsScrolled(false);
      }
    });

    return () => unsubscribe();
  }, [scrollY]);

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
      const headerHeight = 72; // Sticky header height (py-4 = 16px top + 16px bottom + content)
      const targetPosition = element.offsetTop - headerHeight;
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
      className="sticky top-0 z-50 w-full py-4"
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className={`mx-auto transition-all duration-500 ease-in-out ${isScrolled ? 'max-w-[42rem]' : 'max-w-full'}`}
      >
        <motion.div
          className="flex items-center justify-between w-full"
          animate={{
            paddingLeft: isScrolled ? "1.5rem" : "0rem",
            paddingRight: isScrolled ? "1.5rem" : "0rem",
            paddingTop: isScrolled ? "0.75rem" : "0.5rem",
            paddingBottom: isScrolled ? "0.75rem" : "0.5rem",
            borderRadius: isScrolled ? "1rem" : "0rem",
            backgroundColor: isScrolled ? "hsl(var(--background) / 0.8)" : "hsl(var(--background) / 0)",
            borderWidth: isScrolled ? "1px" : "0px",
            borderColor: isScrolled ? "hsl(var(--border) / 0.4)" : "hsl(var(--border) / 0)",
            boxShadow: isScrolled
              ? "0 1px 2px 0 rgb(0 0 0 / 0.05)"
              : "0 0 0 0 rgb(0 0 0 / 0)"
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{
            backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: isScrolled ? "blur(12px)" : "blur(0px)"
          }}
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
            <a
              href="#contact-form"
              onClick={(e) => handleNavClick(e, 'contact-form')}
              className="text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
            >
              Contact
            </a>
          </nav>
          <ThemeToggler />
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
