"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const [activeService, setActiveService] = useState<number | null>(null);

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pb-24 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <h1 className="animate-header text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">
            <span className="block text-white">Our</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="animate-header text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            Comprehensive digital solutions tailored to your brand's unique needs.
            From concept to launch, we bring your vision to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {services.map((service) => (
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
                {/* Card Container */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 h-full flex flex-col transition-all duration-300 group-hover:border-[#00b4d9]/50 group-hover:shadow-2xl group-hover:shadow-[#00b4d9]/20">
                  {/* Icon */}
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-semibold mb-3 group-hover:text-[#00b4d9] transition-colors">
                    {service.title}
                  </h3>

                  {/* Category */}
                  <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                    {service.category}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="flex items-center gap-2 text-[#00b4d9] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowUpRight className="w-5 h-5" />
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
