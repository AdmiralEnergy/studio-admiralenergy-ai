import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-navy via-navy to-black text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8">
        <span className="rounded-full border border-cream/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cream/80">
          AI Branding + Automation
        </span>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Ignite your enterprise brand with intelligent creative automation.
        </h1>
        <p className="max-w-2xl text-lg text-cream/80">
          Admiral Energy Studio helps energy innovators move faster with AI-powered storytelling, dynamic design systems, and
          conversion-focused campaigns that adapt in real time.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/services"
            className="rounded-full bg-neon px-6 py-3 text-navy shadow-glow transition hover:-translate-y-0.5 hover:shadow-neon"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-cream/40 px-6 py-3 text-cream transition hover:border-neon hover:text-neon"
          >
            Book a Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
