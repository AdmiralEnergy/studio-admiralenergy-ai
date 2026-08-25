import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects, prioritizeFirst = false }: { projects: Project[]; prioritizeFirst?: boolean }) {
  return <div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} priority={prioritizeFirst && index === 0} key={project.slug} />)}</div>;
}
