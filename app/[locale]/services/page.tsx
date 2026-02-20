"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { useParams } from "next/navigation";
import { getServicesTranslations } from "@/lib/servicesTranslations";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = getServicesTranslations(locale);

  // Merge static data with translations for the grid
  const localizedServices = services.map(service => {
      const key = service.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const trans = (t.services as any)[key];
      return {
          ...service,
          title: trans?.title || service.title,
          category: trans?.category || service.category,
          description: trans?.description || service.description
      };
  });

  useGSAP(() => {
    // Header Animation
    gsap.from(".animate-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Service Cards Animation
    gsap.from(".service-card", {
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]  rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pb-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="animate-header text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">
            <span className="block text-white">Our</span>
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {t.page.title.replace('Our ', '')}
            </span>
          </h1>
          <p className="animate-header text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            {t.page.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {localizedServices.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="block"
            >
              <div
                className="service-card group relative cursor-pointer h-full"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B5D9]/0 to-[#00B5D9]/0 rounded-2xl opacity-0 group-hover:from-[#00B5D9]/10 group-hover:to-[#00B5D9]/5 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                {/* Card Container */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 h-full flex flex-col transition-all duration-500 ease-out group-hover:border-[#00B5D9]/70 group-hover:-translate-y-2 group-hover:scale-[1.02]">

                  {/* Shine Effect Overlay */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B5D9]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>

                  {/* Icon */}
                  <div className="relative text-6xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 filter group-hover:drop-shadow-[0_0_15px_rgba(0,181,217,0.5)]">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-2xl md:text-3xl font-display font-semibold mb-3 transition-all duration-300 group-hover:text-[#00B5D9] group-hover:translate-x-1">
                    {service.title}
                  </h3>

                  {/* Category */}
                  <p className="relative text-gray-500 text-sm uppercase tracking-wider mb-4 transition-colors duration-300 group-hover:text-[#00B5D9]/70">
                    {service.category}
                  </p>

                  {/* Description */}
                  <p className="relative text-gray-400 leading-relaxed mb-6 flex-grow transition-colors duration-300 group-hover:text-gray-300">
                    {service.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="relative flex items-center gap-2 text-[#00B5D9] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                    <span className="text-sm font-medium">{t.page.learnMore}</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
