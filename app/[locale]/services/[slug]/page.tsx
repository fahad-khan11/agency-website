"use client";

import { use, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReactLenis from "lenis/react";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);
  const container = useRef(null);

  if (!service) {
    notFound();
  }

  // Calculate next service for navigation
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const nextService = services[(currentIndex + 1) % services.length];

  // Helper to determine media type
  const getMediaType = (src: string) => {
    if (!src) return 'unknown';
    if (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov')) return 'video';
    return 'image';
  };

  useGSAP(() => {
    // Hero Text Reveal
    gsap.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    });

    // Hero Media Parallax
    gsap.to(".hero-media", {
      yPercent: 30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Content Fade In
    gsap.from(".content-section", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".content-container",
        start: "top 80%",
      }
    });

  }, { scope: container });

  // Component for Media Display
  const MediaDisplay = ({ src, alt, className, priority = false }: { src?: string; alt: string; className?: string; priority?: boolean }) => {
    const [hasError, setHasError] = useState(false);
    const type = getMediaType(src || '');

    if (!src || hasError) {
      return (
        <div className={`flex items-center justify-center bg-gray-900 border border-white/10 ${className}`}>
          <div className="text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Media Unavailable</p>
            <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center mx-auto">
              <span className="text-2xl text-gray-500">?</span>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'video') {
      return (
        <video
          className={className}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  };

  return (
    <>
      <ReactLenis root />
      <div ref={container} className="bg-black text-white min-h-screen">

        {/* Hero Section */}
        <section className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Hero Media Background */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
            <MediaDisplay
              src={service.heroVideo || service.heroImage}
              alt={service.title}
              className="hero-media w-full h-full object-cover"
              priority
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-6 md:px-12 text-center">
            <div className="hero-text text-6xl mb-8 opacity-90">
              {service.icon}
            </div>
            <p className="hero-text text-[#00B5D9] uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium">
              {service.category}
            </p>
            <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tight">
              {service.title}
            </h1>
            <p className="hero-text text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              {service.tagline}
            </p>
          </div>

          {/* Back Button */}
          <Link
            href="/services"
            className="hero-text absolute top-32 left-6 md:left-12 z-30 flex items-center gap-2 text-white hover:text-[#00B5D9] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back to Services</span>
          </Link>
        </section>

        {/* Main Content */}
        <div className="content-container relative bg-black py-24">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">

            {/* 1. Service Overview */}
            <section className="content-section mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Service Overview</h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
                {service.overview}
              </p>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {/* Features */}
                <div>
                  <h3 className="text-2xl font-display font-bold mb-6 text-[#00b4d9]">What We Offer</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#00b4d9] flex-shrink-0 mt-1" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-2xl font-display font-bold mb-6 text-[#00b4d9]">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-[#00B5D9]/10 border border-[#00B5D9]/30 rounded-full text-[#00B5D9] text-sm hover:border-[#00B5D9]/50 hover:bg-[#00B5D9]/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Deliverables / What You Get */}
            <section className="content-section mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">What You'll Get</h2>
              <p className="text-gray-400 text-lg mb-12">
                Every project is delivered with comprehensive documentation and assets to ensure your success.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.deliverables.map((deliverable, i) => (
                  <div key={i} className="group relative">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B5D9]/0 to-[#00B5D9]/0 rounded-xl opacity-0 group-hover:from-[#00B5D9]/10 group-hover:to-[#00B5D9]/5 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                    <div className="relative bg-gradient-to-br from-gray-900/50 to-black border border-gray-900 rounded-xl p-6 transition-all duration-500 ease-out group-hover:border-[#00B5D9]/70 group-hover:shadow-2xl group-hover:shadow-[#00B5D9]/20 group-hover:-translate-y-1 group-hover:scale-[1.02]">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B5D9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </div>

                      <div className="relative flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00B5D9]/20 border border-[#00B5D9]/50 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00B5D9]/30 group-hover:border-[#00B5D9]/70">
                          <Check className="w-5 h-5 text-[#00B5D9] transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <span className="text-gray-300 font-medium transition-colors duration-300 group-hover:text-white">{deliverable}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Process / How We Work */}
            <section className="content-section mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">How We Work</h2>
              <p className="text-gray-400 text-lg mb-12">
                Our proven process ensures transparency, quality, and results at every stage.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {service.process.map((step, i) => (
                  <div key={i} className="group relative">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B5D9]/0 to-[#00B5D9]/0 rounded-xl opacity-0 group-hover:from-[#00B5D9]/10 group-hover:to-[#00B5D9]/5 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 transition-all duration-500 ease-out group-hover:border-[#00B5D9]/70 group-hover:shadow-2xl group-hover:shadow-[#00B5D9]/30 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B5D9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </div>

                      {/* Step Number */}
                      <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#00B5D9] to-[#0099BB] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[#00B5D9]/50">
                        {step.step}
                      </div>
                      <h3 className="relative text-2xl font-display font-bold mb-4 mt-2 transition-all duration-300 group-hover:text-[#00B5D9] group-hover:translate-x-1">{step.title}</h3>
                      <p className="relative text-gray-400 leading-relaxed transition-colors duration-300 group-hover:text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>



            {/* 5. Results / Case Studies / Proof */}
            <section className="content-section mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Proven Results</h2>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {service.results.map((result, i) => (
                  <div key={i} className="group relative">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00B5D9]/0 to-[#00B5D9]/0 rounded-xl opacity-0 group-hover:from-[#00B5D9]/10 group-hover:to-[#00B5D9]/5 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                    <div className="relative text-center bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 transition-all duration-500 ease-out group-hover:border-[#00B5D9]/70 group-hover:shadow-2xl group-hover:shadow-[#00B5D9]/30 group-hover:-translate-y-2 group-hover:scale-[1.05]">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B5D9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                      </div>

                      <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00B5D9] to-[#0099BB] bg-clip-text text-transparent mb-4 transition-transform duration-300 group-hover:scale-110">
                        {result.metric}
                      </div>
                      <p className="relative text-gray-400 transition-colors duration-300 group-hover:text-gray-300">{result.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Case Study */}
              <div className="bg-gradient-to-br from-[#00B5D9]/20 to-[#00B5D9]/5 border border-[#00B5D9]/30 rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-[#00B5D9] rounded-full"></div>
                  <span className="text-[#00B5D9] uppercase tracking-wider text-sm font-semibold">Case Study</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">{service.caseStudy.client}</h3>

                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-[#00B5D9] font-semibold mb-2 uppercase text-sm">Challenge</h4>
                    <p className="text-gray-300">{service.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[#00B5D9] font-semibold mb-2 uppercase text-sm">Solution</h4>
                    <p className="text-gray-300">{service.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-[#00B5D9] font-semibold mb-2 uppercase text-sm">Results</h4>
                    <p className="text-gray-300">{service.caseStudy.results}</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Next Service CTA */}
        <section className="relative py-24 border-t border-gray-800">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-gray-500 uppercase tracking-wider text-sm mb-2">Next Service</p>
                <h3 className="text-4xl md:text-5xl font-display font-bold">{nextService.title}</h3>
              </div>
              <Link
                href={`/services/${nextService.slug}`}
                className="group flex items-center gap-3 px-8 py-4 bg-[#00B5D9] hover:bg-[#00B5D9]/80 rounded-full transition-all duration-300 text-white font-medium"
              >
                <span>View Service</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Call to Action */}
        <section className="relative py-32 bg-gradient-to-br from-[#00B5D9]/20 to-[#00B5D9]/5 border-t border-gray-800">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <div className="text-6xl mb-8">{service.icon}</div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our {service.title.toLowerCase()} services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-[#00B5D9] to-[#0099BB] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-[#00B5D9]/50 transition-all duration-300 hover:scale-105"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
