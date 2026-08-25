"use client";

import { FormEvent, useRef, useState } from "react";
import { track } from "@/lib/analytics";

export const inquiryPurposes = [
  ["paid-project", "Paid Project / Hire Studio Admiral"],
  ["marketing-baseline", "Small Business Marketing Baseline"],
  ["job-contract", "Job / Contract Opportunity"],
  ["collaboration", "Collaboration / Partnership"],
  ["general", "General Inquiry"],
] as const;

export type InquiryPurpose = (typeof inquiryPurposes)[number][0];
export type PartnerChoice = "david" | "leigh" | "both";

const helpers: Record<InquiryPurpose, string> = {
  "paid-project": "What would you like built, improved, or promoted?",
  "marketing-baseline": "The one-time offer is typically $50–$100. Tell us which profiles or comparable baseline task you need; final scope and price are confirmed first.",
  "job-contract": "Share the company, role or deliverable, work arrangement, timeline, and an opportunity link when available.",
  collaboration: "Tell us what each party would contribute and the outcome you would like to create together.",
  general: "A short note is enough. We will route it to the person you choose.",
};

export function PartnerContactForm({ initialPurpose = "paid-project", initialPartner = "both", initialProject = "" }: { initialPurpose?: InquiryPurpose; initialPartner?: PartnerChoice; initialProject?: string }) {
  const [purpose, setPurpose] = useState<InquiryPurpose>(initialPurpose);
  const [partner, setPartner] = useState<PartnerChoice>(initialPartner);
  const [status, setStatus] = useState<{ type: "idle" | "sending" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const started = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "sending", message: "Sending your inquiry…" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({ error: "The server returned an unreadable response." }));
      if (!response.ok) throw new Error(result.error || "Your inquiry could not be delivered.");
      setStatus({ type: "success", message: "Your inquiry was sent. We’ll review it and respond with a practical next step." });
      track("partner_inquiry_submitted", { purpose, partner });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Your inquiry could not be delivered." });
    }
  }

  return (
    <form
      className="application-form partner-contact-form"
      data-partner={partner}
      onSubmit={submit}
      onFocusCapture={() => { if (!started.current) { started.current = true; track("partner_inquiry_started", { purpose, partner }); } }}
    >
      <p className="form-honeypot"><label>Leave this field blank<input name="company_site" tabIndex={-1} autoComplete="off" /></label></p>
      <fieldset>
        <legend><span>01</span>What is this about?</legend>
        <label className="field-label" htmlFor="purpose">Inquiry purpose *</label>
        <select id="purpose" name="purpose" value={purpose} onChange={(event) => { const value = event.target.value as InquiryPurpose; setPurpose(value); if (value === "marketing-baseline") track("marketing_baseline_interest", { source: "contact_form" }); }} required>
          {inquiryPurposes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
        <p className="conditional-helper">{helpers[purpose]}</p>
      </fieldset>

      <fieldset>
        <legend><span>02</span>Who would you like to work with?</legend>
        <div className="partner-options">
          {(["david", "leigh", "both"] as PartnerChoice[]).map((value) => (
            <label key={value}>
              <input type="radio" name="partner" value={value} checked={partner === value} onChange={() => { setPartner(value); track("partner_selected", { partner: value }); }} />
              <span><strong>{value === "both" ? "Both / Help Me Choose" : value[0].toUpperCase() + value.slice(1)}</strong><small>{value === "david" ? "Strategy · conversion · systems" : value === "leigh" ? "Story · creative direction · connection" : "Recommend the best lead or bring both"}</small></span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend><span>03</span>Your details</legend>
        <div className="form-grid">
          <label>Name *<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
          <label>Email *<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          <label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
          <label>Company or organization *<input name="company" autoComplete="organization" maxLength={150} required /></label>
          <label>Role or job title <span>(optional)</span><input name="role" autoComplete="organization-title" maxLength={120} /></label>
          <label>Existing website <span>(optional)</span><input name="website" type="url" inputMode="url" placeholder="https://" maxLength={500} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>04</span>Project or opportunity</legend>
        <div className="form-grid">
          <label>Project or opportunity type *<input name="opportunity_type" maxLength={200} required /></label>
          <label>Timeline *<select name="timeline" defaultValue="" required><option value="" disabled>Select a timeline</option><option>As soon as practical</option><option>Within 30 days</option><option>1–3 months</option><option>3+ months</option><option>Flexible / exploring</option></select></label>
          <label>Budget range <span>(optional)</span><select name="budget" defaultValue=""><option value="">Select if known</option><option>$50–$100 baseline</option><option>Under $1,000</option><option>$1,000–$3,000</option><option>$3,000–$10,000</option><option>$10,000+</option><option>Not sure yet</option></select></label>
          <label>Opportunity or reference URL <span>(optional)</span><input name="reference_url" type="url" inputMode="url" placeholder="https://" maxLength={500} /></label>
          <label className="form-wide">Relevant portfolio project or service <span>(optional)</span><input name="context" defaultValue={initialProject} maxLength={200} /></label>
          <label className="form-wide">Message *<textarea name="message" rows={7} minLength={20} maxLength={5000} required aria-describedby="message-helper" /></label>
          <p className="form-wide conditional-helper" id="message-helper">{helpers[purpose]}</p>
        </div>
      </fieldset>

      <div className="form-submit">
        <p>Recipient selection happens securely on the server. Never include passwords or sensitive account credentials.</p>
        <button className="button" type="submit" disabled={status.type === "sending"}>{status.type === "sending" ? "Sending…" : "Send inquiry"} <span aria-hidden="true">↗</span></button>
      </div>
      <p className={`form-status form-status-${status.type}`} aria-live="polite" role={status.type === "error" ? "alert" : "status"}>{status.message}</p>
    </form>
  );
}
