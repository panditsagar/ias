"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, CaretDown, MagnifyingGlass, ArrowRight, SignOut } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function ProfileAvatar({ user, size = "h-12 w-12" }) {
  const initials = (user.displayName || user.email || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (user.photoURL) {
    return (
      <span
        role="img"
        aria-label={user.displayName || "Profile photo"}
        className={`${size} shrink-0 rounded-full bg-cover bg-center ring-2 ring-white shadow-sm`}
        style={{ backgroundImage: `url("${user.photoURL}")` }}
      />
    );
  }

  return <span className={`${size} flex shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800 ring-2 ring-white shadow-sm`}>{initials}</span>;
}

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'prelims' | 'mains' | 'psir' | null
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Prelims",
      href: "/prelims",
      dropdown: [
        { name: "Ancient India", href: "/notes?category=Prelims&subject=Ancient+India", desc: "IVC, Vedic Age, Mauryas & Art" },
        { name: "Medieval India", href: "/notes?category=Prelims&subject=Medieval+India", desc: "Sultanate, Mughals & Marathas" },
        { name: "Modern India", href: "/notes?category=Prelims&subject=Modern+India", desc: "Freedom Struggle & British Rule" },
        { name: "Polity", href: "/notes?category=Prelims&subject=Polity", desc: "Constitution, Parliament & Rights" },
        { name: "Economy", href: "/notes?category=Prelims&subject=Economy", desc: "Macroeconomics, Budget & Banking" },
        { name: "Geography", href: "/notes?category=Prelims&subject=Geography", desc: "Physical, Indian & Resource Maps" },
        { name: "Environment", href: "/notes?category=Prelims&subject=Environment", desc: "Biodiversity, Ecology & Accords" },
        { name: "Science & Tech", href: "/notes?category=Prelims&subject=Science+%26+Technology", desc: "Space, Defence, Biotech & IT" },
      ],
    },
    {
      name: "Mains",
      href: "/mains",
      dropdown: [
        { name: "GS Paper 1", href: "/notes?category=Mains&paper=GS+Paper+1", desc: "History, Geography & Society" },
        { name: "GS Paper 2", href: "/notes?category=Mains&paper=GS+Paper+2", desc: "Polity, Constitution & IR" },
        { name: "GS Paper 3", href: "/notes?category=Mains&paper=GS+Paper+3", desc: "Economy, Science & Security" },
        { name: "GS Paper 4", href: "/notes?category=Mains&paper=GS+Paper+4", desc: "Ethics, Integrity & Case Studies" },
      ],
    },
    {
      name: "PSIR",
      href: "/psir-optional",
      dropdown: [
        { name: "Paper 1 Sec A", href: "/notes?category=PSIR+Optional&subject=Paper+1+Section+A", desc: "Political Theory & Thinkers" },
        { name: "Paper 1 Sec B", href: "/notes?category=PSIR+Optional&subject=Paper+1+Section+B", desc: "Indian Govt & Politics" },
        { name: "Paper 2 Sec A", href: "/notes?category=PSIR+Optional&subject=Paper+2+Section+A", desc: "Comparative & International Theory" },
        { name: "Paper 2 Sec B", href: "/notes?category=PSIR+Optional&subject=Paper+2+Section+B", desc: "India's Foreign Policy & Bilaterals" },
      ],
    },
    { name: "BPSC", href: "/bpsc" },
    { name: "PYQ", href: "/pyq" },
 
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-slate-200/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group active:scale-[0.98] transition-transform duration-150">
              <img 
                src="/logo.png" 
                alt="Ishteyaque Rahman" 
                className="h-10 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {navLinks.map((link) => {
              const isDropdown = !!link.dropdown;
              const isActive = pathname === link.href || (isDropdown && link.dropdown.some(sub => pathname === sub.href));
              
              if (isDropdown) {
                const isDropdownActive = activeDropdown === link.name.toLowerCase();
                return (
                  <div key={link.name} className="relative">
                    <button
                      onClick={() => toggleDropdown(link.name.toLowerCase())}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1 cursor-pointer active:scale-[0.97] hover:scale-[1.02] ${
                        isActive
                          ? "text-amber-800 bg-amber-500/5 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <CaretDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownActive ? "rotate-185" : ""}`} weight="bold" />
                    </button>
                    
                    <AnimatePresence>
                      {isDropdownActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 350, damping: 26 }}
                          className={`absolute right-0 mt-6 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-5 z-50 transform origin-top-right ${
                            link.dropdown.length > 4 ? "w-[34rem] grid grid-cols-2 gap-2" : "w-72 flex flex-col gap-1"
                          }`}
                        >
                          <div className="col-span-full border-b border-slate-100 pb-2.5 mb-2 px-1.5 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              {link.name} Notes
                            </span>
                            <Link 
                              href={link.href} 
                              onClick={() => setActiveDropdown(null)}
                              className="text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors uppercase tracking-wider flex items-center space-x-1"
                            >
                              <span>Explore All</span>
                              <ArrowRight className="h-3 w-3" weight="bold" />
                            </Link>
                          </div>

                          {link.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group p-2.5 rounded-2xl hover:bg-amber-500/[0.03] hover:border-amber-500/10 border border-transparent transition-all flex flex-col space-y-0.5 text-left active:scale-[0.99]"
                            >
                              <span className="text-sm font-semibold text-slate-800 group-hover:text-amber-850 transition-colors">
                                {subItem.name}
                              </span>
                              {subItem.desc && (
                                <span className="text-xs text-slate-450 font-sans font-light leading-normal">
                                  {subItem.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer active:scale-[0.97] hover:scale-[1.02] ${
                    isActive
                      ? "text-amber-800 bg-amber-500/5 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
 

            {user && (
              <div className="relative ml-2">
                <button
                  type="button"
                  onClick={() => toggleDropdown("profile")}
                  aria-label="Open profile menu"
                  aria-expanded={activeDropdown === "profile"}
                  className="flex cursor-pointer items-center gap-1 rounded-full border border-slate-800 bg-white     transition hover:border-slate-300 hover:shadow"
                >
                  <ProfileAvatar user={user} />
                 </button>

                <AnimatePresence>
                  {activeDropdown === "profile" && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} className="absolute right-0 top-full mt-5 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.14)]">
                      <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                        <ProfileAvatar user={user} size="h-11 w-11" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">{user.displayName || "Student"}</p>
                          <p className="truncate text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      <button type="button" onClick={logout} className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-red-700">
                        <SignOut className="h-4 w-4" weight="bold" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/notes"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all block active:scale-90"
            >
              <MagnifyingGlass className="h-5 w-5" weight="bold" />
            </Link>
            {user && (
              <button type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Open profile" className="cursor-pointer rounded-full">
                <ProfileAvatar user={user} size="h-8 w-8" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-all active:scale-[0.93] cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" weight="bold" /> : <List className="h-6 w-6" weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/10 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 w-80 max-w-full bg-[#FDFBF7] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 sm:h-20 border-b border-slate-200">
          <span className="font-serif text-lg font-bold text-slate-800">Navigation</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors active:scale-95"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-4.5rem)] px-4 py-6 space-y-4">
          {navLinks.map((link) => {
            const isDropdown = !!link.dropdown;
            const isDropdownOpen = activeDropdown === link.name.toLowerCase();
            const isActive = pathname === link.href;

            if (isDropdown) {
              return (
                <div key={link.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium transition-colors ${
                        isActive ? "text-amber-800 font-semibold" : "text-slate-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <button
                      onClick={() => toggleDropdown(link.name.toLowerCase())}
                      className="p-1 rounded-xl text-slate-400 hover:text-slate-750 hover:bg-slate-100 active:scale-90"
                    >
                      <CaretDown className={`h-5 w-5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} weight="bold" />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div className="pl-4 py-1 space-y-2.5 mt-2 animate-in slide-in-from-top-1 duration-150">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-sm text-slate-500 hover:text-amber-800 py-1 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-medium transition-colors ${
                  isActive ? "text-amber-800 font-semibold" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-6 border-t border-slate-200">
            <Link
              href="/notes"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-medium shadow-xs transition-all active:scale-[0.97]"
            >
              <MagnifyingGlass className="h-4 w-4" weight="bold" />
              <span>Search All Notes</span>
            </Link>
          </div>

          {user && (
            <div className="border-t border-slate-200 pt-5">
              <div className="flex items-center gap-3 px-1">
                <ProfileAvatar user={user} size="h-11 w-11" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">{user.displayName || "Student"}</p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
              >
                <SignOut className="h-4 w-4" weight="bold" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
