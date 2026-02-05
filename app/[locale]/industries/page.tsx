"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { industries } from "@/data/industries";
import { clsx } from "clsx";
import { useParams } from 'next/navigation';
import { getIndustriesTranslations } from '@/lib/industriesTranslations';

export default function IndustriesPage() {
  const containerRef = useRef(null);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = getIndustriesTranslations(locale);
  
  // Merge static data with translations
  const localizedIndustries = industries.map(ind => {
    // Generate camelCase key from slug (hotels-resorts -> hotelsResorts)
    // Special case for smes-service-businesses -> smesServiceBusinesses
    let key = ind.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    // Safety check: access translation
    const translation = (t.industries as any)[key];
    
    return {
      ...ind,
      title: translation?.title || ind.title,
      summary: translation?.summary || ind.summary,
      industryTag: translation?.industryTag || ind.industryTag,
      tags: translation?.tags || ind.tags
    };
  });
  
  // State
  const [viewMode, setViewMode] = useState<"featured" | "all">("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustryTag, setSelectedIndustryTag] = useState<string | null>(null);
  const [selectedServiceTag, setSelectedServiceTag] = useState<string | null>(null);
  
  // UI State
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  // Hardcoded Service List as requested
  const definedServices = [
    { label: t.services.webDevelopment, link: "web-development" },
    { label: t.services.brandIdentity, link: "branding" },
    { label: t.services.uiUxDesign, link: "ui-ux-design" },
    { label: t.services.motionDesign, link: "motion-graphics" },
    { label: t.services.seoMarketing, link: "seo-digital-marketing" },
    { label: t.services.ecommerceSolutions, link: "ecommerce-solutions" }
  ];

  // Derived Data for Filters
  const uniqueIndustryTags = Array.from(new Set(localizedIndustries.map(i => i.industryTag)));

  // Filtering Logic
  const filteredIndustries = useMemo(() => {
    return localizedIndustries.filter((industry) => {
      // 1. Featured Check
      if (viewMode === "featured" && !industry.featured) return false;

      // 2. Search Check
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = industry.title.toLowerCase().includes(q);
        const matchesSummary = industry.summary.toLowerCase().includes(q);
        const matchesModules = industry.modules.some(m => 
          m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        );
        if (!matchesTitle && !matchesSummary && !matchesModules) return false;
      }

      // 3. Industry Tag Check
      if (selectedIndustryTag && industry.industryTag !== selectedIndustryTag) {
        return false;
      }

      // 4. Service Tag Check (Updated to match defined services)
      if (selectedServiceTag) {
         // Find the link corresponding to the label
         const serviceItem = definedServices.find(s => s.label === selectedServiceTag);
         const targetLink = serviceItem ? serviceItem.link : null;
         
         if (targetLink) {
             // Check if any module in the industry has this serviceLink
             // Also check for loose match e.g. 'branding' might be implicit or mapped in future.
             // We generally check if module.serviceLink === targetLink
             const hasService = industry.modules.some(m => m.serviceLink === targetLink);
             if (!hasService) return false;
         }
      }

      return true;
    });
  }, [viewMode, searchQuery, selectedIndustryTag, selectedServiceTag]);

  // Animations
  useGSAP(() => {
    gsap.from(".animate-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.fromTo(".industry-card", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", clearProps: "all" }
    );
  }, { scope: containerRef, dependencies: [filteredIndustries, viewMode] });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedIndustryTag(null);
    setSelectedServiceTag(null);
    if (viewMode === "all") setViewMode("featured");
  };

  return (
    <main className="pt-32 min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00B5D9]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container - Reduced width as requested (max-w-6xl instead of standard container/7xl) */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl pb-24 relative z-10">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="animate-header text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            {t.page.title} <br/> {t.page.titleHighlight}
          </h1>
          <p className="animate-header text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            {t.page.subtitle}
          </p>
        </div>

        {/* Controls Section */}
        <div className="animate-header sticky top-24 z-50 mb-12">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            
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

            {/* Industry Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIndustryDropdownOpen(!industryDropdownOpen);
                  setServiceDropdownOpen(false);
                }}
                className={clsx(
                  "flex items-center justify-between min-w-[160px] gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 border",
                  industryDropdownOpen || selectedIndustryTag
                    ? "bg-[#00b6d9] text-white border-[#00b6d9] shadow-lg shadow-cyan-500/20" 
                    : "bg-zinc-800/50 text-gray-400 border-white/5 hover:text-[#00b6d9] hover:border-[#00b6d9]/30"
                )}
              >
                <span>{selectedIndustryTag || t.page.industry}</span>
                <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", industryDropdownOpen ? "rotate-180" : "")} />
              </button>
              
              {/* Dropdown Menu */}
              {industryDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={() => {
                      setSelectedIndustryTag(null);
                      setIndustryDropdownOpen(false);
                    }}
                    className="w-full text-left px-5 py-3 text-sm text-gray-400 hover:text-[#00b6d9] hover:bg-white/5 transition-colors"
                  >
                    {t.page.allIndustries}
                  </button>
                  {uniqueIndustryTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedIndustryTag(tag);
                        setIndustryDropdownOpen(false);
                      }}
                      className={clsx(
                        "w-full text-left px-5 py-3 text-sm transition-colors",
                        selectedIndustryTag === tag ? "text-[#00B5D9] bg-white/5" : "text-white hover:text-[#00b6d9] hover:bg-white/5"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Dropdown - Updated List */}
            <div className="relative">
              <button
                onClick={() => {
                  setServiceDropdownOpen(!serviceDropdownOpen);
                  setIndustryDropdownOpen(false);
                }}
                className={clsx(
                  "flex items-center justify-between min-w-[160px] gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 border",
                  serviceDropdownOpen || selectedServiceTag
                    ? "bg-[#00b6d9] text-white border-[#00b6d9] shadow-lg shadow-cyan-500/20" 
                    : "bg-zinc-800/50 text-gray-400 border-white/5 hover:text-[#00b6d9] hover:border-[#00b6d9]/30"
                )}
              >
                <span>{selectedServiceTag || t.page.service}</span>
                <ChevronDown className={clsx("w-4 h-4 transition-transform duration-300", serviceDropdownOpen ? "rotate-180" : "")} />
              </button>

              {/* Dropdown Menu */}
              {serviceDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    onClick={() => {
                      setSelectedServiceTag(null);
                      setServiceDropdownOpen(false);
                    }}
                    className="w-full text-left px-5 py-3 text-sm text-gray-400 hover:text-[#00b6d9] hover:bg-white/5 transition-colors"
                  >
                    {t.page.allServices}
                  </button>
                  {definedServices.map(service => (
                    <button
                      key={service.label}
                      onClick={() => {
                        setSelectedServiceTag(service.label);
                        setServiceDropdownOpen(false);
                      }}
                      className={clsx(
                        "w-full text-left px-5 py-3 text-sm transition-colors",
                        selectedServiceTag === service.label ? "text-[#00B5D9] bg-white/5" : "text-white hover:text-[#00b6d9] hover:bg-white/5"
                      )}
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

             {/* Reset Action */}
             {(selectedIndustryTag || selectedServiceTag || viewMode === "all") && (
                <button 
                  onClick={clearFilters}
                  className="ml-auto md:ml-0 text-sm text-gray-500 hover:text-[#00b6d9] transition-colors"
                >
                   {t.page.reset}
                </button>
             )}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIndustries.map((industry) => (
            <Link key={industry.slug} href={`/industries/${industry.slug}`} className="group block h-full">
              <article className="industry-card relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00B5D9]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00B5D9]/10 h-full flex flex-col">
                
                {/* Image Area */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={industry.heroImage}
                    alt={industry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80" />
                  
                  {/* Overlay Tag */}
                  <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white tracking-wide">
                        {industry.industryTag}
                     </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-[#00B5D9] transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {industry.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {industry.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#00B5D9] font-bold text-sm tracking-wide group-hover:translate-x-1 transition-transform">
                    {t.page.exploreSolutions} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filteredIndustries.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-500 mb-2">{t.page.noResults}</h3>
            <p className="text-gray-600">{t.page.noResultsDesc}</p>
            <button 
              onClick={clearFilters}
              className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              {t.page.clearFilters}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
