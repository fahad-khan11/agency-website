"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { useTranslations } from 'next-intl';

const SplitText = ({ children, className, highlights = [] }: { children: string, className?: string, highlights?: string[] }) => {
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = highlights.includes(word.replace(/[^a-zA-Z0-9äöüÄÖÜß]/g, "")) || highlights.includes(word);
        return (
          <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] -mb-[0.1em] pb-[0.1em]">
            <span className={`word-anim inline-block translate-y-full opacity-0 will-change-transform ${isHighlighted ? "text-[#00b4d9]" : ""}`}>
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
};

export default function FeatureStrip({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('featureStrip');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const animateIn = () => {
        tl.clear();
        tl.to(".word-anim", {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.03,
          delay: 0.2,
          ease: "expo.out"
        })
          .to(".tag-anim", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
          }, "-=0.8")
          .to(".badge-anim", {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.5)"
          }, "-=1");
      };

      if (isActive !== undefined) {
        if (isActive) {
          animateIn();
        } else {
          gsap.set(".word-anim", { y: "100%", opacity: 0 });
          gsap.set(".tag-anim", { y: 20, opacity: 0 });
          gsap.set(".badge-anim", { scale: 0.5, opacity: 0 });
        }
      } else {
        gsap.to(".word-anim", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.03,
          ease: "expo.out"
        });

        gsap.to(".tag-anim", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out"
        });

        gsap.to(".badge-anim", {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.5)"
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={containerRef}
      className="w-full min-h-screen bg-[#040406] text-white py-16 md:py-24 px-6 md:px-12 flex flex-col justify-center section-panel relative overflow-hidden"
      data-index="1"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-[#00B4D9]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#1e40af]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-20 items-start">

        {/* Left Column - Capabilities */}
        <div className="w-full md:w-1/4 flex flex-col justify-start md:pt-5">
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="block text-xs md:text-sm font-mono text-white bg-[#00b4d9] uppercase tracking-widest px-3 py-1 font-bold w-max mb-2">{t('capabilities')}</span>
            <div className="flex flex-col gap-0 border-t border-white/10">
              {[t('brandIdentity'), t('webDesign'), t('creativeDev'), t('motionDirection')].map((tag, i) => (
                <div key={tag} className="tag-anim group relative py-4 md:py-6 border-b border-white/10 cursor-pointer overflow-hidden opacity-0 translate-y-5">
                  <div className="absolute inset-0 bg-[#00b4d9] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out -z-10"></div>
                  <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300">
                    <div className="flex items-baseline gap-2 md:gap-4">
                      <span className="font-mono text-xs text-[#00b4d9] group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300">0{i + 1}</span>
                      <span className="text-base md:text-xl font-bold font-display uppercase tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">{tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="w-full md:w-3/4 flex flex-col justify-start relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black leading-[1.1] tracking-tight text-white mb-6 md:mb-10 relative z-10">
            <SplitText highlights={["digital", "digitale", "narratives.", "Narrative."]}>{t('mainTitle')}</SplitText>
          </h2>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10">
            <div className="tag-anim opacity-0 translate-y-5 flex items-start gap-4 md:gap-6 ml-0 md:ml-1 max-w-xl w-full">
              <div className="h-[2px] w-8 md:w-12 bg-[#00b4d9] mt-2 md:mt-3 flex-shrink-0"></div>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light text-balance">
                {t('approach')}
              </p>
            </div>
            <div className="badge-anim opacity-0 scale-50 hidden lg:flex items-center justify-center w-32 h-32 rounded-full relative flex-shrink-0 border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <div className="absolute inset-1 border border-dashed border-white/20 rounded-full"></div>
              <span className="w-full h-full p-2 animate-[spin_10s_linear_infinite]">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                  <text>
                    <textPath href="#curve" className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] fill-white">
                      {t('badge')}
                    </textPath>
                  </text>
                </svg>
              </span>
              <div className="absolute w-2 h-2 bg-[#00b4d9] shadow-[0_0_10px_#00B4D9] rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </section>

  );
}
