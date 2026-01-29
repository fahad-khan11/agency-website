"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus, Target, Palette, Code, Layers } from "lucide-react";
import gsap from "@/lib/gsap";


const services = [
  {
    id: "01",
    title: "Brand Strategy",
    desc: "We build brands that stand slightly to the left of normal. Includes logo systems, visual guidelines, tone of voice, and brand architecture.",
    icon: Target
  },
  {
    id: "02",
    title: "Product Design",
    desc: "User-centric UI/UX design for web and mobile applications. We focus on clarity, conversion, and delight.",
    icon: Palette
  },
  {
    id: "03",
    title: "Web Development",
    desc: "Robust front-end and back-end engineering using modern stacks (Next.js, React, Node). Performance-obsessed and SEO-ready.",
    icon: Code
  },
  {
    id: "04",
    title: "Motion & Interaction",
    desc: "Adding life to interfaces through WebGL, GSAP animations, and micro-interactions that guide and reward the user.",
    icon: Layers
  }
];

export default function Services({ isActive }: { isActive?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
  };

  // Handle GSAP Accordion Animation
  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
        if (!el) return;
        
        const isOpen = openIndex === index;
        if (isOpen) {
            gsap.to(el, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                overwrite: true
            });
        } else {
            gsap.to(el, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
                overwrite: true
            });
        }
    });
  }, [openIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
         const anims = gsap.utils.toArray<HTMLElement>(".service-anim");
         
         const animateIn = () => {
             gsap.fromTo(anims, 
                 { y: 50, opacity: 0 },
                 { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", overwrite: true }
             );
         };

         if (isActive !== undefined) {
             if (isActive) animateIn();
         } else {
             gsap.from(anims, {
                scrollTrigger: {
                   trigger: containerRef.current,
                   start: "top 70%", 
                },
                y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out"
             });
         }
    }, containerRef);
    return () => ctx.revert();
  }, [isActive]);

  return (
    <section ref={containerRef} id="services" className="bg-[#F6F6F6] text-black py-24 px-6 md:px-12 w-full min-h-screen flex flex-col justify-center section-panel relative" data-index="3">
      {/* Background Decor - Subtle */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[50vw] h-[50vw] bg-white rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start relative z-10">
        {/* Left Column */}
        <div className="flex flex-col justify-start lg:sticky lg:top-32 h-fit">
          <div className="service-anim flex items-center gap-3 mb-6">
             <div className="h-[2px] w-6 bg-brand-orange"></div>
             <span className="text-brand-orange font-mono text-sm tracking-widest uppercase">Our Expertise</span>
          </div>
          
          <h2 className="service-anim text-5xl md:text-6xl font-display font-semibold leading-[1.1] tracking-tight mb-8">
            Digital solutions <br/> that <span className="italic text-gray-400 font-medium">scale.</span>
          </h2>
          <p className="service-anim text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg mb-12">
            We don't just make things look good. We build comprehensive design systems and digital products that function flawlessly.
          </p>
          
          <div className="service-anim hidden lg:block">
             <div className="flex gap-16 border-t border-gray-300 pt-8">
                <div className="flex flex-col gap-1">
                    <span className="text-4xl font-bold font-display text-gray-900">10+</span>
                    <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">Years Exp</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-4xl font-bold font-display text-gray-900">50+</span>
                    <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">Awards Won</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="flex flex-col service-anim gap-4 lg:mt-24"> 
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            const Icon = service.icon;
            
            return (
                <div key={service.id} className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand-orange/30 shadow-xl' : 'border-transparent shadow-sm hover:shadow-md hover:bg-[#f66d41] hover:border-[#ff6b00]'}`}>
                <button 
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 md:p-6 flex items-center justify-between text-left transition-colors"
                >
                    <div className="flex items-center gap-5 md:gap-6">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-orange text-white' : 'bg-[#F2F4F7] text-gray-600 group-hover:bg-white group-hover:text-[#ff6b00]'}`}>
                         <Icon
                            size={26}
                            strokeWidth={isOpen ? 2 : 1.5}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    <span className={`text-xl font-medium font-display transition-colors ${isOpen ? 'text-black' : 'text-gray-700 group-hover:text-white'}`}>
                        {service.title}
                    </span>
                    </div>
                    <div className="relative w-8 h-8 flex items-center justify-center">
                       <Minus size={20} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 text-brand-orange' : 'opacity-0 rotate-90 text-gray-400'}`} />
                       <Plus size={20} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0 text-gray-400 group-hover:text-white'}`} />
                    </div>
                </button>
                
                <div 
                    ref={(el) => { contentRefs.current[index] = el; }}
                    className="h-0 opacity-0 overflow-hidden"
                >
                    <div className="p-6 md:p-8 pt-0 pl-[4.5rem] md:pl-[5.5rem] pr-10">
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg font-light">
                            {service.desc}
                        </p>
                    </div>
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
