import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";

const sectionHeadings = new Set([
  "Introduction",
  "Information We Collect",
  "How We Use Your Information",
  "Data Security",
  "Agreement to Terms",
  "Ownership of Intellectual Property & Content",
  "User Accounts and Payments",
  "General Educational Purposes Only",
  "No Financial or Commercial Association",
  "External Links & Third-Party Gateways",
  "Digital Products Policy",
  "No Refunds",
  "Cancellation of Subscriptions (If Applicable)",
  "Transaction Failures",
]);

export default function LegalPage({ content, breadcrumb }) {
  const lines = content.split("\n");
  const title = lines[0];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FBF9F4]">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <Breadcrumbs items={[{ label: breadcrumb }]} />
        <article className="mt-8 rounded-xl   bg-white p-6   sm:p-10 lg:p-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            {lines.slice(1).map((line, index) => {
              if (sectionHeadings.has(line)) {
                return <h2 key={index} className="pt-5 text-xl font-bold text-slate-900 sm:text-2xl">{line}</h2>;
              }
              if (line.startsWith("Effective Date:")) {
                return <p key={index} className="border-b border-slate-100 pb-5 text-sm font-semibold text-slate-500">{line}</p>;
              }
              return <p key={index}>{line}</p>;
            })}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
