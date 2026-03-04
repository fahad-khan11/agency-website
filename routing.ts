import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'de'] as const;
export const defaultLocale = 'en' as const;

// ─── Localized path map ───────────────────────────────────────────────────────
// Maps canonical (English) segment → German segment for each route.
// Dynamic segments like [slug] are handled separately below.
const DE_PATH_MAP: Record<string, string> = {
  '/about':                       '/ueber-uns',
  '/blog':                        '/blog',
  '/case-studies':                '/fallstudien',
  '/contact':                     '/kontakt',
  '/DataProtectionDeclaration':   '/datenschutzerklaerung',
  '/details':                     '/details',
  '/faq':                         '/haeufige-fragen',
  '/imprint':                     '/impressum',
  '/industries':                  '/branchen',
  '/process':                     '/prozess',
  '/project-models':              '/projektmodelle',
  '/projects':                    '/projekte',
  '/purchase-model':              '/kaufmodell',
  '/rental-model':                '/mietmodell',
  '/services':                    '/leistungen',
  '/strategic-participation':     '/strategische-beteiligung',
  '/terms':                       '/agb',
};

// Reverse map: German segment → canonical (English) segment
const DE_PATH_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(DE_PATH_MAP).map(([en, de]) => [de, en])
);

// Dynamic-segment parent routes (e.g. /industries/my-slug → /branchen/my-slug)
const DE_DYNAMIC_PARENTS: Array<[string, string]> = [
  ['/industries/', '/branchen/'],
  ['/case-studies/', '/fallstudien/'],
  ['/blog/', '/blog/'],
  ['/services/', '/leistungen/'],
];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames: {
    '/about':                     { en: '/about',                   de: '/ueber-uns' },
    '/blog':                      { en: '/blog',                    de: '/blog' },
    '/blog/[slug]':               { en: '/blog/[slug]',             de: '/blog/[slug]' },
    '/case-studies':              { en: '/case-studies',            de: '/fallstudien' },
    '/case-studies/[slug]':       { en: '/case-studies/[slug]',     de: '/fallstudien/[slug]' },
    '/contact':                   { en: '/contact',                 de: '/kontakt' },
    '/DataProtectionDeclaration': { en: '/DataProtectionDeclaration', de: '/datenschutzerklaerung' },
    '/details':                   { en: '/details',                 de: '/details' },
    '/faq':                       { en: '/faq',                     de: '/haeufige-fragen' },
    '/imprint':                   { en: '/imprint',                 de: '/impressum' },
    '/industries':                { en: '/industries',              de: '/branchen' },
    '/industries/[industry]':     { en: '/industries/[industry]',   de: '/branchen/[industry]' },
    '/process':                   { en: '/process',                 de: '/prozess' },
    '/project-models':            { en: '/project-models',          de: '/projektmodelle' },
    '/projects':                  { en: '/projects',                de: '/projekte' },
    '/purchase-model':            { en: '/purchase-model',          de: '/kaufmodell' },
    '/rental-model':              { en: '/rental-model',            de: '/mietmodell' },
    '/services':                  { en: '/services',                de: '/leistungen' },
    '/services/[slug]':           { en: '/services/[slug]',         de: '/leistungen/[slug]' },
    '/strategic-participation':   { en: '/strategic-participation', de: '/strategische-beteiligung' },
    '/terms':                     { en: '/terms',                   de: '/agb' },
  },
});

/**
 * Translates a canonical app path to the locale-specific URL path.
 * e.g. getLocalizedPath('/industries/hotels', 'de') → '/branchen/hotels'
 */
export function getLocalizedPath(path: string, locale: string): string {
  if (locale !== 'de') return path;

  // Exact match
  if (DE_PATH_MAP[path]) return DE_PATH_MAP[path];

  // Dynamic segment parents (e.g. /industries/slug → /branchen/slug)
  for (const [enPrefix, dePrefix] of DE_DYNAMIC_PARENTS) {
    if (path.startsWith(enPrefix)) {
      return dePrefix + path.slice(enPrefix.length);
    }
  }

  return path;
}

/**
 * Converts a locale-specific path back to the canonical (English) path.
 * e.g. getCanonicalPath('/branchen/hotels', 'de') → '/industries/hotels'
 */
export function getCanonicalPath(localizedPath: string, locale: string): string {
  if (locale !== 'de') return localizedPath;

  // Exact match
  if (DE_PATH_MAP_REVERSE[localizedPath]) return DE_PATH_MAP_REVERSE[localizedPath];

  // Dynamic segment parents in reverse
  for (const [enPrefix, dePrefix] of DE_DYNAMIC_PARENTS) {
    if (localizedPath.startsWith(dePrefix)) {
      return enPrefix + localizedPath.slice(dePrefix.length);
    }
  }

  return localizedPath;
}
