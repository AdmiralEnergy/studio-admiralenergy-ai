import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  robots?: Metadata["robots"];
};

export const defaultSocialImage = {
  url: siteConfig.seo.socialImage,
  width: 1200,
  height: 630,
  alt: siteConfig.seo.socialImageAlt,
};

export function createPageMetadata({
  title,
  description,
  path,
  openGraphTitle = `${title} | ${siteConfig.name}`,
  openGraphDescription = description,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: openGraphTitle,
      description: openGraphDescription,
      images: [defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [siteConfig.seo.socialImage],
    },
    ...(robots ? { robots } : {}),
  };
}
