"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import clsx from 'clsx';

interface LanguageSwitcherProps {
  isLightMode?: boolean;
}

export default function LanguageSwitcher({ isLightMode = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const targetLocale = locales.find(loc => loc !== locale) || (locale === 'en' ? 'de' : 'en');

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLocale(targetLocale)}
        className={clsx(
          "px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300",
          isLightMode
            ? "bg-transparent text-gray-600 hover:bg-black/10 hover:text-black"
            : "bg-transparent text-gray-400 hover:bg-white/10 hover:text-white"
        )}
      >
        {targetLocale.toUpperCase()}
      </button>
    </div>
  );
}
