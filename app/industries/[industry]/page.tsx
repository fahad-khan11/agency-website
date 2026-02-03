"use client";

import { useRef, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, Server } from "lucide-react";
import { industries } from "@/data/industries";

export default function IndustryDetailPage(props: { params: Promise<{ industry: string }> }) {
  // Unwrap the params promise using React's use() hook
  // This is compatible with Next.js 15 client components
  const params = use(props.params);
  const { industry: slug } = params;
  
  const industryData = industries.find((i) => i.slug === slug);
  const containerRef = useRef(null);

  if (!industryData) {
    notFound();
  }

  useGSAP(() => {
    // Header
    gsap.from(".animate-hero", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Modules
    gsap.from(".module-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".modules-grid",
        start: "top 80%"
      }
    });

     // Lists
    gsap.from(".animate-list-item", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".lists-section",
            start: "top 75%"
        }
    });

  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 min-h-[60vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0">
             {/* Gradient Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
             {/* Fallback image or generated image */}
             <div className="relative w-full h-full">
                <Image 
                    src={industryData.heroImage} 
                    alt={industryData.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
             </div>
        </div>

        <div className="container mx-auto relative z-20">
            <h1 className="animate-hero text-5xl md:text-7xl font-display font-bold mb-6">
                {industryData.title}
            </h1>
            <p className="animate-hero text-2xl md:text-3xl font-light text-gray-200 max-w-3xl mb-12 leading-relaxed">
                {industryData.intro.outcomes}
            </p>
            
            {/* Pain Points Highlight */}
            <div className="animate-hero bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl max-w-2xl">
                <h3 className="text-[#00B5D9] text-sm font-bold uppercase tracking-wider mb-2">The Challenge</h3>
                <p className="text-gray-300 text-lg">
                    {industryData.intro.painPoints}
                </p>
            </div>
        </div>
      </section>

      {/* Modules / Solutions Section */}
      <section className="py-24 px-6 md:px-12 bg-zinc-900/50">
        <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">
                Solutions & <span className="text-[#00B5D9]">Modules</span>
            </h2>

            <div className="modules-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industryData.modules.map((module, idx) => (
                    <div key={idx} className="module-card group bg-black border border-gray-800 p-8 rounded-2xl hover:border-[#00B5D9]/50 transition-all duration-300 hover:-translate-y-1">
                        <div className="mb-6 bg-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[#00B5D9]/20 transition-colors">
                            <Server className="w-6 h-6 text-[#00B5D9]" /> 
                            {/* Note: In a real app we'd map specific icons per module type */}
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#00B5D9] transition-colors">
                            {module.title}
                        </h3>
                        <p className="text-gray-400 mb-8 leading-relaxed h-20">
                            {module.description}
                        </p>
                        
                        <Link 
                            href={`/services/${module.serviceLink}`}
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white group-hover:text-[#00B5D9] transition-colors"
                        >
                            <span>View Service</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="lists-section py-24 px-6 md:px-12 relative">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Use Cases */}
              <div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold mb-8">
                      Typical Use Cases
                  </h3>
                  <ul className="space-y-6">
                      {industryData.useCases.map((useCase, idx) => (
                          <li key={idx} className="animate-list-item flex items-start gap-4">
                              <div className="mt-1 w-6 h-6 rounded-full bg-[#00B5D9]/10 flex items-center justify-center shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-[#00B5D9]" />
                              </div>
                              <span className="text-lg text-gray-300">{useCase}</span>
                          </li>
                      ))}
                  </ul>
              </div>

               {/* Benefits */}
               <div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold mb-8 text-[#00B5D9]">
                      Key Benefits
                  </h3>
                  <ul className="space-y-6">
                      {industryData.benefits.map((benefit, idx) => (
                          <li key={idx} className="animate-list-item flex items-start gap-4">
                              <CheckCircle2 className="w-6 h-6 text-[#00B5D9] shrink-0" />
                              <span className="text-lg text-white font-medium">{benefit}</span>
                          </li>
                      ))}
                  </ul>
              </div>

          </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-[#00B5D9] to-cyan-600 text-white">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                  <h2 className="text-3xl md:text-4xl font-black font-display mb-2">
                      Ready to transform your {industryData.title.split(' ')[0]}?
                  </h2>
                  <p className="text-cyan-100 text-lg">
                      Book a demo to see these modules in action.
                  </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-white text-[#00B5D9] font-bold uppercase tracking-wide rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg text-center"
                  >
                      Book a Demo
                  </Link>
                  <Link 
                    href="/contact" 
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wide rounded-full hover:bg-black hover:border-black transition-all duration-300 text-center"
                  >
                      Talk to Us
                  </Link>
              </div>
          </div>
      </section>

    </main>
  );
}
