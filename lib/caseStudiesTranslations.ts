// Helper to load case studies translations
import caseStudiesData from '@/messages/caseStudies.json';
import { caseStudies as staticCaseStudies } from '@/data/caseStudiesData';

export function getCaseStudiesTranslations(locale: string) {
    return caseStudiesData[locale as 'en' | 'de'] || caseStudiesData.en;
}

export function getCaseStudyTranslation(locale: string, slug: string) {
    const translations = getCaseStudiesTranslations(locale);

    // Convert slug to camelCase key (e.g. lumina-scent -> luminaScent)
    const studyKey = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

    const content = translations.studies[studyKey as keyof typeof translations.studies];
    const staticStudy = staticCaseStudies.find(s => s.slug === slug);

    if (!content || !staticStudy) return null;

    // Merge static data with translations
    return {
        ...staticStudy,
        title: content.title || staticStudy.title,
        category: content.category || staticStudy.category,
        client: content.client || staticStudy.client,
        tagline: content.tagline || staticStudy.tagline,
        overview: content.overview || staticStudy.overview,
        challenge: content.challenge || staticStudy.challenge,
        solution: content.solution || staticStudy.solution,
        services: content.services || staticStudy.services,
        results: content.results || staticStudy.results,
        keyFeatures: content.keyFeatures || staticStudy.keyFeatures,
        testimonial: content.testimonial || staticStudy.testimonial
    };
}
