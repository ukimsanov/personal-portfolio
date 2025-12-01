"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Users, CheckCircle2, Zap } from 'lucide-react';

export function BuilderSection() {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.15,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.1 : 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  const stats = [
    { icon: Users, value: 120, suffix: "+", label: "students in pilot programs", color: "text-blue-500" },
    { icon: CheckCircle2, value: 78, suffix: "%", label: "lesson completion rate", color: "text-green-500" },
    { icon: Zap, value: 60, prefix: "<", suffix: "s", label: "onboarding time", color: "text-yellow-500" }
  ];

  return (
    <section className="py-20 sm:py-28 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-16 lg:grid-cols-2 lg:gap-20"
        >
          {/* Left Column - Text Content with improved typography */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              I&apos;m already building what OpenSesame does.
            </h2>

            <div className="space-y-6 text-base text-foreground/70 leading-relaxed sm:text-lg">
              <p>
                Over the past year, I&apos;ve architected an{" "}
                <span className="font-semibold text-foreground">
                  NSF-funded cybersecurity education platform
                </span>{" "}
                for high school students—a mission to make STEM accessible to everyone.
              </p>

              <p>
                This isn&apos;t just a portfolio project. It&apos;s proof that I understand your mission:{" "}
                <span className="font-semibold text-foreground">
                  transforming workforce development through technology that actually works.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Column - Premium stat cards */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-5">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex items-start gap-5 rounded-2xl border border-border/50 bg-card/30 p-7 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className={`relative rounded-xl bg-background p-3.5 shadow-sm ${stat.color} transition-transform group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1 relative">
                      <div className="flex items-baseline gap-1.5 text-3xl font-bold tracking-tight sm:text-4xl">
                        {stat.prefix && <span className="text-2xl">{stat.prefix}</span>}
                        <NumberTicker value={stat.value} className={stat.color} />
                        {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
                      </div>
                      <p className="mt-2 text-sm text-foreground/60 leading-relaxed sm:text-base">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
