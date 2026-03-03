"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamCard from "./TeamCard";

export default function TeamSection({ initialData }: { initialData?: any }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const ENV_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

    const title = initialData?.teamTitle || "";
    const description = initialData?.teamDescription || "";

    const finalTeamMembers = initialData?.teamMembers?.map((member: any) => ({
        name: member.name,
        role: member.role,
        specialty: member.specialty,
        image: member.image?.url ? `${ENV_URL}${member.image.url}` : null
    })).filter((m: any) => m.name) || [];

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
                    <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-8">{title}</h2>
                    <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl">
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {finalTeamMembers.map((member: any, i: number) => (
                        <div key={i} className="team-fade">
                             <TeamCard member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
