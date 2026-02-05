"use client";

import { use, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { getCaseStudyBySlug, getAdjacentCaseStudies } from "@/data/caseStudiesData";
import { notFound } from "next/navigation";

export default function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const containerRef = useRef<HTMLDivElement>(null);
    const study = getCaseStudyBySlug(slug);
    const { previous, next } = getAdjacentCaseStudies(slug);

    // If case study not found, show 404
    if (!study) {
        notFound();
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animation
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.to(".hero-title", {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2
            })
                .to(".hero-subtitle", {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                }, "-=0.6")
                .to(".hero-image", {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                }, "-=0.8");

            // Animate sections on scroll
            const sections = document.querySelectorAll(".animate-section");
            sections.forEach((element) => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        end: "top 20%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="w-full bg-black text-white min-h-screen">
            {/* Back Button */}
            <div className="fixed top-24 left-4 md:left-12 z-50">
                <Link
                    href="/case-studies"
                    className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-[#00b4d9] hover:bg-[#00b4d9]/10 transition-all"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Back</span>
                </Link>
            </div>

            {/* Hero Section */}
            <section className="w-full min-h-screen flex items-center justify-center pt-32 pb-20 px-4 md:px-12 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

                <div className="max-w-[1370px] w-full mx-auto relative z-10 mt-10">
                    <div className="flex flex-col gap-8 md:gap-12">
                        {/* Header */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            {/* Category & Year */}
                            <div className="hero-title opacity-0 translate-y-8 flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                                <span className="text-[#00b4d9] font-mono uppercase tracking-widest">{study.category}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-500 font-mono">{study.year}</span>
                                <span className="text-gray-600 hidden sm:inline">•</span>
                                <span className="text-gray-400 text-xs md:text-sm w-full sm:w-auto">Client: <span className="text-white">{study.client}</span></span>
                            </div>

                            {/* Title */}
                            <h1 className="hero-title opacity-0 translate-y-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight max-w-4xl">
                                {study.title}
                            </h1>

                            {/* Tagline */}
                            <p className="hero-subtitle opacity-0 translate-y-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-light leading-relaxed max-w-3xl">
                                {study.tagline}
                            </p>
                        </div>

                        {/* Hero Image */}
                        <div className="hero-image opacity-0 scale-95 relative w-full aspect-[16/9] rounded-2xl overflow-hidden group">
                            <Image
                                src={study.heroImage}
                                alt={study.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                            {/* Color Accent */}
                            <div
                                className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-60 blur-3xl"
                                style={{ backgroundColor: study.color }}
                            ></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="animate-section w-full py-12 md:py-20 px-4 md:px-12">
                <div className="max-w-[1370px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        <div className="lg:col-span-2">
                            <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#00b4d9] mb-4">Overview</h3>
                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                                {study.overview}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-3">Services</h3>
                                <div className="flex flex-wrap gap-2">
                                    {study.services.map((service, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-gray-300"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="animate-section w-full py-12 md:py-20 px-4 md:px-12">
                <div className="max-w-[1370px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10">
                            <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#00b4d9] mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#00b4d9]"></div>
                                The Challenge
                            </h3>
                            <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                                {study.challenge}
                            </p>
                        </div>

                        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10">
                            <h3 className="text-xs md:text-sm uppercase tracking-widest text-green-400 mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                Our Solution
                            </h3>
                            <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                                {study.solution}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detail Images */}
            <section className="animate-section w-full py-12 md:py-20 px-4 md:px-12">
                <div className="max-w-[1370px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                            <Image
                                src={study.detailImage1}
                                alt={`${study.title} detail 1`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                            <Image
                                src={study.detailImage2}
                                alt={`${study.title} detail 2`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="animate-section w-full py-12 md:py-20 px-4 md:px-12">
                <div className="max-w-[1370px] mx-auto">
                    <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#00b4d9] mb-8">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.keyFeatures.map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-white/20 transition-all"
                            >
                                <CheckCircle2 className="w-5 h-5 text-[#00b4d9] flex-shrink-0 mt-0.5" />
                                <span className="text-sm md:text-base text-gray-300">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="animate-section w-full py-12 md:py-20 px-4 md:px-12">
                <div className="max-w-[1370px] mx-auto">
                    <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-2xl p-8 md:p-14">
                        <h3 className="text-xs md:text-sm uppercase tracking-widest text-[#00b4d9] mb-10">Results & Impact</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {study.results.map((result, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <span
                                        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold"
                                        style={{ color: study.color }}
                                    >
                                        {result.metric}
                                    </span>
                                    <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                                        {result.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="animate-section w-full py-12 md:py-20 px-4 md:px-12">
                <div className="max-w-[1370px] mx-auto">
                    <div className="relative bg-white/[0.02] border-l-4 rounded-xl p-8 md:p-12" style={{ borderLeftColor: study.color }}>
                        <div className="flex flex-col gap-6">
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light italic">
                                "{study.testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold" style={{ backgroundColor: study.color }}>
                                    {study.testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{study.testimonial.author}</p>
                                    <p className="text-sm text-gray-400">{study.testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation to Next/Previous */}
            <section className="w-full py-12 md:py-20 px-4 md:px-12 border-t border-white/10">
                <div className="max-w-[1370px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Previous Case Study */}
                        {previous && (
                            <Link
                                href={`/case-studies/${previous.slug}`}
                                className="group relative bg-white/[0.02] border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#00b4d9]/50 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <ArrowLeft className="w-5 h-5 text-[#00b4d9] group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-xs uppercase tracking-wider text-gray-500">Previous Project</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-[#00b4d9] transition-colors">
                                    {previous.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-2">{previous.category}</p>
                            </Link>
                        )}

                        {/* Next Case Study */}
                        {next && (
                            <Link
                                href={`/case-studies/${next.slug}`}
                                className="group relative bg-white/[0.02] border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#00b4d9]/50 transition-all md:text-right"
                            >
                                <div className="flex items-center justify-end gap-3 mb-4">
                                    <span className="text-xs uppercase tracking-wider text-gray-500">Next Project</span>
                                    <ArrowRight className="w-5 h-5 text-[#00b4d9] group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-[#00b4d9] transition-colors">
                                    {next.title}
                                </h3>
                                <p className="text-sm text-gray-400 mt-2">{next.category}</p>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full py-20 md:py-32 px-4 md:px-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-orange/5 to-black"></div>

                <div className="max-w-[1370px] mx-auto relative z-10 text-center">
                    <div className="flex flex-col items-center gap-8">
                        <span className="text-[#00b4d9] font-mono text-sm uppercase tracking-widest">
                            Ready to Transform?
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold max-w-4xl leading-tight">
                            Let's Create Your Success Story
                        </h2>

                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Every great project starts with a conversation. Share your vision, and we'll turn it into reality.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Link
                                href="/contact"
                                className="group relative px-8 py-4 bg-[#00b4d9] text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-[#00b4d9]/50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Start Your Project
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                            </Link>

                            <Link
                                href="/case-studies"
                                className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:border-[#00b4d9] hover:bg-[#00b4d9]/10 transition-all"
                            >
                                View All Case Studies
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
