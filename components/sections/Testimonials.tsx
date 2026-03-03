"use client";

import { Quote } from "lucide-react";
import { useMemo } from "react";

export default function Testimonials({ 
  isActive, 
  initialData, 
  initialHeader 
}: { 
  isActive?: boolean; 
  initialData?: any; 
  initialHeader?: any; 
}) {
  const testimonialsToShow = useMemo(() => {
    if (!initialData || !Array.isArray(initialData)) return [];
    // Map Strapi structure to component structure
    return initialData.map((item: any) => {
      const attrs = item.attributes || item;
      return {
        id: item.id,
        quote: attrs.quote,
        author: attrs.author,
        role: attrs.role,
        color: attrs.color || "bg-indigo-500"
      };
    });
  }, [initialData]);

  const header = useMemo(() => {
    return initialHeader?.title || "Client Stories";
  }, [initialHeader]);

  return (
    <section className="bg-[#040406] text-white h-full flex flex-col px-6 md:px-12 section-panel overflow-hidden" data-index="6">

      {/* Fixed Header */}
      <div className="max-w-7xl mx-auto w-full pt-10 md:pt-16 pb-4 md:pb-8 flex-shrink-0 sticky top-0 bg-[#040406] z-10 transition-colors">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">{header}</h2>
        <div className="h-1 w-16 md:w-20 bg-[#00b4d9] mt-2"></div>
      </div>

      {/* Internal Scroll Container */}
      <div className="inner-panel-scroll-horizontal flex-1 overflow-x-auto overflow-y-hidden no-scrollbar w-full max-w-full pb-2 md:pb-12">
        <div className="flex flex-row gap-6 md:gap-8 items-center h-full min-h-[420px] md:min-h-[450px]">
          {testimonialsToShow.map((testimonial: any) => {
            return (
              <div
                key={testimonial.id}
                className="bg-white/[0.03] p-6 sm:p-8 md:p-10 rounded-2xl border border-white/5 backdrop-blur-sm shadow-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 min-w-[300px] sm:min-w-[350px] md:min-w-[450px] max-w-[300px] sm:max-w-[350px] md:max-w-[450px] flex flex-col justify-between h-[360px] sm:h-[380px] md:h-[400px] flex-shrink-0 whitespace-normal group"
              >
                <div>
                  <Quote className="text-[#00b4d9] w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-4 opacity-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                  <p className="text-base sm:text-lg md:text-xl font-serif italic text-white/80 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 p-[1px] flex-shrink-0">
                    <div className={`w-full h-full rounded-full ${testimonial.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold font-display text-sm uppercase tracking-widest text-white group-hover:text-[#00b4d9] transition-colors">{testimonial.author}</h4>
                    <p className="text-xs text-gray-400 font-mono tracking-tight">{testimonial.role}</p>
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
