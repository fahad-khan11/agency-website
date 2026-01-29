"use client";

import { Quote } from "lucide-react";

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

  
  return (
    <section className="bg-white text-black h-full flex flex-col pt-24 pb-8 px-6 md:px-12 section-panel" data-index="6">
      
      {/* Fixed Header */}
      <div className="max-w-7xl mx-auto w-full mb-8 flex-shrink-0 z-10 bg-white">
         <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Client Stories</h2>
         <div className="h-1 w-20 bg-brand-orange"></div>
      </div>

      {/* Internal Scroll Container - Targeted by PanelContainer Observer by class name for Horizontal Scroll */}
      <div className="inner-panel-scroll-horizontal flex-1 overflow-x-auto no-scrollbar w-full max-w-full">
         <div className="flex flex-row gap-8 px-6 md:px-12 pb-20 items-center h-full">
             {testimonials.map((t, i) => (
                 <div key={t.id} className="bg-[#F8F9FA] p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow min-w-[350px] md:min-w-[450px] max-w-[450px] flex flex-col justify-between h-[400px] flex-shrink-0 whitespace-normal">
                     <div>
                        <Quote className="text-brand-orange w-8 h-8 mb-4 opacity-80" />
                        <p className="text-lg md:text-xl font-serif italic text-gray-700 leading-relaxed mb-6">
                            "{t.quote}"
                        </p>
                     </div>
                     <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                             <div className={`w-full h-full ${t.color}`}></div>
                         </div>
                         <div>
                             <h4 className="font-bold font-display text-sm uppercase tracking-wide text-black">{t.author}</h4>
                             <p className="text-xs text-gray-500">{t.role}</p>
                         </div>
                     </div>
                 </div>
             ))}
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
