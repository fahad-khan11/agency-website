"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ValuesGrid({ initialData }: { initialData?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const tagline = initialData?.valuesTagline || "";
  const title = initialData?.valuesTitle || "";

  const finalValues = [
    { title: initialData?.value1Title, desc: initialData?.value1Desc },
    { title: initialData?.value2Title, desc: initialData?.value2Desc },
    { title: initialData?.value3Title, desc: initialData?.value3Desc },
    { title: initialData?.value4Title, desc: initialData?.value4Desc },
  ].filter(v => v.title);

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

  return (
    <section ref={containerRef} className="w-full bg-black text-white py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-[1370px] mx-auto">

        <div className="flex flex-col gap-4 mb-20 value-fade">
          <span className="text-sm font-mono uppercase tracking-widest text-[#00b4d9]">{tagline}</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold max-w-2xl">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {finalValues.map((v, i) => (
            <div key={i} className="value-fade group flex flex-col items-start border-t border-gray-800 pt-8 hover:border-[#00b4d9]/50 transition-colors duration-500">
              <span className="font-mono text-[#00b4d9] text-sm mb-6">0{i + 1}</span>
              <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-[#00b4d9] transition-colors duration-300">{v.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
