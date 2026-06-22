"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "@phosphor-icons/react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FBF9F4]">
      {/* Sticky Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center select-none">
        <div className="space-y-6 max-w-md">
          <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 text-amber-850 border border-amber-500/20">
            <BookOpen className="h-10 w-10" weight="regular" />
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Notes Under Compilation
          </h1>
          
          <p className="text-slate-550 text-sm font-sans font-light leading-relaxed">
            This revision note sheet is currently coming soon and under active compilation. Please return to the main database to browse available notes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/notes"
              className="inline-flex items-center justify-center space-x-2 bg-amber-700 hover:bg-amber-850 text-white font-semibold px-5 py-3 rounded-xl shadow-xs transition-all active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
              <span>Back to Database</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-5 py-3 rounded-xl shadow-xs transition-all active:scale-[0.98]"
            >
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
