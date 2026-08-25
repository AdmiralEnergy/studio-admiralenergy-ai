import Link from "next/link";
import { projectLeadLabel, projectStatusLabel, type Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className={`project-card project-accent-${project.accent}`}>
      <Link className="project-card-visual-link" href={`/work/${project.slug}`} data-track="portfolio_project_clicked" data-project={project.slug} aria-label={`View ${project.name} case study`}>
        <ProjectVisual project={project} priority={priority} />
      </Link>
      <div className="project-card-copy">
        <div className="project-card-topline"><span>{projectLeadLabel(project.lead)}</span><span>{projectStatusLabel(project.status)}</span></div>
        <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
        <p>{project.shortDescription}</p>
        <ul className="project-card-tags">{project.categories.map((category) => <li key={category}>{category}</li>)}</ul>
        <div className="project-card-actions">
          <Link className="project-card-link" href={`/work/${project.slug}`}>View project <i aria-hidden="true">↗</i></Link>
          <Link className="project-card-inquiry" data-track="project_inquiry_started" data-project={project.slug} href={`/contact?purpose=paid-project&project=${project.slug}`}>Start a similar project</Link>
        </div>
      </div>
    </article>
  );
}
