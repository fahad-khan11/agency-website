"use client";

import { use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const containerRef = useRef(null);
  
  const post = blogPosts.find((p) => p.slug === slug);

  useGSAP(() => {
    gsap.from(".animate-in", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 min-h-screen bg-black text-white selection:bg-[#00B5D9] selection:text-black" ref={containerRef}>
      
      {/* Progress Bar (Simulated) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div className="h-full bg-[#00B5D9] w-[0%]" id="progress-bar" />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        
        {/* Back Link */}
        <div className="mb-8 animate-in">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 animate-in text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 text-sm font-mono text-gray-400">
            <span className="px-3 py-1 text-[#00B5D9] bg-[#00B5D9]/10 rounded-full border border-[#00B5D9]/20 uppercase tracking-wider font-bold text-xs">
              {post.category}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4">
             <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden relative">
               {/* Placeholder Avatar */}
               <div className="absolute inset-0 bg-gradient-to-tr from-[#00B5D9] to-blue-600" />
             </div>
             <div>
               <p className="text-sm font-bold text-white">{post.author}</p>
               <p className="text-xs text-gray-400">Digital Strategist</p>
             </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="animate-in relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-[#00B5D9]/10">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-8 animate-in">
            <div 
              className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-[#00B5D9] prose-img:rounded-xl prose-img:border prose-img:border-white/10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags / Share */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 rounded text-sm text-gray-400">#Design</span>
                <span className="px-3 py-1 bg-white/5 rounded text-sm text-gray-400">#Strategy</span>
                <span className="px-3 py-1 bg-white/5 rounded text-sm text-gray-400">#2026</span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Share</p>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#00B5D9] transition-colors"><Twitter className="w-5 h-5"/></button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#00B5D9] transition-colors"><Linkedin className="w-5 h-5"/></button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#00B5D9] transition-colors"><LinkIcon className="w-5 h-5"/></button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 animate-in lg:sticky lg:top-32 h-fit">
            
            {/* Newsletter CTA */}
            <div className="p-6 rounded-2xl bg-[#00B5D9] text-black bg-gradient-to-br from-[#00B5D9] to-blue-400">
               <h3 className="text-xl font-bold mb-2">Join the inner circle.</h3>
               <p className="text-sm text-black/80 mb-6 font-medium">
                 Get exclusive design insights and strategic breakdowns delivered to your inbox weekly.
               </p>
               <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="your@email.com" 
                   className="w-full px-4 py-3 rounded-lg bg-white/90 text-black placeholder:text-gray-500 border-0 focus:ring-2 focus:ring-black/20"
                 />
                 <button className="w-full px-4 py-3 rounded-lg bg-black text-white font-bold hover:bg-gray-900 transition-colors">
                   Subscribe
                 </button>
               </form>
            </div>

            {/* Related Topics */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Related Topics</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="flex group">
                    <span className="w-1 h-full bg-white/10 mr-4 rounded-full group-hover:bg-[#00B5D9] transition-colors"></span>
                    <div>
                      <h5 className="font-bold text-white group-hover:text-[#00B5D9] transition-colors">The Psychology of Color in SaaS</h5>
                      <span className="text-xs text-gray-500">Read in 5 min</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex group">
                    <span className="w-1 h-full bg-white/10 mr-4 rounded-full group-hover:bg-[#00B5D9] transition-colors"></span>
                    <div>
                      <h5 className="font-bold text-white group-hover:text-[#00B5D9] transition-colors">Micro-Animations Guide</h5>
                      <span className="text-xs text-gray-500">Read in 7 min</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

          </aside>
        </div>

      </div>
    </article>
  );
}
