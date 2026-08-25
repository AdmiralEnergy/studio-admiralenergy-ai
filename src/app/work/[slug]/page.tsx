import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PortfolioViewTracker } from "@/components/PortfolioViewTracker";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProject, projectLeadLabel, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} Case Study`;
  const description = project.shortDescription;
  const image = project.image ? new URL(project.image, siteConfig.url).toString() : null;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | Studio Admiral`,
      description,
      url: `/work/${project.slug}`,
      images: image ? [{ url: image, alt: `${project.name} website homepage` }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} | Studio Admiral`,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work` },
      { "@type": "ListItem", position: 3, name: project.name, item: `${siteConfig.url}/work/${project.slug}` },
    ],
  };

  return (
    <main id="main-content">
      <PortfolioViewTracker project={project.slug} />
      <section className="page-hero case-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/work">Work</Link><span>/</span><span>{project.name}</span></nav>
        <div className="case-hero-topline"><span>{project.relationshipType}</span><span>{project.status}</span></div>
        <h1>{project.name}</h1>
        <div className="case-summary">
          <p>{project.description}</p>
          <dl>
            <div><dt>Project type</dt><dd>{project.projectType}</dd></div>
            <div><dt>Industry</dt><dd>{project.industry}</dd></div>
            <div><dt>Lead</dt><dd>{projectLeadLabel(project.lead)}</dd></div>
            <div><dt>Status</dt><dd>{project.status}</dd></div>
          </dl>
        </div>
      </section>

      <div className="case-visual"><ProjectVisual project={project} priority /></div>

      <section className="section case-body">
        <aside className="case-sidebar">
          <h2>Services</h2><ul className="tag-list">{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
          <h2>Lead</h2><p className="case-lead-label">{projectLeadLabel(project.lead)}</p>
          <h2>Technology</h2><ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          {project.liveUrl ? <a className="button case-live-link" data-track="outbound_portfolio_site_visit" data-project={project.slug} href={project.liveUrl} target="_blank" rel="noreferrer">Visit website <span aria-hidden="true">↗</span></a> : <div className="notice-card"><h3>No public link</h3><p>This project does not currently have a verified public deployment.</p></div>}
          <Link className="text-link case-inquiry-link" data-track="project_inquiry_started" data-project={project.slug} href={`/contact?purpose=paid-project&project=${project.slug}`}>Start a Similar Project <span aria-hidden="true">→</span></Link>
        </aside>
        <div className="case-sections">
          <article className="case-section"><span>01</span><div><h2>The challenge</h2><p>{project.challenge}</p></div></article>
          <article className="case-section"><span>02</span><div><h2>Studio Admiral&apos;s role</h2><p>{project.services.join(", ")}.</p><p><strong>Lead and collaborators:</strong> {projectLeadLabel(project.lead)}.</p></div></article>
          <article className="case-section"><span>03</span><div><h2>Strategy &amp; creative approach</h2><p>{project.approach}</p></div></article>
          <article className="case-section"><span>04</span><div><h2>Deliverables</h2><ul className="case-list">{project.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}</ul></div></article>
          <article className="case-section"><span>05</span><div><h2>Verified outcomes</h2><p>{project.outcome}</p><ul className="case-list">{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></div></article>
        </div>
      </section>

      <CTASection eyebrow="Build from relevant proof" title={`Start a project inspired by ${project.name}.`} description="The inquiry form will carry this project context forward. Choose David, Leigh, or ask us to recommend the right lead." primaryHref={`/contact?purpose=paid-project&project=${project.slug}`} primaryLabel="Start a Similar Project" secondaryHref="/work" secondaryLabel="Back to all work" />
      <JsonLd data={breadcrumbs} />
    </main>
  );
}
