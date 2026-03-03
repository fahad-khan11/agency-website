"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clsx } from "clsx";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function BlogClient({ initialPosts, locale, t }: { initialPosts: any[], locale: string, t: any }) {
  const containerRef = useRef(null);

  // Map Strapi data to the structure the component expects
  const localizedPosts = useMemo(() => {
    return initialPosts.map(post => {
      const attrs = post.attributes || post;
      const imageUrl = attrs.heroImage?.data?.attributes?.url || attrs.heroImage?.url || "/blog/strategic-web-design.png";
      
      return {
        slug: attrs.slug,
        title: attrs.title,
        excerpt: attrs.excerpt,
        heroImage: imageUrl.startsWith("http") ? imageUrl : `${STRAPI_URL}${imageUrl}`,
        categories: Array.isArray(attrs.categories) ? attrs.categories : [],
        tags: Array.isArray(attrs.tags) ? attrs.tags : [],
        author: attrs.author,
        date: attrs.date,
        readTime: attrs.readTime
      };
    });
  }, [initialPosts]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    localizedPosts.forEach(post => post.categories.forEach((c: string) => cats.add(c)));
    return Array.from(cats).sort();
  }, [localizedPosts]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    localizedPosts.forEach(post => post.tags.forEach((t: string) => tags.add(t)));
    return Array.from(tags).sort();
  }, [localizedPosts]);

  const filteredPosts = useMemo(() => {
    return localizedPosts.filter(post => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedCategories.length > 0) {
        const hasCategory = post.categories.some((c: string) => selectedCategories.includes(c));
        if (!hasCategory) return false;
      }

      if (selectedTags.length > 0) {
        const hasTag = post.tags.some((t: string) => selectedTags.includes(t));
        if (!hasTag) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategories, selectedTags, localizedPosts]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0;

  useGSAP(() => {
    gsap.from(".animate-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.fromTo(".blog-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", clearProps: "all" }
    );
  }, { scope: containerRef, dependencies: [filteredPosts] });

  return (
    <main className="pt-32 min-h-screen bg-black text-white relative overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00B5D9]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl pb-24 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="animate-header inline-block px-3 py-1 mb-6 text-sm font-medium tracking-wider text-[#00B5D9] uppercase bg-[#00B5D9]/10 rounded-full border border-[#00B5D9]/20">
            {t.page.badge}
          </span>
          <h1 className="animate-header text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            {t.page.title}
          </h1>
          <p className="animate-header text-gray-400 text-xl md:text-2xl max-w-2xl leading-relaxed">
            {t.page.subtitle}
          </p>
        </div>

        <div className="animate-header sticky top-24 z-40 mb-12 bg-black/80 backdrop-blur-xl border-y border-white/5 py-4 -mx-6 px-6 md:mx-0 md:px-0 md:rounded-2xl md:border md:bg-zinc-900/50">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder={t.page.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00B5D9] transition-colors placeholder:text-gray-600"
                />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" /> {t.page.clearFilters}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">{t.page.categoriesLabel}</span>
                {allCategories.map(cat => {
                  const count = localizedPosts.filter(p => p.categories.includes(cat)).length;
                  const isActive = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={clsx(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                        isActive
                          ? "bg-[#00B5D9]/20 text-[#00B5D9] border-[#00B5D9]"
                          : "bg-zinc-800 text-gray-400 border-transparent hover:bg-zinc-700 hover:text-white"
                      )}
                    >
                      {cat}
                      <span className={clsx("ml-1 px-1.5 py-0.5 rounded-full text-[10px]", isActive ? "bg-[#00B5D9] text-black" : "bg-white/10 text-gray-500")}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">{t.page.tagsLabel}</span>
                {allTags.map(tag => {
                  const isActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={clsx(
                        "px-3 py-1.5 rounded-full text-xs transition-all border border-dashed",
                        isActive
                          ? "bg-white/10 text-white border-white"
                          : "text-gray-500 border-white/10 hover:text-white hover:border-white/30"
                      )}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="space-y-12">
            {!hasActiveFilters && filteredPosts.length > 0 && (
              <div className="w-full">
                <Link href={`/${locale}/blog/${filteredPosts[0].slug}`} className="group relative block w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00B5D9]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00B5D9]/10">
                  <Image
                    src={filteredPosts[0].heroImage}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      {filteredPosts[0].categories.map((c: string) => (
                        <span key={c} className="px-3 py-1 bg-[#00B5D9] text-black rounded-full text-xs font-bold uppercase tracking-wider">
                          {c}
                        </span>
                      ))}
                      <span className="text-gray-300 text-xs font-mono">{filteredPosts[0].date}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white group-hover:text-[#00B5D9] transition-colors">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-300 text-lg line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="flex items-center text-[#00B5D9] font-bold tracking-wide uppercase">
                      Read Featured Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(hasActiveFilters ? filteredPosts : filteredPosts.slice(1)).map((post) => (
                <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group block h-full">
                  <article className="blog-card h-full flex flex-col bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[#00B5D9]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00B5D9]/10">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((c: string) => (
                          <span key={c} className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white tracking-wide uppercase">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col grow">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4 font-mono">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-xl font-display font-bold mb-3 group-hover:text-[#00B5D9] transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500">{post.author}</span>
                        <div className="flex items-center text-[#00B5D9] font-bold text-xs tracking-wide uppercase">
                          Read Article <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-header">
            <h3 className="text-xl font-bold text-white mb-2">{t.page.noArticlesFound}</h3>
            <p className="text-gray-400 mb-6">{t.page.noArticlesMessage}</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#00B5D9] text-black font-bold rounded-full hover:bg-[#009bb8] transition-colors"
            >
              {t.page.clearAllFilters}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
