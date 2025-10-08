"use client";
import { useEffect, useState } from "react";

export default function BuildChip() {
  const [sha, setSha] = useState("");
  
  useEffect(() => {
    fetch("/api/health")
      .then(r => r.json())
      .then(d => setSha((d?.commit || "").slice(0, 7)));
  }, []);
  
  return sha ? (
    <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">
      build {sha}
    </span>
  ) : null;
}