"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".blog-header-animate", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.fromTo(".blog-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: containerRef });

  return (
    <main className="pt-32 min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00B5D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pb-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="blog-header-animate inline-block px-3 py-1 mb-6 text-sm font-medium tracking-wider text-[#00B5D9] uppercase bg-[#00B5D9]/10 rounded-full border border-[#00B5D9]/20">
            Our Insights
          </span>
          <h1 className="blog-header-animate text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Thoughts on <br /> <span className="text-[#00B5D9]">Design & Tech.</span>
          </h1>
          <p className="blog-header-animate text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            Deep dives into strategy, interface design, and the future of digital products.
          </p>
        </div>

        {/* Featured / Latest Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="blog-card h-full flex flex-col bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00B5D9]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00B5D9]/10">
                
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white tracking-wide">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-mono">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-[#00B5D9] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400/90 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center text-[#00B5D9] font-bold text-sm tracking-wide">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
