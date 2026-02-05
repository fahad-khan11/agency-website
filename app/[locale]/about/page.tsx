import { AboutHero, AboutStory, ValuesGrid, TeamSection, AboutCTA } from "@/components/about";
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  
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
