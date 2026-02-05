"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus, Target, Palette, Code, Layers } from "lucide-react";
import gsap from "@/lib/gsap";
import { useTranslations } from 'next-intl';


const serviceKeys = [
  {
    id: "01",
    key: "brandStrategy",
    icon: Target
  },
  {
    id: "02",
    key: "productDesign",
    icon: Palette
  },
  {
    id: "03",
    key: "webDevelopment",
    icon: Code
  },
  {
    id: "04",
    key: "motionInteraction",
    icon: Layers
  }
];

export default function Services({ isActive }: { isActive?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations('services');

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
    <section ref={containerRef} id="services" className="bg-[#F6F6F6] text-black py-12 md:py-14 px-6 md:px-12 w-full h-full flex flex-col section-panel relative overflow-y-auto" data-index="3">
      {/* Background Decor - Subtle */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[50vw] h-[50vw] bg-white rounded-full blur-[150px] opacity-60 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
        {/* Left Column */}
        <div className="flex flex-col justify-start lg:sticky lg:top-32 h-fit">
          <div className="service-anim flex items-center gap-3 mb-4">
            <div className="h-[2px] w-6 bg-[#00b4d9]"></div>
            <span className="text-[#00b4d9] font-mono text-xs tracking-widest uppercase font-bold">{t('expertise')}</span>
          </div>

          <h2 className="service-anim text-4xl md:text-5xl font-display font-semibold leading-[1.1] tracking-tight mb-6">
            {t('title')} <br /> <span className="italic text-gray-400 font-medium">{t('titleHighlight')}</span>
          </h2>
          <p className="service-anim text-gray-500 text-base md:text-lg leading-relaxed max-w-lg mb-10">
            {t('description')}
          </p>

          <div className="service-anim hidden lg:block">
            <div className="flex gap-12 border-t border-gray-300 pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold font-display text-gray-900">10+</span>
                <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">{t('yearsExp')}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold font-display text-gray-900">50+</span>
                <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">{t('awardsWon')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="flex flex-col service-anim gap-3 lg:mt-16">
          {serviceKeys.map((service, index) => {
            const isOpen = openIndex === index;
            const Icon = service.icon;

            return (
              <div key={service.id} className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#00b4d9]/30 shadow-xl' : 'border-transparent shadow-sm hover:shadow-md hover:bg-[#00b4d9] hover:border-[#00b4d9]'}`}>
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 md:p-5 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#00b4d9] text-white' : 'bg-[#F2F4F7] text-gray-600 group-hover:bg-white group-hover:text-[#00b4d9]'}`}>
                      <Icon
                        size={22}
                        strokeWidth={isOpen ? 2 : 1.5}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className={`text-lg font-medium font-display transition-colors ${isOpen ? 'text-black' : 'text-gray-700 group-hover:text-white'}`}>
                      {t(`${service.key}.title`)}
                    </span>
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Minus size={18} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 text-brand-orange' : 'opacity-0 rotate-90 text-gray-400'}`} />
                    <Plus size={18} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0 text-gray-400 group-hover:text-white'}`} />
                  </div>
                </button>

                <div
                  ref={(el) => { contentRefs.current[index] = el; }}
                  className="h-0 opacity-0 overflow-hidden"
                >
                  <div className="p-4 md:p-6 pt-0 pl-[3.5rem] md:pl-[4.5rem] pr-8">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
                      {t(`${service.key}.desc`)}
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
