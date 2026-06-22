"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import Link from "next/link";
import { BookOpen, Question, FileText, CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function Mains() {
  const breadcrumbItems = [
    { label: "Mains", href: "/mains" }
  ];

  const mainsStructure = [
    {
      paperId: "gs1",
      paperTitle: "GS Paper 1: Indian Heritage, Culture, History & Geography",
      description: "Focuses on socio-cultural evolution, historical events, global geographical patterns, and Indian society structures.",
      subjects: [
        { name: "History", available: "1 note", slug: "History" },
        { name: "Geography", available: "0 notes", slug: "Geography" },
        { name: "World History", available: "1 note", slug: "History" },
        { name: "Post Independence", available: "0 notes", slug: "History" },
        { name: "Society", available: "1 note", slug: "History" },
        { name: "Art & Culture", available: "0 notes", slug: "Ancient+India" },
      ]
    },
    {
      paperId: "gs2",
      paperTitle: "GS Paper 2: Governance, Constitution, Polity & IR",
      description: "Deals with the Indian political framework, statutory institutions, social justice frameworks, and global strategic partnerships.",
      subjects: [
        { name: "Polity", available: "2 notes", slug: "Polity" },
        { name: "Constitution", available: "2 notes", slug: "Polity" },
        { name: "Social Justice", available: "0 notes", slug: "Polity" },
        { name: "Governance", available: "1 note", slug: "Governance" },
        { name: "International Relations", available: "1 note", slug: "International+Relations" },
      ]
    },
    {
      paperId: "gs3",
      paperTitle: "GS Paper 3: Technology, Economy, Biodiversity & Security",
      description: "Covers national development economics, environmental parameters, agricultural structures, space tech, and internal threats.",
      subjects: [
        { name: "Economy", available: "1 note", slug: "Economy" },
        { name: "Agriculture", available: "1 note", slug: "Agriculture" },
        { name: "Internal Security", available: "1 note", slug: "Internal+Security" },
        { name: "Science & Technology", available: "1 note", slug: "Science+%26+Technology" },
        { name: "Environment", available: "1 note", slug: "Environment" },
      ]
    },
    {
      paperId: "gs4",
      paperTitle: "GS Paper 4: Ethics, Integrity & Aptitude",
      description: "Evaluates moral values, conflict of interest resolutions, emotional intelligence, and decision case analyses.",
      subjects: [
        { name: "Theory", available: "1 note", slug: "Theory" },
        { name: "Case Study", available: "0 notes", slug: "Theory" },
      ]
    }
  ];

  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FBF9F4]">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tighter">
            Mains GS Papers Notes
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl font-sans font-light leading-relaxed">
            Analytical, structured revision notes mapped according to the keywords of the UPSC Civil Services Mains General Studies syllabus (GS 1-4).
          </p>
        </div>

        {/* GS Papers Accordion / Grid */}
        <div className="space-y-10">
          {mainsStructure.map((paper, paperIndex) => (
            <motion.div 
              key={paper.paperId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: paperIndex * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              
              {/* Paper Title Block */}
              <div className="bg-[#FDFBF7] px-6 sm:px-10 py-6 border-b border-slate-100 space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-850">
                  {paper.paperTitle}
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm font-sans font-light">
                  {paper.description}
                </p>
              </div>

              {/* Subjects Sub-grid */}
              <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paper.subjects.map((sub) => (
                  <div key={sub.name} className="border border-slate-100 rounded-2xl bg-slate-50/50 p-5 space-y-4 hover:border-amber-300/40 hover:bg-white transition-all duration-200">
                    
                    {/* Subject Header */}
                    <div>
                      <h3 className="font-serif font-bold text-slate-800 text-base">{sub.name}</h3>
                      <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase bg-slate-105 px-2.5 py-0.5 rounded-md border border-slate-200/40">
                        {sub.available}
                      </span>
                    </div>

                    {/* Navigation Options list */}
                    <div className="space-y-2">
                      <Link
                        href={`/notes?category=Mains&subject=${sub.slug}`}
                        className="flex items-center justify-between text-xs text-slate-600 hover:text-amber-800 hover:underline py-1 transition-all active:scale-[0.99] group"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-amber-705 shrink-0" weight="regular" />
                          <span>Revision Notes</span>
                        </span>
                        <CaretRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" weight="bold" />
                      </Link>

                      <Link
                        href={`/notes?category=Mains&subject=${sub.slug}&q=PYQ`}
                        className="flex items-center justify-between text-xs text-slate-600 hover:text-amber-800 hover:underline py-1 transition-all active:scale-[0.99] group"
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-purple-705 shrink-0" weight="regular" />
                          <span>PYQ Analysis Premium</span>
                        </span>
                        <CaretRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" weight="bold" />
                      </Link>

                      <Link
                        href={`/notes?category=Mains&subject=${sub.slug}&q=misc`}
                        className="flex items-center justify-between text-xs text-slate-600 hover:text-amber-800 hover:underline py-1 transition-all active:scale-[0.99] group"
                      >
                        <span className="flex items-center gap-1.5">
                          <Question className="h-4 w-4 text-slate-500 shrink-0" weight="regular" />
                          <span>Miscellaneous</span>
                        </span>
                        <CaretRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" weight="bold" />
                      </Link>
                    </div>

                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
