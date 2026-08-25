import Link from "next/link";
import { baselineExclusions, baselineTiers } from "@/data/partnership";

export function MarketingBaseline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`baseline-offer${compact ? " baseline-offer-compact" : ""}`}>
      <div className="baseline-intro">
        <p className="eyebrow"><span /> One-time paid starter offer</p>
        <h2>Small Business <em>Marketing Baseline</em></h2>
        <p className="baseline-price">Starting at $50 <span>·</span> Typical projects range from $50–$100</p>
        <p>Establish or clean up the public marketing basics without beginning a subscription. A different focused baseline task of similar scope is welcome; final scope and price are confirmed before work begins.</p>
      </div>
      <div className="baseline-tiers">
        {baselineTiers.map((tier) => (
          <article key={tier.name}>
            <span>{tier.price}</span><h3>{tier.name}</h3><p>{tier.description}</p>
            <ul>{tier.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
      <details className="baseline-boundaries">
        <summary>What this offer does not include <span aria-hidden="true">+</span></summary>
        <ul>{baselineExclusions.map((item) => <li key={item}>{item}</li>)}</ul>
        <p>Do not send passwords. Secure platform invitations or access-grant workflows are used after onboarding.</p>
      </details>
      <div className="baseline-actions">
        <Link className="button" data-track="marketing_baseline_interest" href="/contact?purpose=marketing-baseline">Build My Marketing Baseline <span aria-hidden="true">↗</span></Link>
        <Link className="text-link" href="/websites">Looking for the separate free-website program? <span aria-hidden="true">→</span></Link>
      </div>
    </div>
  );
}
