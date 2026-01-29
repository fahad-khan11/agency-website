"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Lumina Scent",
    category: "E-Commerce / Branding",
    year: "2024",
    image: "/images/work1.jpg"
  },
  {
    id: 2,
    title: "Apex Finance",
    category: "Web App / FinTech",
    year: "2023",
    image: "/images/work2.jpg"
  },
  {
    id: 3,
    title: "Vogue Editorial",
    category: "Digital Experience",
    year: "2023",
    image: "/images/work3.jpg"
  }
];

export default function Work({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    // Entrance Animation
    if (isActive !== undefined && !isActive) return;
    
    const ctx = gsap.context(() => {
       gsap.from(".work-item", {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
       });
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  useEffect(() => {
    // Custom cursor logic
    const moveCursor = (e: MouseEvent) => {
      // ... existing logic ...
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    if (activeProject !== null && cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    } else if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    }
  }, [activeProject]);

  return (
    <section ref={containerRef} id="work" className="bg-black text-white py-24 px-6 md:px-12 relative min-h-screen flex flex-col justify-center section-panel" data-index="2">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-16 border-b border-gray-800 pb-6">
          <h2 className="text-4xl md:text-6xl font-display font-bold">SELECTED WORK</h2>
          <span className="text-gray-500 hidden md:inline-block">2023 — 2024</span>
        </div>

        <div className="flex flex-col">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="work-item group relative border-b border-gray-800 py-12 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-colors hover:border-gray-600"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="z-10 bg-black/50 backdrop-blur-sm md:bg-transparent p-2 md:p-0 rounded pointer-events-none">
                 <h3 className="text-3xl md:text-5xl font-display font-semibold mb-2 group-hover:text-brand-orange transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">{project.category}</p>
              </div>
              
              <div className="flex items-center gap-4 mt-4 md:mt-0 z-10 transition-transform duration-300 md:group-hover:-translate-x-12">
                <span className="text-gray-500 font-mono">{project.year}</span>
                <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

               {/* Image Reveal on Hover (Desktop) - centered/fixed or following? sticking to a simple reveal for now */}
               {/* We can make a fixed preview container instead of per-item to save resources */}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cursor / Image Preview */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-[320px] h-[220px] pointer-events-none z-50 hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden bg-gray-800 opacity-0 scale-0"
      >
        {projects.map((p) => (
           <div 
             key={p.id} 
             className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${activeProject === p.id ? 'opacity-100' : 'opacity-0'}`}
           >
             {/* Using a solid color placeholder if image fails/missing */}
             <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-500">
               {/* Setup real image here */}
               <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black p-4 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-brand-orange">Project Img {p.id}</span>
               </div>
             </div>
           </div>
        ))}
        
        <div className="absolute bottom-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 rounded uppercase">
          View Case
        </div>
      </div>
    </section>
  );
}
