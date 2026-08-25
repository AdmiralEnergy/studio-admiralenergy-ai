"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function PortfolioViewTracker({ project }: { project: string }) {
  useEffect(() => { track("portfolio_project_viewed", { project }); }, [project]);
  return null;
}
