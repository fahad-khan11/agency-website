"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cleaner, faster animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(".hero-word", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.04,
        delay: 0.1
      })
      .to(".hero-fade", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "We design brands and build digital experiences";

  return (
    <section ref={containerRef} className="w-full min-h-[90vh] bg-black text-white flex items-center pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
      
      <div className="max-w-[1370px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight">
            {headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] -mb-[0.1em] pb-[0.1em]">
                    <span className="hero-word inline-block translate-y-[110%] opacity-0 will-change-transform">
                    {word}
                    </span>
                </span>
            ))}
            </h1>

            <div className="hero-fade opacity-0 translate-y-6 flex flex-col gap-8 max-w-lg">
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
                    We are a strategic design and engineering agency that helps companies navigate the digital landscape with speed, clarity, and bold creativity.
                </p>
                
                <div className="flex gap-8">
                    <Link href="/projects" className="group flex items-center gap-2 text-white border-b border-white hover:border-brand-orange hover:text-brand-orange transition-all pb-1 uppercase tracking-wider text-sm font-medium">
                        <span>View Work</span>
                        <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </Link>
                    <Link href="/contact" className="group flex items-center gap-2 text-white border-b border-white hover:border-brand-orange hover:text-brand-orange transition-all pb-1 uppercase tracking-wider text-sm font-medium">
                        <span>Get in Touch</span>
                        <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>

        {/* Right Visual / Balance */}
        <div className="hidden md:flex flex-col justify-end items-start h-[600px] w-full relative hero-fade opacity-0 translate-y-6 rounded-2xl overflow-hidden group">
             <Image 
                src="/agency-hero.png"
                alt="Abstract Digital Art"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
             
             <div className="relative z-10 p-8 w-full mt-auto">
                <span className="block text-xs font-mono text-brand-orange uppercase tracking-widest mb-4">Core Disciplines</span>
                <ul className="flex flex-col gap-2 text-base text-gray-200 font-light">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> Digital Strategy</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> Brand Identity</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> UI/UX Design</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> Full Stack Development</li>
                </ul>
             </div>
        </div>
      </div>
    </section>
  );
}
