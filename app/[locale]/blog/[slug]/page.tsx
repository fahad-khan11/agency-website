import { getBlogPostBySlug, getBlogPosts } from "@/lib/strapiFetch";
import { getBlogTranslations } from "@/lib/blogTranslations";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts(locale);
  const relatedPosts = allPosts
    .filter((p: any) => (p.attributes?.slug || p.slug) !== slug)
    .slice(0, 3);

  const t = getBlogTranslations(locale);

  return (
    <BlogDetailClient 
      post={post} 
      locale={locale} 
      t={t} 
      relatedPosts={relatedPosts} 
    />
  );
}
