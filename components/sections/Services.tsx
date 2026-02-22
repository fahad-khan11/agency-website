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
    <section
      ref={containerRef}
      id="services"
      className="bg-[#040406] text-white py-12 md:py-14 px-6 md:px-12 w-full h-full flex flex-col section-panel relative overflow-y-auto"
      data-index="3"
    >
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10">
        {/* Left Column */}
        <div className="flex flex-col justify-start lg:sticky lg:top-32 h-fit">
          <div className="service-anim flex items-center gap-3 mb-4">
            <div className="h-[2px] w-6 bg-[#00b4d9]"></div>
            <span className="text-[#00b4d9] font-mono text-xs tracking-widest uppercase font-bold">{t('expertise')}</span>
          </div>

          <h2 className="service-anim text-4xl md:text-5xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-white">
            {t('title')} <br /> <span className="italic text-white/60 font-medium">{t('titleHighlight')}</span>
          </h2>
          <p className="service-anim text-gray-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
            {t('description')}
          </p>

          <div className="service-anim hidden lg:block">
            <div className="flex gap-12 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold font-display text-white">10+</span>
                <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">{t('yearsExp')}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold font-display text-white">50+</span>
                <span className="text-xs font-mono uppercase text-gray-500 tracking-wider">{t('awardsWon')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Accordion */}
        <div className="flex flex-col service-anim gap-4 lg:mt-16">
          {serviceKeys.map((service, index) => {
            const isOpen = openIndex === index;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className={`group transition-all duration-500 overflow-hidden border rounded-2xl ${isOpen
                    ? 'bg-white/[0.08] border-[#00b4d9]/40 shadow-[0_0_30px_rgba(0,180,217,0.1)]'
                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10'
                  }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 md:p-6 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen
                        ? 'bg-[#00b4d9] text-[#040406] shadow-[0_0_20px_rgba(0,180,217,0.4)]'
                        : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-[#00b4d9]'
                      }`}>
                      <Icon
                        size={24}
                        strokeWidth={isOpen ? 2.5 : 2}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className={`text-xl md:text-2xl font-bold font-display transition-colors ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'
                      }`}>
                      {t(`${service.key}.title`)}
                    </span>
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Minus size={20} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 text-[#00b4d9]' : 'opacity-0 rotate-90 text-gray-600'}`} />
                    <Plus size={20} className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0 text-gray-500 group-hover:text-white'}`} />
                  </div>
                </button>

                <div
                  ref={(el) => { contentRefs.current[index] = el; }}
                  className="h-0 opacity-0 overflow-hidden"
                >
                  <div className="p-6 pt-0 pl-[4.2rem] md:pl-[5.2rem] pr-8">
                    <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
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
