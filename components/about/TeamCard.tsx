"use client";

import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  specialty: string;
}

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="team-card group relative flex flex-col gap-5">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700 ease-out">
        <Image
           src={member.image}
           alt={member.name}
           fill
           className="object-cover transition-transform duration-700 group-hover:scale-105"
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col gap-1 items-start">
         <h3 className="text-2xl font-display font-bold text-black">{member.name}</h3>
         <p className="text-sm font-mono text-brand-orange uppercase tracking-wider mb-1">{member.role}</p>
         <span className="text-sm text-gray-400 font-light">{member.specialty}</span>
      </div>
    </div>
  );
}
