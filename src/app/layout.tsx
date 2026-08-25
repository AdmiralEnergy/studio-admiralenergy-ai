import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Studio Admiral | Portfolios, Marketing & Short-Form Content",
    template: "%s | Studio Admiral",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  keywords: [
    "founder-led marketing partnership",
    "portfolio website design",
    "small business marketing baseline",
    "short-form content creators",
    "conversion-focused websites",
    "brand strategy and storytelling",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Studio Admiral | Portfolios, Marketing & Short-Form Content",
    description: siteConfig.description,
    images: [{ url: "/brand/og-default.png", width: 1200, height: 630, alt: "Studio Admiral, Websites & Growth for Small Businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Admiral | Portfolios, Marketing & Short-Form Content",
    description: siteConfig.description,
    images: ["/brand/og-default.png"],
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
        serviceType: ["Conversion-focused websites", "Brand strategy", "Visual storytelling", "Short-form content", "Lead generation", "Marketing systems"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
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
