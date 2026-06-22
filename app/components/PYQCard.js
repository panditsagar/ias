"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClockCounterClockwise, ArrowUpRight } from "@phosphor-icons/react";

export default function PYQCard({ paper, description, years = "2013 - 2025", type = "Mains" }) {
  // Color themes based on Prelims vs Mains vs Optional PYQs
  const typeBadgeColors = {
    "Prelims": "bg-emerald-50 text-emerald-805 border border-emerald-200/40",
    "Mains": "bg-blue-50 text-blue-805 border border-blue-200/40",
    "Optional": "bg-amber-50 text-amber-805 border border-amber-200/40"
  };

  const badgeStyle = typeBadgeColors[type] || "bg-slate-50 text-slate-800 border border-slate-200";
  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      transition={springTransition}
      className="group bg-white rounded-2xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-between transition-colors duration-300 hover:border-amber-300/50"
    >
      <div className="space-y-4">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold select-none ${badgeStyle}`}>
            {type} PYQs
          </span>
          <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-medium select-none">
            <ClockCounterClockwise className="h-4 w-4" weight="bold" />
            <span>{years}</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-805 group-hover:text-amber-805 transition-colors">
            {paper}
          </h3>
          <p className="text-slate-650 text-sm font-sans font-light leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 font-sans select-none">Premium PYQ Analysis</span>
        <Link
          href={`/notes?category=${type === "Optional" ? "PSIR+Optional" : type}&q=PYQ`}
          className="inline-flex items-center space-x-0.5 font-semibold text-amber-700 hover:text-amber-850 group-hover:underline active:scale-[0.98] transition-transform"
        >
          <span>View PYQ Notes</span>
          <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" weight="bold" />
        </Link>
      </div>
    </motion.div>
  );
}
