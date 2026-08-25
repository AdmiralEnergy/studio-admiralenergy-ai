import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Privacy", description: "How Studio Admiral handles website inquiry and application information.", path: "/privacy", robots: { index: true, follow: true } });

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <section className="page-hero"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Privacy</span></nav><p className="eyebrow"><span /> Privacy</p><h1>Plain-language <em>privacy.</em></h1></section>
      <section className="section content-grid"><div><p className="eyebrow"><span /> Last updated</p><p>August 24, 2026</p></div><div className="content-prose"><h2>Information you choose to send</h2><p>When you submit a website application or partner-routed inquiry, Studio Admiral receives the information you enter in that form. We use it to review the request, determine fit, respond, and discuss potential work.</p><h3>Website analytics</h3><p>The site may use basic, environment-configured analytics to understand aggregate visits and meaningful actions such as project clicks or form activity. We do not intentionally use this site for invasive tracking.</p><h3>Third-party services</h3><p>The free-website application uses Netlify Forms. Partner-routed inquiries use the site server and, when configured, Resend for email delivery. Portfolio links lead to properties with their own privacy practices.</p><h3>Questions or requests</h3><p>To ask about information you submitted, email <a className="text-link" href="mailto:davide@admiralenergy.ai">David</a> or <a className="text-link" href="mailto:leighnicoleedwards97@gmail.com">Leigh</a>.</p></div></section>
    </main>
  );
}
