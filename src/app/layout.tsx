import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { founders, partnershipServices } from "@/data/partnership";
import { siteConfig } from "@/data/site";
import { defaultSocialImage } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: "%s | Studio Admiral",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "David Edwards" }, { name: "Leigh Edwards" }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  manifest: "/manifest.webmanifest",
  keywords: [
    "founder-led marketing partnership",
    "conversion-focused websites",
    "brand strategy and storytelling",
    "creative direction",
    "marketing automation",
    "analytics and optimization",
    "small business marketing baseline",
    "audience-building content",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.openGraphTitle,
    description: siteConfig.seo.openGraphDescription,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.openGraphTitle,
    description: siteConfig.seo.openGraphDescription,
    images: [siteConfig.seo.socialImage],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/brand/mask-icon.svg", color: "#C6A15B" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0D1B2A" };

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: ["davide@admiralenergy.ai", "leighnicoleedwards97@gmail.com"],
        description: siteConfig.description,
        areaServed: "United States",
        logo: new URL(siteConfig.brand.mark ?? "/brand/mark.svg", siteConfig.url).toString(),
        image: new URL(siteConfig.seo.socialImage, siteConfig.url).toString(),
        founder: founders.map((founder) => ({ "@id": `${siteConfig.url}/#${founder.id}-edwards` })),
        serviceType: [
          ...partnershipServices.map((service) => service.title),
          "Small Business Marketing Baseline",
          "Free Website Program",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-US",
      },
      ...founders.map((founder) => ({
        "@type": "Person",
        "@id": `${siteConfig.url}/#${founder.id}-edwards`,
        name: `${founder.name} Edwards`,
        givenName: founder.name,
        familyName: "Edwards",
        description: founder.biography,
        image: new URL(founder.portrait, siteConfig.url).toString(),
        url: `${siteConfig.url}/about#founder-profile-${founder.id}`,
        jobTitle: founder.id === "david" ? "Co-founder and strategist" : "Co-founder and visual storyteller",
        worksFor: { "@id": `${siteConfig.url}/#organization` },
      })),
    ],
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <JsonLd data={organizationSchema} />
        <Analytics />
      </body>
    </html>
  );
}
