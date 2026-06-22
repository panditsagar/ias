"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CaretLeft, CaretRight, Minus, Plus, ShieldCheck } from "@phosphor-icons/react";
import { useAuth } from "@/app/context/AuthContext";
import GoogleAuthModal from "@/app/components/GoogleAuthModal";
import Header from "@/app/components/Header";

export default function ProtectedAnswerCopyViewer({ documentId, title }) {
  const { user, loading: authLoading } = useAuth();
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1.15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watermark, setWatermark] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    let loadingTask;

    async function loadDocument() {
      setLoading(true);
      setError("");
      try {
        const token = await user.getIdToken();
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
        setWatermark(`${user.email || "authenticated-user"} • ${user.uid.slice(0, 8)}`);
        loadingTask = pdfjs.getDocument({
          url: `/api/bpsc/documents/${documentId}`,
          httpHeaders: { Authorization: `Bearer ${token}` },
          withCredentials: false,
        });
        const loadedPdf = await loadingTask.promise;
        if (!cancelled) setPdf(loadedPdf);
      } catch (loadError) {
        if (!cancelled) setError(loadError.message || "Unable to render PDF.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDocument();
    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [documentId, user]);

  useEffect(() => {
    if (!pdf || !canvasRef.current) return;
    let renderTask;
    let cancelled = false;

    async function renderPage() {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;
      const viewport = page.getViewport({ scale: zoom });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { alpha: false });
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewport.width * ratio);
      canvas.height = Math.floor(viewport.height * ratio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      renderTask = page.render({ canvasContext: context, viewport, transform: ratio === 1 ? null : [ratio, 0, 0, ratio, 0, 0] });
      await renderTask.promise;
    }

    renderPage().catch((renderError) => {
      if (renderError?.name !== "RenderingCancelledException") setError("Unable to render this PDF page.");
    });
    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [pageNumber, pdf, zoom]);

  useEffect(() => {
    function blockShortcuts(event) {
      if ((event.ctrlKey || event.metaKey) && ["p", "s", "u"].includes(event.key.toLowerCase())) event.preventDefault();
    }
    window.addEventListener("keydown", blockShortcuts);
    return () => window.removeEventListener("keydown", blockShortcuts);
  }, []);

  if (!authLoading && !user) {
    return <GoogleAuthModal open onClose={() => window.location.assign("/bpsc")} message="Your BPSC answer copy, ready." />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-900">
      <Header />
      <div className="sticky top-16 z-40 border-b border-white/10 bg-slate-950/95 px-4 py-3 backdrop-blur sm:top-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="min-w-0"><Link href="/bpsc" className="text-xs font-semibold text-amber-400 hover:text-amber-300">Back to BPSC</Link><h1 className="truncate text-sm font-bold text-white sm:text-base">{title}</h1></div>
          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-white/10 bg-slate-900 p-1">
            <button type="button" onClick={() => setZoom((value) => Math.max(0.7, value - 0.15))} className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10" aria-label="Zoom out"><Minus className="h-4 w-4" weight="bold" /></button>
            <span className="w-12 text-center text-xs text-slate-300">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(1.8, value + 0.15))} className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10" aria-label="Zoom in"><Plus className="h-4 w-4" weight="bold" /></button>
          </div>
        </div>
      </div>

      <main className="relative min-h-[80vh] overflow-auto p-4 sm:p-8" onContextMenu={(event) => event.preventDefault()}>
        {loading && <p className="text-center text-sm text-slate-300">Preparing secure viewer…</p>}
        {error && <p className="mx-auto max-w-xl rounded-xl bg-red-50 p-4 text-center text-sm text-red-700">{error}</p>}
        {pdf && (
          <div className="mx-auto flex w-max min-w-full flex-col items-center">
            <div className="relative overflow-hidden bg-white shadow-2xl"><canvas ref={canvasRef} className="block max-w-none" /><div className="pointer-events-none absolute inset-0 grid grid-cols-2 place-items-center gap-28 overflow-hidden opacity-[0.12]"><span className="-rotate-30 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-900">{watermark}</span><span className="-rotate-30 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-900">{watermark}</span><span className="-rotate-30 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-900">{watermark}</span><span className="-rotate-30 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-900">{watermark}</span></div></div>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950 p-2 text-sm text-slate-300">
              <button type="button" disabled={pageNumber === 1} onClick={() => setPageNumber((page) => page - 1)} className="cursor-pointer rounded-lg p-2 hover:bg-white/10 disabled:cursor-default disabled:opacity-30"><CaretLeft className="h-4 w-4" weight="bold" /></button>
              <span><ShieldCheck className="mr-1 inline h-4 w-4 text-emerald-400" weight="fill" />Page {pageNumber} of {pdf.numPages}</span>
              <button type="button" disabled={pageNumber === pdf.numPages} onClick={() => setPageNumber((page) => page + 1)} className="cursor-pointer rounded-lg p-2 hover:bg-white/10 disabled:cursor-default disabled:opacity-30"><CaretRight className="h-4 w-4" weight="bold" /></button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
