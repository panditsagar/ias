import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import BpscResourceLibrary from "../components/BpscResourceLibrary";

export default function BPSCPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FBF9F4]">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 space-y-12 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={[{ label: "BPSC", href: "/bpsc" }]} />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">BPSC Study Resources</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500">Browse the notes and answer copies currently uploaded to the BPSC resource library.</p>
        </div>
        <BpscResourceLibrary />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
