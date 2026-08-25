import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/websites", "/work", "/growth", "/about", "/contact", "/apply", "/privacy"];
  return [
    ...routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/apply" ? .9 : .8 })),
    ...projects.map((project) => ({ url: `${siteConfig.url}/work/${project.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .75 })),
  ];
}
