"use client";

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import clsx from 'clsx';
import { ChevronDown, Check } from 'lucide-react';

// Map locale codes to display labels and flag emojis
const LOCALE_META: Record<string, { label: string; flag: string; nativeName: string }> = {
  en: { label: 'EN', flag: '🇬🇧', nativeName: 'English' },
  de: { label: 'DE', flag: '🇩🇪', nativeName: 'Deutsch' },
  fr: { label: 'FR', flag: '🇫🇷', nativeName: 'Français' },
  es: { label: 'ES', flag: '🇪🇸', nativeName: 'Español' },
  it: { label: 'IT', flag: '🇮🇹', nativeName: 'Italiano' },
  // Add more here as needed
};

interface LanguageSwitcherProps {
  isLightMode?: boolean;
}

export default function LanguageSwitcher({ isLightMode = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }
    // Safely replace ONLY the leading /{currentLocale} prefix.
    // This avoids creating double-locale URLs like /de/en/about.
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setOpen(false);
  };

  const currentMeta = LOCALE_META[locale] ?? { label: locale.toUpperCase(), flag: '🌐', nativeName: locale };

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 select-none",
          isLightMode
            ? "text-gray-600 hover:bg-black/10 hover:text-black"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        )}
      >
        <span>{currentMeta.label}</span>
        <ChevronDown
          className={clsx(
            "w-3 h-3 transition-transform duration-300",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Select language"
        className={clsx(
          "absolute right-0 top-full mt-2 min-w-[140px] rounded-2xl border shadow-2xl shadow-black/60 overflow-hidden z-[200] transition-all duration-200",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
          isLightMode
            ? "bg-white border-gray-200"
            : "bg-[#0d0d0d] border-white/10 backdrop-blur-xl"
        )}
      >
        <div className="py-1.5">
          {(locales as readonly string[]).map((loc) => {
            const meta = LOCALE_META[loc] ?? { label: loc.toUpperCase(), flag: '🌐', nativeName: loc };
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                role="option"
                aria-selected={isActive}
                onClick={() => switchLocale(loc)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-200",
                  isLightMode
                    ? isActive
                      ? "bg-black/5 text-black"
                      : "text-gray-600 hover:bg-black/5 hover:text-black"
                    : isActive
                      ? "bg-white/5 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex flex-col flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest leading-none">
                    {meta.label}
                  </span>
                  <span className={clsx(
                    "text-[10px] leading-tight mt-0.5",
                    isLightMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    {meta.nativeName}
                  </span>
                </div>
                {isActive && (
                  <Check className={clsx(
                    "w-3.5 h-3.5 shrink-0",
                    isLightMode ? "text-black" : "text-[#00b4d9]"
                  )} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
