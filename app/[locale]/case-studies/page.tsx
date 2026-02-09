"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "@/lib/gsap";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { caseStudies } from "@/data/caseStudiesData";
import { useParams } from "next/navigation";
import { getCaseStudiesTranslations } from "@/lib/caseStudiesTranslations";
import { clsx } from "clsx";

export default function CaseStudiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = getCaseStudiesTranslations(locale);

  // Filter State
  const [viewMode, setViewMode] = useState<"featured" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // UI State
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  // Merge static data with translations
  const localizedStudies = useMemo(() => {
    return caseStudies.map(study => {
      const key = study.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const trans = (t.studies as any)[key];
      return {
        ...study,
        title: trans?.title || study.title,
        category: trans?.category || study.category,
        tagline: trans?.tagline || study.tagline,
        client: trans?.client || study.client,
        overview: trans?.overview || study.overview,
        services: trans?.services || study.services,
      };
    });
  }, [t.studies]);

  // Derived Data for Filters
  const uniqueCategories = useMemo(() => {
    const categories = localizedStudies.map(s => s.category);
    // Split combined categories like "E-Commerce / Branding"
    const splitCategories = categories.flatMap(c => c.split(" / ").map(item => item.trim()));
    return Array.from(new Set(splitCategories));
  }, [localizedStudies]);

  const uniqueServices = useMemo(() => {
    const services = localizedStudies.flatMap(s => s.services);
    return Array.from(new Set(services));
  }, [localizedStudies]);

  // Filtering Logic
  const filteredStudies = useMemo(() => {
    return localizedStudies.filter((study) => {
      // 1. Featured Check
      if (viewMode === "featured" && !study.featured) return false;

      // 2. Search Check
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = study.title.toLowerCase().includes(q);
        const matchesTagline = study.tagline.toLowerCase().includes(q);
        const matchesOverview = study.overview.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTagline && !matchesOverview) return false;
      }

      // 3. Category Check
      if (selectedCategory && !study.category.includes(selectedCategory)) {
        return false;
      }

      // 4. Service Check
      if (selectedService && !study.services.includes(selectedService)) {
        return false;
      }

      return true;
    });
  }, [localizedStudies, viewMode, searchQuery, selectedCategory, selectedService]);

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
        }, "-=0.6");

      // Animate grid items
      gsap.fromTo(".grid-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: true }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [filteredStudies]); // Re-run when filtered results change

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedService(null);
    setViewMode("all");
  };

  return (
    <main ref={containerRef} className="w-full bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] md:min-h-[70vh] flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-12 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00b4d9]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00b4d9]/30 to-transparent"></div>

        {/* Subtle Accent */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#00b4d9]/5 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-[1370px] w-full mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            {/* Small Label */}
            <div className="hero-title opacity-0 translate-y-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#00b4d9] animate-pulse"></span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">{t.page.badge}</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title opacity-0 translate-y-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] md:leading-[0.95] tracking-tight max-w-5xl px-4">
              {t.page.title}
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle opacity-0 translate-y-8 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl px-4">
              {t.page.subtitle}
            </p>

            {/* Stats */}
            <div className="hero-subtitle opacity-0 translate-y-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="text-[#00b4d9] font-mono text-xs md:text-sm font-bold">
                  {caseStudies.length}
                </span>
                <span className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  {t.page.projectsLabel}
                </span>
              </div>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="text-gray-400 font-mono text-xs md:text-sm">{t.page.yearRange}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section (Filters) */}
      <section className="w-full sticky top-20 z-50 bg-black/80 backdrop-blur-md border-y border-white/5 py-6 px-4 md:px-12">
        <div className="max-w-[1370px] mx-auto flex flex-wrap items-center gap-4 justify-center">
          {/* Featured Toggle */}
          <button
            onClick={() => setViewMode(viewMode === "featured" ? "all" : "featured")}
            className={clsx(
              "flex items-center gap-2 px-6 py-3 rounded-full text-base font-bold transition-all duration-300 border",
              viewMode === "featured"
                ? "bg-[#00b6d9] text-white border-[#00b6d9] shadow-lg shadow-cyan-500/20"
                : "bg-zinc-800/50 text-gray-400 border-white/5 hover:text-[#00b6d9] hover:border-[#00b6d9]/30"
            )}
          >
            <span className="text-lg">★</span> {t.page.featured}
          </button>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCategoryDropdownOpen(!categoryDropdownOpen);
                setServiceDropdownOpen(false);
              }}
              className={clsx(
                "flex items-center justify-between min-w-[160px] gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 border",
                categoryDropdownOpen || selectedCategory
                  ? "bg-[#00b6d9] text-white border-[#00b6d9] shadow-lg shadow-cyan-500/20"
                  : "bg-zinc-800/50 text-gray-400 border-white/5 hover:text-[#00b6d9] hover:border-[#00b6d9]/30"
              )}
            >
              <span>{selectedCategory || t.page.category}</span>
              <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", categoryDropdownOpen ? "rotate-180" : "")} />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCategoryDropdownOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-sm text-gray-400 hover:text-[#00b6d9] hover:bg-white/5 transition-colors"
                >
                  {t.page.allCategories}
                </button>
                {uniqueCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCategoryDropdownOpen(false);
                    }}
                    className={clsx(
                      "w-full text-left px-5 py-3 text-sm transition-colors",
                      selectedCategory === cat ? "text-[#00B5D9] bg-white/5" : "text-white hover:text-[#00b6d9] hover:bg-white/5"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Service Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setServiceDropdownOpen(!serviceDropdownOpen);
                setCategoryDropdownOpen(false);
              }}
              className={clsx(
                "flex items-center justify-between min-w-[160px] gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 border",
                serviceDropdownOpen || selectedService
                  ? "bg-[#00b6d9] text-white border-[#00b6d9] shadow-lg shadow-cyan-500/20"
                  : "bg-zinc-800/50 text-gray-400 border-white/5 hover:text-[#00b6d9] hover:border-[#00b6d9]/30"
              )}
            >
              <span>{selectedService || t.page.service}</span>
              <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", serviceDropdownOpen ? "rotate-180" : "")} />
            </button>

            {serviceDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setServiceDropdownOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-sm text-gray-400 hover:text-[#00b6d9] hover:bg-white/5 transition-colors"
                >
                  {t.page.allServices}
                </button>
                {uniqueServices.map(service => (
                  <button
                    key={service}
                    onClick={() => {
                      setSelectedService(service);
                      setServiceDropdownOpen(false);
                    }}
                    className={clsx(
                      "w-full text-left px-5 py-3 text-sm transition-colors",
                      selectedService === service ? "text-[#00B5D9] bg-white/5" : "text-white hover:text-[#00b6d9] hover:bg-white/5"
                    )}
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Action */}
          {(selectedCategory || selectedService || viewMode === "featured" || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-[#00b6d9] transition-colors"
            >
              {t.page.reset}
            </button>
          )}
        </div>
      </section>

      {/* Grid Section */}
      <section className="w-full py-12 md:py-20 px-4 md:px-12 min-h-[40vh]">
        <div className="max-w-[1370px] mx-auto">
          {filteredStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredStudies.map((study, index) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.slug}`}
                  className="grid-item group relative block"
                >
                  {/* Animated Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00B5D9]/0 to-[#00B5D9]/0 rounded-2xl opacity-0 group-hover:from-[#00B5D9]/10 group-hover:to-[#00B5D9]/5 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                  {/* Card Container */}
                  <div className="relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ease-out group-hover:border-[#00B5D9]/70 group-hover:shadow-2xl group-hover:shadow-[#00B5D9]/30 group-hover:-translate-y-2 group-hover:scale-[1.02]">

                    {/* Shine Effect Overlay */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden z-20 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B5D9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <Image
                        src={study.heroImage}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#00B5D9]/90 backdrop-blur-sm rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00B5D9]">
                        <span className="text-xs font-mono uppercase tracking-wider text-white">
                          {study.category}
                        </span>
                      </div>

                      {/* Color Accent */}
                      <div
                        className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-40 blur-2xl group-hover:opacity-60 transition-opacity duration-500"
                        style={{ backgroundColor: study.color }}
                      ></div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 md:p-8">
                      {/* Year */}
                      <div className="flex items-center gap-2 mb-3 transition-colors duration-300 group-hover:text-[#00B5D9]/70">
                        <span className="text-xs font-mono text-gray-500 group-hover:text-[#00B5D9]/70 transition-colors duration-300">{study.year}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{study.client}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 transition-all duration-300 group-hover:text-[#00B5D9] group-hover:translate-x-1">
                        {study.title}
                      </h2>

                      {/* Tagline */}
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-6 transition-colors duration-300 group-hover:text-gray-300">
                        {study.tagline}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-[#00B5D9] font-medium text-sm transition-all duration-300 group-hover:translate-x-2">
                        <span>{t.page.viewCaseStudy}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>

                    {/* Enhanced Hover Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00B5D9]/10 to-transparent"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-in fade-in duration-500">
              <h3 className="text-2xl font-bold text-gray-500 mb-2">{t.page.noResults}</h3>
              <p className="text-gray-600 mb-8">{t.page.noResultsDesc}</p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white transition-all"
              >
                {t.page.clearFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#00b4d9]/5 to-black"></div>

        <div className="max-w-[1370px] mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <span className="text-[#00b4d9] font-mono text-xs md:text-sm uppercase tracking-widest">
              {t.page.ctaBadge}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold max-w-4xl leading-tight px-4">
              {t.page.ctaTitle}
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed px-4">
              {t.page.ctaSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 w-full sm:w-auto px-4">
              <a
                href={`/${locale}/contact`}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-[#00b4d9] text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-[#00b4d9]/50 text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t.page.startYourProject}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              </a>

              <Link
                href={`/${locale}/case-studies`}
                className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white rounded-full font-medium hover:border-[#00b4d9] hover:bg-[#00b4d9]/10 transition-all text-sm md:text-base"
              >
                {t.page.viewMoreWork}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
