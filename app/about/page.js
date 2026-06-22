"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import { Target, Lightbulb, ShieldWarning, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function About() {
  const breadcrumbItems = [
    { label: "About", href: "/about" }
  ];

  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FBF9F4]">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* About Main Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springTransition}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 sm:p-12 relative overflow-hidden"
        >
          
          
          <div className="space-y-6">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tighter">
              About the Platform
            </h1>
            
            <p className="font-serif text-base sm:text-lg text-slate-700 leading-relaxed italic pl-4 py-1">
              "This personal UPSC notes archive is created to organize Prelims, Mains, PSIR Optional and PYQ content in a simple, structured and revision-friendly format. The goal is to make UPSC preparation less scattered and more focused."
            </p>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 font-sans font-light">
              <p>
                Preparing for the Civil Services Examination (CSE) in India is often described as an exercise in information management. With thousands of pages of textbooks, magazines, newspapers, and coaching notes, aspirants easily find themselves overwhelmed by the sheer volume of study material.
              </p>
              <p>
                This platform was built to address this exact challenge. By converting lengthy chapters into clean, core-concept bullet lists, and organizing them alongside relevant Previous Year Questions (PYQs), it facilitates active, visual recall.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Multi-column Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Why This Website Exists */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-6 sm:p-8 space-y-4"
          >
            <h3 className="font-serif text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
                <Target className="h-4 w-4" weight="bold" />
              </span>
              <span>Why This Website Exists</span>
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-sans font-light leading-relaxed">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>No coaching bloat:</strong> Eliminates fluff and keeps notes strictly mapped to the keywords of the UPSC syllabus.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>Repeated visual revision:</strong> Lined notebook page displays optimize reading focus and facilitate memory retention.</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">•</span>
                <span><strong>Integrated learning:</strong> Integrates Prelims facts with Mains analyses and direct subject-wise PYQs.</span>
              </li>
            </ul>
          </motion.div>

          {/* How to Use the Notes */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.15 }}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-6 sm:p-8 space-y-4"
          >
            <h3 className="font-serif text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                <Lightbulb className="h-4 w-4" weight="bold" />
              </span>
              <span>How to Use the Notes</span>
            </h3>
            <ul className="space-y-3 text-sm text-slate-600 font-sans font-light leading-relaxed">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">1.</span>
                <span><strong>Select Category:</strong> Choose Prelims, Mains, or PSIR Optional based on your current study module.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">2.</span>
                <span><strong>Interactive Reading:</strong> Open a topic in the notes viewer, adjusting the zoom to your screen comfort.</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">3.</span>
                <span><strong>Review PYQs:</strong> Study the attached UPSC PYQs at the bottom of the notes viewer to understand question patterns.</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Disclaimer Card */}
        <motion.div 
          id="disclaimer" 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.2 }}
          className="bg-amber-500/[0.04] border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs"
        >
          <h3 className="font-serif text-xl font-bold text-amber-900 flex items-center gap-2">
            <ShieldWarning className="h-5 w-5 text-amber-700 shrink-0" weight="regular" />
            <span>Important Disclaimer</span>
          </h3>
          <p className="text-slate-705 text-sm leading-relaxed font-sans font-light">
            This is a personal, educational platform created strictly for learning, revision, and reference purposes. While every effort is made to maintain factual accuracy, UPSC requirements and dynamic current affairs evolve constantly. 
          </p>
          <p className="text-slate-755 text-sm leading-relaxed font-semibold font-sans">
            Students should independently verify all facts, census statistics, constitutional amendments, notifications, and examination dates from official UPSC and government portals (such as PIB, gazette papers, or official ministry websites) before final exam submissions.
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
