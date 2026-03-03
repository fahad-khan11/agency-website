import { getBlogPosts } from "@/lib/strapiFetch";
import { getBlogTranslations } from "@/lib/blogTranslations";
import BlogClient from "./BlogClient";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const initialPosts = await getBlogPosts(locale);
  const t = getBlogTranslations(locale);

  return <BlogClient initialPosts={initialPosts} locale={locale} t={t} />;
}
