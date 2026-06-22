"use client";

import { useState } from "react";
import { Lock, MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowClockwise, CaretLeft, CaretRight, PushPin, FileText } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotesViewer({ note, viewerLabel = "UPSC ONLINE VIEWER", examLabel = "UPSC" }) {
  const { title, category, subject, pages = [], keyTakeaways = [], relatedPYQs = [] } = note;
  
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100); // 100% base

  const totalPages = pages.length;

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 150) {
      setZoomLevel(prev => prev + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 80) {
      setZoomLevel(prev => prev - 10);
    }
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  // Convert zoomLevel to Tailwind/inline style text sizes
  const getZoomStyle = () => {
    return {
      fontSize: `${1 * (zoomLevel / 100)}rem`,
      lineHeight: `${1.6 * (zoomLevel / 100)}rem`
    };
  };

  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <div className="space-y-6">
 

      {/* Viewer Container */}
      <div className="bg-slate-100 rounded-2xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Document Viewer Control Bar */}
        <div className="bg-[#FDFBF7] border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
          
          {/* Document Title Info */}
          <div className="flex items-center space-x-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-sans">
              {viewerLabel}
            </span>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 p-1 rounded-xl">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 80}
              className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-colors cursor-pointer active:scale-90"
              title="Zoom Out"
            >
              <MagnifyingGlassMinus className="h-4 w-4" weight="bold" />
            </button>
            <span className="text-xs font-semibold text-slate-600 px-2 select-none w-12 text-center font-mono">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              className="p-1.5 rounded-lg hover:bg-white text-slate-500 hover:text-slate-800 disabled:opacity-40 transition-colors cursor-pointer active:scale-90"
              title="Zoom In"
            >
              <MagnifyingGlassPlus className="h-4 w-4" weight="bold" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-slate-700 transition-colors cursor-pointer active:scale-90"
              title="Reset Zoom"
            >
              <ArrowClockwise className="h-3.5 w-3.5" weight="bold" />
            </button>
          </div>

          {/* Page Switcher */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer active:scale-90"
            >
              <CaretLeft className="h-4 w-4" weight="bold" />
            </button>
            <span className="text-xs font-medium text-slate-600 select-none">
              Page <span className="font-bold text-slate-800 font-mono">{currentPageIndex + 1}</span> of <span className="font-bold text-slate-800 font-mono">{totalPages}</span>
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex === totalPages - 1}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer active:scale-90"
            >
              <CaretRight className="h-4 w-4" weight="bold" />
            </button>
          </div>

        </div>

        {/* Note Document Sheet Render Viewport */}
        <div className="p-4 sm:p-8 flex justify-center items-start min-h-[500px] overflow-auto select-none">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPageIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-md rounded-md aspect-[1/1.414] overflow-hidden p-8 sm:p-12"
            >
              
              {/* Repeating Diagonally Rotated Watermark (Subtle Slate Gray) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden">
                <div className="text-slate-900/[0.02] text-5xl sm:text-6xl font-bold uppercase tracking-widest transform -rotate-30 select-none w-full text-center">
                  Ishteyaque Rahman
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-end justify-center pb-24 pointer-events-none select-none z-10 overflow-hidden">
                <div className="text-slate-900/[0.015] text-5xl sm:text-6xl font-bold uppercase tracking-widest transform -rotate-30 select-none w-full text-center">
                  Ishteyaque Rahman
                </div>
              </div>

              {/* Content Container */}
              <div 
                className="relative z-20 h-full font-serif text-slate-800 leading-relaxed font-light whitespace-pre-line"
                style={getZoomStyle()}
              >
                {pages[currentPageIndex]?.split("\n").map((para, i) => {
                  if (para.startsWith("### ")) {
                    return (
                      <h2 key={i} className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-4 border-b border-slate-100 pb-2">
                        {para.replace("### ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("* **")) {
                    const cleaned = para.replace("* **", "").split("**: ");
                    return (
                      <div key={i} className="pl-4 my-2.5 flex items-start text-sm sm:text-base">
                        <span className="text-amber-600 mr-2">•</span>
                        <span>
                          <strong className="text-slate-900 font-bold">{cleaned[0]}:</strong>
                          {cleaned[1]}
                        </span>
                      </div>
                    );
                  }
                  if (para.startsWith("- *")) {
                    const cleaned = para.replace("- *", "").split("*: ");
                    return (
                      <div key={i} className="pl-8 my-2 flex items-start text-xs sm:text-sm">
                        <span className="text-slate-400 mr-2">-</span>
                        <span>
                          <em className="text-slate-800 italic">{cleaned[0]}:</em>
                          {cleaned[1]}
                        </span>
                      </div>
                    );
                  }
                  if (para.startsWith("  1. *")) {
                    const cleaned = para.replace("  1. *", "").split("* ");
                    return (
                      <div key={i} className="pl-12 my-2 text-xs sm:text-sm">
                        <span className="font-bold text-slate-700">1. {cleaned[0]}:</span>
                        <span>{cleaned[1]}</span>
                      </div>
                    );
                  }
                  if (para.startsWith("  2. *")) {
                    const cleaned = para.replace("  2. *", "").split("* ");
                    return (
                      <div key={i} className="pl-12 my-2 text-xs sm:text-sm">
                        <span className="font-bold text-slate-700">2. {cleaned[0]}:</span>
                        <span>{cleaned[1]}</span>
                      </div>
                    );
                  }
                  if (para.startsWith("  3. *")) {
                    const cleaned = para.replace("  3. *", "").split("* ");
                    return (
                      <div key={i} className="pl-12 my-2 text-xs sm:text-sm">
                        <span className="font-bold text-slate-700">3. {cleaned[0]}:</span>
                        <span>{cleaned[1]}</span>
                      </div>
                    );
                  }
                  if (para.startsWith("  4. *")) {
                    const cleaned = para.replace("  4. *", "").split("* ");
                    return (
                      <div key={i} className="pl-12 my-2 text-xs sm:text-sm">
                        <span className="font-bold text-slate-700">4. {cleaned[0]}:</span>
                        <span>{cleaned[1]}</span>
                      </div>
                    );
                  }
                  if (para.startsWith("  - *")) {
                    const cleaned = para.replace("  - *", "").split("* ");
                    return (
                      <div key={i} className="pl-8 my-1.5 text-xs sm:text-sm text-slate-600">
                        <span className="mr-2">◦</span>
                        <strong className="text-slate-800">{cleaned[0]}</strong> {cleaned[1]}
                      </div>
                    );
                  }
                  if (para.trim() === "") {
                    return <div key={i} className="h-3"></div>;
                  }
                  return <p key={i} className="my-3 text-sm sm:text-base leading-relaxed text-slate-700">{para}</p>;
                })}
              </div>

              {/* Footer page identifier */}
              <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                <span>ISHTEYAQUE RAHMAN</span>
                <span className="uppercase">{subject}</span>
                <span>PAGE {currentPageIndex + 1} OF {totalPages}</span>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* Related Academic Notes Sections (Takeaways & PYQs) (Strictly no emojis!) */}
      <div className="hidden">
        
        {/* Key Takeaways */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-slate-850 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
              <PushPin className="h-4 w-4" weight="bold" />
            </span>
            <span>Key Revision Takeaways</span>
          </h3>
          <ul className="space-y-3 font-sans">
            {keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start text-sm text-slate-600 leading-relaxed font-light">
                <span className="text-amber-600 font-bold mr-2 shrink-0">✓</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related PYQs */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-xs">
          <h3 className="font-serif text-lg font-bold text-slate-850 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-700 shrink-0">
              <FileText className="h-4 w-4" weight="bold" />
            </span>
            <span>{examLabel} PYQ Relevance</span>
          </h3>
          <div className="space-y-4">
            {relatedPYQs.map((pyq, i) => (
              <div key={i} className="text-sm bg-slate-50 border border-slate-200/60 p-4 rounded-2xl leading-relaxed text-slate-650 font-sans font-light">
                {pyq}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
