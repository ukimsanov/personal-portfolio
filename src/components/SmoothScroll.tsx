"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Extend Window interface to include Lenis
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with smooth scroll configuration
    const lenis = new Lenis({
      // Duration of the smooth scroll animation
      // Reduced from 1.2 to 0.9 for snappier feel
      duration: 0.9,

      // Easing function - slightly less aggressive smoothing
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Smoothness factor - true enables smooth wheel
      smoothWheel: true,

      // Wheel multiplier (controls scroll speed sensitivity)
      // 1.2 = slightly faster response, more direct feel
      wheelMultiplier: 1.2,

      // Touch multiplier for mobile
      touchMultiplier: 2.0,

      // Infinite scroll (false for normal behavior)
      infinite: false,
    });

    lenisRef.current = lenis;

    // Expose Lenis instance globally for navigation and other components
    window.lenis = lenis;

    // Add Lenis class to HTML element for CSS styling
    document.documentElement.classList.add('lenis');

    // RequestAnimationFrame loop for Lenis
    // This is what makes the scroll buttery smooth - 60fps updates
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove('lenis');
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
}
