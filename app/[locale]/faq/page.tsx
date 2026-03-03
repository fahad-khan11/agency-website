import { getFaqPageData } from "@/lib/strapiFetch";
import FaqClient from "./FaqClient";

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const faqData = await getFaqPageData(locale);

  return <FaqClient initialData={faqData} />;
}
