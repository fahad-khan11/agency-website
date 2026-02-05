// Helper to load blog translations
import blogData from '@/messages/blog.json';
import { blogPosts } from '@/data/blog';

export function getBlogTranslations(locale: string) {
    return blogData[locale as 'en' | 'de'] || blogData.en;
}

export function getBlogPostTranslation(locale: string, slug: string) {
    const translations = getBlogTranslations(locale);

    // Convert slug to camelCase key (e.g. strategic-web-design-driving-b2b-growth-2026 -> strategicWebDesignDrivingB2bGrowth2026)
    const postKey = slug.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());

    const content = translations.posts[postKey as keyof typeof translations.posts];
    const staticPost = blogPosts.find(p => p.slug === slug);

    if (!content || !staticPost) return null;

    // Merge static data with translations
    return {
        ...staticPost,
        title: content.title || staticPost.title,
        excerpt: content.excerpt || staticPost.excerpt,
        categories: content.categories || staticPost.categories,
        tags: content.tags || staticPost.tags,
        author: content.author || staticPost.author,
        date: content.date || staticPost.date,
        readTime: content.readTime || staticPost.readTime,
        content: content.content || staticPost.content,
        diagrams: content.diagrams || staticPost.diagrams
    };
}
