"use client";

import { useRef, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Server, Layers, Zap, BarChart3, Users } from "lucide-react";
import { industries } from "@/data/industries";
import { clsx } from "clsx";
import { getIndustryTranslation, getIndustriesTranslations } from '@/lib/industriesTranslations';

gsap.registerPlugin(ScrollTrigger);

export default function IndustryDetailPage(props: { params: Promise<{ industry: string, locale?: string }> }) {
    const params = use(props.params);
    const { industry: slug, locale = 'en' } = params;

    // Convert slug to camelCase key used in JSON (e.g. 'hotels-resorts' -> 'hotelsResorts')
    const industryKey = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

    // Get specific industry data from translations
    const industryData = getIndustryTranslation(locale, industryKey);
    const t = getIndustriesTranslations(locale); // Get general page translations

    const containerRef = useRef(null);

    if (!industryData) {
        notFound();
    }

    useGSAP(() => {
        // Hero Animation
        const tl = gsap.timeline();

        tl.from(".hero-content > *", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        })
            .from(".hero-image", {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scale: 0.95
            }, "-=0.8");

        // Section Headers Animation
        gsap.utils.toArray<HTMLElement>(".section-header").forEach((header) => {
            gsap.from(header, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Modules Animation
        gsap.from(".module-card", {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".modules-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            },
            immediateRender: false
        });

        // Lists Animation
        gsap.from(".animate-list-item", {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".animate-list-container",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            immediateRender: false
        });

    }, { scope: containerRef });

    // Helper to get diverse icons
    const getModuleIcon = (index: number) => {
        const icons = [Server, Layers, Zap, BarChart3, Users];
        const Icon = icons[index % icons.length];
        return <Icon className="w-6 h-6 text-[#00B5D9]" />;
    };

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00B5D9]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 md:px-12">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Content */}
                    <div className="hero-content relative z-10">
                        <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00B5D9]/10 border border-[#00B5D9]/20">
                            <span className="text-[#00B5D9] text-xs font-bold uppercase tracking-wider">
                                {industryData.industryTag}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                            {industryData.title}
                        </h1>

                        <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed">
                            {industryData.summary}
                        </p>
                    </div>

                    {/* Image */}
                    <div className="hero-image relative group">
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00B5D9]/10">
                            <Image
                                src={industryData.heroImage}
                                alt={industryData.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-zinc-900 rounded-xl border border-white/10 -z-10" />
                    </div>
                </div>
            </section>

            {/* 1. The Problem */}
            <section className="py-24 px-6 md:px-12 bg-zinc-900/20">
                <div className="container mx-auto">
                    <div className="section-header mb-16 max-w-3xl">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#00B5D9] mb-4">01. {t.page.theProblem}</h2>
                        <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                            {industryData.intro.painPoints}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-list-container">
                        {industryData.useCases.map((useCase: string, idx: number) => (
                            <div key={idx} className="animate-list-item p-6 bg-zinc-900/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                <div className="w-8 h-1 bg-red-500/50 mb-4 rounded-full" />
                                <p className="text-gray-400 text-sm leading-relaxed">{useCase}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. The Solution */}
            <section className="py-24 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00B5D9]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto">
                    <div className="section-header mb-16 max-w-3xl">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#00B5D9] mb-4">02. {t.page.theSolution}</h2>
                        <h3 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                            {industryData.intro.outcomes}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 animate-list-container">
                            {industryData.benefits.map((benefit: string, idx: number) => (
                                <div key={idx} className="animate-list-item flex items-start gap-4 p-6 bg-[#00B5D9]/5 rounded-2xl border border-[#00B5D9]/10">
                                    <CheckCircle2 className="w-5 h-5 text-[#00B5D9] shrink-0 mt-1" />
                                    <span className="text-lg text-white font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/10 relative">
                            <div className="absolute top-0 right-0 p-4">
                                <Zap className="w-8 h-8 text-[#00B5D9]/20" />
                            </div>
                            <h4 className="text-xl font-bold mb-4">Strategic Impact</h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                We don't just add features; we transform operations. By integrating these solutions, businesses achieve a new baseline of efficiency and customer satisfaction.
                            </p>
                            <Link href="/contact" className="text-[#00B5D9] text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all">
                                Expert Strategy <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Modules */}
            <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto">
                    <div className="section-header text-center mb-16">
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#00B5D9] mb-4">03. {t.page.theModules}</h2>
                        <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">
                            {t.page.solutionsModules} <span className="text-[#00B5D9]">{t.page.modulesHighlight}</span>
                        </h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            {t.page.modulesDesc.replace('{industry}', industryData.title)}
                        </p>
                    </div>

                    <div className="modules-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industryData.modules.map((module: any, idx: number) => (
                            <div key={idx} className="module-card group relative bg-zinc-950/50 backdrop-blur-sm border border-white/5 p-10 rounded-[2rem] hover:border-[#00B5D9]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                                {/* Decorative Background Number */}
                                <div className="absolute -right-4 -top-4 text-9xl font-display font-black text-white/[0.02] select-none group-hover:text-[#00B5D9]/[0.05] transition-colors duration-500">
                                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </div>

                                <div className="flex justify-between items-center mb-8 relative z-10">
                                    <div className="bg-[#00B5D9]/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-[#00B5D9]/20 group-hover:bg-[#00B5D9] group-hover:shadow-[0_0_30px_rgba(0,181,217,0.4)] transition-all duration-500">
                                        <div className="group-hover:text-black transition-colors duration-500 flex items-center justify-center">
                                            {getModuleIcon(idx)}
                                        </div>
                                    </div>
                                    {module.serviceTag && (
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-400 bg-white/5 py-1 px-3 rounded-full border border-white/5 group-hover:border-[#00B5D9]/20 group-hover:text-gray-300 transition-colors">
                                            {module.serviceTag}
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-[#00B5D9] transition-colors duration-300 leading-tight">
                                        {module.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                                        {module.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00B5D9]/0 to-transparent group-hover:via-[#00B5D9]/50 transition-all duration-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Band */}
            <section className="py-24 px-6 md:px-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00B5D9]/10 to-transparent" />
                <div className="container mx-auto bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B5D9]/20 rounded-full blur-[80px] pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl font-black font-display mb-6 relative z-10">
                        {t.page.readyToTransform}
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 relative z-10">
                        {t.page.joinLeaders.replace('{industry}', industryData.title)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-[#00B5D9] text-black font-bold uppercase tracking-wide rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,181,217,0.4)] hover:shadow-[0_0_30px_rgba(0,181,217,0.6)]"
                        >
                            {t.page.bookDemo}
                        </Link>
                        {/* <Link
                            href="/contact"
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wide rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
                        >
                            {t.page.talkToExpert}
                        </Link> */}
                    </div>
                </div>
            </section>

        </main>
    );
}
