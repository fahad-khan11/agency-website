import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/legal/CookieConsent";
import { PanelProvider } from "@/lib/PanelContext";
import { TidioChatProvider } from "@/lib/TidioChatContext";
import TidioChat from "@/components/layout/TidioChat";
import FloatingChatButton from "@/components/layout/FloatingChatButton";
import "../globals.css";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }


  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <TidioChatProvider>
            <PanelProvider>
              <TidioChat />
              <Header />
              {children}
              <Footer />
              <CookieConsent />
            </PanelProvider>
          </TidioChatProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
