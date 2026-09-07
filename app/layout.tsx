import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Whatsapp from "./components/whatsapp";
import { LanguageProvider } from "./components/LanguageContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IPHUB - Solusi Terpadu Bisnis Modern",
  description: "Platform layanan profesional dan infrastruktur digital terpadu untuk bisnis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
          <Whatsapp />
        </LanguageProvider>
      </body>
    </html>
  );
}