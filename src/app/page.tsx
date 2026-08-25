import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { FounderGateway } from "@/components/FounderGateway";
import { MarketingBaseline } from "@/components/MarketingBaseline";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { collaborationSteps, founders, marketingProof, partnershipModes, partnershipServices } from "@/data/partnership";
import { featuredProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="partnership-hero" id="partnership">
        <div className="partnership-hero-copy">
          <p className="eyebrow"><span /> Studio Admiral · Marketing partnership</p>
          <h1>Two perspectives. <em>One growth partnership.</em></h1>
          <p className="hero-lede">Independent expertise in strategy, storytelling, conversion, and creative direction—combined whenever the work benefits from both.</p>
          <div className="hero-actions">
            <Link className="button" href="/#partners">Find Your Partner <span aria-hidden="true">↓</span></Link>
            <Link className="text-link" href="/work">Explore Our Work <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="partnership-signals" aria-label="Studio Admiral partnership model">
            <li><strong>David</strong><span>Structure · Strategy · Conversion</span></li>
            <li><strong>Leigh</strong><span>Story · Visual depth · Connection</span></li>
            <li><strong>Together</strong><span>One coherent outcome</span></li>
          </ul>
        </div>
        <div className="partnership-portraits" aria-label="Studio Admiral partners David and Leigh">
          <figure className="partner-portrait partner-portrait-david">
            <Image src="/brand-assets/founders/web/david-portrait-card.webp" alt="David, Studio Admiral partner and strategist" fill sizes="(max-width: 760px) 44vw, 23vw" priority />
            <figcaption><strong>David</strong><span>Strategist</span></figcaption>
          </figure>
          <div className="partnership-seal" aria-hidden="true"><Image src="/brand-assets/studio-admiral/logos/submark-circle.svg" alt="" width={86} height={86} /></div>
          <figure className="partner-portrait partner-portrait-leigh">
            <Image src="/brand-assets/founders/web/leigh-portrait-card.webp" alt="Leigh, Studio Admiral partner and visual storyteller" fill sizes="(max-width: 760px) 44vw, 23vw" priority />
            <figcaption><strong>Leigh</strong><span>Visual storyteller</span></figcaption>
          </figure>
        </div>
      </section>

      <div className="direction-strip" aria-label="Studio Admiral positioning">
        <span>Independent expertise</span><i aria-hidden="true">·</i><span>Shared strategy when it matters</span><i aria-hidden="true">·</i><span>One accountable lead</span>
      </div>

      <section className="section partnership-model">
        <SectionHeading eyebrow="How the partnership works" title={<>Choose the specialist—or <em>bring both to the table.</em></>} description="Each founder can own a project independently. When the work crosses disciplines, the second founder joins where their expertise adds value." />
        <div className="partnership-mode-grid">
          {partnershipModes.map((mode, index) => <article data-mode={mode.id} key={mode.id}><span>0{index + 1}</span><p>{mode.label}</p><h3>{mode.title}</h3><p>{mode.description}</p></article>)}
        </div>
        <p className="partnership-recommendation">Know who you need? Choose them. Not sure? <Link className="text-link" href="/contact?partner=both">Ask Studio Admiral to recommend the right lead <span aria-hidden="true">→</span></Link></p>
      </section>

      <section className="section founder-gateway-section" id="partners">
        <SectionHeading eyebrow="Meet the partners" title={<>Two distinct perspectives. <em>Equal ownership.</em></>} description="Use a mouse, keyboard, or tap to open either founder's full profile. The experience changes tone while the Studio Admiral identity stays coherent." />
        <FounderGateway />
      </section>

      <section className="section selected-work-section" id="work">
        <div className="section-heading-row"><SectionHeading eyebrow="Featured portfolio" title={<>See the thinking <em>inside the work.</em></>} description="Every project identifies its lead, demonstrated capabilities, actual deliverables, and verified outcomes—without invented metrics." /><Link className="text-link" href="/work">Filter all projects <span aria-hidden="true">→</span></Link></div>
        <ProjectGrid projects={featuredProjects} prioritizeFirst />
      </section>

      <section className="section businesses-section">
        <SectionHeading eyebrow="The businesses behind the partnership" title={<>Operators first. <em>Marketers in practice.</em></>} description="Each founder actively builds independent ventures, giving Studio Admiral practical operating experience—not purely theoretical marketing knowledge." />
        <div className="business-grid">
          {founders.map((founder) => (
            <article className={`business-card business-card-${founder.id}`} key={founder.id}>
              <div className="business-card-image"><Image src={founder.highlightedBusiness.image} alt={`${founder.highlightedBusiness.name} project preview`} fill sizes="(max-width: 760px) 94vw, 45vw" /></div>
              <div><p>{founder.highlightedBusiness.label}</p><h3>{founder.highlightedBusiness.name}</h3><p>{founder.highlightedBusiness.description}</p><Link className="text-link" href={founder.highlightedBusiness.href}>View the project <span aria-hidden="true">↗</span></Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-showcase" id="services">
        <div className="services-campaign"><Image src="/brand-assets/studio-admiral/campaign/more-than-marketing.webp" alt="Studio Admiral More Than Marketing campaign artwork" fill sizes="(max-width: 900px) 94vw, 39vw" /></div>
        <div className="services-copy">
          <p className="eyebrow"><span /> Services</p><h2>More than <em>marketing.</em></h2><p>Strategy meets storytelling, creativity, and AI-powered execution. Each service is labeled by its most natural lead, while collaboration stays available when it improves the result.</p>
          <div className="partnership-service-list">{partnershipServices.map((service) => <Link href={`/contact?purpose=paid-project&project=${encodeURIComponent(service.title)}`} data-track="growth_service_clicked" data-service={service.title} key={service.title}><span>{service.title}</span><small>{service.lead}</small><i aria-hidden="true">↗</i></Link>)}</div>
          <Link className="button" href="/growth">Explore services &amp; offers <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="proof-strip" aria-label="Verified marketing experience">
        {marketingProof.map((item) => <div key={item.label}><span>{item.note}</span><strong>{item.label}</strong></div>)}
      </section>

      <section className="section baseline-section"><MarketingBaseline /></section>

      <section className="section collaboration-process">
        <SectionHeading eyebrow="One clear owner" title={<>Collaboration without <em>confusion.</em></>} description="Two founders should add range—not extra layers. The lead partner remains accountable from the first conversation to the final handoff." />
        <ol>{collaborationSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol>
      </section>

      <section className="free-website-band">
        <div><p className="eyebrow eyebrow-light"><span /> A separate program</p><h2>Applying for a free website?</h2><p>The no-upfront-design-fee website program keeps its own qualification, application, and delivery flow. It is not part of the $50–$100 Marketing Baseline.</p></div>
        <Link className="button button-light" href="/apply" data-track="free_website_application_started">Apply for a Free Website <span aria-hidden="true">↗</span></Link>
      </section>

      <CTASection eyebrow="Choose your route" title="Who would you like to work with?" description="Contact David, Leigh, or both about a paid project, job or contract opportunity, collaboration, Marketing Baseline, or general question." primaryHref="/contact" primaryLabel="Start a conversation" secondaryHref="/work" secondaryLabel="Explore the portfolio" />
    </main>
  );
}
