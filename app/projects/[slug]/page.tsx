export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="pt-32 min-h-screen bg-black text-white px-6 md:px-12">
      <h1 className="text-6xl font-display font-bold mb-8 uppercase text-brand-orange">{slug}</h1>
      <p className="text-2xl text-gray-300 max-w-3xl mb-12">
        A deep dive into the {slug} project. This page demonstrates the dynamic routing capability.
      </p>
      <div className="w-full aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-12">
         <span className="text-gray-500">Project Imagery for {slug}</span>
      </div>
      <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-400 leading-relaxed">
         <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
           Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         </p>
         <p>
           Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
         </p>
      </div>
    </main>
  );
}
