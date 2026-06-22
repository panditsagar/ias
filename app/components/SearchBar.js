"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function SearchBar({ initialValue = "", placeholder = "Search Polity, Economy, PSIR, Geography..." }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/notes?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/notes");
    }
  };

  const clearSearch = () => {
    setQuery("");
    router.push("/notes");
  };

  const quickTags = [
    { label: "Polity", query: "Polity" },
    { label: "Economy", query: "Economy" },
    { label: "PSIR", query: "PSIR" },
    { label: "Geography", query: "Geography" },
    { label: "Fundamental Rights", query: "Fundamental Rights" },
    { label: "Ancient India", query: "Ancient" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-5 py-4 pl-12 pr-10 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs transition-all text-base font-sans"
          />
          <div className="absolute left-4 text-slate-400">
            <MagnifyingGlass className="h-5 w-5" weight="bold" />
          </div>
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-650 transition-colors cursor-pointer active:scale-90"
            >
              <X className="h-4 w-4" weight="bold" />
            </button>
          )}
        </div>
      </form>

      {/* Suggested Quick Tags */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs sm:text-sm">
        <span className="text-slate-400 font-sans select-none">Suggestions:</span>
        {quickTags.map((tag) => (
          <button
            key={tag.label}
            onClick={() => {
              setQuery(tag.query);
              router.push(`/notes?q=${encodeURIComponent(tag.query)}`);
            }}
            className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-850 hover:bg-amber-50/20 cursor-pointer transition-all duration-150 text-xs font-medium active:scale-95 hover:scale-[1.03] transform"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
