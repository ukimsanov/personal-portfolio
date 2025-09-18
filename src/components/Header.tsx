
"use client";

import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
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
    <header className="flex items-center justify-between w-full py-6">
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
    </header>
  );
};

export default Header;
