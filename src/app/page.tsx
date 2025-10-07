"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowUpRight, Check, Sparkles, PlayCircle, Workflow, LineChart } from "lucide-react";

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
  { label: "AI personas created", value: "120+" },
  { label: "campaigns automated", value: "340" },
  { label: "faster production", value: "3.4×" },
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
    title: "AI-powered creative workflow",
    description:
      "Generate consistent avatars and branded visuals using our integrated OpenArt + D-ID + CapCut pipeline.",
  },
  {
    icon: Workflow,
    title: "Professional video production",
    description:
      "Transform static designs into speaking AI personas with motion graphics and seamless editing workflows.",
  },
  {
    icon: LineChart,
    title: "Strategic LLM optimization",
    description:
      "Multi-model prompting (Claude, GPT, Gemini) ensures your content hits the right tone and converts audiences.",
  },
];

const GALLERY: GalleryItem[] = [
  {
    title: "AI Avatar Production Pipeline",
    description: "See our OpenArt + D-ID + CapCut workflow in action—from concept to speaking persona.",
    asset: "/gallery/dashboard.svg",
  },
  {
    title: "Multi-Platform Content Suite",
    description: "Professional video assets optimized for social, ads, and presentations—all AI-generated.",
    asset: "/gallery/storyboard.svg",
  },
  {
    title: "Energy Brand Showcase",
    description: "Industry-specific avatars and messaging that resonates with energy sector audiences.",
    asset: "/gallery/narrative.svg",
  },
];

const FAQS: FaqItem[] = [
  {
    question: "How fast can we launch after kickoff?",
    answer:
      "We deliver your AI avatar package with all assets within 3-5 business days, including character design, video creation, and branded templates.",
  },
  {
    question: "What's included in the production workflow?",
    answer:
      "Every package includes OpenArt.ai character generation, D-ID avatar creation, CapCut editing, and strategic prompt engineering using multiple LLMs.",
  },
  {
    question: "Can you match our existing brand guidelines?",
    answer:
      "Absolutely. We analyze your brand assets and ensure consistent visual identity across all AI-generated content and avatar designs.",
  },
  {
    question: "Do you offer revisions and iterations?",
    answer:
      "Yes. Each package includes multiple revision rounds, and we work closely with you to perfect the final deliverables before handoff.",
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


  useEffect(() => {
    track("view_home");
  }, []);

  return (
    <div className="bg-cream text-navy">
      <header className="relative overflow-hidden">
        <div className="hero-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-cream/90 via-cream/80 to-cream/90 backdrop-blur-sm" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 lg:flex-row lg:items-center lg:px-10">
          <div className="max-w-2xl space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy/70 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-neon" />
              Creative tech studio
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Build AI personas that talk, move, and sell your brand.
            </h1>
            <p className="text-lg text-navy/70">
              Admiral Studio blends OpenArt.ai, D-ID, CapCut, and leading LLMs (Claude, ChatGPT, Gemini) to turn your energy brand into an always-on content engine — fast, personal, and scalable.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm text-navy/60 mt-6">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-navy">120+</span> AI personas created
              </span>
              <span className="text-navy/30">•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-navy">340</span> campaigns automated
              </span>
              <span className="text-navy/30">•</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-navy">3.4×</span> faster production
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row mt-8">
              <button
                type="button"
                onClick={() => onOrder("premium")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
              >
                Request Proposal
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onOrder("standard")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-semibold text-navy/80 transition hover:-translate-y-0.5 hover:border-neon hover:text-navy"
              >
                Explore Packages
                <PlayCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="relative w-full max-w-md self-center overflow-hidden rounded-3xl border border-navy/10 bg-white/70 p-8 shadow-xl shadow-navy/20 backdrop-blur">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon/10 via-transparent to-navy/10" />
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">From Avatar to Ad</h2>
              <p className="text-sm text-navy/70">
                See how Admiral Studio brings your brand to life with:
              </p>
              <ul className="space-y-4 text-sm text-navy/80">
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Visuals generated in OpenArt.ai</span>
                </li>
                <li className="flex items-start gap-3">
                  <PlayCircle className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Realistic motion and voice with D-ID</span>
                </li>
                <li className="flex items-start gap-3">
                  <Workflow className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Editing and storytelling in CapCut</span>
                </li>
                <li className="flex items-start gap-3">
                  <LineChart className="mt-0.5 h-4 w-4 text-neon" />
                  <span>Smart scripts written by advanced LLMs</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => onOrder("standard")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-navy/90"
              >
                View Studio Workflow
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="section-padding bg-white/80">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-8">See Our AI Avatars in Action</h2>
          <div className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl shadow-navy/20 backdrop-blur mx-auto max-w-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-square object-cover"
            >
              <source src="/showcase-demo.mp4" type="video/mp4" />
              <div className="flex items-center justify-center aspect-square bg-gradient-to-br from-neon/10 via-transparent to-navy/10">
                <div className="text-center space-y-4">
                  <PlayCircle className="h-12 w-12 text-neon mx-auto" />
                  <p className="text-navy/70 text-sm">1080x1080 Showcase Video Coming Soon</p>
                </div>
              </div>
            </video>
          </div>
          <p className="mt-6 text-navy/70 max-w-2xl mx-auto">
            Professional AI avatars that match your brand identity and speak directly to your energy sector audience.
          </p>
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

      <section className="section-padding bg-white/80">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-12">What Our Clients Say</h2>
          <div className="relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-8 shadow-xl shadow-navy/20">
            <div className="space-y-6">
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-neon" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg text-navy/80 italic">
                "Testimonials from Fiverr reviews will appear here once we have them. Professional AI avatar creation that delivers results."
              </blockquote>
              <div className="text-sm text-navy/60">
                <p className="font-semibold">Fiverr Client Review</p>
                <p>Energy Sector Professional</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-navy/50">
            Testimonial carousel will be updated with real Fiverr reviews
          </p>
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
                onClick={() => onOrder("standard")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3 text-sm font-semibold text-navy shadow-glow transition hover:-translate-y-0.5"
              >
                Order on Fiverr
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

      <section className="py-8 bg-neon">
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-navy">
            <p className="font-semibold">Get Started Today</p>
            <p className="text-sm text-navy/70">Professional AI avatars delivered in 3-5 days</p>
          </div>
          <button
            type="button"
            onClick={() => onOrder("basic")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-navy/90"
          >
            Start with Basic Package
            <ArrowUpRight className="h-4 w-4" />
          </button>
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

{/* Removed proposal modal for simplicity
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
*/}
    </div>
  );
}
