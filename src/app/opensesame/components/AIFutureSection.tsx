"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Brain, Target, Trophy } from 'lucide-react';

export function AIFutureSection() {
  const reducedMotion = useReducedMotion();

  const opportunities = [
    {
      icon: Target,
      title: "Extreme Programming",
      description: "Rapid iteration. Ship fast. Learn faster. This is how I work.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "You're already integrating AI into products. I've built the systems. Let's push boundaries.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Trophy,
      title: "Real Impact",
      description: "Workforce development at scale. 2,000+ companies. Real people. Real growth.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Why AI in Learning Excites Me with premium typography */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Why AI in Learning Excites Me
          </h2>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left - The Problem with improved readability */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-8"
          >
            <div className="space-y-6 text-base text-foreground/70 leading-relaxed sm:text-lg">
              <p className="text-xl font-semibold text-foreground leading-[1.3] tracking-tight sm:text-2xl lg:text-3xl">
                Learning has always been one-size-fits-all.
                <br />
                <span className="text-foreground/70">But people aren&apos;t.</span>
              </p>

              <p>
                I&apos;ve built multi-agent AI systems that{" "}
                <span className="font-semibold text-foreground">collaborate, adapt, and reason</span>.
                What excites me is applying this to learning.
              </p>

              <p>
                Imagine AI agents that don&apos;t just deliver content, but{" "}
                <span className="font-semibold text-foreground">understand context</span>.
                That adapt to how <span className="italic">YOU</span> learn.
                That guide, challenge, and encourage.
              </p>
            </div>
          </motion.div>

          {/* Right - The Vision with premium card styling */}
          <motion.div
            initial={{ opacity: 0, x: reducedMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-10"
          >
            {/* Traditional Learning with refined styling */}
            <div className="group rounded-2xl border border-border/50 bg-card/30 p-7 backdrop-blur-sm transition-all hover:border-border hover:shadow-lg">
              <h3 className="mb-5 text-base font-semibold text-foreground/60 uppercase tracking-wide">
                Traditional Learning:
              </h3>
              <div className="flex items-center gap-2.5 text-foreground/40">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold">
                    A
                  </div>
                  <span>→</span>
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold">
                    B
                  </div>
                  <span>→</span>
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold">
                    C
                  </div>
                  <span>→</span>
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold">
                    D
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground/50 leading-relaxed">
                Everyone follows the same path
              </p>
            </div>

            {/* AI-Powered Learning with premium gradient */}
            <div className="group rounded-2xl border border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/5 p-7 backdrop-blur-sm transition-all hover:border-blue-500 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]">
              <h3 className="mb-5 text-base font-semibold text-blue-500 uppercase tracking-wide">
                AI-Powered Learning:
              </h3>
              <div className="flex items-center gap-2.5">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-500">
                  A
                </div>
                <span className="text-blue-500/60">→</span>
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-500">
                  ?
                </div>
                <span className="text-blue-500/60">→</span>
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-500">
                  ?
                </div>
                <span className="text-blue-500/60">→</span>
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-500">
                  D
                </div>
              </div>
              <p className="mt-4 text-sm text-blue-500/80 leading-relaxed">
                Personalized based on understanding
              </p>
            </div>

            <p className="text-center text-lg font-semibold tracking-tight sm:text-xl">
              That&apos;s the future I want to build at OpenSesame.
            </p>
          </motion.div>
        </div>

        {/* Why OpenSesame. Why Now. with premium card design */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: reducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-32"
        >
          <h2 className="mb-16 text-center text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Why OpenSesame. Why Now.
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;
              return (
                <motion.div
                  key={opportunity.title}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: reducedMotion ? 0.1 : 0.6,
                    delay: reducedMotion ? 0 : index * 0.1,
                    ease: [0.16, 1, 0.3, 1] as const
                  }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative rounded-2xl border border-border/50 bg-card/30 p-9 backdrop-blur-sm transition-all hover:border-border hover:bg-card/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                >
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className={`relative mb-6 inline-flex rounded-xl ${opportunity.bgColor} p-4 transition-transform group-hover:scale-110`}>
                    <Icon className={`size-8 ${opportunity.color}`} />
                  </div>
                  <h3 className="relative mb-4 text-xl font-bold tracking-tight">{opportunity.title}</h3>
                  <p className="relative text-foreground/70 leading-relaxed">{opportunity.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
