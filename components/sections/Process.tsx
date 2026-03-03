"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "@/lib/gsap";

export default function Process({ isActive, initialData }: { isActive?: boolean; initialData?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const processContent = useMemo(() => {
    if (!initialData) return null;
    return initialData;
  }, [initialData]);

  const steps = useMemo(() => {
    return processContent?.steps || [];
  }, [processContent]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray<HTMLElement>(".process-step");

      // If isActive is strictly provided (Panel Mode)
      if (isActive !== undefined) {
        if (isActive) {
          // Play Animation
          gsap.fromTo(stepElements,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              overwrite: true
            }
          );
        }
      } else {
        stepElements.forEach((step, i) => {
          gsap.from(step, {
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power3.out"
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive, steps]);

  if (!processContent) return null;

  return (
    <section ref={containerRef} className="bg-black text-white py-24 px-6 md:px-12 w-full h-full flex flex-col justify-center" data-index="5">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center md:text-left">{processContent.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step: any) => (
            <div key={step.id} className="process-step border-t border-gray-800 pt-6 relative group hover:border-[#00b4d9] transition-colors duration-500 opacity-100">
              <span className="text-4xl md:text-5xl font-mono font-bold text-gray-800 mb-6 block group-hover:text-white transition-colors duration-500">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold font-display mb-3 text-[#00b4d9]">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
