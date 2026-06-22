"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, CaretRight } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";
import GoogleAuthModal from "./GoogleAuthModal";

export default function NoteCard({ note, onAccess }) {
  const router = useRouter();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { id, title, category, subject, paper, description, updatedAt, examFocus } = note;

  // Check if this note is coming soon
  const isComingSoon = note.comingSoon;

  // Determine badge colors based on category
  const categoryBadgeColors = {
    "Prelims": "bg-emerald-50 text-emerald-805 border border-emerald-200/40",
    "Mains": "bg-blue-50 text-blue-805 border border-blue-200/40",
    "PSIR Optional": "bg-amber-50 text-amber-805 border border-amber-200/40",
    "BPSC": "bg-purple-50 text-purple-800 border border-purple-200/40"
  };

  const badgeStyle = categoryBadgeColors[category] || "bg-slate-50 text-slate-800 border border-slate-200";
  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  function handleRead() {
    if (onAccess) {
      onAccess(note);
      return;
    }
    if (user) {
      router.push(`/notes/${id}`);
      return;
    }
    setShowAuthModal(true);
  }

  function handleAuthenticated() {
    setShowAuthModal(false);
    router.push(`/notes/${id}`);
  }

  return (
    <motion.div
      whileHover={isComingSoon ? {} : { y: -3, scale: 1.005 }}
      whileTap={isComingSoon ? {} : { scale: 0.995 }}
      transition={springTransition}
      className={`group bg-white rounded-2xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden ${
        isComingSoon ? "cursor-default" : "hover:border-amber-300/50 transition-colors duration-300"
      }`}
    >
      {/* Upper Content Area */}
      <div className="p-6 sm:p-8 space-y-4">
        {/* Badges Line */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`px-2.5 py-1 rounded-full font-medium select-none ${badgeStyle}`}>
            {category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/50 text-slate-600 font-medium select-none">
            {subject}
          </span>
          {paper && (
            <span className="text-slate-400 font-medium select-none">
              {paper}
            </span>
          )}
        </div>

        {/* Title */}
        {isComingSoon ? (
          <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-800 leading-snug select-none">
            {title}
          </h4>
        ) : (
          <button type="button" onClick={handleRead} className="block cursor-pointer text-left">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-800 group-hover:text-amber-850 transition-colors leading-snug">
              {title}
            </h4>
          </button>
        )}

        {/* Short Description */}
        <p className="text-slate-600 text-sm font-sans font-light leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Exam Focus Tags */}
        <div className="flex flex-wrap items-center gap-1 pt-1">
          <span className="text-slate-400 text-xs mr-1 font-sans select-none">Exam relevance:</span>
          {examFocus.map((focus) => (
            <span key={focus} className="text-[10px] uppercase tracking-wider font-semibold bg-slate-100/80 text-slate-600 px-2 py-0.5 rounded-sm border border-slate-200/40 select-none">
              {focus}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info Area */}
      <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1 select-none">
          <Clock className="h-3.5 w-3.5" weight="regular" />
          <span>Updated {updatedAt}</span>
        </div>
        {isComingSoon ? (
          <div className="inline-flex items-center space-x-0.5 font-semibold text-slate-400 select-none">
            <span>Coming Soon</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleRead}
            className="inline-flex cursor-pointer items-center space-x-0.5 font-semibold text-amber-700 transition-colors hover:text-amber-850 group-hover:underline"
          >
            <span>Read Notes</span>
            <CaretRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-0.5" weight="bold" />
          </button>
        )}
      </div>
      <GoogleAuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} onSuccess={handleAuthenticated} message={category === "BPSC" ? "Your BPSC note, ready." : "Your UPSC note, ready."} />
    </motion.div>
  );
}
