import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/ApplicationForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Apply for a Small Business Website",
  description: "Tell Studio Admiral about your small business and apply for a professional website with no upfront design fee, subject to fit, scope, and capacity.",
  alternates: { canonical: "/apply" },
  openGraph: { title: "Apply for a Website | Studio Admiral", description: "Tell us about the business, what is missing, and what a useful website needs to accomplish.", url: "/apply" },
  twitter: { title: "Apply for a Website | Studio Admiral", description: "Tell us about the business, what is missing, and what a useful website needs to accomplish." },
};

export default function ApplyPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Apply</span></nav>
        <div className="page-hero-grid"><div><p className="eyebrow"><span /> Website application</p><h1>Show us your <em>business.</em></h1></div><p className="page-hero-lede">The best applications are specific. Tell us what you sell, who you serve, what is missing online, and what a useful website should help someone do.</p></div>
      </section>
      <section className="section application-shell content-grid">
        <aside className="application-intro"><h2>A fit conversation, not an automatic acceptance.</h2><p>{siteConfig.offer.qualification}</p><div className="notice-card" style={{ marginTop: "2rem" }}><h3>Before you apply</h3><p>The typical program is for professional business and lead-generation websites. Complex software, e-commerce, unlimited pages, and unlimited revisions are outside the standard scope.</p></div></aside>
        <ApplicationForm />
      </section>
    </main>
  );
}
