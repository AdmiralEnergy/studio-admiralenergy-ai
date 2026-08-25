import type { ProjectLead } from "./partnership";

export const projectCategories = ["Websites", "Marketing", "Content", "Branding", "AI"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  name: string;
  slug: string;
  projectType: string;
  industry: string;
  description: string;
  shortDescription: string;
  image: string;
  visualStyle: "browser" | "editorial";
  liveUrl: string | null;
  status: "live" | "private" | "in development";
  relationshipType: string;
  lead: ProjectLead;
  categories: ProjectCategory[];
  services: string[];
  technologies: string[];
  deliverables: string[];
  outcomes: string[];
  featured: boolean;
  challenge: string;
  approach: string;
  outcome: string;
  accent: "orange" | "gold" | "rose" | "blue";
};

export const projects: Project[] = [
  {
    name: "Admiral Energy",
    slug: "admiral-energy",
    projectType: "Flagship business platform",
    industry: "Energy resilience",
    shortDescription: "Product marketing, local services, education, and lead generation in one business platform.",
    description: "A substantial in-house platform that connects portable power products, whole-home backup services, practical educational content, and local lead generation.",
    image: "/images/work/admiral-energy.png",
    visualStyle: "browser",
    liveUrl: "https://admiralenergy.ai/",
    status: "live",
    relationshipType: "Flagship in-house project",
    lead: "david",
    categories: ["Websites", "Marketing", "Content"],
    services: ["Business strategy", "Product marketing", "Lead generation", "Content architecture", "Conversion design"],
    technologies: ["Next.js", "E-commerce", "SEO content", "Analytics"],
    deliverables: ["Multi-path website architecture", "Product and service positioning", "Lead-capture journeys", "Educational content system"],
    outcomes: ["A single platform for product discovery and local service inquiries", "Clearer paths for different levels of energy-resilience need", "A foundation for long-term content and search visibility"],
    featured: true,
    challenge: "The business serves people at very different levels of need—from everyday portable power to professionally installed whole-home resilience—without making the decision feel overwhelming.",
    approach: "Create a layered architecture that begins with the smallest practical next step, distinguishes product and service paths, and supports both immediate purchases and higher-consideration assessments with educational content behind them.",
    outcome: "Created to support product discovery, local service inquiries, education, and long-term search visibility within one coherent business ecosystem.",
    accent: "gold",
  },
  {
    name: "Affirm Beauty Artistry",
    slug: "affirm-beauty",
    projectType: "Creator brand system",
    industry: "Beauty / natural hair",
    shortDescription: "An editorial home for a natural-hair creator brand and its developing body of work.",
    description: "A family-venture brand and website concept for natural-hair storytelling, beauty content, creative portfolio development, and a clear personal-brand presence.",
    image: "/brand-assets/affirm-beauty/web/affirm-editorial-brand-story.webp",
    visualStyle: "editorial",
    liveUrl: null,
    status: "private",
    relationshipType: "Family venture",
    lead: "leigh",
    categories: ["Branding", "Content", "Websites"],
    services: ["Brand messaging", "Editorial design", "Creator positioning", "Content strategy"],
    technologies: ["Responsive web", "Editorial content system", "Accessible forms"],
    deliverables: ["Editorial brand direction", "Creator positioning", "Website concept", "Expandable portfolio structure"],
    outcomes: ["A distinct visual and verbal foundation", "Room for the portfolio to grow without overstating maturity", "A clear platform for education-led beauty content"],
    featured: true,
    challenge: "The brand needed a focused online identity that could hold creative work, personal context, and a developing service offer without overstating credentials or maturity.",
    approach: "Use an editorial visual language, direct credential notes, and modular portfolio architecture so the site can grow alongside the body of work.",
    outcome: "Designed to create a credible foundation for a creator brand. No verified public deployment is currently available, so no live link is shown.",
    accent: "rose",
  },
  {
    name: "Studio Admiral",
    slug: "studio-admiral",
    projectType: "Partnership brand platform",
    industry: "Marketing / creative services",
    shortDescription: "A shared brand system that makes two distinct founder perspectives easy to understand and hire.",
    description: "The Studio Admiral partnership platform brings David and Leigh's independent strengths, shared services, portfolios, and practical entry offers into one coherent client journey.",
    image: "/brand-assets/studio-admiral/campaign/more-than-marketing.webp",
    visualStyle: "editorial",
    liveUrl: null,
    status: "live",
    relationshipType: "Studio-owned platform",
    lead: "collaborative",
    categories: ["Branding", "Websites", "Marketing"],
    services: ["Partnership positioning", "Brand architecture", "Conversion design", "Content strategy"],
    technologies: ["Next.js", "Accessible interaction", "Server-routed inquiries", "Analytics"],
    deliverables: ["Partnership positioning system", "Interactive founder gateway", "Filterable portfolio", "Routed inquiry experience"],
    outcomes: ["Independent founder expertise presented without hierarchy", "Clear routes into services, work, and direct contact", "A coherent visual system spanning both founder perspectives"],
    featured: true,
    challenge: "The studio needed to present two equal but different partners without flattening their strengths or making collaboration feel complicated.",
    approach: "Build around an explicit three-mode model—David-led, Leigh-led, or collaborative—then repeat that language through founder profiles, work, services, and contact routing.",
    outcome: "A partnership-first experience designed to help a visitor understand the fit, inspect relevant proof, and start with the right founder.",
    accent: "gold",
  },
  {
    name: "Kings Mountain Muay Thai",
    slug: "kings-mountain-muay-thai",
    projectType: "Lead-generation website",
    industry: "Community fitness / martial arts",
    shortDescription: "A high-energy local website that makes the first-class decision feel simple.",
    description: "A community fitness and martial arts website organized around the questions a first-time student actually asks: what training is like, when classes happen, what it costs, and how to start.",
    image: "/images/work/kings-mountain-muay-thai.png",
    visualStyle: "browser",
    liveUrl: "https://km-muay-thai-demo.netlify.app/",
    status: "live",
    relationshipType: "Community project",
    lead: "collaborative",
    categories: ["Websites", "Marketing"],
    services: ["Positioning", "Website design", "Lead generation", "Mobile UX", "Content structure"],
    technologies: ["Responsive web", "Netlify", "Accessible forms"],
    deliverables: ["Conversion-focused website", "Schedule and pricing structure", "Beginner reassurance content", "Inquiry flow"],
    outcomes: ["Core first-class questions answered in sequence", "Schedule, pricing, and location easy to find on mobile", "A direct path from local interest to inquiry"],
    featured: true,
    challenge: "A new visitor may be interested in Muay Thai but unsure about fitness level, cost, equipment, or whether the class is welcoming to beginners.",
    approach: "Lead with confidence and energy, then remove uncertainty in a deliberate sequence: beginner reassurance, training goals, first-class expectations, schedule, pricing, location, instructor, and a clear first-step call-to-action.",
    outcome: "Built to turn local interest into first-class inquiries while keeping schedule, pricing, location, and beginner information easy to find on mobile.",
    accent: "orange",
  },
  {
    name: "Otagon",
    slug: "otagon",
    projectType: "Product website / web application",
    industry: "Gaming / AI",
    shortDescription: "A cinematic product experience for spoiler-free, in-the-moment game help.",
    description: "A product and application experience that explains a new gaming workflow: capture a difficult moment, receive a spoiler-free hint on a phone, and keep playing.",
    image: "/images/work/otagon-demo.png",
    visualStyle: "browser",
    liveUrl: "https://otagon-demo.netlify.app/",
    status: "live",
    relationshipType: "Product project",
    lead: "collaborative",
    categories: ["AI", "Websites", "Content"],
    services: ["Product positioning", "Conversion design", "SaaS website", "Content architecture", "Web application"],
    technologies: ["Web application", "AI workflows", "Responsive product UI"],
    deliverables: ["Product story and landing experience", "Three-step workflow explanation", "Responsive application interface", "Feature and plan architecture"],
    outcomes: ["A novel interaction explained through a familiar moment of frustration", "A clear path from product promise to hands-on exploration", "Spoiler-free help positioned as the central product value"],
    featured: true,
    challenge: "The product introduces an unfamiliar behavior and has to explain its value quickly without burying the experience in technical detail.",
    approach: "Lead with the moment of frustration, demonstrate the three-step interaction, then expand into product capabilities, supported game types, plans, guides, and common questions.",
    outcome: "Built to make a novel AI-assisted gaming product understandable, memorable, and ready for deeper product exploration.",
    accent: "blue",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function projectLeadLabel(lead: ProjectLead) {
  if (lead === "david") return "David-led";
  if (lead === "leigh") return "Leigh-led";
  return "Collaborative";
}
