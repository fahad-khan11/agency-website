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
            <p className="hero-text text-purple-400 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium">
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
            className="hero-text absolute top-32 left-6 md:left-12 z-30 flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
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
                  <h3 className="text-2xl font-display font-bold mb-6 text-purple-400">What We Offer</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-2xl font-display font-bold mb-6 text-blue-400">Technologies We Use</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-gray-300 text-sm hover:border-blue-500/50 transition-colors"
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
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-gray-300 font-medium">{deliverable}</span>
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
                  <div
                    key={i}
                    className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 mt-2">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Pricing / Packages */}
            <section className="content-section mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Pricing & Packages</h2>
              <p className="text-gray-400 text-lg mb-12 text-center max-w-3xl mx-auto">
                Flexible pricing options designed to fit your needs and budget. All packages include our quality guarantee.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {service.pricing.map((pkg, i) => (
                  <div
                    key={i}
                    className={`relative rounded-2xl p-8 transition-all duration-300 ${
                      pkg.highlighted
                        ? 'bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 scale-105'
                        : 'bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {pkg.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-2xl font-display font-bold mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      {pkg.price !== 'Custom' && <span className="text-gray-500 text-sm ml-2">USD</span>}
                    </div>
                    <p className="text-purple-400 text-sm font-medium mb-2">{pkg.duration}</p>
                    <p className="text-gray-400 mb-6 pb-6 border-b border-gray-800">{pkg.description}</p>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                        pkg.highlighted
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      Get Started
                    </Link>
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
                  <div
                    key={i}
                    className="text-center bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                      {result.metric}
                    </div>
                    <p className="text-gray-400">{result.label}</p>
                  </div>
                ))}
              </div>

              {/* Case Study */}
              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-400 uppercase tracking-wider text-sm font-semibold">Case Study</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">{service.caseStudy.client}</h3>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-2 uppercase text-sm">Challenge</h4>
                    <p className="text-gray-300">{service.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-semibold mb-2 uppercase text-sm">Solution</h4>
                    <p className="text-gray-300">{service.caseStudy.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-semibold mb-2 uppercase text-sm">Results</h4>
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
                className="group flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full transition-all duration-300 text-white font-medium"
              >
                <span>View Service</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Call to Action */}
        <section className="relative py-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-t border-gray-800">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <div className="text-6xl mb-8">{service.icon}</div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Lets discuss how we can help bring your vision to life with our {service.title.toLowerCase()} services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
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
