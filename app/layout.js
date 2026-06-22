import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Ishteyaque Rahman - Simple, Structured UPSC Notes",
  description: "Simple, structured UPSC notes from one aspirant’s desk to another. Read Prelims, Mains, and PSIR Optional notes in a clean, revision-friendly layout.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=plus-jakarta-sans@300,400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF9F4] text-slate-800 font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
