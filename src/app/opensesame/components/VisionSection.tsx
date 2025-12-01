"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Timeline } from '@/components/ui/timeline';
import { NumberTicker } from '@/components/ui/number-ticker';

export function VisionSection() {
  const reducedMotion = useReducedMotion();

  const timelineData = [
    {
      title: "2025 • NSF Cybersecurity Platform",
      content: (
        <div className="space-y-3">
          <p className="text-base text-foreground/80 sm:text-lg">
            Democratizing cybersecurity education for underserved high schools
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
              Next.js
            </span>
            <span className="rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
              Cloudflare Workers
            </span>
            <span className="rounded-md bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500">
              D1 Database
            </span>
          </div>
          <p className="text-sm text-foreground/60">
            <span className="font-semibold">Impact:</span> 120+ students, 78% completion rate
          </p>
        </div>
      ),
    },
    {
      title: "2025 • ZanEt Analytics Educational Platform",
      content: (
        <div className="space-y-3">
          <p className="text-base text-foreground/80 sm:text-lg">
            Production OAuth/SSO for educational game platform
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-500">
              TypeScript
            </span>
            <span className="rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-500">
              React
            </span>
            <span className="rounded-md bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-500">
              Cloudflare R2
            </span>
          </div>
          <p className="text-sm text-foreground/60">
            <span className="font-semibold">Impact:</span> 60% load time reduction, secure authentication
          </p>
        </div>
      ),
    },
    {
      title: "2025 • Multi-Agent Sports Analytics",
      content: (
        <div className="space-y-3">
          <p className="text-base text-foreground/80 sm:text-lg">
            AI-powered insights accessible to 10,000+ users
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
              LangChain
            </span>
            <span className="rounded-md bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
              LangGraph
            </span>
            <span className="rounded-md bg-green-500/10 px-3 py-1 text-sm font-medium text-green-500">
              CrewAI
            </span>
          </div>
          <p className="text-sm text-foreground/60">
            <span className="font-semibold">Impact:</span> Real-time predictions, intelligent analysis
          </p>
        </div>
      ),
    },
    {
      title: "2024 • LectureFlow AI Notes",
      content: (
        <div className="space-y-3">
          <p className="text-base text-foreground/80 sm:text-lg">
            Making lecture content universally accessible through AI
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-500">
              LangGraph
            </span>
            <span className="rounded-md bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-500">
              FastAPI
            </span>
            <span className="rounded-md bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-500">
              PostgreSQL
            </span>
          </div>
          <p className="text-sm text-foreground/60">
            <span className="font-semibold">Impact:</span> Instant summarization, 99% cost reduction
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* The Pattern Section with improved typography */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Every Project Tells the Same Story
          </h2>
          <p className="mt-6 text-lg text-foreground/60 leading-relaxed sm:text-xl max-w-2xl mx-auto">
            A pattern of democratizing access through technology
          </p>
        </motion.div>

        {/* Timeline */}
        <Timeline data={timelineData} />

        {/* The Pattern Insight with premium typography */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-20 text-center"
        >
          <p className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-blue-500">Access.</span>{" "}
            <span className="text-green-500">Scale.</span>{" "}
            <span className="text-yellow-500">Impact.</span>
          </p>
          <p className="mt-6 text-lg text-foreground/60 leading-relaxed sm:text-xl">
            That&apos;s why OpenSesame makes perfect sense.
          </p>
        </motion.div>

        {/* Multiplier Effect with enhanced spacing */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-32"
        >
          <h2 className="mb-20 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            From My Impact
            <br />
            <span className="text-foreground/40">to Our Impact</span>
          </h2>

          <div className="grid gap-16 md:grid-cols-3">
            {/* My Journey - spans 2 columns with premium styling */}
            <div className="space-y-8 border-l-[3px] border-blue-500/30 pl-10 md:col-span-2">
              <h3 className="text-xl font-bold text-foreground/60 tracking-wide uppercase text-sm">My Journey So Far</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold text-blue-500 tracking-tight sm:text-6xl lg:text-7xl">
                    <NumberTicker value={10000} />+
                  </div>
                  <p className="text-foreground/60 mt-2 text-base">users reached</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-blue-500 tracking-tight sm:text-6xl lg:text-7xl">
                    <NumberTicker value={120} />+
                  </div>
                  <p className="text-foreground/60 mt-2 text-base">students taught</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-blue-500 tracking-tight sm:text-6xl lg:text-7xl">
                    <NumberTicker value={4} />
                  </div>
                  <p className="text-foreground/60 mt-2 text-base">production AI systems</p>
                </div>
              </div>
            </div>

            {/* OpenSesame's Scale - 1 column with refined styling */}
            <div className="space-y-8 border-l-[3px] border-foreground/10 pl-10">
              <h3 className="text-xl font-bold text-foreground/60 tracking-wide uppercase text-sm">OpenSesame&apos;s Scale</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold tracking-tight sm:text-6xl">
                    <NumberTicker value={60000} />+
                  </div>
                  <p className="text-sm text-foreground/60 mt-2">courses</p>
                </div>
                <div>
                  <div className="text-5xl font-bold tracking-tight sm:text-6xl">
                    <NumberTicker value={2000} />+
                  </div>
                  <p className="text-sm text-foreground/60 mt-2">companies</p>
                </div>
                <div>
                  <div className="text-5xl font-bold tracking-tight sm:text-6xl">
                    <NumberTicker value={150} />+
                  </div>
                  <p className="text-sm text-foreground/60 mt-2">Global 2000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Convergence - Premium simple text */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: reducedMotion ? 0.1 : 0.8, delay: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-20 border-l-[3px] border-foreground/10 pl-10"
          >
            <p className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              What happens when we combine:
            </p>
            <div className="space-y-3 text-lg text-foreground/70 leading-relaxed sm:text-xl">
              <p>AI/ML expertise + Your platform</p>
              <p>Education experience + Your mission</p>
              <p>Extreme Programming + Rapid innovation</p>
            </div>
            <p className="mt-8 text-xl font-bold tracking-tight sm:text-2xl">
              = Transformative learning experiences at unprecedented scale
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
