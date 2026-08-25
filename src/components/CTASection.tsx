import Link from "next/link";

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CTASection({
  eyebrow = "Start here",
  title = "Need a better website? Show us your business.",
  description = "Tell us what you do, what is missing, and what a useful website needs to accomplish.",
  primaryHref = "/apply",
  primaryLabel = "Apply for a website",
  secondaryHref = "/work",
  secondaryLabel = "View our work",
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <p className="eyebrow eyebrow-light"><span /> {eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="cta-actions">
        <Link className="button button-light" href={primaryHref}>{primaryLabel} <span aria-hidden="true">↗</span></Link>
        <Link className="text-link text-link-light" href={secondaryHref}>{secondaryLabel} <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
