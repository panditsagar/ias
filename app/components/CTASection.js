"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "@phosphor-icons/react";

export default function CTASection() {
  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <div className="relative rounded-3xl bg-slate-900 border border-slate-800 text-white p-8 sm:p-12 overflow-hidden shadow-xl my-12 select-none">
      {/* Background radial effects */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute left-10 bottom-0 w-80 h-80 bg-amber-600/5 rounded-full blur-2xl pointer-events-none -z-10" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 notebook-grid opacity-5 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center text-center gap-8 z-10 max-w-3xl mx-auto">
        
        {/* Centered Text Block */}
        <div className="flex flex-col items-center space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" weight="bold" />
            <span>Interactive Learning</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Start building clarity, one note at a time.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light">
            Skip the clutter of heavy textbooks. Read simplified, syllabus-aligned micro-notes and high-yield topics crafted specifically for civil services preparation.
          </p>
        </div>

        {/* Centered Action Button with spring physics */}
        <div className="w-full sm:w-auto flex justify-center">
          <Link href="/notes" className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springTransition}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-605 text-slate-950 font-bold transition-shadow shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Explore Notes Archive</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" weight="bold" />
            </motion.div>
          </Link>
        </div>

      </div>
    </div>
  );
}
