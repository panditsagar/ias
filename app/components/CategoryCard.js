"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Stack, BookOpen, ClockCounterClockwise, ArrowRight } from "@phosphor-icons/react";

export default function CategoryCard({ title, description, count, href, type }) {
  // Determine icon and colors based on category type
  let Icon = BookOpen;
  let bgIconClass = "bg-amber-50 text-amber-700 border border-amber-200/30";

  if (type === "prelims") {
    Icon = Compass;
    bgIconClass = "bg-emerald-50 text-emerald-700 border border-emerald-200/30";
  } else if (type === "mains") {
    Icon = Stack;
    bgIconClass = "bg-blue-50 text-blue-700 border border-blue-200/30";
  } else if (type === "psir") {
    Icon = BookOpen;
    bgIconClass = "bg-amber-50 text-amber-700 border border-amber-200/30";
  } else if (type === "pyq") {
    Icon = ClockCounterClockwise;
    bgIconClass = "bg-purple-50 text-purple-700 border border-purple-200/30";
  }

  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={springTransition}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 sm:p-10 transition-colors duration-300 hover:border-amber-300/50"
    >
      <div className="space-y-5">
        {/* Header Icon + Count */}
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-2xl ${bgIconClass} transition-all duration-300 group-hover:scale-105`}>
            <Icon className="h-6 w-6" weight="regular" />
          </div>
          {count && (
            <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-full select-none">
              {count}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-805 group-hover:text-amber-800 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-sans font-light">
            {description}
          </p>
        </div>
      </div>

      {/* Button Action */}
      <div className="pt-6 mt-6 border-t border-slate-100/80 flex items-center">
        <Link
          href={href}
          className="w-full inline-flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-amber-700 transition-colors"
        >
          <span>View Notes</span>
          <div className="p-1 rounded-full group-hover:bg-amber-50 text-slate-400 group-hover:text-amber-700 transition-all duration-200 active:scale-95">
            <ArrowRight className="h-4 w-4" weight="bold" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
