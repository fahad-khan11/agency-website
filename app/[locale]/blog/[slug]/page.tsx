"use client";

import { use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getBlogPostTranslation, getBlogTranslations } from "@/lib/blogTranslations";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const containerRef = useRef(null);
  const t = getBlogTranslations(locale || 'en');

  const post = getBlogPostTranslation(locale || 'en', slug);

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
        <div className="h-full bg-[#00B5D9] w-[15%]" id="progress-bar" /> {/* Static for now, could be dynamic */}
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

        {/* Back Link */}
        <div className="mb-12 animate-in">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#00B5D9] transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {t.page?.backToInsights || "Back to Insights"}
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 animate-in text-center md:text-left">

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6">
            {post.categories.map(cat => (
              <span key={cat} className="px-3 py-1 text-[#00B5D9] bg-[#00B5D9]/10 rounded-full border border-[#00B5D9]/20 uppercase tracking-wider font-bold text-[10px]">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 border-y border-white/10 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00B5D9] to-blue-600 flex items-center justify-center text-xl font-bold text-black border-2 border-black">
                {post.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono mt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">{t.page?.share || "Share:"}Share:</span>
              <button className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-[#00B5D9] hover:text-[#00B5D9] transition-all"><Twitter className="w-4 h-4" /></button>
              <button className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-[#00B5D9] hover:text-[#00B5D9] transition-all"><Linkedin className="w-4 h-4" /></button>
              <button className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:border-[#00B5D9] hover:text-[#00B5D9] transition-all"><LinkIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="animate-in relative w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-[#00B5D9]/5">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">

          <div className="lg:col-span-8 animate-in">
            <div
              className="prose prose-invert prose-xl max-w-none 
              prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight
              prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:leading-tight prose-h2:text-white prose-h2:first:mt-0
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:font-bold prose-h3:text-[#00B5D9]
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-light
              prose-strong:text-white prose-strong:font-bold prose-strong:text-[#00B5D9]
              prose-a:text-[#00B5D9] prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
              prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
              prose-ul:my-8 prose-ul:space-y-4
              prose-li:text-gray-300 prose-li:leading-relaxed prose-li:text-lg
              prose-blockquote:border-l-4 prose-blockquote:border-[#00B5D9] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-gray-400 prose-blockquote:my-10
              prose-code:text-[#00B5D9] prose-code:bg-[#00B5D9]/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />


            {/* Diagrams Section */}
            {post.diagrams && post.diagrams.length > 0 && (
              <div className="mt-16 pt-8 border-t border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">{t.page?.visualDiagrams || "Visual Diagrams"}</h3>
                <div className={`grid gap-8 ${post.diagrams.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {post.diagrams.map((diagram, index) => (
                    <div key={index} className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00B5D9]/5 bg-zinc-900/50">
                      <Image
                        src={diagram}
                        alt={`Diagram ${index + 1} for ${post.title}`}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Credits Section */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00B5D9] to-blue-600 flex items-center justify-center text-2xl font-bold text-black border-2 border-black flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">{t.page?.writtenBy || "Written by"}</p>
                  <p className="text-lg font-bold text-white">{post.author}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 font-mono mt-2">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags footer */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/5 text-sm text-gray-400 font-mono hover:border-[#00B5D9]/50 hover:text-white transition-colors cursor-default">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8 animate-in lg:sticky lg:top-32 h-fit">

            {/* Newsletter CTA */}
            <div className="p-8 rounded-3xl bg-[#00B5D9] relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2 text-black">{t.page?.weeklyInsights || "Weekly Insights."}</h3>
                <p className="text-sm text-black/80 mb-6 font-medium leading-relaxed">
                  {t.page?.newsletterText || "Join 5,000+ founders receiving strategic design breakdowns."}
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder={t.page?.emailPlaceholder || "your@email.com"}
                    className="w-full px-4 py-3 rounded-xl bg-white/90 text-black placeholder:text-gray-500 border-0 focus:ring-2 focus:ring-black/20"
                  />
                  <button className="w-full px-4 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-900 transition-colors">
                    {t.page?.subscribe || "Subscribe"}
                  </button>
                </form>
              </div>

              {/* Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            </div>

            {/* Related Posts */}
            <div className="p-6 rounded-3xl bg-zinc-900/30 border border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">{t.page?.moreToRead || "More to Read"}</h4>
              <ul className="space-y-6">
                {blogPosts.filter(p => p.slug !== post.slug).slice(0, 3).map(related => {
                  const relatedTranslated = getBlogPostTranslation(locale || 'en', related.slug);
                  return (
                    <li key={related.slug}>
                      <Link href={`/${locale}/blog/${related.slug}`} className="group block">
                        <span className="text-[10px] uppercase font-bold text-[#00B5D9] mb-1 block">{relatedTranslated.categories[0]}</span>
                        <h5 className="font-bold text-white group-hover:text-[#00B5D9] transition-colors line-clamp-2 leading-snug">
                          {relatedTranslated.title}
                        </h5>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

          </aside>
        </div>

      </div>
    </article>
  );
}
