export default function PricingCard({ plan, price, description, features, highlighted = false }) {
  return (
    <div
      className={`flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-xl ${
        highlighted
          ? "border-neon bg-white text-navy shadow-glow"
          : "border-navy/10 bg-white/80 text-navy shadow-navy/5"
      }`}
    >
      <h3 className="text-lg font-semibold uppercase tracking-wide text-navy/80">{plan}</h3>
      <p className="mt-4 text-4xl font-semibold">
        {price}
        <span className="ml-1 text-base font-normal text-navy/60">/month</span>
      </p>
      <p className="mt-3 text-sm text-navy/70">{description}</p>
      <ul className="mt-6 space-y-2 text-sm text-navy/80">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-neon" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={`mt-8 rounded-full px-5 py-3 text-sm font-semibold transition ${
          highlighted
            ? "bg-neon text-navy shadow-glow hover:-translate-y-0.5"
            : "border border-navy/20 text-navy hover:border-neon hover:text-neon"
        }`}
      >
        Start a Pilot
      </button>
    </div>
  );
}
