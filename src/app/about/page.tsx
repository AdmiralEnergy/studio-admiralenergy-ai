import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FounderGateway } from "@/components/FounderGateway";
import { SectionHeading } from "@/components/SectionHeading";
import { collaborationSteps, partnershipModes } from "@/data/partnership";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "David & Leigh",
  description: "Meet David and Leigh, two equal Studio Admiral partners combining strategy, conversion, storytelling, creative direction, content, and practical business experience.",
  path: "/about",
  openGraphTitle: "David & Leigh | Studio Admiral",
  openGraphDescription: "Meet the two founders behind Studio Admiral: David leads strategy and conversion, while Leigh leads storytelling and creative direction.",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Partnership</span></nav>
        <div className="page-hero-grid"><div><p className="eyebrow"><span /> David + Leigh</p><h1>Independent expertise. <em>Shared strategy.</em></h1></div><p className="page-hero-lede">Studio Admiral is a founder-led marketing partnership, not a large anonymous agency. David and Leigh lead independently when appropriate and collaborate when valuable.</p></div>
      </section>

      <section className="section founder-gateway-section"><SectionHeading eyebrow="Meet the partners" title={<>Choose a perspective. <em>Keep the full range.</em></>} description="Neither founder is an assistant to the other. Each has a direct contact route, a distinct portfolio lead, and equal standing inside Studio Admiral." /><FounderGateway /></section>

      <section className="section partnership-model"><SectionHeading eyebrow="Three ways to work" title={<>A structure shaped around <em>the project.</em></>} />
        <div className="partnership-mode-grid">{partnershipModes.map((mode, index) => <article data-mode={mode.id} key={mode.id}><span>0{index + 1}</span><p>{mode.label}</p><h3>{mode.title}</h3><p>{mode.description}</p></article>)}</div>
      </section>

      <section className="section collaboration-process"><SectionHeading eyebrow="Clear project ownership" title={<>Two founders. <em>One coherent outcome.</em></>} description="The collaboration model is deliberately simple." /><ol>{collaborationSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></section>
      <CTASection eyebrow="Choose your route" title="Work with David, Leigh, or both." description="Bring a paid project, job or contract opportunity, collaboration idea, or general question." primaryHref="/contact" primaryLabel="Choose a partner" secondaryHref="/work" secondaryLabel="Explore the portfolio" />
    </main>
  );
}
