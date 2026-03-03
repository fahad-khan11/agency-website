import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectsData } from "@/lib/strapiFetch";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const { slug, locale } = resolvedParams;

  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    notFound();
  }

  // Pre-calculate next project for navigation
  const allProjects = await getProjectsData(locale);
  const currentIndex = allProjects.findIndex((p: any) => p.slug === slug || p.attributes?.slug === slug);
  const nextProject = currentIndex >= 0 ? allProjects[(currentIndex + 1) % allProjects.length] : allProjects[0];

  return <ProjectDetailClient project={project} nextProject={nextProject} locale={locale} />;
}
