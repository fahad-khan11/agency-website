"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

const SplitText = ({ children, className, highlights = [] }: { children: string, className?: string, highlights?: string[] }) => {
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlighted = highlights.includes(word.replace(/[^a-zA-Z0-9]/g, "")) || highlights.includes(word);
        return (
            <span key={i} className="inline-block overflow-hidden align-top mr-[0.25em] -mb-[0.1em] pb-[0.1em]">
              <span className={`word-anim inline-block translate-y-full opacity-0 will-change-transform ${isHighlighted ? "text-[#f66e40]" : ""}`}>
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

  useEffect(() => {
    // ... (GSAP context remains same, omitted for brevity if not changing logic)
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
    <section ref={containerRef} className="w-full min-h-screen bg-[#F0F0F0] text-black py-24 px-6 md:px-12 flex flex-col justify-center section-panel relative overflow-hidden" data-index="1">
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col md:flex-row gap-12 md:gap-20 items-start">
        
        <div className="md:w-1/4 flex flex-col justify-start pt-5">
           <div className="flex flex-col gap-6">
               <span className="block text-sm font-mono text-white bg-[#f66e40] uppercase tracking-widest px-3 py-1 font-bold w-max mb-2">Capabilities</span>
               <div className="flex flex-col gap-0">
                {["Brand Identity", "Web Design", "Creative Dev", "Motion Direction"].map((tag, i) => (
                  <div key={tag} className="tag-anim group relative py-6 border-b border-gray-300 cursor-pointer overflow-hidden opacity-0 translate-y-5">
                    <div className="absolute inset-0 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out -z-10"></div>
                    <div className="flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300">
                        <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-brand-orange group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300">0{i+1}</span>
                            <span className="text-xl font-bold font-display uppercase tracking-tight text-gray-900 group-hover:text-white transition-colors duration-300">{tag}</span>
                        </div>
                    </div>
                  </div>
                ))}
               </div>
           </div>
        </div>
        <div className="md:w-3/4 flex flex-col justify-start relative">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] tracking-tight text-gray-900 mb-10 relative z-10">
            <SplitText highlights={["digital", "narratives."]}>We turn complex ideas into clean, compelling digital narratives.</SplitText>
          </h2>
          <div className="flex flex-col md:flex-row items-end justify-between gap-10">
              <div className="tag-anim opacity-0 translate-y-5 flex items-start gap-6 ml-1 max-w-xl">
                 <div className="h-[2px] w-12 bg-brand-orange mt-3 flex-shrink-0"></div>
                 <p className="text-lg text-gray-600 leading-relaxed font-light text-balance">
                    Our approach blends strategic thinking with obsessively crafted visuals to drive real business growth.
                 </p>
              </div>
               <div className="badge-anim opacity-0 scale-50 hidden lg:flex items-center justify-center w-32 h-32 rounded-full relative flex-shrink-0 border border-gray-200 bg-white">
                  <div className="absolute inset-1 border border-dashed border-gray-300 rounded-full"></div>
                  <span className="w-full h-full p-2 animate-[spin_10s_linear_infinite]">
                     <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                        <text>
                           <textPath href="#curve" className="text-[12px] font-mono font-bold uppercase tracking-[0.18em] fill-gray-900">
                              • DIGITAL • ALCHEMY • DESIGN
                           </textPath>
                        </text>
                     </svg>
                  </span>
                  <div className="absolute w-2 h-2 bg-brand-orange rounded-full"></div>
               </div>
          </div>
        </div>

      </div>
    </section>
  );
}
