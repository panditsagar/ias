"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NoteCard from "../components/NoteCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { MagnifyingGlass, X, Sliders, BookOpen, ArrowCounterClockwise } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotesListingClient({ allNotes }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve initial states from URL search params
  const paramCategory = searchParams.get("category") || "";
  const paramSubject = searchParams.get("subject") || "";
  const paramPaper = searchParams.get("paper") || "";
  const paramQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(paramQuery);
  const [selectedCategory, setSelectedCategory] = useState(paramCategory);
  const [selectedSubject, setSelectedSubject] = useState(paramSubject);
  const [selectedPaper, setSelectedPaper] = useState(paramPaper);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Sync state with URL params when they change
  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
    setSelectedCategory(searchParams.get("category") || "");
    setSelectedSubject(searchParams.get("subject") || "");
    setSelectedPaper(searchParams.get("paper") || "");
  }, [searchParams]);

  // Extract unique categories and subjects for filter options
  const categories = ["Prelims", "Mains", "PSIR Optional"];
  
  const subjects = Array.from(
    new Set(allNotes.map((note) => note.subject))
  ).sort();

  const papers = Array.from(
    new Set(allNotes.filter(n => n.paper).map((note) => note.paper))
  ).sort();

  // Filter logic
  const filteredNotes = allNotes.filter((note) => {
    // Search query match (title, description, subject, category)
    const matchesSearch = searchQuery
      ? note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (note.paper && note.paper.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    // Category match
    const matchesCategory = selectedCategory
      ? note.category === selectedCategory
      : true;

    // Subject match
    const matchesSubject = selectedSubject
      ? note.subject.toLowerCase() === selectedSubject.toLowerCase() ||
        (selectedSubject.includes("Section") && note.subject.includes(selectedSubject))
      : true;

    // Paper match
    const matchesPaper = selectedPaper
      ? note.paper === selectedPaper
      : true;

    return matchesSearch && matchesCategory && matchesSubject && matchesPaper;
  });

  // URL updating helper
  const updateUrlFilters = (category, subject, paper, query) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (subject) params.set("subject", subject);
    if (paper) params.set("paper", paper);
    if (query) params.set("q", query);

    router.push(`/notes?${params.toString()}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubject(""); // reset subject to prevent clashes
    setSelectedPaper("");
    updateUrlFilters(category, "", "", searchQuery);
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    updateUrlFilters(selectedCategory, subject, selectedPaper, searchQuery);
  };

  const handlePaperChange = (paper) => {
    setSelectedPaper(paper);
    updateUrlFilters(selectedCategory, selectedSubject, paper, searchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlFilters(selectedCategory, selectedSubject, selectedPaper, searchQuery);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubject("");
    setSelectedPaper("");
    router.push("/notes");
  };

  const breadcrumbItems = [
    { label: "Notes Database", href: "/notes" }
  ];

  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: springTransition },
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header Info */}
      <div className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tighter">
          UPSC Revision Notes Database
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl font-sans font-light">
          Search and filter through our personal library of Prelims, Mains, and PSIR Optional study materials.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-3xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, subject, or keyword..."
          className="w-full px-5 py-3.5 pl-12 pr-10 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-xs transition-all text-sm font-sans"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <MagnifyingGlass className="h-5 w-5" weight="bold" />
        </div>
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              updateUrlFilters(selectedCategory, selectedSubject, selectedPaper, "");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-650 transition-colors"
          >
            <X className="h-4 w-4" weight="bold" />
          </button>
        )}
      </form>

      {/* Main Grid Layout (Filters on left, Notes on right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Toggle Filters Mobile Button */}
        <div className="lg:hidden flex justify-between items-center select-none">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-705 font-semibold text-xs transition-all active:scale-95"
          >
            <Sliders className="h-4 w-4" weight="bold" />
            <span>{showFiltersMobile ? "Hide Filters" : "Show Filters"}</span>
          </button>

          {(selectedCategory || selectedSubject || selectedPaper || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center space-x-1 text-xs text-amber-700 hover:text-amber-800 font-bold active:scale-95 transition-transform"
            >
              <ArrowCounterClockwise className="h-3.5 w-3.5" weight="bold" />
              <span>Reset All</span>
            </button>
          )}
        </div>

        {/* Sidebar Filters Container */}
        <div
          className={`${
            showFiltersMobile ? "block" : "hidden"
          } lg:block space-y-6 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] lg:col-span-1 select-none`}
        >
          {/* Category Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</h3>
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => handleCategoryChange("")}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center active:scale-[0.98] ${
                  selectedCategory === ""
                    ? "bg-amber-500/10 text-amber-900 font-semibold"
                    : "text-slate-605 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">All Categories</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center active:scale-[0.98] ${
                    selectedCategory === cat
                      ? "bg-amber-500/10 text-amber-900 font-semibold"
                      : "text-slate-605 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Paper Filter (Only relevant if Mains selected or search contains GS) */}
          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">GS Paper</h3>
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => handlePaperChange("")}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center active:scale-[0.98] ${
                  selectedPaper === ""
                    ? "bg-amber-500/10 text-amber-900 font-semibold"
                    : "text-slate-605 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">All Papers</span>
              </button>
              {papers.map((paper) => (
                <button
                  key={paper}
                  onClick={() => handlePaperChange(paper)}
                  className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center active:scale-[0.98] ${
                    selectedPaper === paper
                      ? "bg-amber-500/10 text-amber-900 font-semibold"
                      : "text-slate-605 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{paper}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject Filter */}
          <div className="space-y-3 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</h3>
            <div className="flex flex-col space-y-1.5 max-h-60 overflow-y-auto pr-2">
              <button
                onClick={() => handleSubjectChange("")}
                className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center active:scale-[0.98] ${
                  selectedSubject === ""
                    ? "bg-amber-500/10 text-amber-900 font-semibold"
                    : "text-slate-605 hover:bg-slate-50"
                }`}
              >
                <span className="truncate">All Subjects</span>
              </button>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubjectChange(sub)}
                  className={`w-full text-left text-sm py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center active:scale-[0.98] ${
                    selectedSubject.toLowerCase() === sub.toLowerCase()
                      ? "bg-amber-500/10 text-amber-900 font-semibold"
                      : "text-slate-650 hover:bg-slate-50"
                  }`}
                  title={sub}
                >
                  <span className="truncate">{sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Filters Area */}
          <div className="border-t border-slate-100 pt-5 text-center">
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-150 active:scale-95 cursor-pointer"
            >
              <ArrowCounterClockwise className="h-3.5 w-3.5" weight="bold" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>

        {/* Right side listing results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <div>
              Found <span className="font-bold text-slate-805 font-mono">{filteredNotes.length}</span> notes
            </div>
            {/* Filter status tags */}
            <div className="flex flex-wrap items-center gap-1 select-none">
              {selectedCategory && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-900 border border-amber-250/60 text-xs">
                  <span>{selectedCategory}</span>
                  <X className="h-3 w-3 cursor-pointer shrink-0" weight="bold" onClick={() => handleCategoryChange("")} />
                </span>
              )}
              {selectedSubject && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-750 border border-slate-200 text-xs truncate max-w-44">
                  <span>{selectedSubject}</span>
                  <X className="h-3 w-3 cursor-pointer shrink-0" weight="bold" onClick={() => handleSubjectChange("")} />
                </span>
              )}
              {selectedPaper && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-150 text-slate-750 border border-slate-200 text-xs">
                  <span>{selectedPaper}</span>
                  <X className="h-3 w-3 cursor-pointer shrink-0" weight="bold" onClick={() => handlePaperChange("")} />
                </span>
              )}
            </div>
          </div>

          {/* Notes Grid with staggered AnimatePresence transition */}
          <AnimatePresence mode="popLayout">
            {filteredNotes.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filteredNotes.map((note) => (
                  <motion.div 
                    key={note.id} 
                    variants={itemVariants}
                    layout
                  >
                    <NoteCard note={note} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Empty Search State
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto space-y-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
              >
                <div className="p-4 rounded-full bg-slate-50 text-slate-400 border border-slate-100 inline-block">
                  <BookOpen className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-slate-850">
                    No notes found
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-sans font-light leading-relaxed">
                    We couldn't find any study sheets matching your selected parameters. Try widening your filters or search terms.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs transition-colors cursor-pointer active:scale-95"
                >
                  Clear Search &amp; Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
