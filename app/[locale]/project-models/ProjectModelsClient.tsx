"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "@/lib/gsap";
import LocaleLink from "@/components/LocaleLink";
import Cal, { getCalApi } from "@calcom/embed-react";
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

export default function ProjectModelsClient({ initialData, financingModels = [] }: { initialData?: any, financingModels?: any[] }) {
    const t = useTranslations("projectModels");
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeModel, setActiveModel] = useState<string | null>(null);

    // Dynamic Data Fallbacks
    const heroH1 = initialData?.heroH1 || "";
    const heroSubline = initialData?.heroSubline || "";
    const heroCtaPrimary = initialData?.heroCtaPrimary || "";
    const heroCtaSecondary = initialData?.heroCtaSecondary || "";
    
    // Growth Section
    const growthHeadline = initialData?.growthHeadline || "";
    const growthIntro = initialData?.growthIntro || "";
    const growthSeoTitle = initialData?.growthSeoTitle || "";
    const growthSeoDesc = initialData?.growthSeoDesc || "";
    const growthPerfTitle = initialData?.growthPerfTitle || "";
    const growthPerfDesc = initialData?.growthPerfDesc || "";
    const growthMaintTitle = initialData?.growthMaintTitle || "";
    const growthMaintDesc = initialData?.growthMaintDesc || "";
    const growthDevTitle = initialData?.growthDevTitle || "";
    const growthDevDesc = initialData?.growthDevDesc || "";
    const growthNote = initialData?.growthNote || "";

    const scrollToId = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 100,
                behavior: "smooth",
            });
        }
    };

    // Cal.com: initialise the namespace UI
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

    // Cal.com: open modal popup
    const handleBooking = async () => {
        const cal = await getCalApi({
            namespace: "15min",
            embedJsUrl: "https://www.cal.eu/embed/embed.js",
        });
        cal("modal", {
            calLink: "atriona.digital/15min",
            config: { layout: "month_view" },
        });
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
                        {heroH1}
                    </h1>
                    <p className="animate-hero-text text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
                        {heroSubline}
                    </p>

                    <div className="animate-hero-pills flex flex-wrap justify-center gap-3 mb-12">
                        {financingModels.map((model: any) => (
                            <button
                                key={model.slug}
                                onClick={() => scrollToId(model.slug)}
                                onMouseEnter={() => setActiveModel(model.slug)}
                                onMouseLeave={() => setActiveModel(null)}
                                className="group relative px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/10"
                            >
                                <span className="relative z-10 text-sm md:text-base font-medium transition-colors duration-300 group-hover:text-cyan-400">
                                    {model.title}
                                </span>
                                <AnimatePresence>
                                    {activeModel === model.slug && (
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
                        <button
                            onClick={handleBooking}
                            className="px-10 py-5 bg-white text-black rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            {heroCtaPrimary}
                        </button>
                        <button
                            onClick={() => {
                                if (financingModels.length > 0) {
                                    scrollToId(financingModels[0].slug);
                                }
                            }}
                            className="px-10 py-5 border border-white/20 text-white rounded-full font-display font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 flex items-center gap-2"
                        >
                            {heroCtaSecondary}
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
                        {financingModels.length > 0 ? (
                            financingModels.map((model: any, idx: number) => {
                                const isHighlighted = model.isHighlighted;
                                return (
                                    <div key={model.slug || idx} className={`reveal-section flex flex-col p-10 rounded-3xl transition-all duration-500 relative group overflow-hidden ${
                                        isHighlighted 
                                            ? "border border-cyan-100 bg-cyan-50/30 hover:border-cyan-200" 
                                            : "border border-gray-100 bg-gray-50/50 hover:border-gray-200"
                                    }`}>
                                        {isHighlighted && (
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                                        )}
                                        <h3 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                            {model.title}
                                            {isHighlighted && <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />}
                                        </h3>
                                        <ul className="space-y-4 mb-10 flex-grow">
                                            {(model.cardBullets || []).map((bullet: string, i: number) => (
                                                <li key={i} className="flex gap-3 text-gray-700 leading-relaxed">
                                                    <Check className={`w-5 h-5 shrink-0 ${isHighlighted ? "text-cyan-600" : "text-black"}`} />
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className={`pt-8 border-t ${isHighlighted ? "border-cyan-100" : "border-gray-100"}`}>
                                            <p className="text-sm text-gray-400 mb-6 italic">{model.cardNote}</p>
                                            <LocaleLink href={`/${model.slug}`} className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 group/btn ${
                                                isHighlighted 
                                                    ? "bg-cyan-600 text-white hover:bg-cyan-700 hover:scale-[1.02]" 
                                                    : "bg-black text-white hover:scale-[1.02] hover:bg-black/90"
                                            }`}>
                                                {model.cardButtonText}
                                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                            </LocaleLink>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                No models configured yet.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 🧱 SECTION 3 — CONTINUOUS OPTIMIZATION & GROWTH */}
            <section className="bg-stone-900 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal-section mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">{growthHeadline}</h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                            {growthIntro}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:grid-cols-4 lg:gap-8">
                        {[
                            { id: "seo", icon: Search, title: growthSeoTitle, desc: growthSeoDesc },
                            { id: "marketing", icon: Zap, title: growthPerfTitle, desc: growthPerfDesc },
                            { id: "maintenance", icon: Settings, title: growthMaintTitle, desc: growthMaintDesc },
                            { id: "strategy", icon: LineChart, title: growthDevTitle, desc: growthDevDesc },
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
                        <p className="text-sm text-gray-500 italic">{growthNote}</p>
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
                        <button
                            onClick={handleBooking}
                            className="px-12 py-6 bg-white text-black rounded-full font-display font-bold text-base uppercase tracking-wider transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] flex items-center gap-3 mb-12 sm:mb-16"
                        >
                            <Calendar className="w-5 h-5" />
                            {t("finalCta.button")}
                        </button>

                        {/* Cal.com Inline Embed */}
                        <div className="w-full max-w-5xl h-[550px] overflow-hidden rounded-3xl border border-white/10">
                            <Cal
                                namespace="15min"
                                calLink="atriona.digital/15min"
                                calOrigin="https://www.cal.eu"
                                style={{ width: "100%", height: "100%" }}
                                config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
