import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs, processSteps, siteConfig, websiteTypes } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Free Website Program",
  description: "Studio Admiral builds professional lead-generation and business-presence websites for qualifying small businesses with no upfront design fee.",
  path: "/websites",
  openGraphTitle: "Free Website Program | Studio Admiral",
  openGraphDescription: "A separate website program for qualifying small businesses, built around fit, scope, and a clear business goal.",
});

export default function WebsitesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Small Business Website Program",
    provider: { "@id": `${siteConfig.url}/#organization` },
    serviceType: "Professional small business website design and implementation",
    description: siteConfig.offer.headline,
    url: `${siteConfig.url}/websites`,
  };

  return (
    <main id="main-content">
      <section className="page-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Websites</span></nav>
        <div className="page-hero-grid">
          <div><p className="eyebrow"><span /> The website program</p><h1>Start with a website that does a <em>real job.</em></h1></div>
          <p className="page-hero-lede">{siteConfig.offer.headline} We build the foundation first, prove the quality of our work, and leave room to support growth later.</p>
        </div>
        <div className="page-hero-meta"><span>For legitimate small businesses</span><span>Subject to fit + scope</span><span>Standard business sites</span></div>
      </section>

      <section className="section website-types-section">
        <SectionHeading eyebrow="Two starting points" title={<>Different visitors. <em>Different next steps.</em></>} description="The right structure depends on what someone needs to understand before taking action." />
        <div className="website-type-grid">{websiteTypes.map((type) => <article className="website-type-card" key={type.title}><span>{type.number}</span><h3>{type.title}</h3><p>{type.description}</p><strong>{type.flow}</strong><ul>{type.examples.map((example) => <li key={example}>{example}</li>)}</ul></article>)}</div>
      </section>

      <section className="section offer-section">
        <div className="offer-sticky"><p className="eyebrow"><span /> Typical scope</p><h2>Useful by <em>default.</em></h2><p>The program covers the core of a professional business website. The exact structure is shaped around the business and confirmed before work begins.</p><Link className="button" href="/apply">Apply for a website <span aria-hidden="true">↗</span></Link></div>
        <div>
          <h3 className="eyebrow"><span /> Usually included</h3>
          <ul className="scope-list">{siteConfig.offer.typicalScope.map((item) => <li key={item}>{item}</li>)}</ul>
          <h3 className="eyebrow" style={{ marginTop: "4rem" }}><span /> Outside typical scope</h3>
          <ul className="scope-list exclusion-list">{siteConfig.offer.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="notice-card" style={{ marginTop: "2rem" }}><h3>Third-party costs stay visible.</h3><p>Paid domains, SaaS tools, APIs, premium plugins, advertising spend, and other vendor expenses do not silently become Studio Admiral&apos;s responsibility. We identify them before a decision is made.</p></div>
        </div>
      </section>

      <section className="section process-section">
        <SectionHeading eyebrow="The process" title={<>A clear path from application to <em>launch.</em></>} />
        <div className="process-grid">{processSteps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </section>

      <section className="section faq-section"><SectionHeading eyebrow="Program FAQ" title={<>The guardrails are part of the <em>offer.</em></>} /><FAQ items={faqs} /></section>
      <CTASection title="A professional website is a practical place to start." description={siteConfig.offer.qualification} />
      <JsonLd data={schema} />
    </main>
  );
}
