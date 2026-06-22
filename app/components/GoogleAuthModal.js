"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, GoogleLogo, SquaresFour, X } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext";

const subscribe = () => () => {};

export default function GoogleAuthModal({ open, onClose, onSuccess, message = "Your study notes, ready." }) {
  const { error, signInWithGoogle } = useAuth();
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);

  if (!open || !isClient) return null;

  async function handleSignIn() {
    const user = await signInWithGoogle();
    if (user) onSuccess?.(user);
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md" role="presentation" onMouseDown={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="google-auth-title" onMouseDown={(event) => event.stopPropagation()} className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/80 bg-[#FCFAF5] px-7 py-10 shadow-[0_30px_100px_-25px_rgba(15,23,42,0.45)] sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-0 notebook-grid opacity-35" />
        <button type="button" onClick={onClose} aria-label="Close sign-in dialog" className="absolute right-5 top-5 z-10 cursor-pointer rounded-full p-2 text-slate-400 hover:bg-white hover:text-slate-800"><X className="h-5 w-5" weight="bold" /></button>
        <div className="relative z-10">
          <SquaresFour className="h-11 w-11 text-slate-950" weight="bold" />
          <h2 id="google-auth-title" className="mt-9 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">Learn without interruption.<span className="mt-1 block text-slate-400">{message}</span></h2>
          <button type="button" onClick={handleSignIn} className="mt-9 flex w-full cursor-pointer items-center rounded-full bg-blue-600 p-2 pl-6 text-white shadow-[0_15px_35px_-12px_rgba(37,99,235,0.65)] transition hover:bg-blue-700">
            <GoogleLogo className="h-5 w-5 shrink-0" weight="bold" />
            <span className="flex-1 text-center text-sm font-semibold sm:text-base">Continue with Google</span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-blue-600"><ArrowRight className="h-5 w-5" weight="bold" /></span>
          </button>
          <p className="mt-5 text-center text-xs text-slate-400">Secure sign-in. No password required.</p>
          {error && <p role="alert" className="mt-3 text-center text-sm text-red-700">{error}</p>}
        </div>
      </section>
    </div>,
    document.body,
  );
}
