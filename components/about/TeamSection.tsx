"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "./TeamCard";

// Using Unsplash source images for tech team feel
const teamMembers = [
    {
        name: "Alex Morgan",
        role: "Founder & Creative Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        specialty: "Strategy"
    },
    {
        name: "Sarah Chen",
        role: "Head of Engineering",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        specialty: "Full Stack"
    },
    {
        name: "Marcus Johnson",
        role: "Design Lead",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
        specialty: "UI/UX"
    },
    {
        name: "Elena Rodriguez",
        role: "Motion Designer",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        specialty: "Animation"
    },
    {
        name: "David Kim",
        role: "Senior Developer",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        specialty: "Backend"
    },
    {
        name: "Jessica Lee",
        role: "Project Manager",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
        specialty: "Product"
    }
];

export default function TeamSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".team-fade", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-white text-black py-24 md:py-40 px-6 md:px-12">
            <div className="max-w-[1370px] mx-auto">
                <div className="mb-24 max-w-4xl team-fade">
                    <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8">Minds behind the magic.</h2>
                    <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl">
                        We are a diverse team of thinkers and makers, united by a passion for creating exceptional digital experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {teamMembers.map((member, i) => (
                        <div key={i} className="team-fade">
                             <TeamCard member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
