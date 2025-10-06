import HeroSection from "../components/HeroSection";
import ServiceCard from "../components/ServiceCard";
import Link from "next/link";

const services = [
  {
    title: "Brand Intelligence",
    description: "Machine learning powered insights that refine your narrative, visual identity, and go-to-market positioning in real time.",
  },
  {
    title: "Content Automation",
    description: "Deploy adaptive content engines that scale messaging across channels with governance baked in.",
  },
  {
    title: "Acquisition Analytics",
    description: "Connect paid, earned, and owned data streams to predict campaign performance and optimize spend.",
  },
];

function HomePage() {
  return (
    <div>
      <HeroSection />
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold">What we power</h2>
          <p className="mt-2 max-w-2xl text-navy/70">
            From foundational identity systems to high-velocity performance campaigns, Admiral Energy Studio architects an integrated
            operating system for your marketing organization.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold">Enterprise-ready partnerships</h2>
              <p className="mt-4 text-navy/70">
                We plug in as an extension of your team, co-owning outcomes and building the automation and analytics stack that keeps
                your brand ahead of the market.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-navy/80">
                {[
                  "Collaborative sprints with strategy, design, and engineering",
                  "Secure infrastructure with SOC 2-aligned workflows",
                  "Energy sector expertise informed by global go-to-market data",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-neon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-navy/10 bg-navy p-8 text-cream shadow-xl shadow-navy/40">
              <h3 className="text-2xl font-semibold">Ready to energize your brand?</h3>
              <p className="mt-3 text-cream/80">
                Let’s audit your acquisition engine, map automation opportunities, and align your go-to-market team around a unified vision.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-full bg-neon px-5 py-3 font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
              >
                Schedule a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

HomePage.layoutProps = {
  title: "Home",
  description: "Admiral Energy Studio provides AI-powered branding, automation, and analytics for energy innovators.",
};

export default HomePage;
