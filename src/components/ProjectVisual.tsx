import Image from "next/image";
import type { Project } from "@/data/projects";
import { BrowserMockup } from "./BrowserMockup";

export function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.visualStyle === "browser") {
    return <BrowserMockup image={project.image} alt={`${project.name} project preview`} priority={priority} />;
  }

  return (
    <div className={`project-editorial project-editorial-${project.visualFit ?? "cover"}`}>
      <Image
        src={project.image}
        alt={`${project.name} brand and campaign artwork`}
        fill
        sizes="(max-width: 760px) 94vw, 48vw"
        priority={priority}
      />
    </div>
  );
}
