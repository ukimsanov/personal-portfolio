"use client";

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const reducedMotion = useReducedMotion();

  const techStack = [
    "Next.js 15",
    "TypeScript",
    "Framer Motion",
    "Aceternity UI",
    "Magic UI",
    "Shadcn UI",
    "Tailwind CSS 4"
  ];

  return (
    <section className="py-24 sm:py-32 pb-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center"
        >
          {/* Main CTA with premium typography */}
          <h2 className="mb-10 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Let&apos;s Build the Future of Learning Together
          </h2>

          {/* Premium buttons with hover effects */}
          <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/" className="flex items-center gap-2.5">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                View Full Portfolio
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto border-2 hover:bg-card/50 transition-all"
            >
              <Link href="/cv.pdf" target="_blank" className="flex items-center gap-2.5">
                <FileDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                Download Resume
              </Link>
            </Button>
          </div>

          {/* Premium tech showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-8"
          >
            <div className="rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm sm:p-10 hover:border-border transition-all">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-foreground/60">
                Technical Details
              </h3>
              <p className="mb-6 text-base text-foreground/70 leading-relaxed sm:text-lg">
                This page was built with modern web technologies:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: reducedMotion ? 0.1 : 0.3,
                      delay: reducedMotion ? 0 : index * 0.05,
                      ease: [0.16, 1, 0.3, 1] as const
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="cursor-default rounded-lg bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-500/15"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Final message with premium styling */}
            <motion.p
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-base italic text-foreground/60 leading-relaxed sm:text-lg max-w-2xl mx-auto"
            >
              Just like this page adapts to your scroll, I believe learning should adapt to each learner.
              <br />
              That&apos;s what we can build together.
            </motion.p>
          </motion.div>

          {/* Premium footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.6, delay: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-16 text-sm text-foreground/40 leading-relaxed"
          >
            <p>
              Made with curiosity and creativity
              <br />
              for OpenSesame&apos;s Software Engineering Internship
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
