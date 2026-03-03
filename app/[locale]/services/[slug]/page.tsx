import React from 'react';
import { getServiceBySlugData } from '@/lib/strapiFetch';
import ServiceDetailClient from './ServiceDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale?: string }> }): Promise<Metadata> {
  const { slug, locale = 'en' } = await params;
  const service = await getServiceBySlugData(slug, locale);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const attrs = service.attributes || service;

  return {
    title: `${attrs.title} | Atriona`,
    description: attrs.description || attrs.tagline || '',
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string, locale?: string }> }) {
  const { slug, locale = 'en' } = await params;
  const initialServiceData = await getServiceBySlugData(slug, locale);

  return <ServiceDetailClient slug={slug} locale={locale} initialServiceData={initialServiceData} />;
}
