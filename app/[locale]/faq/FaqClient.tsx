"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";
import gsap from "@/lib/gsap";
import {
    Plus,
    Minus,
    Calendar,
    HelpCircle,
} from "lucide-react";
import LocaleLink from "@/components/LocaleLink";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div
            className={`group border-b border-white/10 py-8 transition-all duration-500 cursor-pointer ${isOpen ? 'bg-white/[0.02] -mx-6 px-6 rounded-2xl border-white/5 mb-4' : 'hover:bg-white/[0.01]'}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between gap-6">
                <div className="flex gap-6">
                    <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#00b4d9] text-white shadow-[0_0_20px_rgba(0,180,217,0.3)]' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-display font-bold transition-all duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {question}
                        </h3>
                    </div>
                </div>
                <div className={`mt-2 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 bg-white/10 border-white/20' : 'group-hover:border-white/30'}`}>
                    {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-gray-500 group-hover:text-white" />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="pl-16 pr-14 pt-6 pb-2">
                            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQClient({ initialData }: { initialData?: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<string | null>("0-0");

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({
                namespace: "15min",
                embedJsUrl: "https://www.cal.eu/embed/embed.js",
            });
            cal("ui", {
                cssVarsPerTheme: {
                    light: { "cal-brand": "#1B263B" },
                    dark: { "cal-brand": "#00B4D8" },
                },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    const heroTitle = initialData?.heroTitle || "";
    const heroSubtitle = initialData?.heroSubtitle || "";
    const ctaTitle = initialData?.ctaTitle || "";
    const ctaText = initialData?.ctaText || "";
    const ctaButton = initialData?.ctaButton || "";
    const categories = initialData?.categories || [];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".animate-reveal", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
            });

            gsap.from(".animate-line", {
                scaleX: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "expo.inOut",
                transformOrigin: "left"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-black text-white min-h-screen">
            {/* 🧭 HERO SECTION */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00b4d9]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="w-16 h-1 bg-[#00b4d9] animate-line mb-8" />
                    <h1 className="animate-reveal text-5xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.05]">
                        {heroTitle}
                    </h1>
                    <p className="animate-reveal text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
                        {heroSubtitle}
                    </p>
                </div>
            </section>

            {/* 🧱 FAQ ACCORDIONS */}
            <section className="pb-40 px-6">
                <div className="max-w-5xl mx-auto">
                    {categories.map((category: any, catIdx: number) => (
                        <div key={category.id || catIdx} className="mb-24 animate-reveal">
                            <h2 className="text-sm font-mono text-[#00b4d9] uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                                <span className="w-8 h-px bg-[#00b4d9]/30" />
                                {category.title}
                            </h2>
                            <div className="space-y-2">
                                {category.items?.map((item: any, itemIdx: number) => (
                                    <FAQItem
                                        key={item.id || `${catIdx}-${itemIdx}`}
                                        question={item.question}
                                        answer={item.answer}
                                        isOpen={openIndex === `${catIdx}-${itemIdx}`}
                                        onClick={() => setOpenIndex(openIndex === `${catIdx}-${itemIdx}` ? null : `${catIdx}-${itemIdx}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🧱 FINAL CTA */}
            <section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="relative z-10 mb-16">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00b4d9]/10 rounded-full blur-[100px] pointer-events-none" />
                        <h2 className="animate-reveal text-4xl md:text-6xl font-display font-bold mb-8 text-white relative z-10">
                            {ctaTitle}
                        </h2>
                        <p className="animate-reveal text-gray-400 text-lg md:text-xl max-w-2xl mx-auto relative z-10">
                            {ctaText}
                        </p>
                    </div>

                    <div className="animate-reveal flex flex-col items-center gap-6">
                        <span className="flex items-center gap-3 text-base font-display font-bold uppercase tracking-wider text-white">
                            <Calendar className="w-5 h-5 text-[#00b4d9]" />
                            {ctaButton}
                        </span>

                        <div className="w-full rounded-2xl overflow-hidden border border-white/10">
                            <Cal
                                namespace="15min"
                                calLink="atriona.digital/15min"
                                calOrigin="https://www.cal.eu"
                                style={{ width: "100%", height: "600px" }}
                                config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
                            />
                        </div>

                        <LocaleLink
                            href="/contact"
                            className="text-sm font-bold uppercase tracking-widest text-[#00b4d9] hover:text-white transition-colors"
                        >
                            Or SEND US A Message
                        </LocaleLink>
                    </div>
                </div>
            </section>
        </main>
    );
}
