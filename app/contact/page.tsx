import FooterCTA from "@/components/sections/FooterCTA";

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 md:py-24">
         <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">Contact Us</h1>
         <div className="grid md:grid-cols-2 gap-12">
            <div>
               <p className="text-xl text-gray-400 mb-6">
                 Ready to start your next project? We are currently accepting new clients for Q2 2024.
               </p>
               <div className="bg-white/5 p-8 rounded-lg border border-white/10">
                  <h3 className="text-xl font-bold mb-4 text-brand-orange">Contact Info</h3>
                  <p className="mb-2">hello@archetype.studio</p>
                  <p>+1 (555) 019-2834</p>
               </div>
            </div>
         </div>
      </div>
      <FooterCTA />
    </main>
  );
}
