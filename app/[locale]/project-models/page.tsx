import { getProjectModelData, getFinancingModels } from "@/lib/strapiFetch";
import ProjectModelsClient from "./ProjectModelsClient";

export default async function ProjectModelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const initialData = await getProjectModelData(locale);
  const financingModels = await getFinancingModels(locale);

  return <ProjectModelsClient initialData={initialData} financingModels={financingModels} />;
}
