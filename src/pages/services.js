import ServiceCard from "../components/ServiceCard";

const serviceGroups = [
  {
    title: "Strategy & Identity",
    description: "Craft the narrative architecture and visual systems that differentiate your brand across enterprise buying cycles.",
  },
  {
    title: "Intelligent Production",
    description: "Launch AI-assisted workflows that generate, localize, and personalize creative while maintaining compliance.",
  },
  {
    title: "Lifecycle Automation",
    description: "Align marketing, sales, and customer success with automated nurture journeys and predictive scoring.",
  },
  {
    title: "Analytics & Experimentation",
    description: "Connect full-funnel data to optimize spend, test messaging, and prove ROI with board-ready reporting.",
  },
];

function ServicesPage() {
  return (
    <div className="section-padding bg-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold">Services</h1>
        <p className="mt-4 max-w-3xl text-navy/70">
          Admiral Energy Studio builds adaptive brand systems that combine human creativity with AI precision. We partner with marketing
          and growth teams to remove friction, accelerate output, and surface the insights leaders need to scale.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {serviceGroups.map((service) => (
            <ServiceCard key={service.title} title={service.title} description={service.description} />
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-navy p-8 text-cream shadow-lg shadow-navy/40">
          <h2 className="text-2xl font-semibold">Implementation support</h2>
          <p className="mt-3 text-cream/80">
            Our strategists, designers, and engineers work side-by-side with your team. We provide enablement, documentation, and
            governance frameworks to ensure sustainable adoption.
          </p>
        </div>
      </div>
    </div>
  );
}

ServicesPage.layoutProps = {
  title: "Services",
  description: "AI-native branding, automation, and analytics services from Admiral Energy Studio.",
};

export default ServicesPage;
