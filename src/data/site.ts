export const siteConfig = {
  name: "Studio Admiral",
  shortPositioning: "Independent expertise. Shared strategy when it matters.",
  description:
    "Studio Admiral is a founder-led marketing partnership helping brands grow through strategy, websites, storytelling, creative direction, automation, and analytics.",
  url: "https://studio.admiralenergy.ai",
  email: "studio@admiralenergy.ai",
  seo: {
    title: "Studio Admiral | Founder-Led Marketing Partnership",
    openGraphTitle: "Studio Admiral | Two Perspectives. One Growth Partnership.",
    openGraphDescription:
      "Strategy, storytelling, conversion, creative direction, websites, automation, content, and analytics, led by David and Leigh Edwards.",
    socialImage: "/brand/og-default.png",
    socialImageAlt: "Studio Admiral founder-led marketing partnership",
  },
  brand: {
    logo: "/brand-assets/studio-admiral/logos/logo-horizontal-reversed.svg" as string | null,
    mark: "/brand-assets/studio-admiral/logos/mark-full-color.svg" as string | null,
    descriptor: "Websites & Growth",
    supportingLine: "Build | Launch | Grow",
  },
  founderImage: null as string | null,
  offer: {
    label: "Website Program",
    headline: "Professional websites for qualifying small businesses, with no upfront design fee.",
    qualification:
      "Website projects are selected based on fit, scope, available capacity, and whether we can build something genuinely useful for the business.",
    revisionPolicy: "One reasonable revision phase",
    typicalScope: [
      "Professional responsive website",
      "Mobile optimization",
      "Core business and service pages",
      "Clear calls-to-action",
      "Contact or lead form",
      "Click-to-call and social links",
      "Basic on-page SEO and accessibility",
      "Fast, analytics-ready implementation",
      "One reasonable revision phase",
    ],
    notIncluded: [
      "Unlimited pages or revisions",
      "Custom applications or software",
      "E-commerce development",
      "Databases, membership systems, or complex booking platforms",
      "Paid domains, premium tools, advertising spend, APIs, plugins, or other vendor costs",
    ],
  },
  navigation: [
    { href: "/#partnership", label: "Partnership" },
    { href: "/#partners", label: "Meet David & Leigh" },
    { href: "/work", label: "Work" },
    { href: "/growth", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const websiteTypes = [
  {
    number: "01",
    title: "Lead generation websites",
    description:
      "For local service businesses that need a visitor to understand the offer, trust the business, and call, text, or request a quote.",
    flow: "Visitor → Trust → Call / Form / Text → Lead",
    examples: ["Home services", "Contractors", "Cleaning", "Landscaping", "Fitness", "Local services"],
  },
  {
    number: "02",
    title: "Business presence websites",
    description:
      "For professionals and organizations that need a credible home online, a clear story, and an easy way for the right people to get in touch.",
    flow: "Search → Credibility → Understanding → Contact",
    examples: ["Consultants", "Creators", "Nonprofits", "Coaches", "Independent professionals", "Small B2B"],
  },
] as const;

export const processSteps = [
  { number: "01", title: "Apply", description: "Tell us about the business, what is missing, and what a useful website needs to accomplish." },
  { number: "02", title: "Build", description: "If the project is a fit, we shape the message, design the experience, and build the site." },
  { number: "03", title: "Launch", description: "We review the work together, handle one reasonable revision phase, and prepare it to go live." },
  { number: "04", title: "Grow", description: "When the business is ready, we can help bring traffic, capture leads, and improve follow-up." },
] as const;

export const faqs = [
  {
    question: "Why would Studio Admiral build my website without an upfront design fee?",
    answer:
      "Because useful work is the clearest way to earn trust. We start with the website instead of asking a business owner to buy a large marketing package before seeing what we can do. If the business later needs traffic, lead generation, content, advertising, or growth systems, we are ready to help.",
  },
  {
    question: "Is every business automatically accepted?",
    answer:
      "No. Projects are selected based on fit, scope, available capacity, and whether we believe a standard business or lead-generation website can create meaningful value.",
  },
  {
    question: "What is typically included?",
    answer:
      "A responsive, mobile-optimized website with core business pages, services, calls-to-action, a contact or lead form, basic on-page SEO and accessibility, analytics-ready implementation, and one reasonable revision phase.",
  },
  {
    question: "What is not part of the website program?",
    answer:
      "The program is not an unlimited custom-development offer. E-commerce, custom applications, databases, membership systems, complex booking platforms, unlimited pages or revisions, and third-party vendor expenses are outside the typical scope.",
  },
  {
    question: "Are growth services included for free?",
    answer:
      "No. The website program creates the foundation. Services such as advertising, local visibility, content, analytics, automation, CRM integration, and ongoing optimization are separate paid growth services when they make sense for the business.",
  },
  {
    question: "Will I need to pay for a domain, hosting, or other tools?",
    answer:
      "Third-party costs are never silently assigned to Studio Admiral. If a project needs a domain, premium software, a paid API, advertising spend, or another vendor service, we will identify it before you make a decision.",
  },
] as const;
