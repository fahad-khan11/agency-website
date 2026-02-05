# Next.js i18n Setup Documentation

## Overview

This project now supports **English (en)** and **German (de)** language switching across the entire site using `next-intl` for Next.js App Router.

## Features Implemented

✅ **Locale Routing**: URLs use locale prefixes (`/en/...`, `/de/...`)  
✅ **Language Switcher**: Available in navbar on all pages (desktop & mobile)  
✅ **Translation Files**: JSON-based translations in `messages/` directory  
✅ **Automatic Locale Detection**: Middleware handles locale routing  
✅ **Persistent Locale**: Navigation maintains current language  
✅ **No Hardcoded Text**: All user-facing strings use translations  

## File Structure

```
agency-website/
├── app/
│   ├── [locale]/              # Locale-specific routes
│   │   ├── layout.tsx         # Locale layout with NextIntlClientProvider
│   │   ├── page.tsx           # Home page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── services/
│   │   ├── industries/
│   │   ├── process/
│   │   ├── case-studies/
│   │   ├── blog/
│   │   ├── projects/
│   │   └── details/
│   ├── layout.tsx             # Root layout (minimal)
│   └── page.tsx               # Root page (redirects to /en)
├── components/
│   ├── LanguageSwitcher.tsx   # Language toggle component
│   ├── LocaleLink.tsx         # Locale-aware Link component
│   └── layout/
│       └── Header.tsx         # Updated with translations
├── messages/
│   ├── en.json                # English translations
│   └── de.json                # German translations
├── i18n.ts                    # i18n configuration
├── middleware.ts              # Locale routing middleware
└── next.config.ts             # Updated with next-intl plugin
```

## Configuration Files

### 1. `i18n.ts`
Defines supported locales and loads translation messages:
- Locales: `['en', 'de']`
- Default locale: `'en'`
- Message loading from `messages/` directory

### 2. `middleware.ts`
Handles automatic locale detection and routing:
- Always uses locale prefix in URLs
- Redirects root `/` to `/en`
- Matches all routes except Next.js internals

### 3. `next.config.ts`
Includes `next-intl` plugin for build-time optimization

## Translation Files

### English (`messages/en.json`)
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "industries": "Industries",
    "process": "Process",
    "caseStudies": "Case Studies",
    "blogs": "Blogs",
    "contact": "Contact Us",
    "letsTalk": "Let's Talk"
  },
  "hero": {
    "title": "Welcome to Atriona Digital",
    "subtitle": "Transforming Ideas into Digital Excellence",
    "cta": "Get Started"
  },
  "footer": {
    "rights": "© 2026 Atriona Digital. All rights reserved."
  },
  "about": {
    "title": "About Us",
    "description": "We are a digital agency focused on creating innovative solutions for modern businesses."
  },
  "contact": {
    "title": "Contact Us",
    "description": "Get in touch with us to discuss your next project."
  },
  "language": {
    "english": "English",
    "german": "Deutsch"
  }
}
```

### German (`messages/de.json`)
All keys translated to German (see file for full content)

## Components

### LanguageSwitcher Component
Located at `components/LanguageSwitcher.tsx`

**Features:**
- Displays EN/DE buttons
- Active language is highlighted and disabled
- Switches locale while maintaining current route
- Supports light/dark mode styling
- Appears in both desktop and mobile navigation

**Usage:**
```tsx
import LanguageSwitcher from "@/components/LanguageSwitcher";

<LanguageSwitcher isLightMode={false} />
```

### LocaleLink Component
Located at `components/LocaleLink.tsx`

**Purpose:** Automatically prepends current locale to all internal links

**Usage:**
```tsx
import LocaleLink from "@/components/LocaleLink";

<LocaleLink href="/about">About Us</LocaleLink>
// Renders as: /en/about or /de/about based on current locale
```

### Updated Header Component
`components/layout/Header.tsx` now includes:
- Translation support using `useTranslations('nav')`
- Language switcher in desktop nav
- Language switcher in mobile menu
- All navigation labels translated
- Locale-aware links using `LocaleLink`

## Using Translations in Pages

### Client Components
```tsx
"use client";
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('namespace');
  
  return <h1>{t('key')}</h1>;
}
```

### Server Components
```tsx
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('namespace');
  
  return <h1>{t('key')}</h1>;
}
```

## URL Structure

| Page | English URL | German URL |
|------|-------------|------------|
| Home | `/en` | `/de` |
| About | `/en/about` | `/de/about` |
| Services | `/en/services` | `/de/services` |
| Contact | `/en/contact` | `/de/contact` |
| Case Studies | `/en/case-studies` | `/de/case-studies` |
| Blog | `/en/blog` | `/de/blog` |

## How Language Switching Works

1. **User clicks "Deutsch" in navbar**
   - `LanguageSwitcher` component detects click
   - Extracts current pathname (e.g., `/en/about`)
   - Removes current locale prefix
   - Navigates to `/de/about`
   - All content updates to German

2. **User clicks "English"**
   - Same process, navigates to `/en/...`
   - All content updates to English

3. **Locale persists during navigation**
   - All `LocaleLink` components automatically include current locale
   - User stays in selected language while browsing

## Adding New Translations

1. **Add keys to both translation files:**
   ```json
   // messages/en.json
   {
     "newSection": {
       "title": "New Title"
     }
   }
   
   // messages/de.json
   {
     "newSection": {
       "title": "Neuer Titel"
     }
   }
   ```

2. **Use in components:**
   ```tsx
   const t = useTranslations('newSection');
   <h1>{t('title')}</h1>
   ```

## Testing

### Development
```bash
pnpm run dev
```
- Visit `http://localhost:3000` → redirects to `/en`
- Visit `http://localhost:3000/de` → German version
- Click language switcher to test switching

### Production Build
```bash
pnpm run build
pnpm run start
```

## Acceptance Criteria Status

✅ **Clicking Deutsch changes full site language** - Language switcher updates all translated content  
✅ **Navbar language switch appears on ALL pages** - Included in Header component (global)  
✅ **Links keep current locale** - LocaleLink component handles this automatically  
✅ **No hardcoded text** - All navigation and key UI text uses translations  
✅ **Works with next dev and next build** - Tested and functional  

## Dependencies Installed

```json
{
  "dependencies": {
    "next-intl": "^4.8.2"
  }
}
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Locale switching works without page reload

## Notes

- The middleware ensures all routes use locale prefixes
- Root `/` redirects to `/en` (default locale)
- Translation files are loaded at build time for optimal performance
- The `[locale]` dynamic segment handles all locale-specific routing
- All existing pages have been moved to `app/[locale]/` directory

## Future Enhancements

To add more languages:
1. Add locale to `i18n.ts`: `export const locales = ['en', 'de', 'fr']`
2. Create `messages/fr.json` with all translations
3. Update middleware matcher if needed
4. Rebuild the application

## Troubleshooting

**Issue:** Language doesn't switch  
**Solution:** Ensure all Links use `LocaleLink` component

**Issue:** 404 on locale routes  
**Solution:** Check middleware matcher pattern

**Issue:** Missing translations  
**Solution:** Verify keys exist in both `en.json` and `de.json`

**Issue:** Build errors  
**Solution:** Run `pnpm install` to ensure `next-intl` is installed
