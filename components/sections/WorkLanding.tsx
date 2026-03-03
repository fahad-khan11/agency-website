"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
// import Image from "next/image"; // Kept if needed later, but using standard img or div for now per previous style
import Link from "next/link";

import { useTranslations } from 'next-intl';
import { getCategoryKey } from '@/lib/translationUtils';

export default function WorkLanding({ isActive, strapiData }: { isActive?: boolean; strapiData?: any[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [activeProject, setActiveProject] = useState<string | number | null>(null);

    // Use Strapi data if available, otherwise default to empty array
    const displayProjects = strapiData && strapiData.length > 0 ? strapiData : [];

    const getImageUrl = (media: any) => {
        if (!media) return null;
        const url = media.url || media.data?.attributes?.url || media.attributes?.url;
        if (url && url.startsWith('/')) {
            return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;
        }
        return url || null;
    };
    const t = useTranslations('workLanding');
    const tCategories = useTranslations('categories');

    useEffect(() => {
        // Entrance Animation
        if (isActive !== undefined && !isActive) return;

        // Ensure GSAP context is clean
        const ctx = gsap.context(() => {
            gsap.from(".work-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, [isActive]);

    useEffect(() => {
        // Custom cursor logic
        const moveCursor = (e: MouseEvent) => {
            if (!cursorRef.current) return;
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    useEffect(() => {
        if (activeProject !== null && cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        } else if (cursorRef.current) {
            gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
        }
    }, [activeProject]);

    return (
        <section ref={containerRef} id="work" className="bg-black text-white py-12 md:py-14 px-6 md:px-12 relative h-full flex flex-col section-panel overflow-y-auto" data-index="2">
            <div className="max-w-7xl mx-auto w-full mt-20">
                <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold">{t('title')}</h2>
                    <span className="text-gray-500 hidden md:inline-block text-sm">{t('years')}</span>
                </div>

                <div className="flex flex-col">
                    {displayProjects.map((project: any) => {
                        const id = project.documentId || project.id || project.slug;
                        const title = project.title || project.attributes?.title;
                        const slug = project.slug || project.attributes?.slug;
                        const category = project.category || project.attributes?.category;
                        const year = project.year || project.attributes?.year;
                        
                        return (
                            <Link
                                key={id}
                                href={`/projects/${slug}`}
                                className="block"
                            >
                                <div
                                    className="work-item group relative border-b border-gray-800 py-8 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-colors hover:border-gray-600"
                                    onMouseEnter={() => setActiveProject(id)}
                                    onMouseLeave={() => setActiveProject(null)}
                                >
                                    <div className="z-10 bg-black/50 backdrop-blur-sm md:bg-transparent p-2 md:p-0 rounded pointer-events-none">
                                        <h3 className="text-2xl md:text-4xl font-display font-semibold mb-1 group-hover:text-[#00b4d9] transition-colors">
                                            {title}
                                        </h3>
                                        {/* Strapi category won't always match the translation keys perfectly, so we render it safely */}
                                        <p className="text-gray-400 text-xs md:text-sm">{category}</p>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4 md:mt-0 z-10 transition-transform duration-300 md:group-hover:-translate-x-12">
                                        <span className="text-gray-500 font-mono">{year}</span>
                                        <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Floating Cursor / Image Preview */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[320px] h-[220px] pointer-events-none z-50 hidden md:block -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden bg-gray-800 opacity-0 scale-0"
            >
                {displayProjects.map((p: any) => {
                    const id = p.documentId || p.id || p.slug;
                    const title = p.title || p.attributes?.title;
                    const heroVideoAttr = p.heroVideo || p.attributes?.heroVideo;
                    const heroImageAttr = p.heroImage || p.attributes?.heroImage;
                    const videoUrl = getImageUrl(heroVideoAttr);
                    const imageUrl = getImageUrl(heroImageAttr);

                    return (
                        <div
                            key={id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${activeProject === id ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-gray-500 overflow-hidden relative">
                                {/* Video or Image Preview */}
                                {videoUrl ? (
                                    <video
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        src={videoUrl}
                                    />
                                ) : imageUrl ? (
                                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black p-4 flex items-center justify-center">
                                        <span className="text-xs uppercase tracking-widest text-[#00b4d9] text-center">{title}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className="absolute bottom-4 right-4 bg-white text-black text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {t('viewCase')}
                </div>
            </div>
        </section>
    );
}
