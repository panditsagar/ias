import Link from "next/link";
import { ShieldWarning } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 font-sans">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand/About Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center active:scale-[0.98] transition-transform w-fit">
              <img 
                src="/logo.png" 
                alt="Ishteyaque Rahman" 
                className="h-10 w-auto object-contain   opacity-90 transition-transform duration-200 hover:scale-[1.02]"
              />
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-light">
              Simple, structured UPSC notes from one aspirant’s desk to another. Helping you clear the noise and focus on what matters for Prelims, Mains, and PSIR Optional.
            </p>
            <div className="pt-2 text-xs text-slate-505 font-medium select-none">
              Made with care for civil services aspirants.
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-semibold tracking-wide uppercase text-xs">Categories</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link href="/prelims" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Prelims Notes</Link>
              </li>
              <li>
                <Link href="/mains" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Mains GS Notes</Link>
              </li>
              <li>
                <Link href="/psir-optional" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">PSIR Optional</Link>
              </li>
              <li>
                <Link href="/bpsc" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">BPSC Materials</Link>
              </li>
              <li>
                <Link href="/pyq" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">PYQ Analysis</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-semibold tracking-wide uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link href="/notes" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Search &amp; Browse</Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">About the Creator</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Disclaimer</Link>
              </li>
              <li>
                <Link href="/pyq#topic-wise" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Topic-wise PYQs</Link>
              </li>
            </ul>
          </div>

          {/* Subject Shortcuts Column */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-semibold tracking-wide uppercase text-xs">Popular Subjects</h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link href="/notes?category=Prelims&subject=Polity" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Polity &amp; Constitution</Link>
              </li>
              <li>
                <Link href="/notes?category=Prelims&subject=Economy" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Indian Economy</Link>
              </li>
              <li>
                <Link href="/notes?category=PSIR+Optional&subject=Paper+1+Section+A" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Political Theory</Link>
              </li>
              <li>
                <Link href="/notes?category=Mains&subject=Governance" className="text-slate-400 hover:text-amber-500 transition-colors duration-150">Governance &amp; Ethics</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Area */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-slate-800/20 p-6 rounded-2xl border border-slate-800">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <ShieldWarning className="h-5 w-5" weight="regular" />
            </div>
            <div className="text-xs text-slate-400 leading-relaxed font-light">
              <span className="font-semibold text-white block md:inline mb-1 md:mb-0 md:mr-1">Disclaimer:</span>
              This educational platform is created for learning and revision purposes. UPSC aspirants and students should verify important facts, notifications, statistics, and syllabus details from official UPSC and government sources before relying on them for examinations.
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Area */}
      <div className="bg-slate-950/80 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <div>
            &copy; {currentYear} Ishteyaque Rahman. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-300">Terms and Conditions</Link>
            <Link href="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
            <Link href="/refund-and-cancellation-policy" className="hover:text-slate-300">Refund and Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
