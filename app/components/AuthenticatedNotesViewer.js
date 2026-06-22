"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import GoogleAuthModal from "./GoogleAuthModal";
import NotesViewer from "./NotesViewer";

export default function AuthenticatedNotesViewer({ note }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Checking your session…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-64">
        <GoogleAuthModal
          open
          onClose={() => router.push(note.category === "BPSC" ? "/bpsc" : "/notes")}
          message={note.category === "BPSC" ? "Your BPSC note, ready." : "Your UPSC note, ready."}
        />
      </div>
    );
  }

  const isBpsc = note.category === "BPSC";
  return (
    <NotesViewer
      note={note}
      viewerLabel={isBpsc ? "BPSC ONLINE VIEWER" : "UPSC ONLINE VIEWER"}
      examLabel={isBpsc ? "BPSC" : "UPSC"}
    />
  );
}
