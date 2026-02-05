"use client";

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ComponentProps } from 'react';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = useLocale();
  
  // Prepend the locale to the href if it doesn't already have it
  const localizedHref = href.startsWith(`/${locale}`) ? href : `/${locale}${href}`;
  
  return <Link href={localizedHref} {...props} />;
}
