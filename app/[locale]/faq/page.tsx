"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "@/lib/gsap";
import {
    Plus,
    Minus,
    Layout,
    TrendingUp,
    Calendar,
    ChevronRight,
    Search,
    HelpCircle,
    ArrowUpRight
} from "lucide-react";
import LocaleLink from "@/components/LocaleLink";

interface FAQItemProps {
    question: string;
    answer: string;
    icon: any;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, icon: Icon, isOpen, onClick }: FAQItemProps) {
    return (
        <div
            className={`group border-b border-white/10 py-8 transition-all duration-500 cursor-pointer ${isOpen ? 'bg-white/[0.02] -mx-6 px-6 rounded-2xl border-white/5 mb-4' : 'hover:bg-white/[0.01]'}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between gap-6">
                <div className="flex gap-6">
                    <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#00b4d9] text-white shadow-[0_0_20px_rgba(0,180,217,0.3)]' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white'}`}>
                        <Icon className="w-5 h-5" />
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

export default function FAQPage() {
    const t = useTranslations("faq");
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<string | null>("purchase");

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

    const categories = [
        {
            id: "models",
            title: t("categories.models"),
            items: [
                { id: "purchase", q: t("items.purchase.q"), a: t("items.purchase.a"), icon: Layout },
                { id: "rental", q: t("items.rental.q"), a: t("items.rental.a"), icon: HelpCircle },
                { id: "participation", q: t("items.participation.q"), a: t("items.participation.a"), icon: HelpCircle },
            ]
        },
        {
            id: "growth",
            title: t("categories.growth"),
            items: [
                { id: "seo", q: t("items.seo.q"), a: t("items.seo.a"), icon: TrendingUp },
                { id: "support", q: t("items.support.q"), a: t("items.support.a"), icon: HelpCircle },
            ]
        },
        {
            id: "booking",
            title: t("categories.booking"),
            items: [
                { id: "booking", q: t("items.booking.q"), a: t("items.booking.a"), icon: Calendar },
            ]
        }
    ];

    return (
        <main ref={containerRef} className="bg-black text-white min-h-screen">
            {/* 🧭 HERO SECTION */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00b4d9]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="w-16 h-1 bg-[#00b4d9] animate-line mb-8" />
                    <h1 className="animate-reveal text-5xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.05]">
                        {t("hero.title")}
                    </h1>
                    <p className="animate-reveal text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
                        {t("hero.subtitle")}
                    </p>
                </div>
            </section>

            {/* 🧱 FAQ ACCORDIONS */}
            <section className="pb-40 px-6">
                <div className="max-w-5xl mx-auto">
                    {categories.map((category) => (
                        <div key={category.id} className="mb-24 animate-reveal">
                            <h2 className="text-sm font-mono text-[#00b4d9] uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                                <span className="w-8 h-px bg-[#00b4d9]/30" />
                                {category.title}
                            </h2>
                            <div className="space-y-2">
                                {category.items.map((item) => (
                                    <FAQItem
                                        key={item.id}
                                        question={item.q}
                                        answer={item.a}
                                        icon={item.icon}
                                        isOpen={openIndex === item.id}
                                        onClick={() => setOpenIndex(openIndex === item.id ? null : item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🧱 FINAL CTA */}
            <section className="py-40 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
                <div className="max-w-5xl mx-auto text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00b4d9]/10 rounded-full blur-[100px] pointer-events-none" />

                    <h2 className="animate-reveal text-4xl md:text-6xl font-display font-bold mb-8 text-white relative z-10">
                        {t("cta.title")}
                    </h2>
                    <p className="animate-reveal text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
                        {t("cta.text")}
                    </p>

                    <div className="animate-reveal relative z-10 flex flex-col items-center gap-8">
                        <a
                            href="https://cal.eu/stefano-ala/pmz7mfb7wvc-ayw.XFW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-12 py-6 bg-white text-black rounded-full font-display font-bold text-base uppercase tracking-wider transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3"
                        >
                            <Calendar className="w-5 h-5" />
                            {t("cta.button")}
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>

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
