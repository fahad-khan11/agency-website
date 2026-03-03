import { getProjectsData } from "@/lib/strapiFetch";
import ProjectsPageClient from "./ProjectsPageClient";

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  const projectsData = await getProjectsData(locale);

  return <ProjectsPageClient projectsData={projectsData} />;
}
