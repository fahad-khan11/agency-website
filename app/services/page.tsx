import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import FooterCTA from "@/components/sections/FooterCTA";

export default function ServicesPage() {
  return (
    <main className="pt-24 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 md:py-24">
         <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Our Services</h1>
         <p className="text-gray-400 text-xl max-w-2xl">
           Comprehensive digital solutions tailored to your brand's unique needs.
         </p>
      </div>
      <Services />
      <Process />
      <FooterCTA />
    </main>
  );
}
