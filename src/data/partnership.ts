export type FounderId = "david" | "leigh";
export type ProjectLead = FounderId | "collaborative";

export type Founder = {
  id: FounderId;
  name: string;
  role: string;
  biography: string;
  portrait: string;
  panel: string;
  email: string;
  strengths: string[];
  highlightedBusiness: {
    name: string;
    label: string;
    description: string;
    image: string;
    href: string;
  };
};

export const founders: Founder[] = [
  {
    id: "david",
    name: "David",
    role: "Veteran • Strategist • Creative Problem-Solver",
    biography:
      "Navy veteran and award-winning sales leader with decades of editing experience. David combines clear communication, perceptive problem-solving, rapid learning, and deep strategic thinking to turn complex ideas into focused action.",
    portrait: "/brand-assets/founders/web/david-portrait-card.webp",
    panel: "/brand-assets/founders/web/david-founder-profile-panel.webp",
    email: "davide@admiralenergy.ai",
    strengths: [
      "Leadership & Public Speaking",
      "Award-Winning Sales",
      "Editing & Storytelling",
      "Strategic Problem-Solving",
      "Rapid Learning & Perceptive Analysis",
    ],
    highlightedBusiness: {
      name: "Admiral Energy",
      label: "David's highlighted business",
      description: "Strategy, resilience, sales, and complex-solution communication.",
      image: "/images/work/admiral-energy.png",
      href: "/work/admiral-energy",
    },
  },
  {
    id: "leigh",
    name: "Leigh",
    role: "Creative • Educator • Visual Storyteller",
    biography:
      "Cosmetology school graduate, MAC makeup class certified, and Barbizon model graduate, Leigh brings experience in beauty, photography, writing, public speaking, and visual storytelling. Her interests in psychology, sociology, and African American history deepen her authentic, detail-driven work and passion for educating the next generation.",
    portrait: "/brand-assets/founders/web/leigh-portrait-card.webp",
    panel: "/brand-assets/founders/web/leigh-founder-profile-panel.webp",
    email: "leighnicoleedwards97@gmail.com",
    strengths: [
      "Photography & Visual Storytelling",
      "Cosmetology & Makeup Artistry",
      "Modeling & Public Speaking",
      "Award-Winning Writing",
      "Creative Editing & Attention to Detail",
      "Education, Authenticity & Cultural Insight",
    ],
    highlightedBusiness: {
      name: "Affirm Beauty Artistry",
      label: "Leigh's highlighted business",
      description: "Educate. Equip. Empower.",
      image: "/brand-assets/affirm-beauty/web/affirm-editorial-brand-story.webp",
      href: "/work/affirm-beauty",
    },
  },
];

export const partnershipModes = [
  {
    id: "david",
    label: "David-led",
    title: "Structure that moves people to act.",
    description: "Strategy, conversion, growth systems, sales positioning, automation, and complex problem-solving.",
  },
  {
    id: "leigh",
    label: "Leigh-led",
    title: "Stories people can see themselves in.",
    description: "Visual storytelling, photography, beauty and lifestyle perspective, writing, education, cultural insight, and creative direction.",
  },
  {
    id: "collaborative",
    label: "Collaborative",
    title: "Two perspectives, one coherent outcome.",
    description: "Brand strategy, campaigns, founder storytelling, conversion-focused creative, launches, and multidisciplinary projects.",
  },
] as const;

export const partnershipServices = [
  { title: "Conversion-Focused Websites", lead: "David-led" },
  { title: "Landing Pages & Sales Funnels", lead: "David-led" },
  { title: "Brand Strategy & Visual Identity", lead: "Collaborative" },
  { title: "Founder & Business Storytelling", lead: "Collaborative" },
  { title: "Photography & Creative Direction", lead: "Leigh-led" },
  { title: "AI-Powered Content & Video", lead: "Collaborative" },
  { title: "Lead Capture & Automation", lead: "David-led" },
  { title: "Analytics & Optimization", lead: "David-led" },
  { title: "Educational & Audience-Building Content", lead: "Leigh-led" },
] as const;

export const marketingProof = [
  { label: "Reddit Ads Certified", note: "Certification" },
  { label: "Experienced with TikTok Organic Marketing", note: "Platform experience" },
  { label: "Short-Form Content Creators", note: "Hooks · scripting · editing · repurposing" },
] as const;

export const collaborationSteps = [
  "Tell us what you are building.",
  "Choose a founder—or ask us to recommend one.",
  "Your lead partner owns the project.",
  "The second partner joins when their expertise adds value.",
  "You receive one coherent outcome, not disconnected work.",
] as const;

export const baselineTiers = [
  {
    price: "$50",
    name: "Quick Start",
    description: "A focused cleanup or setup for the most important part of your public marketing foundation.",
    items: [
      "Set up or optimize up to two requested social profiles, or one comparable baseline task",
      "Refine bios, calls to action, contact links, and public business information",
      "Apply existing brand assets to correctly sized profile and cover placements when suitable files exist",
      "Check handle, naming, link, and message consistency",
      "Deliver a concise setup and next-steps checklist",
    ],
  },
  {
    price: "$100",
    name: "Foundation",
    description: "A broader one-time baseline for a business that needs consistency plus a practical content starting point.",
    items: [
      "Set up or optimize up to four relevant social profiles",
      "Include everything in Quick Start",
      "Provide five short-form content concepts tailored to the business",
      "Provide a simple one-week starter content plan",
      "Deliver a basic measurement and next-steps checklist",
    ],
  },
] as const;

export const baselineExclusions = [
  "Ongoing posting or account management",
  "Website builds",
  "Ad spend or paid-media management",
  "Logo redesign",
  "Custom photography or video shoots",
  "Daily posting or unlimited revisions",
] as const;
