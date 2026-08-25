import Link from "next/link";
import { PartnerContactForm, type InquiryPurpose, type PartnerChoice } from "@/components/PartnerContactForm";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Start a Project",
  description: "Contact Studio Admiral about paid projects, the Small Business Marketing Baseline, jobs and contracts, collaborations, or general inquiries.",
  path: "/contact",
  openGraphTitle: "Start a Project | Studio Admiral",
  openGraphDescription: "Choose David, Leigh, or both for a paid project, job or contract opportunity, collaboration, or practical marketing support.",
});

const purposes = new Set<InquiryPurpose>(["paid-project", "marketing-baseline", "job-contract", "collaboration", "general"]);
const partners = new Set<PartnerChoice>(["david", "leigh", "both"]);

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const purposeValue = typeof query.purpose === "string" ? query.purpose : "paid-project";
  const partnerValue = typeof query.partner === "string" ? query.partner : "both";
  const projectValue = typeof query.project === "string" ? query.project.slice(0, 200) : "";
  const purpose = purposes.has(purposeValue as InquiryPurpose) ? purposeValue as InquiryPurpose : "paid-project";
  const partner = partners.has(partnerValue as PartnerChoice) ? partnerValue as PartnerChoice : "both";

  return (
    <main id="main-content">
      <section className="page-hero contact-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Contact</span></nav>
        <div className="page-hero-grid"><div><p className="eyebrow"><span /> Contact Studio Admiral</p><h1>Who would you like to <em>work with?</em></h1></div><p className="page-hero-lede">Choose David, Leigh, or both. The inquiry purpose determines the message context; your partner choice securely determines the recipient.</p></div>
      </section>
      <section className="section application-shell content-grid">
        <aside className="application-intro"><h2>One form. The right route.</h2><p>Use this form for paid projects, the one-time Marketing Baseline, jobs or contracts, collaborations, and general inquiries.</p><div className="direct-email-card"><p>Direct email fallback</p><a data-track="email_clicked" href="mailto:davide@admiralenergy.ai">David · davide@admiralenergy.ai</a><a data-track="email_clicked" href="mailto:leighnicoleedwards97@gmail.com">Leigh · leighnicoleedwards97@gmail.com</a></div><p><strong>Applying for the free website program?</strong> Keep that request in its separate <Link className="text-link" href="/apply">qualification application <span aria-hidden="true">→</span></Link>.</p></aside>
        <PartnerContactForm initialPurpose={purpose} initialPartner={partner} initialProject={projectValue} />
      </section>
    </main>
  );
}
