// Medspa Content Constants
export const MEDSPA_CONTENT = {
  hero: {
    h1: "Clinic Intro Video — Professional AI Host",
    subhead: "Get your first marketing video done in 24 hours. No filming, no editing, no hassle.",
    bullets: [
      "Ready in 24 hours or less",
      "Professional AI host with your script", 
      "Add branded visuals for complete package"
    ]
  },
  
  pricing: {
    base: 49,
    videosAddon: 99
  },
  
  package: {
    title: "Clinic Introduction Video",
    price: "$49",
    description: "Professional AI-hosted video introducing your clinic and services",
    includes: [
      "45-60 second professional video",
      "AI host with natural speech",
      "Your script and messaging",
      "Basic branding integration",
      "MP4 delivery within 24 hours"
    ],
    addon: {
      title: "Add Branded Visuals",
      price: "+$99",
      description: "Complete visual package to maximize your marketing impact",
      includes: [
        "20 branded social media graphics",
        "Instagram story templates", 
        "Facebook post designs",
        "Professional color matching",
        "Ready-to-post formats"
      ]
    }
  },
  
  process: [
    { step: "Order", description: "Choose video + visuals" },
    { step: "Intake", description: "Share your clinic details" },
    { step: "Create", description: "We produce your content" },
    { step: "Deliver", description: "Download link within 24hrs" }
  ],
  
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