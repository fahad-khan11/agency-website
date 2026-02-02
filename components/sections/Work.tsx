"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
// import Image from "next/image"; // Kept if needed later, but using standard img or div for now per previous style
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Work({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    // Entrance Animation
    if (isActive !== undefined && !isActive) return;

    // Ensure GSAP context is clean
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="block"
            >
              <div
                className="work-item group relative cursor-pointer"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Image/Video Container */}
                <div className="relative w-full aspect-[4/3] bg-neutral-900 rounded-xl overflow-hidden mb-6">
                  {project.heroVideo ? (
                    <video
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                      src={project.heroVideo}
                    />
                  ) : project.heroImage ? (
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                      <span className="text-xs uppercase tracking-widest text-brand-orange">{project.title}</span>
                    </div>
                  )}

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-sm font-medium">View Project</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2 group-hover:text-brand-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">{project.category}</p>
                  </div>
                  <span className="text-gray-500 font-mono text-sm mt-1">{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Cursor / Image Preview - Keep for desktop enhancement */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[320px] h-[220px] pointer-events-none z-50 hidden lg:block -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden bg-gray-800 opacity-0 scale-0"
      >
        {projects.map((p) => (
          <div
            key={p.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${activeProject === p.id ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-500 overflow-hidden relative">
              {/* Video or Image Preview */}
              {p.heroVideo ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  src={p.heroVideo}
                />
              ) : p.heroImage ? (
                <img src={p.heroImage} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black p-4 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-widest text-brand-orange">{p.title}</span>
                </div>
              )}
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
