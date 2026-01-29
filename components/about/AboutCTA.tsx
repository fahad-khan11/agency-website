"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function AboutCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        gsap.from(".cta-anim", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out"
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#f66c40] text-white py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl flex flex-col items-center gap-8">
            <h2 className="cta-anim text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
                Let's build the future <br className="hidden md:block" /> of your brand.
            </h2>
            
            <p className="cta-anim text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
                We combine aesthetic excellence with engineering precision to deliver digital products that stand the test of time.
            </p>

            <div className="cta-anim pt-4">
                <Link 
                    href="/contact" 
                    className="group inline-flex items-center gap-3 bg-white text-[#f66c40] px-10 py-5 rounded-full text-xl font-bold tracking-wide hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <span>Start Your Project</span>
                    <MoveRight className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
                </Link>
            </div>
        </div>
    </section>
  );
}
