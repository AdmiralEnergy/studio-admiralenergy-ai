import PricingCard from "../components/PricingCard";

const plans = [
  {
    plan: "Launch",
    price: "$6k",
    description: "Ideal for emerging teams validating positioning and building a modern brand foundation.",
    features: [
      "Brand OS audit + roadmap",
      "Rapid identity system refresh",
      "AI-assisted content toolkit",
      "Enablement for internal teams",
    ],
  },
  {
    plan: "Scale",
    price: "$12k",
    description: "Designed for growth-stage companies expanding into new markets and channels.",
    features: [
      "Cross-channel campaign automation",
      "Personalized lifecycle programs",
      "Analytics + experimentation playbooks",
      "Dedicated strategist + creative pod",
    ],
    highlighted: true,
  },
  {
    plan: "Enterprise",
    price: "Custom",
    description: "For global organizations requiring bespoke workflows, integrations, and governance.",
    features: [
      "Integration with enterprise data stack",
      "Custom AI model tuning and guardrails",
      "Executive enablement + change management",
      "Quarterly innovation labs",
    ],
  },
];

function PricingPage() {
  return (
    <div className="section-padding bg-cream">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold">Pricing</h1>
        <p className="mt-4 max-w-3xl text-navy/70">
          Every engagement begins with a collaborative discovery sprint to align your goals, audience, and infrastructure. We create
          modular plans that scale as your needs evolve.
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.plan} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}

PricingPage.layoutProps = {
  title: "Pricing",
  description: "Transparent pricing tiers for Admiral Energy Studio's AI-driven branding and automation services.",
};

export default PricingPage;
