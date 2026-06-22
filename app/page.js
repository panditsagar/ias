"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import CategoryCard from "./components/CategoryCard";
import NoteCard from "./components/NoteCard";
import CTASection from "./components/CTASection";
import { notes } from "./data/notes";
import { Compass, Stack, BookOpen, ClockCounterClockwise, Trophy, CheckCircle, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";

export default function Home() {
  // Get latest 6 notes
  const latestNotes = [...notes]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);

  // Popular subject listing
  const popularSubjects = [
    { name: "Polity", count: "2 notes", href: "/notes?subject=Polity", color: "bg-emerald-50 text-emerald-800 border-emerald-100/50" },
    { name: "Economy", count: "1 note", href: "/notes?subject=Economy", color: "bg-blue-50 text-blue-800 border-blue-100/50" },
    { name: "Geography", count: "1 note", href: "/notes?subject=Geography", color: "bg-indigo-50 text-indigo-800 border-indigo-100/50" },
    { name: "Environment", count: "1 note", href: "/notes?subject=Environment", color: "bg-teal-50 text-teal-800 border-teal-100/50" },
    { name: "PSIR", count: "3 notes", href: "/notes?category=PSIR+Optional", color: "bg-amber-50 text-amber-800 border-amber-100/50" },
    { name: "Ethics", count: "1 note", href: "/notes?subject=Theory", color: "bg-rose-50 text-rose-800 border-rose-100/50" }
  ];

  const mainCategories = [
    {
      title: "Prelims Notes",
      description: "Quick revision notes on Ancient, Medieval, Modern History, Polity, Economy, Environment, and Science & Tech.",
      count: "10 Subjects Covered",
      href: "/prelims",
      type: "prelims"
    },
    {
      title: "Mains Notes",
      description: "Syllabus-structured notes for GS Papers 1, 2, 3, and 4. Formatted with critical analyses and structural points.",
      count: "7 GS Modules",
      href: "/mains",
      type: "mains"
    },
    {
      title: "PSIR Optional",
      description: "Comprehensive notes for Political Science and International Relations. Structured into Paper 1 & 2 Sections A & B.",
      count: "Complete Syllabus",
      href: "/psir-optional",
      type: "psir"
    },
    {
      title: "PYQ Analysis",
      description: "Last 10 years topic-wise sorted UPSC question analysis. See how concepts repeat and learn to draft answers.",
      count: "Premium Papers Included",
      href: "/pyq",
      type: "pyq"
    }
  ];

  const whyChooseUs = [
    "Organized subject-wise notes matching the official UPSC syllabus",
    "Simple, academic language tailored for quick revision cycles",
    "Prelims (factual) and Mains (analytical) integrated structures",
    "Comprehensive PSIR Optional coverage mapped in one portal",
    "Clean layouts designed specifically for repeated visual reading"
  ];

  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: springTransition },
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FBF9F4]">
      {/* Sticky Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20 sm:space-y-32">
        
        {/* Search Bar Hub */}
        <section className="space-y-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-805">
              Search The Notes Database
            </h2>
            <p className="text-slate-500 text-sm font-sans mt-1.5 font-light">
              Access syllabus-specific UPSC CSE exam notes instantly.
            </p>
          </div>
          <SearchBar />
        </section>

        {/* Category Cards Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-805">
                Browse by Category
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-light">
                Explore structured segments of the Civil Services exam.
              </p>
            </div>
            <Link href="/notes" className="text-sm font-bold text-amber-700 hover:text-amber-805 hover:underline flex items-center shrink-0 active:scale-95 transition-transform">
              <span>View All Notes</span>
              <CaretRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {mainCategories.map((cat, i) => (
              <motion.div key={cat.title} variants={itemVariants}>
                <CategoryCard
                  title={cat.title}
                  description={cat.description}
                  count={cat.count}
                  href={cat.href}
                  type={cat.type}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Latest Notes Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-850">
                Latest Notes &amp; Updates
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-light">
                Recently updated revision sheets for upcoming sessions.
              </p>
            </div>
            <Link href="/notes" className="text-sm font-bold text-amber-700 hover:text-amber-850 hover:underline flex items-center shrink-0 active:scale-95 transition-transform">
              <span>Explore Full Database</span>
              <CaretRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latestNotes.map((note) => (
              <motion.div key={note.id} variants={itemVariants}>
                <NoteCard note={note} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Popular Subjects */}
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <h2 className="font-serif text-2xl font-bold text-slate-805">
              Popular Revision Topics
            </h2>
            <p className="text-slate-500 text-sm mt-0.5 font-light">
              Click to browse notes filtered by key UPSC subjects.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {popularSubjects.map((sub, i) => (
              <motion.div key={sub.name} variants={itemVariants} className="w-full">
                <Link href={sub.href} className="block w-full">
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springTransition}
                    className={`p-5 rounded-2xl border text-center shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-center items-center h-28 ${sub.color}`}
                  >
                    <span className="font-serif font-bold text-lg">{sub.name}</span>
                    <span className="text-xs opacity-75 mt-1 block font-sans font-light">{sub.count}</span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Why these UPSC Notes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
          
          
          <div className="lg:col-span-5 space-y-4 pr-4">
            <div className="inline-flex items-center space-x-1.5 bg-amber-500/10 text-amber-800 border border-amber-200/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Trophy className="h-4 w-4 text-amber-600" weight="bold" />
              <span>Revision Focused</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-855">
              Why these UPSC Notes?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-sans font-light">
              Unlike commercial coaching platforms that dump endless PDFs, this platform focuses on high-yield, read-friendly study sheets. No clutter, no distraction—just structured clarity.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {whyChooseUs.map((point, index) => (
              <div key={index} className="flex items-start space-x-3 text-sm sm:text-base text-slate-700">
                <CheckCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" weight="fill" />
                <span className="font-sans font-light">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
