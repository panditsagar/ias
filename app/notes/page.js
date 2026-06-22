import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotesListingClient from "./NotesListingClient";
import { notes } from "../data/notes";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

export default function NotesPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FBF9F4]">
      {/* Sticky Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 select-none">
              <CircleNotch className="h-8 w-8 text-amber-750 animate-spin" weight="bold" />
              <p className="text-slate-500 text-sm font-sans">Loading notes database...</p>
            </div>
          }
        >
          <NotesListingClient allNotes={notes} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
