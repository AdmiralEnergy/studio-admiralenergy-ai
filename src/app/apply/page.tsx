import Link from "next/link";
import { ApplicationForm } from "@/components/ApplicationForm";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Apply for the Free Website Program",
  description: "Tell Studio Admiral about your small business and apply for a professional website with no upfront design fee, subject to fit, scope, and capacity.",
  path: "/apply",
  openGraphTitle: "Apply for the Free Website Program | Studio Admiral",
  openGraphDescription: "Tell us about your business, what is missing online, and what a useful website should help someone do.",
});

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
