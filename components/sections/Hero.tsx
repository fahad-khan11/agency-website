"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { MoveRight, ArrowDown } from "lucide-react";

export default function Hero({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive !== undefined && !isActive) return;

    const ctx = gsap.context(() => {
      // Re-initialize state just in case
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial State Setups
      gsap.set(".hero-line-inner", { y: "100%" });
      gsap.set(".hero-fade", { y: 20, opacity: 0 });
      gsap.set(".hero-visual-item", { scale: 0.8, opacity: 0 });
      gsap.set(".nav-item", { y: -20, opacity: 0 });

      // Entrance Sequence
      tl.to(".hero-line-inner", {
        y: "0%",
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
      })
        .to(".hero-fade", {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
        }, "-=1")
        .to(".nav-item", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
        }, "-=1.2")
        .to(".hero-visual-item", {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out"
        }, "-=1.2");

      gsap.to(".floating-shape", {
        y: "-=20",
        rotation: 5,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5);
        const yPos = (clientY / innerHeight - 0.5);

        gsap.to(".parallax-layer-1", {
          x: xPos * 40,
          y: yPos * 40,
          duration: 1,
          ease: "power2.out"
        });

        gsap.to(".parallax-layer-2", {
          x: xPos * -70,
          y: yPos * -70,
          duration: 1.2,
          ease: "power2.out"
        });

        gsap.to(".parallax-bg", {
          x: xPos * 20,
          y: yPos * 20,
          duration: 2,
          ease: "power1.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col overflow-hidden isolate"
    >
      <div className="absolute inset-0 z-[-1] parallax-bg opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-900/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand-orange/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="absolute inset-0 z-[-1] opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Navigation (Moved to Global Header) */}
      {/* <nav className="w-full px-8 py-8 flex justify-between items-center z-50">...</nav> */}

      {/* Hero Content */}
      <div className="flex-grow flex flex-col justify-center px-6 md:px-12 relative z-10 w-full max-w-[1800px] mx-auto">

        {/* Main Title Area */}
        <div className="relative mb-8" ref={titleRef}>
          {/* Top Decorative Line */}
          <div className="hero-fade mb-6 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-brand-orange"></div>
            <span className="text-brand-orange font-mono text-xs uppercase tracking-[0.3em]">Digital Experience Design</span>
          </div>

          <h1 className="font-display font-black text-[13vw] leading-[0.8] tracking-tight uppercase mix-blend-difference relative">
            <div className="overflow-hidden">
              <div className="hero-line-inner">DIGITAL</div>
            </div>

            <div className="overflow-hidden flex items-baseline gap-[2vw]">
              {/* Visual Interruption in text */}
              <div className="hero-visual-item parallax-layer-2 w-[10vw] h-[10vw] rounded-full overflow-hidden border border-white/20 mt-4 md:mt-0 hidden lg:block floating-shape">
                <div className="w-full h-full bg-gradient-to-tr from-brand-orange to-purple-600 scale-150 animate-spin-slow opacity-80"></div>
              </div>

              <div className="hero-line-inner flex items-baseline">
                <span className="outline-text italic font-serif opacity-80 pr-4">Soul</span>
                <span>ALCHEMY</span>
              </div>
            </div>
          </h1>
        </div>

        {/* Bottom Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 mt-4">
          <div className="hero-fade max-w-xl">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              We blend <span className="text-white font-medium">strategy, design, and motion</span> to build brands that refuse to be ignored in the digital noise.
            </p>
          </div>

          <div className="hero-fade flex items-center gap-10 mt-10 md:mt-0">
            <div className="hidden md:block text-right">
              <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Based in</span>
              <span className="block font-medium">San Francisco</span>
            </div>
            <div className="hidden md:block text-right">
              <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Since</span>
              <span className="block font-medium">2024</span>
            </div>

            {/* <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center animate-bounce duration-[3000ms]">
                <ArrowDown className="text-brand-orange" />
             </div> */}
          </div>
        </div>
      </div>

      {/* Shapes / Parallax Elements */}
      <div className="absolute top-[20%] right-[10%] w-[25vw] h-[35vw] parallax-layer-1 border border-white/5 rounded-full rotate-[15deg] pointer-events-none floating-shape z-0 mix-blend-screen opacity-40"></div>

      {/* Ticker at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-2 bg-white/5 backdrop-blur-sm border-t border-white/5 z-20">
        <div className="flex animate-ticker w-max">
          {Array(10).fill("STRATEGY • DESIGN • DEVELOPMENT • MOTION • ").map((text, i) => (
            <span key={i} className="text-xs font-bold text-gray-500 tracking-[0.2em] px-4 whitespace-nowrap opacity-60">
              {text}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
           /* Slow Spin Animation */
      @keyframes spin-slow {
        from { transform: rotate(0deg) scale(1.5); }
        to { transform: rotate(360deg) scale(1.5); }
      }
      .animate-spin-slow {
        animation: spin-slow 10s linear infinite;
      }
      
      /* Ticker Animation */
      @keyframes ticker {
         0% { transform: translateX(0); }
         100% { transform: translateX(-50%); }
      }
      .animate-ticker {
         animation: ticker 30s linear infinite;
      }
      `}</style>
    </section>
  );
}
