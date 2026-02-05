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
            trigger: ".lists-section",
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
      
      {/* Hero Section - Split Layout */}
      <section className="relative pt-32 pb-20 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Content */}
            <div className="hero-content relative z-10">
                <div className="inline-block px-3 py-1 mb-6 rounded-full bg-[#00B5D9]/10 border border-[#00B5D9]/20">
                    <span className="text-[#00B5D9] text-xs font-bold uppercase tracking-wider">
                        {industryData.industryTag} {t.page.caseFocus}
                    </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                    {industryData.title}
                </h1>
                
                <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed">
                    {industryData.intro.outcomes}
                </p>
                
                {/* Challenge Box */}
                <div className="bg-zinc-900/50 border-l-4 border-[#00B5D9] pl-6 py-4 rounded-r-xl">
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">{t.page.challenge}</h3>
                    <p className="text-gray-300">
                        {industryData.intro.painPoints}
                    </p>
                </div>
            </div>

            {/* Image */}
            <div className="hero-image relative group">
                 <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00B5D9]/10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00B5D9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                    <Image 
                        src={industryData.heroImage} 
                        alt={industryData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-zinc-900 rounded-xl border border-white/10 -z-10" />
                 <div className="absolute -top-6 -left-6 w-32 h-32 border border-[#00B5D9]/20 rounded-full -z-10 animate-pulse" />
            </div>
        </div>
      </section>

      {/* Modules / Solutions Section */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900/30">
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                    {t.page.solutionsModules} <span className="text-[#00B5D9]">{t.page.modulesHighlight}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {t.page.modulesDesc.replace('{industry}', industryData.title)}
                </p>
            </div>

            <div className="modules-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {industryData.modules.map((module, idx) => (
                    <div key={idx} className="module-card group bg-black border border-white/10 p-8 rounded-2xl hover:border-[#00B5D9]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00B5D9]/5">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[#00B5D9]/20 transition-colors">
                                {getModuleIcon(idx)}
                            </div>
                            {module.serviceTag && (
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-800 px-2 py-1 rounded">
                                    {module.serviceTag}
                                </span>
                            )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#00B5D9] transition-colors">
                            {module.title}
                        </h3>
                        <p className="text-gray-400 mb-8 leading-relaxed h-auto min-h-[5rem]">
                            {module.description}
                        </p>
                        
                        <Link 
                            href="#" // Keeps visual link but prevents 404 since service links might need updating
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white group-hover:text-[#00B5D9] transition-colors"
                        >
                            <span>{t.page.viewService}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="lists-section py-24 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#00B5D9]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Use Cases */}
              <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3">
                      <span className="w-8 h-1 bg-[#00B5D9] rounded-full" />
                      {t.page.typicalUseCases}
                  </h3>
                  <ul className="space-y-4">
                      {industryData.useCases.map((useCase, idx) => (
                          <li key={idx} className="animate-list-item flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-transparent hover:border-white/10 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-[#00B5D9] shrink-0" />
                              <span className="text-lg text-gray-300">{useCase}</span>
                          </li>
                      ))}
                  </ul>
              </div>

               {/* Benefits */}
               <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-[#00B5D9] flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8" />
                      {t.page.keyBenefits}
                  </h3>
                  <ul className="space-y-4">
                      {industryData.benefits.map((benefit, idx) => (
                          <li key={idx} className="animate-list-item flex items-start gap-4">
                              <CheckCircle2 className="w-6 h-6 text-[#00B5D9] shrink-0 mt-1" />
                              <span className="text-xl text-white font-medium leading-relaxed">{benefit}</span>
                          </li>
                      ))}
                  </ul>
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
                  <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wide rounded-full hover:bg-white/10 hover:border-white transition-all duration-300"
                  >
                      {t.page.talkToExpert}
                  </Link>
              </div>
          </div>
      </section>

    </main>
  );
}
