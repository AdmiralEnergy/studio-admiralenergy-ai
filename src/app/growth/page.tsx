import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { MarketingBaseline } from "@/components/MarketingBaseline";
import { marketingProof, partnershipServices } from "@/data/partnership";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Marketing Services & Small Business Baseline",
  description: "Explore David-led, Leigh-led, and collaborative marketing services, plus a bounded one-time Small Business Marketing Baseline from $50–$100.",
  alternates: { canonical: "/growth" },
  openGraph: { title: "Marketing Services & Baseline | Studio Admiral", description: "Websites, storytelling, creative direction, content, automation, analytics, and a one-time $50–$100 marketing foundation.", url: "/growth" },
  twitter: { title: "Marketing Services & Baseline | Studio Admiral", description: "Practical founder-led services and a one-time $50–$100 small-business starter offer." },
};

export default function GrowthPage() {
  const schema = partnershipServices.map((service) => ({ "@context": "https://schema.org", "@type": "Service", name: service.title, provider: { "@id": `${siteConfig.url}/#organization` }, url: `${siteConfig.url}/growth` }));
  return (
    <main id="main-content">
      <section className="page-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Services</span></nav>
        <div className="page-hero-grid"><div><p className="eyebrow"><span /> Services &amp; entry offers</p><h1>Strategy meets <em>storytelling.</em></h1></div><p className="page-hero-lede">Choose a specialist or bring both founders to the table. The lead stays accountable; collaboration is added when it materially improves the work.</p></div>
        <div className="page-hero-meta"><span>David-led execution</span><span>Leigh-led creative direction</span><span>Collaborative campaigns</span></div>
      </section>

      <section className="section services-page-intro">
        <div className="services-page-art"><Image src="/brand-assets/studio-admiral/campaign/more-than-marketing.webp" alt="Studio Admiral More Than Marketing campaign artwork" fill sizes="(max-width: 900px) 94vw, 38vw" priority /></div>
        <div><p className="eyebrow"><span /> More than marketing</p><h2>Clear positioning. Useful creative. <em>Measurable next steps.</em></h2><p>Studio Admiral can own a focused deliverable or assemble a cross-disciplinary engagement around your actual constraint without pretending every project needs every service.</p></div>
      </section>

      <section className="section"><div className="service-page-grid">{partnershipServices.map((service, index) => <article className="service-page-card" id={service.title.toLowerCase().replaceAll(" ", "-")} key={service.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.title}</h2><div><p>Best fit: <strong>{service.lead}</strong></p><Link className="text-link" data-track="growth_service_clicked" data-service={service.title} href={`/contact?purpose=paid-project&project=${encodeURIComponent(service.title)}`}>Ask about this service <span aria-hidden="true">→</span></Link></div></article>)}</div></section>

      <section className="proof-strip" aria-label="Verified marketing experience">{marketingProof.map((item) => <div key={item.label}><span>{item.note}</span><strong>{item.label}</strong></div>)}</section>
      <section className="section baseline-section"><MarketingBaseline /></section>

      <section className="free-website-band"><div><p className="eyebrow eyebrow-light"><span /> Separate qualification path</p><h2>Need the free-website program?</h2><p>The website application remains separate from paid project inquiries and the one-time Marketing Baseline.</p></div><Link className="button button-light" href="/apply" data-track="free_website_application_started">Apply for a Free Website <span aria-hidden="true">↗</span></Link></section>
      <CTASection eyebrow="Start with the real need" title="What should work better next?" description="Tell us the goal, choose a founder, or ask us to recommend one. We will keep the next step practical." primaryHref="/contact?purpose=paid-project" primaryLabel="Start a paid project" secondaryHref="/work" secondaryLabel="Explore relevant work" />
      <JsonLd data={schema} />
    </main>
  );
}
