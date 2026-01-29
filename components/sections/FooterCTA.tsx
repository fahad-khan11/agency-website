"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

export default function FooterCTA({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       if (isActive !== undefined) {
           if (isActive) {
               gsap.fromTo(".footer-title", 
                 { y: 100, opacity: 0 },
                 { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", overwrite: true }
               );
           }
       } else {
           // Normal
           gsap.from(".footer-title", {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
          });
       }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <footer ref={containerRef} id="contact" className="bg-black text-white py-24 px-6 md:px-12 flex flex-col justify-between min-h-[80vh] section-panel" data-index="7">
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <h2 className="footer-title text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter mb-10 leading-none">
          LET'S BUILD <br/> THE FUTURE.
        </h2>
        
        <a href="mailto:hello@archetype.studio" className="inline-block text-xl md:text-2xl border-b border-white pb-1 hover:text-brand-orange hover:border-brand-orange transition-colors duration-300">
           hello@archetype.studio
        </a>
      </div>

       <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 mt-12 text-sm text-gray-500">
          <p>© 2024 ARCHETYPE. All rights reserved.</p>
          
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
             <a href="#" className="hover:text-white transition-colors">Behance</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
       </div>
    </footer>
  );
}
