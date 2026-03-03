import { 
  getHeroData, 
  getFeatureStripData, 
  getProjectsData, 
  getServicesSectionData, 
  getOrangeStatementData, 
  getProcessSectionData,
  getTestimonialsData,
  getTestimonialsSectionData,
  getFooterData
} from "@/lib/strapiFetch";
import HomePageClient from "./HomePageClient";

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = (await Promise.resolve(params)).locale;
  const heroData = await getHeroData(locale);
  const featureStripData = await getFeatureStripData(locale);
  const projectsData = await getProjectsData(locale);
  const servicesData = await getServicesSectionData(locale);
  const orangeStatementData = await getOrangeStatementData(locale);
  const processData = await getProcessSectionData(locale);
  const testimonialsData = await getTestimonialsData(locale);
  const testimonialsHeader = await getTestimonialsSectionData(locale);
  const footerData = await getFooterData(locale);

  return (
    <HomePageClient 
      heroData={heroData} 
      featureStripData={featureStripData} 
      projectsData={projectsData} 
      servicesData={servicesData}
      orangeStatementData={orangeStatementData}
      processData={processData}
      testimonialsData={testimonialsData}
      testimonialsHeader={testimonialsHeader}
      footerData={footerData}
    />
  );
}
