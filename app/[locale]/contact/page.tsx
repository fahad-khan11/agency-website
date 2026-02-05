"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import ReactLenis from "lenis/react";
import dynamic from "next/dynamic";
import WorldMap from "@/components/contact/WorldMap";
import { useParams } from "next/navigation";
import { getContactTranslations } from "@/lib/contactTranslations";

const LeafletMap = dynamic(() => import("@/components/contact/LeafletMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-900 animate-pulse rounded-xl" />
});

export default function ContactPage() {
  const container = useRef(null);
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = getContactTranslations(locale);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".contact-reveal", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      delay: 0.2,
    });

    tl.from(".contact-form", {
      x: 50,
      opacity: 0,
      duration: 1,
    }, "-=0.8");

  }, { scope: container });

  return (
    <ReactLenis root>
      <main ref={container} className="min-h-screen bg-black text-white relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-20">

        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00b4d9]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00b4d9]/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="container mx-auto px-6 md:px-12">

          <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 mb-16 md:mb-20">
            {/* Left Column: Info */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h1 className="contact-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 md:mb-8 leading-none">
                  {t.hero.titleStart} <br />
                  <span className="text-[#00b4d9]">{t.hero.titleEnd}</span>
                </h1>
                <p className="contact-reveal text-base sm:text-lg md:text-xl text-gray-400 max-w-lg mb-8 md:mb-10 leading-relaxed">
                  {t.hero.description}
                </p>
              </div>

              <div className="space-y-6 md:space-y-8 contact-reveal">
                <div className="group cursor-pointer">
                  <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t.info.email}</span>
                  <a href="mailto:hello@archetype.studio" className="text-xl sm:text-2xl md:text-3xl font-display hover:text-[#00b4d9] transition-colors flex items-center gap-2">
                    hello@archetype.studio <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t.info.phone}</span>
                    <p className="text-base sm:text-lg text-gray-300">+1 (555) 019-2834</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t.info.office}</span>
                    <p className="text-base sm:text-lg text-gray-300">Karlsruhe, DE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="contact-form bg-neutral-900/30 backdrop-blur-sm border border-white/5 p-6 sm:p-8 md:p-10 rounded-2xl">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.form.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    placeholder={t.form.namePlaceholder}
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-base sm:text-lg md:text-xl focus:border-[#00b4d9] focus:outline-none transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.form.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    placeholder={t.form.emailPlaceholder}
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-base sm:text-lg md:text-xl focus:border-[#00b4d9] focus:outline-none transition-colors placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.form.messageLabel}</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={t.form.messagePlaceholder}
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-base sm:text-lg md:text-xl focus:border-[#00b4d9] focus:outline-none transition-colors placeholder:text-gray-600 resize-none"
                  ></textarea>
                </div>

                <button className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 text-sm rounded-lg hover:bg-[#00b4d9] hover:text-white transition-all duration-300 mt-6">
                  {t.form.submitButton}
                </button>
              </form>
            </div>
          </div>

          {/* Location & Map Section */}
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 contact-reveal">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">{t.location.title}</h2>
                <p className="text-gray-400 max-w-md text-sm md:text-base">
                  {t.location.description}
                </p>
              </div>

              {/*   !!!!  ENABLE THIS IF YOU WANT TO SET CUSTOM LOCATION LIKE IRAN,AFGHANISTAN,INDIA etc...  !!!! 
                   (not recommeneded , reason : becuase it is static and you have to put or set every node manually) */}

              {/* <div className="contact-reveal w-full">
                <WorldMap />
              </div> */}
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 contact-reveal">
                <div className="w-12 h-[1px] bg-[#00b4d9]"></div>
                <span className="text-sm uppercase tracking-widest text-gray-500">{t.location.mapLabel}</span>
              </div>

              <div className="w-full h-[400px] md:h-[500px] contact-reveal border border-white/10 rounded-xl overflow-hidden">
                <LeafletMap position={[49.032786838519634, 8.393529638388353]} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </ReactLenis>
  );
}
