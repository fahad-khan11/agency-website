import { AboutHero, AboutStory, ValuesGrid, TeamSection, AboutCTA } from "@/components/about";

export default function AboutPage() {
  return (
    <main className="w-full bg-black min-h-screen">
       <AboutHero />
       <AboutStory />
       <ValuesGrid />
       <TeamSection />
       <AboutCTA />
       {/* Footer is handled globally in layout.tsx */}
    </main>
  );
}
