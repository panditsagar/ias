"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CategoryCard from "../components/CategoryCard";
import CTASection from "../components/CTASection";
import { motion } from "framer-motion";

export default function Prelims() {
  const breadcrumbItems = [
    { label: "Prelims", href: "/prelims" }
  ];

  const prelimsSubjects = [
    {
      title: "Ancient India",
      description: "Pre-historic era, Indus Valley Civilization, Vedic period, Buddhism & Jainism, Maurya and Gupta Empires.",
      count: "2 Notes Available",
      href: "/notes?category=Prelims&subject=Ancient+India"
    },
    {
      title: "Medieval India",
      description: "Early Medieval dynasties, Delhi Sultanate, Mughal Empire, Vijayanagara kingdom, and the Bhakti & Sufi movements.",
      count: "1 Note Available",
      href: "/notes?category=Prelims&subject=Medieval+India"
    },
    {
      title: "Modern India",
      description: "Arrival of Europeans, British conquest, socio-religious reforms, Revolt of 1857, and the Indian National Movement.",
      count: "1 Note Available",
      href: "/notes?category=Prelims&subject=Modern+India"
    },
    {
      title: "Polity & Governance",
      description: "Preamble, Fundamental Rights, DPSP, Union Executive, Parliament, Judiciary, and Constitutional Bodies.",
      count: "2 Notes Available",
      href: "/notes?category=Prelims&subject=Polity"
    },
    {
      title: "Indian Economy",
      description: "National Income, Inflation, Banking & Monetary Policy, Fiscal Policy, External Sector, and Financial Markets.",
      count: "1 Note Available",
      href: "/notes?category=Prelims&subject=Economy"
    },
    {
      title: "Geography",
      description: "Physical geography, Indian physiography, river systems, climatology, mineral distribution, and global geographic phenomena.",
      count: "1 Note Available",
      href: "/notes?category=Prelims&subject=Geography"
    },
    {
      title: "Environment & Ecology",
      description: "Ecosystems, Biodiversity conservation (in-situ/ex-situ), Climate change conventions, pollution, and national parks.",
      count: "1 Note Available",
      href: "/notes?category=Prelims&subject=Environment"
    },
    {
      title: "Science & Technology",
      description: "Space technology (orbits/satellites), Biotechnology, Nanotechnology, Defence tech, IT and emerging digital fields.",
      count: "1 Note Available",
      href: "/notes?category=Prelims&subject=Science+%26+Technology"
    },
    {
      title: "Art & Culture",
      description: "Temple architecture, classical dance forms, puppet traditions, paintings, coinage, and UNESCO heritage sites.",
      count: "Browse Topics",
      href: "/notes?category=Prelims&subject=Art+%26+Culture"
    },
    {
      title: "Mapping & Locations",
      description: "Critical national and international water bodies, mountain ranges, border disputes, and strategic trade corridors.",
      count: "Browse Topics",
      href: "/notes?category=Prelims&subject=Mapping"
    },
    {
      title: "Government Schemes",
      description: "Central Sector and Centrally Sponsored schemes across social sectors, rural development, and financial inclusion.",
      count: "Browse Topics",
      href: "/notes?category=Prelims&subject=Schemes"
    }
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
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Page Title */}
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 tracking-tighter">
            Prelims Revision Notes
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl font-sans font-light leading-relaxed">
            Syllabus-aligned study sheets and micro-notes tailored for the UPSC Civil Services Preliminary examination. Select a subject to view topics.
          </p>
        </div>

        {/* Subjects Grid with staggered load-in animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {prelimsSubjects.map((sub, i) => (
            <motion.div key={sub.title} variants={itemVariants}>
              <CategoryCard
                title={sub.title}
                description={sub.description}
                count={sub.count}
                href={sub.href}
                type="prelims"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
