"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ReactLenis from "lenis/react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // @ts-ignore
  const project = projects.find((p) => p.slug === slug);
  const container = useRef(null);

  if (!project) {
    notFound();
  }

  // Pre-calculate next project for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Helper to determine media type
  const getMediaType = (src: string) => {
    if (!src) return 'unknown';
    if (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov')) return 'video';
    return 'image';
  };

  useGSAP(() => {
    // Hero Text Reveal
    gsap.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.out",
    });

    // Hero Media Parallax
    gsap.to(".hero-media", {
      yPercent: 30,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Sticky Gallery Animation
    // We achieve the "name under it" + "sticky/stacking" effect using CSS sticky positioning
    // GSAP is used here for entering animations or subtle scrubs
    const galleryItems = gsap.utils.toArray<HTMLElement>(".gallery-item");

    galleryItems.forEach((item, i) => {
      // Optional interaction
    });

  }, { scope: container });

  // Component for Media Display (Video/Image) with Fallback
  const MediaDisplay = ({ src, alt, className, priority = false }: { src?: string; alt: string; className?: string; priority?: boolean }) => {
    const [hasError, setHasError] = useState(false);
    const type = getMediaType(src || '');

    if (!src || hasError) {
      // Fallback Placeholder
      return (
        <div className={`flex items-center justify-center bg-gray-900 border border-white/10 ${className}`}>
          <div className="text-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">Media Unavailable</p>
            <div className="w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center mx-auto">
              <span className="text-2xl text-gray-500">?</span>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'video') {
      return (
        <video
          className={className}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={() => setHasError(true)}
      />
    );
  };

  return (
    <ReactLenis root>
      <main ref={container} className="bg-black text-white min-h-screen">

        {/* Navigation */}
        <nav className="fixed top-24 left-0 w-full p-6 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
          <Link href="/projects" className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors uppercase text-sm tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Work
          </Link>
          <div className="uppercase text-sm tracking-widest font-bold">{project.category}</div>
        </nav>

        {/* Hero Section */}
        <header className="pt-40 md:pt-60 pb-12 px-6 md:px-12 container mx-auto relative z-10">
          <h1 className="hero-text text-6xl md:text-9xl font-display font-bold mb-8 leading-none tracking-tighter mix-blend-difference">
            {project.title}
          </h1>
          <p className="hero-text text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Hero Media (Video Loop) */}
        <div className="hero-container w-full h-[80vh] relative overflow-hidden mb-24 z-0">
          {/* Priority Hero Video with Parallax Wrapper */}
          <div className="hero-media w-full h-[120%] relative -top-[10%]">
            <MediaDisplay
              src={project.heroVideo || project.heroImage}
              alt={`${project.title} Hero`}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 pointer-events-none" />
        </div>

        {/* Project Details Grid */}
        <section className="container mx-auto px-6 md:px-12 py-24 border-t border-gray-900 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="block text-gray-500 text-sm uppercase tracking-widest mb-2">Client</span>
            <p className="text-xl font-medium">{project.client || "Confidential"}</p>
          </div>
          <div>
            <span className="block text-gray-500 text-sm uppercase tracking-widest mb-2">Year</span>
            <p className="text-xl font-medium">{project.year}</p>
          </div>
          <div>
            <span className="block text-gray-500 text-sm uppercase tracking-widest mb-2">Services</span>
            <ul className="text-lg text-gray-300">
              {project.services?.map((s) => <li key={s}>{s}</li>) || <li>Design & Dev</li>}
            </ul>
          </div>
          <div>
            <span className="block text-gray-500 text-sm uppercase tracking-widest mb-2">Website</span>
            {project.website ? (
              <a href={`https://${project.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brand-orange transition-colors text-xl font-medium">
                {project.website} <ArrowUpRight className="w-4 h-4" />
              </a>
            ) : <span className="text-gray-600">Offline</span>}
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="container mx-auto px-6 md:px-12 py-32 grid md:grid-cols-12 gap-12 bg-neutral-900/20 rounded-3xl mx-6 mb-20">
          <div className="md:col-span-5">
            <h2 className="text-3xl font-display font-semibold mb-6 text-[#00b4d9]">The Challenge</h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              {project.challenge || "Every project starts with a unique problem. We identify the core constraints and opportunities to define a clear path forward."}
            </p>
          </div>
          <div className="md:col-span-2 hidden md:block" />
          <div className="md:col-span-5">
            <h2 className="text-3xl font-display font-semibold mb-6 text-[#00b4d9]">The Solution</h2>
            <p className="text-gray-200 leading-relaxed text-xl">
              {project.solution || "Our approach combines strategic insight with creative execution. We crafted a solution that not only meets the requirements but elevates the brand experience."}
            </p>
          </div>
        </section>

        {/* Sticky/Stacking Gallery Section */}
        {/* The images stack on top of each other while scrolling */}
        <section className="relative w-full">
          {project.images?.map((mediaSrc, index) => (
            <div key={index} className="gallery-item sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black border-t border-white/10">

              {/* Background Name (Under Layer) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="text-center">
                  <span className="block text-brand-orange text-sm tracking-[0.2em] font-bold mb-4 uppercase">
                    Detail Shot
                  </span>
                  <h3 className="text-[10vw] font-display font-bold text-gray-900 leading-none uppercase">
                    {(index + 1).toString().padStart(2, '0')}
                  </h3>
                </div>
              </div>

              {/* Media Container (Top Layer) */}
              <div className="media-container relative w-[90vw] md:w-[70vw] aspect-[16/9] z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900 group">
                <MediaDisplay
                  src={mediaSrc}
                  alt={`${project.title} detail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
              </div>

            </div>
          ))}
        </section>

        {/* Next Project */}
        <Link href={`/projects/${nextProject.slug}`} className="block group relative overflow-hidden h-[80vh] bg-neutral-900 border-t border-white/10 mt-20">
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-gray-500 uppercase tracking-widest mb-4 group-hover:mb-6 transition-all">Next Project</span>
            <h2 className="text-5xl md:text-9xl font-display font-bold group-hover:scale-105 transition-transform duration-500 relative mix-blend-difference">
              {nextProject.title}
            </h2>
          </div>
          {/* Background Video/Image for Next Project */}
          <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 saturate-0 group-hover:saturate-100">
            <MediaDisplay
              src={nextProject.heroVideo || nextProject.heroImage}
              alt={nextProject.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </main>
    </ReactLenis>
  );
}
