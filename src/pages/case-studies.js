const studies = [
  {
    name: "GridScale Renewables",
    outcome: "35% increase in qualified enterprise pipeline",
    summary:
      "Developed an adaptive brand platform and lifecycle automation framework that aligned marketing and commercial teams across three continents.",
  },
  {
    name: "VoltWave Storage",
    outcome: "4x faster creative production",
    summary:
      "Implemented AI-assisted content workflows with governance that accelerated launch velocity for product, demand gen, and partner marketing.",
  },
  {
    name: "HydraCore Infrastructure",
    outcome: "22% lift in paid media efficiency",
    summary:
      "Unified analytics across paid, earned, and owned channels to inform spend allocation and high-performing messaging.",
  },
];

function CaseStudiesPage() {
  return (
    <div className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold">Case Studies</h1>
        <p className="mt-4 max-w-3xl text-navy/70">
          Explore how Admiral Energy Studio partners with energy innovators to transform go-to-market operations and accelerate demand.
        </p>
        <div className="mt-12 space-y-6">
          {studies.map((study) => (
            <article key={study.name} className="rounded-3xl border border-navy/10 bg-cream/70 p-8 shadow-sm shadow-navy/5">
              <h2 className="text-2xl font-semibold text-navy">{study.name}</h2>
              <p className="mt-2 text-sm uppercase tracking-wide text-neon">{study.outcome}</p>
              <p className="mt-4 text-navy/70">{study.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

CaseStudiesPage.layoutProps = {
  title: "Case Studies",
  description: "Results from Admiral Energy Studio engagements across renewables, storage, and infrastructure leaders.",
};

export default CaseStudiesPage;
