// Helper to load services translations
import servicesData from '@/messages/services.json';
import { services as staticServices } from '@/data/services';

export function getServicesTranslations(locale: string) {
  return servicesData[locale as 'en' | 'de'] || servicesData.en;
}

export function getServiceTranslation(locale: string, slug: string) {
  const translations = getServicesTranslations(locale);
  
  // Convert slug to camelCase key (e.g. web-development -> webDevelopment)
  const serviceKey = slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  
  const content = translations.services[serviceKey as keyof typeof translations.services];
  const staticService = staticServices.find(s => s.slug === slug);

  if (!content || !staticService) return null;

  // Merge Data
  
  // Merge Process (Array of Objects)
  const mergedProcess = staticService.process.map((step, index) => {
    const translatedStep = content.process[index];
    return {
      ...step,
      title: translatedStep?.title || step.title,
      description: translatedStep?.description || step.description
    };
  });

  // Merge Results (Array of Objects)
  const mergedResults = staticService.results.map((result, index) => {
    const translatedResult = content.results[index];
    return {
      ...result,
      label: translatedResult?.label || result.label
    };
  });

  // Merge Case Study (Object)
  const mergedCaseStudy = {
    ...staticService.caseStudy,
    challenge: content.caseStudy.challenge || staticService.caseStudy.challenge,
    solution: content.caseStudy.solution || staticService.caseStudy.solution,
    results: content.caseStudy.results || staticService.caseStudy.results
  };

  // Merge everything
  // Note: 'features' and 'deliverables' are simple string arrays in both, so we just take the translated version.
  
  return {
    ...staticService, // Base static data (id, slug, images, technologies, pricing, etc.)
    ...content,       // Overwrite with translated text (title, overview, etc.)
    process: mergedProcess,
    results: mergedResults,
    caseStudy: mergedCaseStudy,
    // explicitly set arrays from content to ensure they override if ...content didn't do it deep enough (it does shallow merge)
    features: content.features,
    deliverables: content.deliverables
  };
}
