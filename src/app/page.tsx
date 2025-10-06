"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode, type SVGProps } from "react";

const createIcon = (render: () => ReactNode) =>
  function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {render()}
      </svg>
    );
  };

const ArrowUpRight = createIcon(() => (
  <>
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </>
));

const Check = createIcon(() => <path d="M5 13l4 4L19 7" />);

const Flame = createIcon(() => (
  <>
    <path d="M12 2s4 4 4 8a4 4 0 11-8 0c0-2 2-4 4-8z" />
    <path d="M12 12a2 2 0 10.001 3.999A2 2 0 0012 12z" />
  </>
));

const LineChart = createIcon(() => (
  <>
    <path d="M4 18l6-6 4 4 6-10" />
    <path d="M20 18H4" />
  </>
));

const PlayCircle = createIcon(() => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 9l5 3-5 3V9z" />
  </>
));

const Sparkles = createIcon(() => (
  <>
    <path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" />
    <path d="M5 16l.75 1.75L8 18.5l-2.25.75L5 21l-.75-1.75L2 18.5l2.25-.75L5 16z" />
    <path d="M18.5 14l.9 2.1L22 17.5l-2.6.9-.9 2.6-.9-2.6L15 17.5l2.6-.9.9-2.6z" />
  </>
));

const Workflow = createIcon(() => (
  <>
    <rect x="4" y="4" width="6" height="6" rx="1.5" />
    <rect x="14" y="4" width="6" height="6" rx="1.5" />
    <rect x="9" y="14" width="6" height="6" rx="1.5" />
    <path d="M7 10v2a2 2 0 002 2h6a2 2 0 002-2v-2" />
  </>
));

type TierKey = "basic" | "standard" | "premium";

const FIVERR: Record<TierKey, string> = {
  basic: process.env.NEXT_PUBLIC_FIVERR_BASIC_URL || "#",
  standard: process.env.NEXT_PUBLIC_FIVERR_STANDARD_URL || "#",
  premium: process.env.NEXT_PUBLIC_FIVERR_PREMIUM_URL || "#",
};

const tiers: Array<{
  key: TierKey;
  name: string;
  price: string;
  delivery: string;
  revisions: string;
  bullets: string[];
}> = [
  {
    key: "basic",
    name: "Basic",
    price: "$50",
    delivery: "3-day delivery",
    revisions: "1 revision",
    bullets: [
      "1 avatar hero image + 3 poses",
      "Consistent character design",
      "Fine-tuned model creation",
      "4 AI images, branded images",
      "Persona creation + social content",
    ],
  },
  {
    key: "standard",
    name: "Standard",
    price: "$125",
    delivery: "4-day delivery",
    revisions: "2 revisions",
    bullets: [
      "6 images + outfits, PNGs",
      "Style guide for reuse",
      "Consistent character design",
      "Fine-tuned model creation",
      "9 AI images, branded images",
      "Persona creation + social content",
    ],
  },
  {
    key: "premium",
    name: "Premium",
    price: "$250",
    delivery: "5-day delivery",
    revisions: "3 revisions",
    bullets: [
      "20 images, extensive style guide",
      "Canva templates + 10 hooks",
      "Consistent character design",
      "Fine-tuned model creation",
      "20 AI images, branded images",
      "Persona creation + social content",
    ],
  },
];

type GalleryItem = {
  title: string;
  description: string;
  asset: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const HERO_STATS = [
  { label: "AI personas deployed", value: "120+" },
  { label: "Campaigns automated", value: "340" },
  { label: "Creative velocity lift", value: "3.4x" },
];

const TRUST_LOGOS = [
  { name: "NextEra Ventures", logo: "/logos/nextera.svg" },
  { name: "GridBridge", logo: "/logos/gridbridge.svg" },
  { name: "Helios Storage", logo: "/logos/helios.svg" },
  { name: "Atlas Renewables", logo: "/logos/atlas.svg" },
  { name: "Flux Mobility", logo: "/logos/flux.svg" },
];

const BENEFITS = [
  {
    icon: Sparkles,
    title: "Claude-guided creative ops",
    description:
      "Spin up on-brand concepts, scripts, and visuals in minutes with Claude playbooks grounded in your voice and compliance rules.",
  },
  {
    icon: Workflow,
    title: "Automated content supply chain",
    description:
      "Map prompts to asset templates, approvals, and routing so teams can launch omnichannel campaigns without bottlenecks.",
  },
  {
    icon: LineChart,
    title: "Intelligence loop for growth",
    description:
      "Blend paid, owned, and earned signals to guide creative refreshes and prioritize the stories that convert fastest.",
  },
];

const GALLERY: GalleryItem[] = [
  {
    title: "Launch accelerator dashboard",
    description: "Command AI personas, asset requests, and brand approvals from one Claude prompt.",
    asset: "/gallery/dashboard.svg",
  },
  {
    title: "Adaptive campaign storyboard",
    description: "Tie creative concepts to media plans, KPIs, and localized variants automatically.",
    asset: "/gallery/storyboard.svg",
  },
  {
    title: "Founder's narrative kit",
    description: "Translate complex energy tech into investor-ready visuals and messaging.",
    asset: "/gallery/narrative.svg",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "How fast can we launch after kickoff?",
    answer:
      "We complete discovery, Claude fine-tuning, and your initial creative sprint within seven business days so you have assets in market immediately.",
  },
  {
    question: "Do we need to manage Claude prompts ourselves?",
    answer:
      "No. We configure reusable prompt chains, governance, and brand guardrails. Your team interacts through guided workflows and dashboards.",
  },
  {
    question: "What does collaboration look like?",
    answer:
      "You get a dedicated strategist, creative lead, and automation engineer. We run weekly standups, async reviews, and real-time Claude co-creation sessions.",
  },
  {
    question: "Can we plug Admiral Studio into our RevOps stack?",
    answer:
      "Yes. We integrate with HubSpot, Salesforce, Marketo, Demandbase, and custom data lakes to keep analytics + automation in sync.",
  },
];

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    rdt?: ((eventName: string, params?: AnalyticsParams) => void) & {
      track?: (eventName: string, params?: AnalyticsParams) => void;
    };
  }
}

const track = (name: string, params: AnalyticsParams = {}) => {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, params);
  const map: Record<string, string> = {
    proposal_form_submit: "Lead",
    select_package: "AddToCart",
    purchase: "Purchase",
  };

  const reddit = (window as Window & {
    rdt?: ((eventName: string, params?: AnalyticsParams) => void) & {
      track?: (eventName: string, params?: AnalyticsParams) => void;
    };
  }).rdt;

  if (!reddit) return;

  const mappedEvent = map[name] ?? "ViewContent";
  if (typeof reddit.track === "function") {
    reddit.track(mappedEvent, params);
  } else {
    reddit(mappedEvent, params);
  }
};

const onOrder = (key: TierKey) => {
  track("select_package", { tier: key });
  track("outbound_fiverr_click", { tier: key });
  window.open(FIVERR[key], "_blank", "noopener,noreferrer");
};

export default function Page() {
  const [proposalOpen, setProposalOpen] = useState(false);

  useEffect(() => {
    track("view_home");
  }, []);

  return (
    <div className="bg-cream text-navy">
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon/10 via-transparent to-navy/10" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-2xl space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy/70 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-neon" />
              Admiral Studio for Claude teams
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Launch an AI-native creative studio that keeps your energy brand always-on.
            </h1>
            <p className="text-lg text-navy/70">
              We combine Claude prompt engineering, performance design, and growth analytics to ship campaigns, content engines, and enablement kits in record time.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setProposalOpen(true);
                  track("open_proposal_modal");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
              >
                Request proposal
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onOrder("standard")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy/80 transition hover:-translate-y-0.5 hover:border-neon hover:text-navy"
              >
                Explore packages
                <PlayCircle className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-navy/10 bg-white/80 p-4 shadow-sm shadow-navy/5 backdrop-blur">
                  <p className="text-2xl font-semibold text-navy">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-navy/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-md self-center overflow-hidden rounded-3xl border border-navy/10 bg-white/70 p-8 shadow-xl shadow-navy/20 backdrop-blur">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon/10 via-transparent to-navy/10" />
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Claude orchestration in motion</h2>
              <p className="text-sm text-navy/70">
                See how Admiral Studio routes prompts to production-ready assets, approvals, and analytics while your team collaborates in real time.
              </p>
              <ul className="space-y-4 text-sm text-navy/80">
                <li className="flex items-start gap-3">
                  <Flame className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Persona + offer intelligence automatically personalizes scripts and visuals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Workflow className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Automated QA, approvals, and tagging keep governance rock solid.</span>
                </li>
                <li className="flex items-start gap-3">
                  <LineChart className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Performance feedback loops feed Claude new learnings daily.</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onOrder("standard")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-navy/90"
              >
                View Claude launch kit
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="section-padding border-y border-navy/5 bg-white/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-10 opacity-80">
          {TRUST_LOGOS.map((logo) => (
            <div key={logo.name} className="flex h-12 w-36 items-center justify-center">
              <Image
                src={logo.logo}
                alt={logo.name}
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Bring Claude into every go-to-market ritual</h2>
              <p className="text-base text-navy/70">
                Admiral Studio fuses human creativity with generative AI to orchestrate a brand system that learns from every campaign, customer conversation, and sales touchpoint.
              </p>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy underline-offset-4 hover:text-neon hover:underline"
                onClick={() => track("jump_to_pricing")}
              >
                Compare pricing tiers
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm shadow-navy/5">
                  <benefit.icon className="h-6 w-6 text-neon" />
                  <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-navy/70">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="section-padding bg-navy text-cream">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cream/60">Pricing</p>
            <h2 className="mt-4 text-3xl font-semibold">Choose the launch path that fits your energy team</h2>
            <p className="mt-3 text-base text-cream/70">
              Every package activates the same Admiral Studio squad. Fiverr handles contracts, billing, and milestone management.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.key}
                className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-cream">{tier.name}</h3>
                  <p className="text-3xl font-semibold text-neon">{tier.price}</p>
                  <p className="text-sm text-cream/70">{tier.delivery}</p>
                  <p className="text-sm text-cream/60">{tier.revisions}</p>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-cream/70">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-neon" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onOrder(tier.key)}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-5 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
                  aria-label={`Order ${tier.name} on Fiverr`}
                >
                  Order on Fiverr
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-navy/50">Gallery</p>
              <h2 className="mt-2 text-3xl font-semibold">Snapshots from recent Claude studios</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setProposalOpen(true);
                track("open_proposal_modal", { source: "gallery" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-white px-5 py-2 text-sm font-semibold text-navy/80 transition hover:-translate-y-0.5 hover:border-neon hover:text-navy"
            >
              Request walkthrough
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {GALLERY.map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm shadow-navy/5">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.asset}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-navy/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/80">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-navy/50">FAQ</p>
          <h2 className="mt-3 text-center text-3xl font-semibold">Answers before we start building</h2>
          <div className="mt-10 space-y-6">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-3xl border border-navy/10 bg-white p-6 shadow-sm shadow-navy/5">
                <summary className="cursor-pointer list-none text-lg font-semibold text-navy">
                  <div className="flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <ArrowUpRight className="h-5 w-5 transition group-open:rotate-45" />
                  </div>
                </summary>
                <p className="mt-4 text-sm text-navy/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-cream">
        <div className="mx-auto max-w-5xl rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-navy to-navy/80 p-12 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cream/60">Ready to collaborate</p>
              <h2 className="text-3xl font-semibold text-white">
                Let’s engineer your AI-native creative system together.
              </h2>
              <p className="text-base text-cream/70">
                Share your launch goals and existing stack. We’ll map a Claude-powered roadmap with deliverables, cadences, and success metrics tailored to your energy vertical.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setProposalOpen(true);
                  track("open_proposal_modal", { source: "cta" });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
              >
                Request proposal
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onOrder("premium")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:border-neon hover:text-neon"
              >
                Start premium engagement
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy/5 bg-cream py-10 text-center text-sm text-navy/60">
        <p>© {new Date().getFullYear()} Admiral Studio. Purpose-built for energy innovators.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="text-navy/60 underline-offset-4 hover:text-navy hover:underline">
            Privacy
          </Link>
          <Link href="/contact" className="text-navy/60 underline-offset-4 hover:text-navy hover:underline">
            Contact
          </Link>
        </div>
      </footer>

      {proposalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur">
          <div className="relative w-full max-w-lg rounded-[32px] border border-navy/10 bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setProposalOpen(false)}
              className="absolute right-4 top-4 text-sm font-semibold text-navy/60 hover:text-navy"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold text-navy">Request a proposal</h2>
            <p className="mt-2 text-sm text-navy/70">
              Tell us about your objectives and we’ll confirm fit within one business day.
            </p>
            <form
              name="proposal"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={() => track("proposal_form_submit")}
              className="mt-6 space-y-4"
            >
              <input type="hidden" name="form-name" value="proposal" />
              <input type="text" name="name" placeholder="Your name" required className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/40" />
              <input type="email" name="email" placeholder="Email" required className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/40" />
              <select name="use_case" className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/40">
                <option>Influencer persona</option>
                <option>UGC kit</option>
                <option>Ad creative pack</option>
              </select>
              <select name="timeline" className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/40">
                <option>ASAP</option>
                <option>This week</option>
                <option>Later</option>
              </select>
              <textarea
                name="message"
                placeholder="What are you trying to achieve?"
                className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/40"
              />
              <input type="text" name="bot-field" className="hidden" />
              <button type="submit" className="w-full rounded-full bg-neon px-5 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5">
                Request Proposal
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
