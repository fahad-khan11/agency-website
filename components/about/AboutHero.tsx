"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function AboutHero({ initialData }: { initialData?: any }) {
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

  const headline = initialData?.heroHeadline || "";
  const description = initialData?.heroDescription || "";
  const viewWork = initialData?.heroViewWork || "";
  const getInTouch = initialData?.heroGetInTouch || "";
  const disciplinesTitle = initialData?.heroDisciplinesTitle || "";
  const disciplineList = initialData?.heroDisciplineList || [];

  const heroImageUrl = initialData?.heroImage?.url 
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${initialData.heroImage.url}`
      : "/agency-hero.png";

  return (
    <section ref={containerRef} className="w-full min-h-[90vh] bg-black text-white flex items-center pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>

      <div className="max-w-[1370px] w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Left Content */}
        <div className="flex flex-col gap-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight">
            {headline.split(" ").map((word: string, i: number) => (
              <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] -mb-[0.1em] pb-[0.1em]">
                <span className="hero-word inline-block translate-y-[110%] opacity-0 will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div className="hero-fade opacity-0 translate-y-6 flex flex-col gap-8 max-w-lg">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-light">
              {description}
            </p>

            <div className="flex gap-8">
              <Link href="/projects" className="group flex items-center gap-2 text-white border-b border-white hover:border-[#00b4d9] hover:text-[#00b4d9] transition-all pb-1 uppercase tracking-wider text-sm font-medium">
                <span>{viewWork}</span>
                <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
              </Link>
              <Link href="/contact" className="group flex items-center gap-2 text-white border-b border-white hover:border-[#00b4d9] hover:text-[#00b4d9] transition-all pb-1 uppercase tracking-wider text-sm font-medium">
                <span>{getInTouch}</span>
                <MoveRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-end items-start h-[600px] w-full relative hero-fade opacity-0 translate-y-6 rounded-2xl overflow-hidden group">
          <Image
            src={heroImageUrl}
            alt="Abstract Digital Art"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

          <div className="relative z-10 p-8 w-full mt-auto">
            <span className="block text-xs font-mono text-[#00b4d9] uppercase tracking-widest mb-4">{disciplinesTitle}</span>
            <ul className="flex flex-col gap-2 text-base text-gray-200 font-light">
              {disciplineList.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
