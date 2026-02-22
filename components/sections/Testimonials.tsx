"use client";

import { Quote } from "lucide-react";
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    id: 1,
    quote: "They completely transformed how we present ourselves online. The attention to detail and creative direction was exactly what we needed to level up.",
    author: "Sarah Jenkins",
    role: "CMO, Apex Finance",
    color: "bg-indigo-500"
  },
  {
    id: 2,
    quote: "Archetype doesn't just build websites, they build brands. The motion design and user experience is first-class. Highly recommended.",
    author: "Marcus Chen",
    role: "Founder, Lumina Scent",
    color: "bg-emerald-500"
  },
  {
    id: 3,
    quote: "A team that truly understands the intersection of art and technology. Our conversion rates doubled after the redesign.",
    author: "Elena Rodriguez",
    role: "Director, Veloce Motors",
    color: "bg-rose-500"
  },
  {
    id: 4,
    quote: "Working with them was a breath of fresh air. They challenged our assumptions and delivered something far beyond our expectations.",
    author: "David Kim",
    role: "CEO, NextGen AI",
    color: "bg-blue-500"
  },
  {
    id: 5,
    quote: "The best agency we’ve partnered with. Their strategic approach to digital branding is unmatched in the industry.",
    author: "Jessica Foster",
    role: "VP Marketing, Solstice",
    color: "bg-amber-500"
  },
  {
    id: 6,
    quote: "From concept to execution, everything was flawless. Our new platform is not just a website, it's an experience.",
    author: "Michael Chang",
    role: "Founder, Orbit Tech",
    color: "bg-cyan-500"
  },
  {
    id: 7,
    quote: "Their velocity and code quality is something we haven't seen in other agencies. A true partner in our growth.",
    author: "Robert Fox",
    role: "CTO, MegaStream",
    color: "bg-purple-500"
  },
  {
    id: 8,
    quote: "We needed a site that could handle high traffic while looking stunning. Archetype delivered on both fronts.",
    author: "Amanda Lowery",
    role: "Head of Product, Velox",
    color: "bg-teal-500"
  },
  {
    id: 9,
    quote: "Design-driven engineering at its finest. They solved complex UX problems with elegant, simple solutions.",
    author: "James Wilson",
    role: "Product Lead, Aura",
    color: "bg-pink-500"
  },
  {
    id: 10,
    quote: "The ROI on this rebrand has been incredible. Our customer engagement metrics have skyrocketed since launch.",
    author: "Sofia Martinez",
    role: "Director of Brand, Nova",
    color: "bg-orange-500"
  }
];

export default function Testimonials({ isActive }: { isActive?: boolean }) {
  const t = useTranslations('testimonials');

  // Only translate first 3 testimonials
  const testimonialsToShow = testimonials.slice(0, 3);


  return (
    <section className="bg-[#040406] text-white h-full flex flex-col px-6 md:px-12 section-panel overflow-hidden" data-index="6">

      {/* Fixed Header */}
      <div className="max-w-7xl mx-auto w-full pt-10 md:pt-16 pb-4 md:pb-8 flex-shrink-0 sticky top-0 bg-[#040406] z-10 transition-colors">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">{t('title')}</h2>
        <div className="h-1 w-16 md:w-20 bg-[#00b4d9] mt-2"></div>
      </div>

      {/* Internal Scroll Container - Targeted by PanelContainer Observer by class name for Horizontal Scroll */}
      <div className="inner-panel-scroll-horizontal flex-1 overflow-x-auto overflow-y-hidden no-scrollbar w-full max-w-full pb-2 md:pb-12">
        <div className="flex flex-row gap-6 md:gap-8 items-center h-full min-h-[420px] md:min-h-[450px]">
          {testimonialsToShow.map((testimonial, i) => {
            const translationKey = `testimonial${i + 1}`;
            return (
              <div
                key={testimonial.id}
                className="bg-white/[0.03] p-6 sm:p-8 md:p-10 rounded-2xl border border-white/5 backdrop-blur-sm shadow-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 min-w-[300px] sm:min-w-[350px] md:min-w-[450px] max-w-[300px] sm:max-w-[350px] md:max-w-[450px] flex flex-col justify-between h-[360px] sm:h-[380px] md:h-[400px] flex-shrink-0 whitespace-normal group"
              >
                <div>
                  <Quote className="text-[#00b4d9] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-4 opacity-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <p className="text-base sm:text-lg md:text-xl font-serif italic text-white/80 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    "{t(`${translationKey}.quote`)}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 p-[1px] flex-shrink-0">
                    <div className={`w-full h-full rounded-full ${testimonial.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold font-display text-sm uppercase tracking-widest text-white group-hover:text-[#00b4d9] transition-colors">{t(`${translationKey}.author`)}</h4>
                    <p className="text-xs text-gray-400 font-mono tracking-tight">{t(`${translationKey}.role`)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>


      <style jsx global>{`
         .no-scrollbar::-webkit-scrollbar {
           display: none;
         }
         .no-scrollbar {
           -ms-overflow-style: none; /* IE and Edge */
           scrollbar-width: none;  /* Firefox */
         }
       `}</style>
    </section>
  );
}
