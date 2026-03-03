import IndustriesClient from "./IndustriesClient";
import { getIndustriesData, getServicesData } from "@/lib/strapiFetch";

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const initialIndustries = await getIndustriesData(locale);
  const initialServices = await getServicesData(locale);
  return <IndustriesClient initialIndustries={initialIndustries} initialServices={initialServices} />;
}
