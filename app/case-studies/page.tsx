"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";

// Case Studies Data
const caseStudies = [
  {
    id: 1,
    title: "Lumina Scent",
    category: "E-Commerce / Branding",
    year: "2024",
    client: "Lumina Organics",
    tagline: "A Sensory Journey Through Organic Scents",
    heroImage: "/case-studies/lumina-hero.png",
    detailImage1: "/case-studies/lumina-detail-1.png",
    detailImage2: "/case-studies/lumina-detail-2.png",
    overview: "We crafted a complete digital experience that evokes the purity and elegance of nature for Lumina Organics, a luxury organic perfume brand. The project encompassed brand identity, e-commerce platform design, and a comprehensive digital marketing strategy.",
    challenge: "Lumina needed a brand identity that stood out in the crowded organic beauty market. The primary challenge was to communicate scent—a purely olfactory experience—through visual and digital mediums without losing the essence of the product. Additionally, they needed to convey luxury while maintaining an authentic connection to nature and sustainability.",
    solution: "We developed a visual language based on fluid, organic shapes and a calming, earth-toned palette. The website features immersive scroll interactions that mimic the diffusion of scent, guiding users through a narrative-driven shopping experience. We created custom botanical illustrations, implemented micro-animations for product interactions, and built a seamless checkout process optimized for conversions.",
    services: ["Brand Identity", "Web Design", "E-Commerce Development", "Digital Strategy", "Content Creation"],
    results: [
      { metric: "215%", label: "Increase in Online Sales" },
      { metric: "4.8x", label: "Return on Investment" },
      { metric: "68%", label: "User Engagement Growth" },
      { metric: "3.2min", label: "Average Session Duration" }
    ],
    keyFeatures: [
      "Custom brand identity with botanical elements",
      "Immersive scroll-based storytelling",
      "Optimized product photography system",
      "Scent profile quiz for personalization",
      "Seamless checkout experience"
    ],
    testimonial: {
      quote: "The team transformed our vision into a digital experience that truly captures the essence of our brand. Our customers frequently comment on how the website makes them feel connected to nature.",
      author: "Sarah Mitchell",
      role: "Founder, Lumina Organics"
    },
    color: "#8B9E7D"
  },
  {
    id: 2,
    title: "Apex Finance",
    category: "Web App / FinTech",
    year: "2023",
    client: "Apex Global",
    tagline: "Redefining the Future of Trading",
    heroImage: "/case-studies/apex-hero.png",
    detailImage1: "/case-studies/apex-detail-1.png",
    detailImage2: "/case-studies/apex-detail-2.png",
    overview: "We designed and built a high-performance trading platform for professional traders and institutions. The platform combines advanced data visualization with an intuitive interface, making complex financial instruments accessible without sacrificing depth or functionality.",
    challenge: "Complex financial data is often overwhelming and intimidating. Apex wanted to democratize access to advanced trading tools while maintaining the depth and speed required by professional traders. The technical challenge included real-time data processing, sub-second response times, and presenting multiple data streams simultaneously without cognitive overload.",
    solution: "We adopted a 'data-first' approach, prioritizing legibility and hierarchy through careful typography and color coding. A modular dashboard system allows users to customize their workspace completely. We implemented WebGL for real-time data visualization, ensuring smooth performance even with high-frequency updates. The design system includes dark mode optimization to reduce eye strain during extended trading sessions.",
    services: ["UX/UI Design", "Frontend Development", "Design System", "Real-time Data Visualization", "Performance Optimization"],
    results: [
      { metric: "3.2M", label: "Active Users" },
      { metric: "99.9%", label: "System Uptime" },
      { metric: "45%", label: "Faster Trade Execution" },
      { metric: "<50ms", label: "Average Response Time" }
    ],
    keyFeatures: [
      "Customizable modular dashboard",
      "Real-time WebGL data visualization",
      "Advanced charting with 50+ indicators",
      "Multi-monitor support",
      "One-click trading execution"
    ],
    testimonial: {
      quote: "This platform has become indispensable for our trading desk. The combination of speed, clarity, and customization gives us a competitive edge in fast-moving markets.",
      author: "Michael Chen",
      role: "Head of Trading, Apex Global"
    },
    color: "#4A90E2"
  },
  {
    id: 3,
    title: "Vogue Editorial",
    category: "Digital Experience",
    year: "2023",
    client: "Vogue Magazine",
    tagline: "Fashion Meets Technology",
    heroImage: "/case-studies/vogue-hero.png",
    detailImage1: "/case-studies/vogue-detail-1.png",
    detailImage2: "/case-studies/vogue-detail-2.png",
    overview: "An interactive editorial piece exploring the intersection of fashion and technology through immersive digital storytelling. We created a scrollytelling experience that brings fashion photography to life, allowing readers to explore content at their own pace while maintaining Vogue's prestigious editorial standards.",
    challenge: "Traditional static editorials fail to capture the dynamic nature of modern fashion and the movement inherent in clothing. Vogue wanted an interactive story that readers could explore at their own pace, blurring the line between reading and watching, while maintaining the sophistication and prestige of the Vogue brand.",
    solution: "We created a cinematic scrollytelling experience where user input drives the narrative progression. Parallax effects, video backgrounds, and typographic animations bring fashion shoots to life. The interface adapts seamlessly from desktop to mobile, ensuring the premium experience translates across all devices. We implemented lazy loading and optimized assets to maintain fast load times despite rich media content.",
    services: ["Art Direction", "Motion Design", "Web Development", "Interactive Storytelling", "Mobile Optimization"],
    results: [
      { metric: "2.5M", label: "Story Views" },
      { metric: "8min", label: "Average Time Spent" },
      { metric: "92%", label: "Completion Rate" },
      { metric: "156%", label: "Social Sharing Increase" }
    ],
    keyFeatures: [
      "Parallax scrolling effects",
      "Integrated video backgrounds",
      "Dynamic typography animations",
      "Seamless mobile adaptation",
      "Social sharing optimization"
    ],
    testimonial: {
      quote: "This project redefined what's possible in digital editorial. The engagement metrics speak for themselves—readers are spending more time with our content than ever before.",
      author: "Alexandra Dubois",
      role: "Digital Director, Vogue Magazine"
    },
    color: "#DC143C"
  }
];

export default function CaseStudiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2
      })
      .to(".hero-subtitle", {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, "-=0.6");

      // Animate case studies on scroll
      const caseStudyElements = document.querySelectorAll(".case-study-section");
      caseStudyElements.forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] md:min-h-[80vh] flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-12 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
        
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent"></div>
        
        {/* Subtle Accent - Much Smaller and Less Prominent */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-[1370px] w-full mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            {/* Small Label */}
            <div className="hero-title opacity-0 translate-y-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">Portfolio</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title opacity-0 translate-y-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] md:leading-[0.95] tracking-tight max-w-5xl px-4">
              Case Studies
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle opacity-0 translate-y-8 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl px-4">
              Explore our portfolio of transformative digital experiences. Each project represents a unique challenge solved through strategic thinking, creative innovation, and technical excellence.
            </p>
            
            {/* Stats */}
            <div className="hero-subtitle opacity-0 translate-y-8 flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="text-brand-orange font-mono text-xs md:text-sm font-bold">
                  {caseStudies.length}
                </span>
                <span className="text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  Projects
                </span>
              </div>
              <span className="text-gray-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <span className="text-gray-400 font-mono text-xs md:text-sm">2023 — 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <section 
          key={study.id} 
          className="case-study-section w-full py-12 md:py-16 lg:py-20 px-4 md:px-12 relative"
        >
          <div className="max-w-[1370px] mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 md:gap-6 mb-12 md:mb-16">
              {/* Case Number */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative">
                  <span 
                    className="text-[80px] sm:text-[100px] md:text-[120px] font-display font-bold leading-none text-white opacity-20"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs md:text-sm font-mono uppercase tracking-widest text-gray-300">
                    Case {index + 1}
                  </span>
                  <div className="h-px w-12 bg-brand-orange"></div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                <span className="text-brand-orange font-mono uppercase tracking-widest">{study.category}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500 font-mono">{study.year}</span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="text-gray-400 text-xs md:text-sm w-full sm:w-auto">Client: <span className="text-white">{study.client}</span></span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight max-w-4xl">
                {study.title}
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light leading-relaxed max-w-3xl">
                {study.tagline}
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden mb-12 md:mb-20 group">
              <Image
                src={study.heroImage}
                alt={study.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Color Accent */}
              <div 
                className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 rounded-full opacity-60 blur-3xl"
                style={{ backgroundColor: study.color }}
              ></div>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">
              <div className="lg:col-span-2">
                <h3 className="text-xs md:text-sm uppercase tracking-widest text-brand-orange mb-3 md:mb-4">Overview</h3>
                <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  {study.overview}
                </p>
              </div>

              <div className="flex flex-col gap-4 md:gap-6">
                <div>
                  <h3 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((service, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-gray-300"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-10">
                <h3 className="text-xs md:text-sm uppercase tracking-widest text-brand-orange mb-4 md:mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-orange"></div>
                  The Challenge
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-10">
                <h3 className="text-xs md:text-sm uppercase tracking-widest text-green-400 mb-4 md:mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  Our Solution
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Detail Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20">
              <div className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden group">
                <Image
                  src={study.detailImage1}
                  alt={`${study.title} detail 1`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden group">
                <Image
                  src={study.detailImage2}
                  alt={`${study.title} detail 2`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12 md:mb-20">
              <h3 className="text-xs md:text-sm uppercase tracking-widest text-brand-orange mb-6 md:mb-8">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {study.keyFeatures.map((feature, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-white/20 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4 md:w-5 atriona-white.pngmd:h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-12 md:mb-20 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-14">
              <h3 className="text-xs md:text-sm uppercase tracking-widest text-brand-orange mb-6 md:mb-10">Results & Impact</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {study.results.map((result, idx) => (
                  <div key={idx} className="flex flex-col gap-1 md:gap-2">
                    <span 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold"
                      style={{ color: study.color }}
                    >
                      {result.metric}
                    </span>
                    <span className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                      {result.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="relative bg-white/[0.02] border-l-4 rounded-lg md:rounded-xl p-6 md:p-10 lg:p-12" style={{ borderLeftColor: study.color }}>
              <div className="flex flex-col gap-4 md:gap-6">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-light italic">
                  "{study.testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold" style={{ backgroundColor: study.color }}>
                    {study.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">{study.testimonial.author}</p>
                    <p className="text-xs md:text-sm text-gray-400">{study.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            {index < caseStudies.length - 1 && (
              <div className="mt-12 md:mt-8 lg:mt-8 mb-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            )}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-orange/5 to-black"></div>
        
        <div className="max-w-[1370px] mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <span className="text-brand-orange font-mono text-xs md:text-sm uppercase tracking-widest">
              Ready to Transform?
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold max-w-4xl leading-tight px-4">
              Let's Create Your Success Story
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed px-4">
              Every great project starts with a conversation. Share your vision, and we'll turn it into reality with the same dedication and expertise you've seen in these case studies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 w-full sm:w-auto px-4">
              <a 
                href="/contact"
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-brand-orange text-white rounded-full font-medium overflow-hidden transition-all hover:shadow-lg hover:shadow-brand-orange/50 text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              </a>
              
              <a 
                href="/projects"
                className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white rounded-full font-medium hover:border-brand-orange hover:bg-brand-orange/10 transition-all text-sm md:text-base"
              >
                View More Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
