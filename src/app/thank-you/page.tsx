import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Thank You", description: "Your message has been received by Studio Admiral.", path: "/thank-you", robots: { index: false, follow: false } });

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const isWebsite = type === "website";
  return (
    <main id="main-content" className="thank-you-shell"><section className="thank-you-card"><p className="eyebrow" style={{ justifyContent: "center" }}><span /> Received</p><h1>{isWebsite ? "Your application is in." : "Thanks for reaching out."}</h1><p>{isWebsite ? "We will review the business, project scope, and current capacity. If it looks like a fit, Studio Admiral will follow up to discuss the next step." : "We will review the context and follow up with a practical next step."}</p><div className="hero-actions" style={{ justifyContent: "center" }}><Link className="button" href="/work">View our work <span aria-hidden="true">→</span></Link><Link className="text-link" href="/">Back home <span aria-hidden="true">→</span></Link></div></section></main>
  );
}
