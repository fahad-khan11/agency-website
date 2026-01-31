"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export default function Process({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");

      // If isActive is strictly provided (Panel Mode)
      if (isActive !== undefined) {
        if (isActive) {
          // Play Animation
          gsap.fromTo(steps,
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
        } else {
          // Reset if needed, or do nothing (keep hidden state handled by container?)
          // Actually PanelContainer handles container visibility.
          // We might want to reset elements to allow replay?
          // "Headline SplitText reveal on first enter".
          // If we want replay on re-enter:
          // gsap.set(steps, { y: 50, opacity: 0 });
        }
      } else {
        // Normal Scroll Mode (for inner pages)
        steps.forEach((step, i) => {
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
  }, [isActive]);

  const steps = [
    { num: "01", title: "Discover", desc: "We dig deep into your business goals, audience, and market landscape." },
    { num: "02", title: "Design", desc: "Crafting visual systems and interfaces that are intuitive and impactful." },
    { num: "03", title: "Build", desc: "Clean code, scalable architecture, and pixel-perfect implementation." },
    { num: "04", title: "Launch", desc: "QA, testing, and a smooth go-live process with post-launch support." }
  ];

  return (
    <section ref={containerRef} className="bg-black text-white py-24 px-6 md:px-12 w-full h-full flex flex-col justify-center" data-index="5">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center md:text-left">The Process</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="process-step border-t border-gray-800 pt-6 relative group hover:border-brand-orange transition-colors duration-500 opacity-100">
              {/* Note: opacity-100 default, GSAP handles hide from/to */}
              <span className="text-4xl md:text-5xl font-mono font-bold text-gray-800 mb-6 block group-hover:text-white transition-colors duration-500">
                {step.num}
              </span>
              <h3 className="text-2xl font-bold font-display mb-3 text-brand-orange">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
