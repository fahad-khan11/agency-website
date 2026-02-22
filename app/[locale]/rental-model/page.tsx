"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import gsap from "@/lib/gsap";
import {
    ArrowUpRight,
    Check,
    Calendar,
    ArrowLeft
} from "lucide-react";
import LocaleLink from "@/components/LocaleLink";

export default function RentalModelPage() {
    const t = useTranslations("modelPages.rental");
    const tc = useTranslations("modelPages");
    const containerRef = useRef<HTMLDivElement>(null);

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
                width: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "expo.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-black text-white min-h-screen">
            {/* 🧭 NAVIGATION OVERLAY (Back Link) */}
            <div className="fixed top-32 left-6 md:left-12 z-50">
                <LocaleLink
                    href="/project-models"
                    className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    {tc("compareAll")}
                </LocaleLink>
            </div>

            {/* 🧱 SECTION 1 — HERO */}
            <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20 animate-line" />

                <div className="max-w-4xl">
                    <h1 className="animate-reveal text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.05]">
                        {t("hero.headline")}
                    </h1>
                    <p className="animate-reveal text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        {t("hero.subline")}
                    </p>

                    <div className="animate-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://cal.eu/stefano-ala/pmz7mfb7wvc-ayw.XFW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-5 bg-white text-black rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            {t("hero.primaryCTA")}
                        </a>
                        <LocaleLink
                            href="/project-models"
                            className="px-10 py-5 border border-white/20 text-white rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5"
                        >
                            {t("hero.secondaryCTA")}
                        </LocaleLink>
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 2 — STRATEGIC POSITIONING */}
            <section className="py-32 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="animate-reveal">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                            {t("positioning.headline")}
                        </h2>
                    </div>
                    <div className="animate-reveal">
                        <p className="text-gray-400 text-xl md:text-2xl leading-relaxed font-light">
                            {t("positioning.text")}
                        </p>
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 3 — STRUCTURAL ADVANTAGES */}
            <section className="py-32 px-6 bg-white/5 backdrop-blur-sm border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="animate-reveal text-sm font-mono text-cyan-400 uppercase tracking-[0.3em] mb-16 block">
                        {t("advantages.headline")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {t.raw("advantages.points").map((point: string, i: number) => (
                            <div key={i} className="animate-reveal group">
                                <div className="h-16 flex items-end mb-6">
                                    <div className="w-px h-12 bg-white/20 transition-all duration-500 group-hover:h-16 group-hover:bg-cyan-500" />
                                </div>
                                <p className="text-xl font-display font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 4 — HOW IT WORKS */}
            <section className="py-40 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="animate-reveal text-4xl md:text-5xl font-display font-bold mb-24 tracking-tight">
                        {t("process.headline")}
                    </h2>

                    <div className="animate-reveal flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/10 z-0" />

                        {t.raw("process.steps").map((step: string, i: number) => (
                            <div key={i} className="relative z-10 flex-1 flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-8 bg-white/5 backdrop-blur-sm">
                                    <span className="text-2xl font-display font-bold text-cyan-400">0{i + 1}</span>
                                </div>
                                <p className="text-lg font-bold text-white max-w-[200px] leading-snug">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 5 — FINAL CTA */}
            <section className="py-48 px-6 bg-white text-black">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="animate-reveal text-5xl md:text-7xl font-display font-bold mb-12 tracking-tight">
                        {t("finalCTA.headline")}
                    </h2>

                    <div className="animate-reveal flex flex-col items-center gap-6">
                        <a
                            href="https://cal.eu/stefano-ala/pmz7mfb7wvc-ayw.XFW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-12 py-6 bg-black text-white rounded-full font-display font-bold text-base uppercase tracking-wider transition-all duration-500 hover:scale-[1.05] flex items-center gap-3"
                        >
                            <Calendar className="w-5 h-5" />
                            {t("finalCTA.button")}
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </a>

                        <LocaleLink
                            href="/project-models"
                            className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            {tc("compareAll")}
                        </LocaleLink>
                    </div>
                </div>
            </section>
        </main>
    );
}
