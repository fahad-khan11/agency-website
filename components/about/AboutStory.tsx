"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger if not already done globally
gsap.registerPlugin(ScrollTrigger);

export default function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
     gsap.from(".story-fade", {
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
      { label: "Years", value: "08" },
      { label: "Projects", value: "150+" },
      { label: "Clients", value: "80+" },
      { label: "Countries", value: "12" },
  ];

  return (
    <section ref={containerRef} className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-12 border-b border-gray-100">
      <div className="max-w-[1370px] mx-auto">
        
        {/* Heading Section - Scaled and separated for alignment */}
        <div className="w-full flex flex-col gap-4 mb-12 md:mb-20 story-fade">
           <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-none">Our Story</h2>
           <div className="h-[2px] w-12 bg-brand-orange"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-20 items-stretch">
            {/* Left: Image Only - Equal Width & Height Stretched */}
            <div className="story-fade h-full min-h-[500px] md:min-h-0">
               <div className="relative w-full h-full bg-gray-100 rounded-sm overflow-hidden">
                  <Image 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                    alt="Archetype Office"
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               </div>
            </div>

            {/* Right: Narrative & Stats */}
            <div className="flex flex-col gap-12 story-fade justify-between py-2">
                <div className="flex flex-col gap-6 text-lg text-gray-800 font-light leading-relaxed">
                    <p>
                        Founded in 2016, Archetype began with a simple mission: to bridge the gap between high-end aesthetic design and robust software engineering. We saw too many products that looked good but broke easily, or worked perfectly but felt soulless.
                    </p>
                    <p>
                        Our team consists of polymaths—designers who code and engineers who dream in color. This interdisciplinary approach allows us to solve complex problems faster and more elegantly than traditional siloed agencies.
                    </p>
                    <p>
                        We don't just build websites or apps; we build engines for growth. Every pixel is placed with purpose, and every line of code is written for scale.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-gray-100">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <span className="text-3xl md:text-4xl font-display font-bold text-black tracking-tight">{stat.value}</span>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </section>
  );
}
