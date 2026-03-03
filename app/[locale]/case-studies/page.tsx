import { getCaseStudiesData, getServicesData } from "@/lib/strapiFetch";
import CaseStudiesClient from "./CaseStudiesClient";

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const initialCaseStudies = await getCaseStudiesData(locale);
  const initialServices = await getServicesData(locale);

  return <CaseStudiesClient initialCaseStudies={initialCaseStudies} initialServices={initialServices} />;
}
