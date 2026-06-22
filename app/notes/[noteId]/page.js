import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import AuthenticatedNotesViewer from "../../components/AuthenticatedNotesViewer";
import NoteCard from "../../components/NoteCard";
import CTASection from "../../components/CTASection";
import { notes } from "../../data/notes";
import { CaretLeft, CaretRight, Stack, Clock } from "@phosphor-icons/react/dist/ssr";

// Pre-generate routes for static exports
export async function generateStaticParams() {
  const activeNotes = notes.filter((note) => {
    const isComingSoon = note.comingSoon;
    return !isComingSoon;
  });
  return activeNotes.map((note) => ({
    noteId: note.id,
  }));
}

export default async function NoteDetailPage({ params }) {
  const resolvedParams = await params;
  const noteId = resolvedParams.noteId;

  // Find current note
  const currentNoteIndex = notes.findIndex((note) => note.id === noteId);
  if (currentNoteIndex === -1) {
    notFound();
  }

  const note = notes[currentNoteIndex];
  const isComingSoon = note.comingSoon;
  if (isComingSoon) {
    notFound();
  }

  // Keep BPSC navigation within BPSC instead of crossing into UPSC notes.
  const navigationNotes = note.category === "BPSC" ? notes.filter((item) => item.category === "BPSC") : notes.filter((item) => item.category !== "BPSC");
  const navigationIndex = navigationNotes.findIndex((item) => item.id === note.id);
  const prevNote = navigationIndex > 0 ? navigationNotes[navigationIndex - 1] : null;
  const nextNote = navigationIndex < navigationNotes.length - 1 ? navigationNotes[navigationIndex + 1] : null;

  // Find related note items based on note.relatedNotes array of IDs
  const relatedNotes = notes.filter((n) => 
    note.relatedNotes.includes(n.id) || 
    (n.subject === note.subject && n.id !== note.id)
  ).slice(0, 3);

  const breadcrumbItems = note.category === "BPSC"
    ? [{ label: "BPSC", href: "/bpsc" }, { label: note.title }]
    : [
        { label: "Notes", href: "/notes" },
        { label: note.category, href: `/notes?category=${encodeURIComponent(note.category)}` },
        { label: note.subject, href: `/notes?category=${encodeURIComponent(note.category)}&subject=${encodeURIComponent(note.subject)}` },
        { label: note.title },
      ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FBF9F4]">
      {/* Sticky Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Note Metadata Header Block */}
        <div className="bg-white rounded-xl border border-slate-200/80   p-6 sm:p-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/20 select-none">
              {note.category}
            </span>
            <span className="px-2.5 py-1 rounded-full font-semibold bg-slate-50 border border-slate-200/50 text-slate-600 select-none">
              {note.subject}
            </span>
            {note.paper && (
              <span className="text-slate-400 font-semibold flex items-center gap-1 select-none">
                <Stack className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{note.paper}</span>
              </span>
            )}
            <span className="text-slate-400 font-medium ml-auto flex items-center gap-1 text-[11px] sm:text-xs select-none">
              <Clock className="h-4 w-4 shrink-0" />
              <span>Last updated: {note.updatedAt}</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-slate-800 tracking-tighter leading-tight">
            {note.title}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-sans font-light leading-relaxed max-w-3xl">
            {note.description}
          </p>
        </div>

        {/* Custom protected notes reader */}
        <AuthenticatedNotesViewer note={note} />

        {/* Navigation buttons: Previous vs Next */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 select-none">
          {prevNote ? (
            <Link
              href={`/notes/${prevNote.id}`}
              className="w-full sm:w-auto flex items-center space-x-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 px-5 py-3 rounded-2xl shadow-xs transition-all text-left group active:scale-[0.98]"
            >
              <CaretLeft className="h-5 w-5 text-slate-400 group-hover:text-amber-700 transition-colors" weight="bold" />
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Previous Topic</span>
                <span className="font-serif text-sm font-bold text-slate-700 group-hover:text-amber-800 line-clamp-1">{prevNote.title}</span>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block"></div>
          )}

          {nextNote ? (
            <Link
              href={`/notes/${nextNote.id}`}
              className="w-full sm:w-auto flex items-center justify-between space-x-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 px-5 py-3 rounded-2xl shadow-xs transition-all text-right group ml-auto active:scale-[0.98]"
            >
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Next Topic</span>
                <span className="font-serif text-sm font-bold text-slate-700 group-hover:text-amber-800 line-clamp-1">{nextNote.title}</span>
              </div>
              <CaretRight className="h-5 w-5 text-slate-400 group-hover:text-amber-700 transition-colors" weight="bold" />
            </Link>
          ) : (
            <div className="hidden sm:block"></div>
          )}
        </div>

        {/* Related Notes Grid Section */}
        {relatedNotes.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-slate-200/60">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-800">
                Related Revision Notes
              </h2>
              <p className="text-slate-550 text-xs sm:text-sm mt-0.5 font-light">
                Extend your preparation with notes covering interconnected subjects.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNotes.map((relNote) => (
                <NoteCard key={relNote.id} note={relNote} />
              ))}
            </div>
          </section>
        )}

        {/* CTA section */}
        <CTASection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
