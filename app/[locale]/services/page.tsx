import React from 'react';
import { getServicesData } from '@/lib/strapiFetch';
import ServicesClient from './ServicesClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Atriona',
  description: 'Comprehensive digital solutions tailored to your brand\'s unique needs.',
};

export default async function ServicesPage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    const servicesData = await getServicesData(locale);
    
    return <ServicesClient initialServices={servicesData} />;
}
