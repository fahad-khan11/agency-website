import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google"; // Premium-feel fonts
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PanelProvider } from "@/lib/PanelContext";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATRIONA | Premium Digital Studio",
  description: "A high-end creative studio building digital experiences that matter.",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <PanelProvider>
          <Header />
          {children}
          <Footer />
        </PanelProvider>
      </body>
    </html>
  );
}
