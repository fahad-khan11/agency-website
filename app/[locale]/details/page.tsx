import FeatureStrip from "@/components/sections/FeatureStrip";
import Testimonials from "@/components/sections/Testimonials";

export default function DetailsPage() {
  return (
    <main className="pt-24 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 md:py-24">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">Agency Details</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl">
          More about our philosophy, team, and approach.
        </p>
      </div>
      <FeatureStrip />
      <Testimonials />
    </main>
  );
}
