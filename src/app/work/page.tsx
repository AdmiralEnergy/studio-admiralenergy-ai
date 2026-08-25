import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { PortfolioExplorer } from "@/components/PortfolioExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Explore David-led, Leigh-led, and collaborative Studio Admiral work across websites, strategy, storytelling, branding, content, and AI.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Selected Work | Studio Admiral", description: "A transparent look at real community, in-house, family, and product projects.", url: "/work" },
  twitter: { title: "Selected Work | Studio Admiral", description: "A transparent look at real community, in-house, family, and product projects." },
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Work</span></nav>
        <div className="page-hero-grid"><div><p className="eyebrow"><span /> Selected work</p><h1>Proof through <em>what we build.</em></h1></div><p className="page-hero-lede">Filter the portfolio by capability or lead. Each case study labels the relationship, responsibilities, deliverables, and real outcomes clearly.</p></div>
        <div className="page-hero-meta"><span>{projects.length} documented projects</span><span>David, Leigh &amp; collaborative leads</span><span>Live links when verified</span></div>
      </section>
      <section className="section selected-work-section"><PortfolioExplorer projects={projects} /></section>
      <CTASection eyebrow="Start with relevant proof" title="See something your project needs?" description="Carry that project into the inquiry form, choose a founder, and tell us what you want to build next." primaryHref="/contact?purpose=paid-project" primaryLabel="Start a paid project" secondaryHref="/growth" secondaryLabel="Explore services" />
    </main>
  );
}
