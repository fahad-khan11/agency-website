import { getFinancingModelBySlug } from "@/lib/strapiFetch";
import PurchaseModelClient from "./PurchaseModelClient";
import { notFound } from "next/navigation";

export default async function PurchaseModelPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const initialData = await getFinancingModelBySlug("purchase-model", locale);

  if (!initialData) {
      notFound();
  }

  return <PurchaseModelClient initialData={initialData} />;
}
