"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        {/* Main Title with improved typography */}
        <TextGenerateEffect
          words="Building Bridges Between Learning and Technology"
          className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        />

        {/* Subtitle with better spacing and hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 space-y-3"
        >
          <p className="text-lg text-foreground/80 font-medium tracking-wide sm:text-xl md:text-2xl">
            A creative project for OpenSesame
          </p>
          <p className="text-base text-foreground/50 sm:text-lg">
            by Ular Kimsanov
          </p>
        </motion.div>
      </div>

      {/* Premium scroll indicator with subtle animation */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-foreground/40 transition-all duration-300 hover:text-foreground/70 group"
        aria-label="Scroll to content"
      >
        <span className="text-sm font-medium tracking-wide uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <ChevronDown className="size-5 transition-transform group-hover:scale-110" />
          <div className="absolute inset-0 bg-foreground/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </motion.button>
    </section>
  );
}
