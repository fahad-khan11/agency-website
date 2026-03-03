import { getCaseStudyBySlugData, getCaseStudiesData } from "@/lib/strapiFetch";
import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { getAdjacentCaseStudies } from "@/data/caseStudiesData";

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  const studyDataRaw = await getCaseStudyBySlugData(slug, locale);
  const allCases = await getCaseStudiesData(locale);
  
  // Find adjacent from strapi data if possible
  const currentIndex = allCases.findIndex((s:any) => (s.attributes?.slug || s.slug) === slug);
  let previous = null;
  let next = null;
  
  if (currentIndex !== -1) {
    if (currentIndex > 0) previous = allCases[currentIndex - 1];
    if (currentIndex < allCases.length - 1) next = allCases[currentIndex + 1];
  } else {
    // fallback check for static routing/fallback
    const adj = getAdjacentCaseStudies(slug);
    previous = adj.previous;
    next = adj.next;
  }

  return <CaseStudyDetailClient params={resolvedParams} studyDataRaw={studyDataRaw} previousRaw={previous} nextRaw={next} />;
}
