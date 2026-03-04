"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { getLocalizedPath } from '@/routing';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = useLocale();

  // Translate canonical path to locale-specific path (e.g. /industries → /branchen for de)
  const translatedPath = getLocalizedPath(href, locale);

  // Prepend locale prefix if not already present
  const localizedHref = translatedPath.startsWith(`/${locale}`)
    ? translatedPath
    : `/${locale}${translatedPath}`;

  return <Link href={localizedHref} {...props} />;
}
