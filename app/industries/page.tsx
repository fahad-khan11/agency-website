"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Building2, Utensils, ShoppingBag, Briefcase, Hotel, Home } from "lucide-react";
import Link from "next/link";
import { industries } from "@/data/industries";

const getIconForIndustry = (slug: string) => {
  switch (slug) {
    case 'hotels-resorts': return <Hotel className="w-12 h-12" />;
    case 'vacation-rentals': return <Home className="w-12 h-12" />;
    case 'real-estate-property-management': return <Building2 className="w-12 h-12" />;
    case 'gastronomy': return <Utensils className="w-12 h-12" />;
    case 'retail': return <ShoppingBag className="w-12 h-12" />;
    case 'smes-service-businesses': return <Briefcase className="w-12 h-12" />;
    default: return <Building2 className="w-12 h-12" />;
  }
};

export default function IndustriesPage() {
  const containerRef = useRef(null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  useGSAP(() => {
    // Header Animation - consistent with services page
    gsap.from(".animate-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Industry Cards Animation
    gsap.from(".industry-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.3
    });

  }, { scope: containerRef });

  return (
    <main className="pt-32 min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pb-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="animate-header text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">
            <span className="block text-white">Focus</span>
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Industries
            </span>
          </h1>
          <p className="animate-header text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            Not what we can do technically—how we help your industry.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="block"
            >
              <div
                className="industry-card group relative cursor-pointer h-full"
                onMouseEnter={() => setActiveIndustry(industry.slug)}
                onMouseLeave={() => setActiveIndustry(null)}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B5D9]/0 to-[#00B5D9]/0 rounded-2xl opacity-0 group-hover:from-[#00B5D9]/10 group-hover:to-[#00B5D9]/5 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 h-full flex flex-col transition-all duration-500 ease-out group-hover:border-[#00B5D9]/70 group-hover:shadow-2xl group-hover:shadow-[#00B5D9]/30 group-hover:-translate-y-2 group-hover:scale-[1.02]">

                  {/* Shine Effect Overlay */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B5D9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>

                  {/* Icon/Image Area */}
                  <div className="relative mb-6 text-gray-400 group-hover:text-[#00B5D9] transition-colors duration-500">
                     {getIconForIndustry(industry.slug)}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-2xl font-display font-semibold mb-3 transition-all duration-300 group-hover:text-[#00B5D9] group-hover:translate-x-1">
                    {industry.title}
                  </h3>

                  {/* Outcome / Summary */}
                  <p className="relative text-gray-400 leading-relaxed mb-6 flex-grow transition-colors duration-300 group-hover:text-gray-300">
                    {industry.summary}
                  </p>

                  {/* CTA */}
                  <div className="relative flex items-center gap-2 text-[#00B5D9] font-medium mt-auto group-hover:text-cyan-300 transition-colors">
                    <span>Explore solutions</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
