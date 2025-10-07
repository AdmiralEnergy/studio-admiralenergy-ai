import Link from "next/link";

function ContactPage() {
  return (
    <div className="section-padding bg-cream">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h1 className="text-4xl font-semibold">Contact</h1>
          <p className="mt-4 text-navy/70">
            Let’s build the next era of energy storytelling together. Share your goals, timelines, and the systems you rely on today.
            Our team will respond within one business day.
          </p>
          <div className="mt-10 space-y-6 text-sm text-navy/80">
            <div>
              <h2 className="text-base font-semibold text-navy">Email</h2>
              <a href="mailto:hello@admiralenergy.ai" className="mt-1 block text-neon">
                hello@admiralenergy.ai
              </a>
            </div>
            <div>
              <h2 className="text-base font-semibold text-navy">Office Hours</h2>
              <p className="mt-1">Monday – Friday, 9am to 6pm ET</p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-navy">Connect</h2>
              <Link href="https://www.linkedin.com/company/admiralenergy" className="mt-1 inline-flex items-center gap-2 text-neon" target="_blank" rel="noreferrer">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-navy/10 bg-white/80 p-8 shadow-lg shadow-navy/10 backdrop-blur">
          <h2 className="text-2xl font-semibold text-navy">Discovery Session</h2>
          <p className="mt-3 text-sm text-navy/70">
            Tell us about your objectives and we’ll curate a roadmap that combines strategic guidance with automation blueprints.
          </p>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/60"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                className="mt-1 w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/60"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-navy">
                Project details
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Share your goals, timelines, and current tools."
                className="mt-1 w-full rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/60"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-neon px-4 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

ContactPage.layoutProps = {
  title: "Contact",
  description: "Connect with Admiral Energy Studio to schedule a discovery session and explore AI-powered brand automation.",
};

export default ContactPage;
