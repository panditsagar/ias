"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function PSIR() {
  const breadcrumbItems = [
    { label: "PSIR Optional", href: "/psir-optional" }
  ];

  const psirSyllabus = [
    {
      paper: "Paper 1: Political Theory & Indian Government",
      sections: [
        {
          id: "p1sa",
          title: "Section A: Political Theory & Western/Indian Thinkers",
          description: "Core political concepts, theories of state, justice, democracy, and philosophies of major Western and Indian thinkers.",
          slug: "Paper+1+Section+A",
          topics: [
            "Western Political Thought",
            "Indian Political Thought",
            "Political Theory",
            "Political Ideology",
            "State",
            "Justice",
            "Equality",
            "Rights",
            "Democracy",
            "Power"
          ]
        },
        {
          id: "p1sb",
          title: "Section B: Indian Government and Politics",
          description: "Nationalist movement, constitution drafting, federal dynamics, caste politics, party systems, and social movements.",
          slug: "Paper+1+Section+B",
          topics: [
            "Indian Government and Politics",
            "Making of Indian Constitution",
            "Features of Indian Constitution",
            "Government",
            "Grassroot Democracy",
            "Statutory Institutions",
            "Federalism",
            "Planning and Economic Development",
            "Caste, Religion and Ethnicity",
            "Party System",
            "Social Movement"
          ]
        }
      ]
    },
    {
      paper: "Paper 2: Comparative Politics & International Relations",
      sections: [
        {
          id: "p2sa",
          title: "Section A: Comparative Political Analysis & IR Theories",
          description: "Comparative state theories, globalization impacts, approaches to IR (Realist, Liberal, Marxist), UN, and regionalisation.",
          slug: "Paper+2+Section+A",
          topics: [
            "Comparative Politics",
            "State in Comparative Politics",
            "Politics of Representation",
            "Globalisation",
            "Approach to International Relations",
            "Key Concepts of International Relations",
            "Changing International Political Order",
            "Evolution of International Economic System",
            "United Nations",
            "Regionalisation",
            "Contemporary Global Concerns"
          ]
        },
        {
          id: "p2sb",
          title: "Section B: India and the World (Foreign Policy)",
          description: "Evolution of Indian Foreign Policy, bilateral relations with global powers, India and South Asia, nuclear stance, and recent developments.",
          slug: "Paper+2+Section+B",
          topics: [
            "Indian Foreign Policy",
            "India and NAM",
            "India and South Asia",
            "India and Global South",
            "India and Global Centres of Power",
            "India and UN System",
            "India and Nuclear Question",
            "Recent Developments"
          ]
        }
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
            PSIR Optional Syllabus &amp; Notes
          </h1>
          <p className="text-slate-505 text-sm max-w-2xl font-sans font-light leading-relaxed">
            Detailed syllabus segments for Political Science &amp; International Relations (PSIR) Optional Paper 1 &amp; 2, aligned with UPSC guidelines.
          </p>
        </div>

        {/* Paper Layout */}
        <div className="space-y-12">
          {psirSyllabus.map((p, pIndex) => (
            <div key={pIndex} className="space-y-6">
              
              {/* Paper Label Header */}
              <h2 className="font-serif text-2xl font-bold text-slate-800 border-b border-amber-200/50 pb-2.5">
                {p.paper}
              </h2>

              {/* Sections Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {p.sections.map((section, sIndex) => (
                  <motion.div 
                    key={section.id} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springTransition, delay: (pIndex * 2 + sIndex) * 0.08 }}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-between space-y-6"
                  >
                    
                    {/* Section title & desc */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif font-bold text-lg text-amber-900 leading-snug">
                          {section.title}
                        </h3>
                        <Link
                          href={`/notes?category=PSIR+Optional&subject=${section.slug}&q=PYQ`}
                          className="text-xs font-semibold text-purple-800 bg-purple-50 border border-purple-100 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors shrink-0 active:scale-95 duration-150"
                        >
                          View PYQs
                        </Link>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm font-sans font-light leading-relaxed">
                        {section.description}
                      </p>
                    </div>

                    {/* Topic Pill Grid */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
                        Syllabus Topics
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {section.topics.map((topic, i) => {
                          const topicQuery = encodeURIComponent(topic);
                          return (
                            <Link
                              key={i}
                              href={`/notes?category=PSIR+Optional&subject=${section.slug}&q=${topicQuery}`}
                              className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-amber-300 hover:text-amber-800 transition-all duration-150 active:scale-[0.98] group"
                            >
                              <span className="font-sans text-slate-650 font-light truncate">{topic}</span>
                              <CaretRight className="h-3.5 w-3.5 text-slate-400 shrink-0 group-hover:translate-x-0.5 transition-transform" weight="bold" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section Footer Actions */}
                    <div className="pt-5 border-t border-slate-100/80 flex items-center">
                      <Link
                        href={`/notes?category=PSIR+Optional&subject=${section.slug}`}
                        className="w-full"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={springTransition}
                          className="w-full text-center py-3.5 rounded-2xl bg-amber-500/10 text-amber-900 font-semibold text-sm cursor-pointer"
                        >
                          Browse All Section Notes
                        </motion.div>
                      </Link>
                    </div>

                  </motion.div>
                ))}
              </div>

            </div>
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
