"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import PYQCard from "../components/PYQCard";
import CTASection from "../components/CTASection";
import { motion } from "framer-motion";
import { Target, FileText, Bookmark, Sparkle } from "@phosphor-icons/react";

export default function PYQPage() {
  const breadcrumbItems = [
    { label: "PYQs", href: "/pyq" }
  ];

  const prelimsPYQ = [
    { paper: "Prelims GS Paper 1", description: "Objective type topic-wise sorted questions on History, Polity, Geography, Economy, Science & Tech, and Environment.", years: "2015 - 2025" },
    { paper: "Prelims CSAT (Paper 2)", description: "Logical reasoning, comprehension, and quantitative aptitude papers mapped with key shortcut notes.", years: "2018 - 2025" }
  ];

  const mainsPYQ = [
    { paper: "GS Paper 1 (Heritage, History, Geography, Society)", description: "Analytical subjective question breakdowns covering social diversity, modern history milestones, and geography phenomena.", years: "2013 - 2025" },
    { paper: "GS Paper 2 (Governance, Polity, Social Justice, IR)", description: "Syllabus-aligned questions analyzing Article 21, local governance structures, federal friction points, and foreign policies.", years: "2013 - 2025" },
    { paper: "GS Paper 3 (Technology, Economic Development, Security)", description: "Detailed response sheets for MSP issues, WTO agreements, cybersecurity frameworks, and environmental challenges.", years: "2013 - 2025" },
    { paper: "GS Paper 4 (Ethics, Integrity & Case Studies)", description: "Ethical theories, administrative codes, and practical conflict resolution case analyses.", years: "2013 - 2025" }
  ];

  const psirPYQ = [
    { paper: "PSIR Paper 1 (Theory & Indian Politics)", description: "Analytical breakdowns of Western theorists (Plato/Aristotle), Indian thought (Kautilya), and electoral politics trends.", years: "2013 - 2025" },
    { paper: "PSIR Paper 2 (Comparative Politics & IR)", description: "Focuses on global security alignments, international trade regimes, UN reforms, and Indian Foreign Policy shifts.", years: "2013 - 2025" }
  ];

  const topicWisePYQ = [
    { paper: "Polity: Fundamental Rights & DPSP", description: "All questions asked from Articles 12-51, analyzed with landmark Supreme Court judgements.", years: "2013 - 2025", type: "Mains" },
    { paper: "Economy: Inflation & Monetary Policy", description: "Factual and concept-based question collections including WPI/CPI index weights and banking rates.", years: "2015 - 2025", type: "Prelims" },
    { paper: "PSIR: Western Political Thought", description: "Philosopher-wise sorted question banks (Plato, Aristotle, Machiavelli, Hobbes, Locke, Rousseau, Marx).", years: "2013 - 2025", type: "Optional" },
    { paper: "Ethics: Case Study Frameworks", description: "Standard ethical scenarios and solved answers demonstrating administrative integrity.", years: "2013 - 2025", type: "Mains" }
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
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tighter">
            Previous Year Question (PYQ) Analysis
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl font-sans font-light leading-relaxed">
            Access topic-wise sorted UPSC Civil Services Examination (CSE) PYQs, integrated directly with revision notes to help you write structured, high-scoring answers.
          </p>
        </div>

        {/* 1. Prelims PYQs */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-805 border-b border-amber-200/50 pb-2.5 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <Target className="h-4 w-4" weight="bold" />
            </span>
            <span>UPSC Prelims PYQs</span>
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {prelimsPYQ.map((pyq) => (
              <motion.div key={pyq.paper} variants={itemVariants}>
                <PYQCard
                  paper={pyq.paper}
                  description={pyq.description}
                  years={pyq.years}
                  type="Prelims"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 2. Mains PYQs */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-805 border-b border-amber-200/50 pb-2.5 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700 shrink-0">
              <FileText className="h-4 w-4" weight="bold" />
            </span>
            <span>UPSC Mains GS PYQs</span>
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {mainsPYQ.map((pyq) => (
              <motion.div key={pyq.paper} variants={itemVariants}>
                <PYQCard
                  paper={pyq.paper}
                  description={pyq.description}
                  years={pyq.years}
                  type="Mains"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. PSIR Optional PYQs */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-805 border-b border-amber-200/50 pb-2.5 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
              <Bookmark className="h-4 w-4" weight="bold" />
            </span>
            <span>PSIR Optional PYQs</span>
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {psirPYQ.map((pyq) => (
              <motion.div key={pyq.paper} variants={itemVariants}>
                <PYQCard
                  paper={pyq.paper}
                  description={pyq.description}
                  years={pyq.years}
                  type="Optional"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4. Topic-wise Solved PYQs */}
        <section className="space-y-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-850 border-b border-amber-200/50 pb-2.5 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-705 shrink-0">
              <Sparkle className="h-4 w-4" weight="bold" />
            </span>
            <span>Featured Topic-wise Solved PYQ Banks</span>
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {topicWisePYQ.map((pyq) => (
              <motion.div key={pyq.paper} variants={itemVariants}>
                <PYQCard
                  paper={pyq.paper}
                  description={pyq.description}
                  years={pyq.years}
                  type={pyq.type}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
