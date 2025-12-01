"use client";

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Backdrop blur for better separation */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-md z-40 pointer-events-none" />

      {/* Premium gradient progress bar with glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ scaleX }}
      >
        <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      </motion.div>
    </>
  );
}
