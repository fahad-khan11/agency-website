"use client";

import StickyCards from "@/components/StickyCards/StickyCards";
import ReactLenis from "lenis/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

export default function ServicesPage() {
  const containerRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);

  useGSAP(() => {
    // Text Animation
    gsap.from(".animate-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    });

    // Scroll Indicator Animation
    gsap.fromTo(".scroll-indicator",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
    );
    gsap.to(".scroll-indicator", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });

    // Background Blobs Animation
    gsap.to(blob1Ref.current, {
      x: 100,
      y: -50,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(blob2Ref.current, {
      x: -100,
      y: 50,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { scope: containerRef });

  return (
    <>
      <ReactLenis root></ReactLenis>
      <main className="relative min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>

        {/* Background Blobs */}
        <div
          ref={blob1Ref}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          ref={blob2Ref}
          className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Hero Section */}
        <div className="container mx-auto px-6 h-screen flex items-center relative z-10">
          <div className="flex items-center gap-16 w-full max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h1 className="animate-text text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                <span className="block text-white">Crafting Digital</span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Masterpieces
                </span>
              </h1>
              <p className="animate-text text-gray-400 text-xl md:text-2xl leading-relaxed">
                We blend aesthetics with functionality to deliver comprehensive digital solutions tailored to your brand's unique needs.
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 flex items-center justify-center animate-text">
              <img 
                src="/services-hero.png" 
                alt="Digital Services" 
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        <StickyCards />
      </main>
    </>
  );
}
