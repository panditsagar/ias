"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, FilePdf, Note, PencilLine } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";
import GoogleAuthModal from "./GoogleAuthModal";

function formatSize(bytes) {
  return bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : "PDF";
}

function ResourceCard({ resource, onOpen }) {
  const styles = {
    note: "bg-amber-50 text-amber-700",
    real: "bg-emerald-50 text-emerald-700",
    practice: "bg-blue-50 text-blue-700",
  };
  const labels = { note: "Study notes", real: "Actual paper", practice: "Practice copy" };

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-lg">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${styles[resource.kind]}`}>{labels[resource.kind]}</span>
          <span className="text-xs text-slate-400">{formatSize(resource.size)}</span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{resource.title}</h3>
        {resource.description && <p className="mt-2 text-sm leading-6 text-slate-500">{resource.description}</p>}
      </div>
      <button type="button" onClick={() => onOpen(resource)} className="mt-6 flex cursor-pointer items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-amber-700 hover:text-amber-900"><span>Open PDF</span><ArrowRight className="h-4 w-4" weight="bold" /></button>
    </article>
  );
}

export default function BpscResourceLibrary() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState({ notes: [], copies: { actual: [], practice: [] } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingResource, setPendingResource] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/bpsc", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error);
        if (!cancelled) setData(payload);
      })
      .catch((fetchError) => {
        if (!cancelled) setError(fetchError.message || "Unable to load BPSC resources.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  function openResource(resource) {
    if (user) {
      router.push(`/bpsc/documents/${resource.id}`);
      return;
    }
    setPendingResource(resource);
  }

  function handleAuthenticated() {
    if (!pendingResource) return;
    const resourceId = pendingResource.id;
    setPendingResource(null);
    router.push(`/bpsc/documents/${resourceId}`);
  }

  if (loading) return <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading BPSC resources…</div>;
  if (error) return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">{error}</div>;

  return (
    <div className="space-y-14">
      <section className="space-y-6">
        <div className="border-b border-amber-200/50 pb-3">
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 sm:text-2xl"><span className="rounded-xl bg-amber-50 p-2 text-amber-700"><Note className="h-4 w-4" weight="bold" /></span>BPSC Notes</h2>
          <p className="mt-1 text-sm text-slate-500">All uploaded BPSC notes, without subcategories.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.notes.map((note) => <ResourceCard key={note.id} resource={note} onOpen={openResource} />)}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 border-b border-amber-200/50 pb-3 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 sm:text-2xl"><span className="rounded-xl bg-rose-50 p-2 text-rose-700"><FilePdf className="h-4 w-4" weight="bold" /></span>BPSC Answer Copies</h2><p className="mt-1 text-sm text-slate-500">Uploaded actual papers and practice answer-writing copies.</p></div>
          <div className="flex gap-3 text-xs font-medium text-slate-500"><span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-emerald-600" weight="fill" />Actual paper</span><span className="flex items-center gap-1"><PencilLine className="h-4 w-4 text-blue-600" weight="bold" />Practice</span></div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...data.copies.actual, ...data.copies.practice].map((copy) => <ResourceCard key={copy.id} resource={copy} onOpen={openResource} />)}
        </div>
      </section>

      <GoogleAuthModal open={Boolean(pendingResource)} onClose={() => setPendingResource(null)} onSuccess={handleAuthenticated} message="Your BPSC PDF, ready." />
    </div>
  );
}
