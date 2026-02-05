// Helper to load industries translations
import industriesData from '@/messages/industries.json';
import { industries as staticIndustries } from '@/data/industries';

export function getIndustriesTranslations(locale: string) {
  return industriesData[locale as 'en' | 'de'] || industriesData.en;
}

export function getIndustryTranslation(locale: string, industryKey: string) {
  const translations = getIndustriesTranslations(locale);
  // Get the translated content
  const content = translations.industries[industryKey as keyof typeof translations.industries];
  
  // Find the static data (images, links) based on the key
  // We need to convert camelCase key back to slug or just find by index if possible
  // Faster: just loop and check if camelCase(slug) === key
  const slug = industryKey.replace(/([A-Z])/g, "-$1").toLowerCase(); 
  // e.g. hotelsResorts -> hotels-resorts
  
  const staticData = staticIndustries.find(i => {
      // normalized check
      const iKey = i.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      return iKey === industryKey;
  });

  if (!content || !staticData) return null;

  // Merge them. Content overrides static text, but static provides images/links
  // Note: Modules need to be merged by index or key. My JSON uses keys (digitalLocks), static uses array.
  // This is a mismatch!
  // static modules is an array. JSON modules is an object.
  // The detail page expects `modules` to be an array.
  
  // Let's convert JSON modules object to array, preserving order if possible?
  // Or better, map the static modules to the translated ones.
  
  // ISSUE: Static modules are an array [0,1,2...]. JSON modules are keyed {digitalLocks: ...}
  // I need to know which static module corresponds to which JSON key.
  // In my JSON creation, I gave them keys. In static data, they are just an array.
  
  // Workaround: I will assume the order in JSON keys matches the order in static array? Use Object.keys?
  // No, JSON object key order is not guaranteed reliable, though usually consistent.
  
  // Better approach: Update the modules to be an array in the output.
  // I'll map the static modules, and try to find the matching translation.
  // Since I don't have a reliable link key, I might have to rely on index if I hadn't changed the structure.
  
  // Let's look at how I built the JSON. I manually gave them names like "digitalLocks".
  // The static data doesn't have these keys.
  
  // Alternative: Just fully rely on JSON for text, and use static ONLY for heroImage and slug.
  // But wait, the modules need `serviceLink` and `serviceTag`. These are in static.
  
  // Solution: I will augment the JSON modules with the static data based on INDEX.
  // I must assume I created the JSON keys in the same order as the static array.
  // JSON: digitalLocks, digitalCheckin, digitalConcierge, pmsBooking, guestPortal
  // Static: Digital Locks, Digital Check-in, Digital Concierge, PMS, Guest Portal
  // The order seems to match perfectly.
  
  const contentModulesKeys = Object.keys(content.modules);
  const mergedModules = contentModulesKeys.map((key, index) => {
      const translatedModule = content.modules[key as keyof typeof content.modules] as Record<string, any>;
      const staticModule = staticData.modules[index];
      
      return {
          ...translatedModule,
          serviceLink: staticModule?.serviceLink || '#',
          serviceTag: staticModule?.serviceTag || ''
      };
  });

  return {
    ...(content as any),
    heroImage: staticData.heroImage,
    industryTag: content.industryTag || staticData.industryTag,
    modules: mergedModules,
  };
}
