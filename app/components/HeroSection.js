"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "@phosphor-icons/react";

export default function HeroSection() {
  // Framer Motion spring configuration
  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  // Stagger children animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: springTransition },
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 border-b border-amber-200/25 bg-[#FAF6EE]  ">
      {/* Decorative background grid */}
      <div className="absolute inset-0 notebook-grid opacity-50 pointer-events-none" />

      {/* Radial shade overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FBF9F4]/40 to-[#FBF9F4] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content Area (7 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Top Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-800 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-amber-200/30 mx-auto lg:mx-0"
            >
              <Trophy
                className="h-4 w-4 text-amber-600 shrink-0"
                weight="bold"
              />
              <span>Designed for UPSC CSE Aspirants</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.045em] text-slate-800 leading-[1.08]"
            >
              UPSC Notes Made <br className="hidden sm:inline" />
              <span className="text-amber-700    ">
                Simple, Structured
              </span>{" "}
              <br />
              &amp; Revision-Friendly
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-8 font-sans font-normal"
            >
              Read Prelims, Mains, PSIR Optional, PYQ and revision-focused notes
              in one clean notebook-style platform. From one aspirant’s desk to
              another, designed for repeated visual reading.
            </motion.p>

            {/* Action Buttons with magnetic spring feel */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/notes" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                  className="px-8 py-4 rounded-2xl bg-amber-700 text-white font-medium hover:bg-amber-800 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>Start Reading Notes</span>
                  <ArrowRight
                    className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                    weight="bold"
                  />
                </motion.div>
              </Link>

              <Link href="/psir-optional" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                  className="px-8 py-4 rounded-2xl bg-white text-slate-700 font-medium hover:text-amber-800 hover:bg-amber-50/20 border border-slate-200 hover:border-amber-300 shadow-xs transition-shadow flex items-center justify-center cursor-pointer"
                >
                  Explore PSIR Optional
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side Column (5 columns) - UPSC Student Image Only */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[400px] sm:min-h-[540px] lg:-mr-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="relative w-full max-w-[520px] h-[400px] sm:h-[540px] flex items-center justify-center"
            >
              <Image
                src="/hero.webp"
                alt="Focused UPSC student holding books"
                width={1024}
                height={1024}
                priority
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 70vw, 92vw"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 58%, transparent 92%)",
                  maskImage:
                    "linear-gradient(to bottom, #000 0%, #000 58%, transparent 92%)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
                className="relative z-10 h-auto w-full origin-bottom scale-[1.15]   object-contain mix-blend-multiply"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
