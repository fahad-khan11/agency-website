"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Hero({ isActive }: { isActive?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('hero');

  useEffect(() => {
    if (isActive !== undefined && !isActive) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Initial states
      gsap.set(".hero-char", { y: "120%", rotateX: -80 });
      gsap.set(".hero-fade-up", { y: 40, opacity: 0 });
      gsap.set(".hero-orb", { scale: 0 });
      gsap.set(".hero-ring", { scale: 0.5, opacity: 0, rotation: -45 });
      gsap.set(".nav-item", { y: -20, opacity: 0 });
      gsap.set(".hero-accent-line", { scaleX: 0 });
      gsap.set(".hero-dot-pulse", { scale: 0 });
      gsap.set(".hero-bottom-bar", { y: 30, opacity: 0 });

      // Main entrance sequence
      tl
        .to(".hero-orb", {
          scale: 1,
          duration: 2,
          stagger: 0.2,
          ease: "expo.out",
        })
        .to(".hero-ring", {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: "expo.out"
        }, "-=1.8")
        .to(".hero-char", {
          y: "0%",
          rotateX: 0,
          duration: 1.3,
          stagger: 0.04,
          ease: "power4.out",
        }, "-=1.4")
        .to(".nav-item", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
        }, "-=1.0")
        .to(".hero-accent-line", {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
        }, "-=1.0")
        .to(".hero-fade-up", {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
        }, "-=0.8")
        .to(".hero-dot-pulse", {
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(3)"
        }, "-=0.5")
        .to(".hero-bottom-bar", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");

      // Spinning rings
      gsap.to(".hero-ring-spin", {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".hero-ring-spin-reverse", {
        rotation: -360,
        duration: 35,
        repeat: -1,
        ease: "none"
      });

      // Pulsing orbs
      gsap.to(".hero-orb-pulse", {
        scale: 1.15,
        opacity: 0.7,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1
      });

      // Interactive mouse parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5);
        const yPos = (clientY / innerHeight - 0.5);

        gsap.to(".parallax-deep", {
          x: xPos * 50,
          y: yPos * 50,
          duration: 1.5,
          ease: "power2.out"
        });

        gsap.to(".parallax-mid", {
          x: xPos * -30,
          y: yPos * -30,
          duration: 1.2,
          ease: "power2.out"
        });

        gsap.to(".parallax-near", {
          x: xPos * 20,
          y: yPos * 20,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  // Split text into characters for animation
  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block overflow-hidden" style={{ perspective: "600px" }}>
        <span className="hero-char inline-block" style={{ transformOrigin: "bottom center" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-screen w-full bg-[#040406] text-white flex flex-col overflow-hidden isolate"
    >
      {/* === Animated Background Mesh === */}
      <div className="absolute inset-0 z-0">
        <div className="hero-orb hero-orb-pulse parallax-deep absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full hero-gradient-cyan opacity-40 blur-[100px]"></div>
        <div className="hero-orb hero-orb-pulse parallax-mid absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full hero-gradient-blue opacity-30 blur-[100px]"></div>
        <div className="hero-orb hero-orb-pulse parallax-near absolute top-[40%] left-[50%] w-[25vw] h-[25vw] rounded-full hero-gradient-purple opacity-20 blur-[120px]"></div>
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 z-0 hero-dot-grid opacity-[0.035]"></div>

      {/* === Orbital Rings === */}
      <div className="absolute inset-0 z-[1] pointer-events-none hidden lg:block">
        <div className="hero-ring hero-ring-spin absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full border border-white/[0.04]">
          <div className="hero-dot-pulse absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00B4D9] shadow-[0_0_10px_#00B4D9]"></div>
          <div className="hero-dot-pulse absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
        </div>
        <div className="hero-ring hero-ring-spin-reverse absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vmin] h-[50vmin] rounded-full border border-white/[0.03]">
          <div className="hero-dot-pulse absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a78bfa]"></div>
        </div>
        <div className="hero-ring hero-ring-spin absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[30vmin] h-[30vmin] rounded-full border border-dashed border-white/[0.03]"></div>
      </div>

      {/* === Main Content === */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-24">

        {/* Tagline badge */}
        <div className="hero-fade-up mb-8 flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D9] animate-pulse"></div>
          <span className="text-[#00B4D9] font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium">
            {t('tagline')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-display font-black text-center leading-[0.85] tracking-tighter uppercase relative mb-4">
          <div className="hero-title-line text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[8.5vw]">
            {splitText(t('title1'))}
          </div>
          <div className="hero-title-line text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9.5vw] xl:text-[8.5vw] flex items-baseline justify-center gap-[0.15em]">
            <span className="inline-flex">
              {t('title2').split("").map((char, i) => (
                <span key={i} className="inline-block overflow-hidden" style={{ perspective: "600px" }}>
                  <span className="hero-char inline-block hero-text-gradient italic font-serif" style={{ transformOrigin: "bottom center" }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </span>
            <span className="inline-flex">
              {splitText(t('title3'))}
            </span>
          </div>
        </h1>

        {/* Accent line */}
        <div className="hero-accent-line h-[2px] w-[200px] sm:w-[280px] bg-gradient-to-r from-transparent via-[#00B4D9] to-transparent mb-8 origin-center"></div>

        {/* Description */}
        <div className="hero-fade-up text-center max-w-2xl mb-10">
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            {t('description')}{' '}
            <span className="text-white font-medium hero-text-gradient-subtle">{t('descriptionBold')}</span>{' '}
            {t('descriptionEnd')}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-fade-up flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="hero-cta-primary group relative inline-flex items-center gap-3 px-8 py-4 font-display font-bold text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] text-[#040406]"
          >
            <span className="relative z-10">Start a Project</span>
            <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-display font-bold text-sm uppercase tracking-wider rounded-full transition-all duration-500 hover:border-white/25 hover:bg-white/[0.04] backdrop-blur-sm hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <span>View Our Work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gray-400 group-hover:text-white" />
          </a>
        </div>
      </div>

      {/* === Bottom Info Bar === */}
      <div className="hero-bottom-bar relative z-10 w-full">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-5">
            {/* Stats */}
            {/* <div className="flex items-center gap-6 sm:gap-10">
              {[
                { val: "150+", label: "Projects" },
                { val: "50+", label: "Clients" },
                { val: "5+", label: "Years" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <span className="text-lg sm:text-xl font-display font-black text-white">{stat.val}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div> */}

            {/* Location + Scroll */}
            {/* <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D9]"></div>
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">{t('basedIn')}</span>
                <span className="text-xs sm:text-sm font-medium text-white/70">{t('location')}</span>
              </div>
              <div className="hero-scroll-indicator flex items-center gap-2 text-gray-600">
                <div className="w-[1px] h-5 bg-gradient-to-b from-gray-600 to-transparent hero-scroll-line"></div>
                <span className="text-[9px] font-mono uppercase tracking-widest">Scroll</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Ticker */}
        <div className="w-full overflow-hidden py-2.5 bg-white/[0.02] border-t border-white/[0.04]">
          <div className="flex animate-ticker w-max">
            {Array(14).fill(t('ticker')).map((text, i) => (
              <span key={i} className="text-[10px] font-bold text-gray-700 tracking-[0.2em] px-4 whitespace-nowrap">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* === Styles === */}
      <style jsx>{`
        .hero-gradient-cyan {
          background: radial-gradient(circle, #00B4D9 0%, transparent 70%);
        }
        .hero-gradient-blue {
          background: radial-gradient(circle, #1e40af 0%, transparent 70%);
        }
        .hero-gradient-purple {
          background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
        }

        .hero-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hero-text-gradient {
          background: linear-gradient(135deg, #00B4D9 0%, #a78bfa 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-text-gradient-subtle {
          background: linear-gradient(90deg, #fff 0%, #00B4D9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-cta-primary {
          background: linear-gradient(135deg, #00B4D9 0%, #00d4fc 50%, #00B4D9 100%);
          background-size: 200% 100%;
          box-shadow: 0 0 30px rgba(0, 180, 217, 0.3), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.5s ease;
        }
        .hero-cta-primary:hover {
          background-position: 100% 0;
          box-shadow: 0 0 50px rgba(0, 180, 217, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }

        .hero-scroll-line {
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.5); }
        }
      `}</style>
    </section>
  );
}
