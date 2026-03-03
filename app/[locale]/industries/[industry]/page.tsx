import IndustryDetailClient from "./IndustryDetailClient";
import { getIndustryBySlugData } from "@/lib/strapiFetch";

export default async function IndustryDetailPage(props: { params: Promise<{ industry: string, locale?: string }> }) {
    const params = await props.params;
    const { industry: slug, locale = 'en' } = params;

    const initialIndustryData = await getIndustryBySlugData(slug, locale);

    return <IndustryDetailClient slug={slug} locale={locale} initialIndustryData={initialIndustryData} />;
}
