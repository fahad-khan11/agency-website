import { AboutHero, AboutStory, ValuesGrid, TeamSection, AboutCTA } from "@/components/about";
import { getAboutHeroData, getAboutInfoData } from "@/lib/strapiFetch";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const heroData = await getAboutHeroData(locale);
  const aboutInfoData = await getAboutInfoData(locale);
  
  return (
    <main className="w-full bg-black min-h-screen">
       <AboutHero initialData={heroData} />
       <AboutStory initialData={aboutInfoData} />
       <ValuesGrid initialData={aboutInfoData} />
       <TeamSection initialData={aboutInfoData} />
       <AboutCTA initialData={aboutInfoData} />
       {/* Footer is handled globally in layout.tsx */}
    </main>
  );
}
