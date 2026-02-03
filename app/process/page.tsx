"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out"
      });

      // Process steps animation
      const steps = gsap.utils.toArray<HTMLElement>(".process-card");
      steps.forEach((step, i) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          duration: 1,
          delay: i * 0.1,
          ease: "power3.out"
        });
      });

      // Image reveal animations
      const images = gsap.utils.toArray<HTMLElement>(".process-image");
      images.forEach((img) => {
        gsap.from(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 75%",
            toggleActions: "play none none reverse"
          },
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const processSteps = [
    {
      num: "01",
      title: "Discover",
      desc: "We dig deep into your business goals, audience, and market landscape. Through workshops and research, we uncover what makes your brand unique and how to position it for maximum impact in the digital space.",
      image: "/process-step-1.png",
      highlights: ["Stakeholder workshops", "Market research", "Competitive analysis"]
    },
    {
      num: "02",
      title: "Design",
      desc: "Crafting visual systems and interfaces that are intuitive and impactful. We blend strategy with aesthetics to create design solutions that don't just look good—they convert and engage.",
      image: "/process-step-2.png",
      highlights: ["UI/UX design", "Brand identity", "Design systems"]
    },
    {
      num: "03",
      title: "Build",
      desc: "Clean code, scalable architecture, and pixel-perfect implementation. Our development team brings designs to life using modern tech stacks, ensuring performance, accessibility, and SEO excellence.",
      image: "/process-step-3.png",
      highlights: ["Front-end development", "Back-end integration", "Performance optimization"]
    },
    {
      num: "04",
      title: "Launch",
      desc: "QA, testing, and a smooth go-live process with post-launch support. We don't just ship and disappear—we monitor, optimize, and ensure your digital product thrives in the real world.",
      image: null,
      highlights: ["Quality assurance", "Deployment", "Ongoing support"]
    }
  ];

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-display font-black mb-8 bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              How We Build Digital Experiences
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A proven methodology that transforms ambitious ideas into market-leading digital products. From strategy to launch, we're with you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <div
              key={step.num}
              className={`process-card mb-32 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex flex-col md:items-center gap-12`}
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-6xl md:text-7xl font-mono font-bold text-cyan-500/20">
                    {step.num}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white">
                    {step.title}
                  </h2>
                </div>

                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  {step.desc}
                </p>

                <div className="space-y-3 pt-4">
                  {step.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className="flex-1">
                {step.image ? (
                  <div className="process-image relative aspect-square rounded-2xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-colors duration-500 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="process-image aspect-square rounded-2xl border-2 border-dashed border-gray-800 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-center space-y-4 relative z-10">
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-cyan-500/50 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-cyan-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-mono text-sm">Launch Ready</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display font-black">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's build something that refuses to be ignored. Tell us about your vision, and we'll craft a digital experience that dominates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <a
              href="/contact"
              className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Get Started
            </a>
            <a
              href="/projects"
              className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-full hover:border-cyan-500 transition-all duration-300 hover:scale-105"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
