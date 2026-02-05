"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from 'next-intl';

export default function ValuesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('about.values');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".value-fade", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const values = [
    { key: "value1" },
    { key: "value2" },
    { key: "value3" },
    { key: "value4" },
  ];

  return (
    <section ref={containerRef} className="w-full bg-black text-white py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1370px] mx-auto">

        <div className="flex flex-col gap-4 mb-20 value-fade">
          <span className="text-sm font-mono uppercase tracking-widest text-[#00b4d9]">{t('tagline')}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold max-w-2xl">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {values.map((v, i) => (
            <div key={i} className="value-fade group flex flex-col items-start border-t border-gray-800 pt-8 hover:border-[#00b4d9]/50 transition-colors duration-500">
              <span className="font-mono text-[#00b4d9] text-sm mb-6">0{i + 1}</span>
              <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-[#00b4d9] transition-colors duration-300">{t(`${v.key}.title`)}</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {t(`${v.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
