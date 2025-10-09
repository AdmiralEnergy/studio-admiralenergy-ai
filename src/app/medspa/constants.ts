// Medspa Content Constants
export const MEDSPA_CONTENT = {
  hero: {
    h1: "Medspa Content Accelerator — 24-Hour Promo Kit",
    subhead: "A month of on-brand content in one day. AI avatar video + 20 visuals. No filming.",
    bullets: [
      "Save a day of shooting and editing",
      "Look polished and consistent across platforms", 
      "Simple intake → done within 24 hours"
    ]
  },
  
  features: [
    {
      title: "45–60s Signature AI Video",
      description: "Professional AI spokesperson delivers your key message with your branding"
    },
    {
      title: "20 Branded Visuals",
      description: "Ready-to-post graphics matching your brand colors and style"
    },
    {
      title: "Caption Pack (7 posts) + 1 revision",
      description: "Social media captions optimized for engagement with one free revision"
    }
  ],
  
  process: [
    { step: "Intake", description: "Fill a 2-min form" },
    { step: "Draft", description: "We draft script & style" },
    { step: "Generate", description: "Generate video + visuals" },
    { step: "Deliver", description: "Deliver drive link + posting guide" }
  ],
  
  pricing: {
    base: 249,
    addOns: [
      { name: "2nd AI Video", price: 59 },
      { name: "Extra Visuals Pack", price: 49 }
    ]
  },
  
  faq: [
    {
      q: "Is the presenter a real person?",
      a: "It's a licensed AI presenter—think 'virtual host,' clearly labeled."
    },
    {
      q: "Can we use our logo/colors?",
      a: "Yes—upload in the intake."
    },
    {
      q: "What if I don't like it?",
      a: "One restyle or script tweak included; otherwise refund."
    },
    {
      q: "Do you need patient photos?",
      a: "No. We use representative visuals unless you provide assets."
    },
    {
      q: "Usage rights?",
      a: "You get full marketing usage rights for delivered assets."
    }
  ],
  
  ctas: {
    primary: "Get Your 24-Hour Kit",
    secondary: "See a 30s Demo",
    contact: "Talk to us"
  }
};

// UTM utility
export const addUtm = (url: string, tier: string) => {
  const utmParams = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'cpc',
    utm_campaign: 'medspa_accelerator',
    utm_content: tier
  });
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${utmParams.toString()}`;
};