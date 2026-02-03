"use client";

import Work from "@/components/sections/Work";
import OrangeStatement from "@/components/sections/OrangeStatement";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProjectsPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".animate-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <main className="pt-32 min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 pb-24 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="animate-header text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">
            <span className="block text-white">Selected</span>
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="animate-header text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            A showcase of our best work across branding, web design, and motion.
            Each project is a testament to our passion for digital excellence.
          </p>
        </div>
      </div>
      <Work />
      <OrangeStatement />
    </main>
  );
}
