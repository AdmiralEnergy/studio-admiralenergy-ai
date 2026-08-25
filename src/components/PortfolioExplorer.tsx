"use client";

import { useMemo, useState } from "react";
import { projectCategories, projectLeadLabel, type Project } from "@/data/projects";
import { track } from "@/lib/analytics";
import { ProjectCard } from "./ProjectCard";

const filters = ["Featured", ...projectCategories, "David-led", "Leigh-led", "Collaborative"] as const;
type Filter = (typeof filters)[number];

export function PortfolioExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("Featured");
  const visible = useMemo(() => projects.filter((project) => {
    if (active === "Featured") return project.featured;
    if (projectCategories.includes(active as (typeof projectCategories)[number])) return project.categories.includes(active as (typeof projectCategories)[number]);
    return projectLeadLabel(project.lead) === active;
  }), [active, projects]);

  return (
    <div className="portfolio-explorer">
      <div className="portfolio-filters" role="group" aria-label="Filter portfolio projects">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            aria-pressed={active === filter}
            onClick={() => { setActive(filter); track("portfolio_filter_selected", { filter }); }}
          >{filter}</button>
        ))}
      </div>
      <p className="filter-results" aria-live="polite">Showing {visible.length} {visible.length === 1 ? "project" : "projects"} for {active}</p>
      <div className="project-grid">{visible.map((project, index) => <ProjectCard project={project} priority={index === 0} key={project.slug} />)}</div>
    </div>
  );
}
