"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { useTranslations } from 'next-intl';

export default function OrangeStatement({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('orangeStatement');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isActive !== undefined) {
        // Panel Mode: Auto animate since no scroll scrub
        gsap.to(".parallax-line", {
          x: -200,
          duration: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      } else {
        // Normal Mode: Scroll scrub
        gsap.to(".parallax-line", {
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
          x: -200,
          ease: "none",
        });
      }

      // Orbit Animation
      gsap.to(".orbit-ring-1", { rotation: 360, duration: 120, ease: "none", repeat: -1 });
      gsap.to(".orbit-ring-2", { rotation: -360, duration: 90, ease: "none", repeat: -1 });
      gsap.to(".orbit-ring-3", { rotation: 360, duration: 60, ease: "none", repeat: -1 });
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section ref={containerRef} className="bg-[#00b4d9] text-white w-full h-screen px-6 md:px-12 relative overflow-hidden section-panel flex flex-col justify-center items-center text-center" data-index="4">
      {/* Background Noise/Grain is handled globally */}

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight leading-none mb-8">
          {t('title')}
        </h2>
        <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] pointer-events-none flex items-center justify-center">

        <div className="orbit-ring-1 absolute w-full h-full border-2 border-dashed border-white/40 rounded-full">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-[0_0_20px_white]"></div>
        </div>

        <div className="orbit-ring-2 absolute w-[70%] h-[70%] border border-white/60 rounded-full">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-white/90 rounded-full blur-[2px]"></div>
        </div>

        <div className="orbit-ring-3 absolute w-[40%] h-[40%] border-2 border-dotted border-white/80 rounded-full">
          <div className="absolute top-0 right-0 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>
        </div>
      </div>

    </section>
  );
}
