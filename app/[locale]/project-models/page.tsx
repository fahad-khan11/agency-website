"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "@/lib/gsap";
import LocaleLink from "@/components/LocaleLink";
import {
    ArrowUpRight,
    ChevronDown,
    Search,
    Zap,
    Settings,
    LineChart,
    Calendar,
    Check
} from "lucide-react";

export default function ProjectModelsPage() {
    const t = useTranslations("projectModels");
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeModel, setActiveModel] = useState<string | null>(null);

    // References for scrolling
    const purchaseRef = useRef<HTMLDivElement>(null);
    const rentalRef = useRef<HTMLDivElement>(null);
    const participationRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 100,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            gsap.from(".animate-hero-text", {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
            });

            gsap.from(".animate-hero-pills", {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                delay: 0.6,
                ease: "back.out(1.7)",
            });

            // Background mesh floating animation
            gsap.to(".floating-mesh", {
                x: "random(-20, 20)",
                y: "random(-20, 20)",
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 2
            });

            // Reveal animations for sections
            const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
            sections.forEach((section) => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-black text-white overflow-hidden">
            {/* 🧱 SECTION 1 — HERO */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="floating-mesh absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
                    <div className="floating-mesh absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h1 className="animate-hero-text text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.1]">
                        {t("hero.h1")}
                    </h1>
                    <p className="animate-hero-text text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
                        {t("hero.subline")}
                    </p>

                    <div className="animate-hero-pills flex flex-wrap justify-center gap-3 mb-12">
                        {[
                            { id: "purchase", label: t("hero.pills.purchase"), ref: purchaseRef },
                            { id: "rental", label: t("hero.pills.rental"), ref: rentalRef },
                            { id: "participation", label: t("hero.pills.participation"), ref: participationRef },
                        ].map((pill) => (
                            <button
                                key={pill.id}
                                onClick={() => scrollToSection(pill.ref)}
                                onMouseEnter={() => setActiveModel(pill.id)}
                                onMouseLeave={() => setActiveModel(null)}
                                className="group relative px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10"
                            >
                                <span className="relative z-10 text-sm md:text-base font-medium transition-colors duration-300 group-hover:text-cyan-400">
                                    {pill.label}
                                </span>
                                <AnimatePresence>
                                    {activeModel === pill.id && (
                                        <motion.div
                                            layoutId="pill-glow"
                                            className="absolute inset-0 rounded-full bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </button>
                        ))}
                    </div>

                    <div className="animate-hero-text flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="/contact"
                            className="px-10 py-5 bg-white text-black rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            {t("hero.ctas.primary")}
                        </a>
                        <button
                            onClick={() => scrollToSection(purchaseRef)}
                            className="px-10 py-5 border border-white/20 text-white rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 flex items-center gap-2"
                        >
                            {t("hero.ctas.secondary")}
                        </button>
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 2 — PROJECT FINANCING MODELS */}
            <section className="bg-white text-black py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal-section text-center mb-24">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
                            {t("financing.headline")}
                        </h2>
                        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {t("financing.subtext")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Purchase Model */}
                        <div ref={purchaseRef} className="reveal-section flex flex-col p-10 rounded-3xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 transition-all duration-500 group">
                            <h3 className="text-3xl font-display font-bold mb-8">{t("financing.models.purchase.title")}</h3>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {t.raw("financing.models.purchase.bullets").map((bullet: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                                        <Check className="w-5 h-5 text-black shrink-0" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-400 mb-6 italic">{t("financing.models.purchase.note")}</p>
                                <LocaleLink href="/purchase-model" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 group/btn">
                                    {t("financing.models.purchase.button")}
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </LocaleLink>
                            </div>
                        </div>

                        {/* Rental Model */}
                        <div ref={rentalRef} className="reveal-section flex flex-col p-10 rounded-3xl border border-gray-100 bg-gray-50/50 hover:border-gray-200 transition-all duration-500">
                            <h3 className="text-3xl font-display font-bold mb-8">{t("financing.models.rental.title")}</h3>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {t.raw("financing.models.rental.bullets").map((bullet: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                                        <Check className="w-5 h-5 text-black shrink-0" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-gray-100">
                                <p className="text-sm text-gray-400 mb-6 italic">{t("financing.models.rental.note")}</p>
                                <LocaleLink href="/rental-model" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] hover:bg-black/90 group/btn">
                                    {t("financing.models.rental.button")}
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </LocaleLink>
                            </div>
                        </div>

                        {/* Participation Model */}
                        <div ref={participationRef} className="reveal-section flex flex-col p-10 rounded-3xl border border-cyan-100 bg-cyan-50/30 hover:border-cyan-200 transition-all duration-500 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                            <h3 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                {t("financing.models.participation.title")}
                                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                            </h3>
                            <ul className="space-y-4 mb-10 flex-grow">
                                {t.raw("financing.models.participation.bullets").map((bullet: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                                        <Check className="w-5 h-5 text-cyan-600 shrink-0" />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-8 border-t border-cyan-100">
                                <p className="text-sm text-gray-400 mb-6 italic">{t("financing.models.participation.note")}</p>
                                <LocaleLink href="/strategic-participation" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-cyan-700 hover:scale-[1.02] group/btn">
                                    {t("financing.models.participation.button")}
                                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                </LocaleLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 3 — CONTINUOUS OPTIMIZATION & GROWTH */}
            <section className="bg-stone-900 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal-section mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">{t("growth.headline")}</h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                            {t("growth.intro")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:grid-cols-4 lg:gap-8">
                        {[
                            { id: "seo", icon: Search, title: t("growth.modules.seo.title"), desc: t("growth.modules.seo.desc") },
                            { id: "marketing", icon: Zap, title: t("growth.modules.marketing.title"), desc: t("growth.modules.marketing.desc") },
                            { id: "maintenance", icon: Settings, title: t("growth.modules.maintenance.title"), desc: t("growth.modules.maintenance.desc") },
                            { id: "strategy", icon: LineChart, title: t("growth.modules.strategy.title"), desc: t("growth.modules.strategy.desc") },
                        ].map((module) => (
                            <div key={module.id} className="reveal-section group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30">
                                    <module.icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h4 className="text-xl font-display font-bold mb-4">{module.title}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">{module.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal-section mt-20 pt-10 border-t border-white/5">
                        <p className="text-sm text-gray-500 italic">{t("growth.note")}</p>
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 4 — STRUCTURAL LOGIC */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="reveal-section text-4xl md:text-5xl font-display font-bold mb-20 tracking-tight">
                        {t("logic.headline")}
                    </h2>

                    <div className="reveal-section flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
                        <div className="flex-1 max-w-sm p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative transition-all duration-500 hover:border-cyan-500/30">
                            <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-4 block">Step 01</span>
                            <p className="text-xl font-display font-bold text-white">{t("logic.step1")}</p>
                        </div>

                        <div className="hidden md:block">
                            <ArrowUpRight className="w-10 h-10 text-gray-700 rotate-45" />
                        </div>
                        <div className="md:hidden">
                            <ChevronDown className="w-10 h-10 text-gray-700" />
                        </div>

                        <div className="flex-1 max-w-sm p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative transition-all duration-500 hover:border-cyan-500/30">
                            <span className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-4 block">Step 02</span>
                            <p className="text-xl font-display font-bold text-white">{t("logic.step2")}</p>
                        </div>
                    </div>

                    <p className="reveal-section text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed italic">
                        {t("logic.text")}
                    </p>
                </div>
            </section>

            {/* 🧱 SECTION 5 — FINAL CTA */}
            <section className="relative py-40 px-6 bg-[#08080a] overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="reveal-section text-4xl md:text-6xl font-display font-bold mb-10 tracking-tight leading-tight">
                        {t("finalCta.headline")}
                    </h2>
                    <p className="reveal-section text-gray-400 text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto">
                        {t("finalCta.text")}
                    </p>

                    <div className="reveal-section flex flex-col items-center w-full">
                        <a
                            href="https://cal.eu/stefano-ala/pmz7mfb7wvc-ayw.XFW"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-12 py-6 bg-white text-black rounded-full font-display font-bold text-base uppercase tracking-wider transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center gap-3 mb-12 sm:mb-16"
                        >
                            <Calendar className="w-5 h-5" />
                            {t("finalCta.button")}
                        </a>

                        {/* Cal.com Inline Embed */}
                        <div className="w-full max-w-5xl h-[700px] md:h-[800px] rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl backdrop-blur-sm">
                            <iframe
                                src="https://cal.eu/stefano-ala/pmz7mfb7wvc-ayw.XFW?theme=dark"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                className="w-full h-full"
                                title="Schedule Strategy Session"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
