"use client";

import { useRef } from "react";
import { track } from "@/lib/analytics";

export function ApplicationForm() {
  const started = useRef(false);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track("website_application_started");
  };

  return (
    <form
      className="application-form"
      name="website-application"
      method="POST"
      action="/thank-you?type=website"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onFocusCapture={markStarted}
      onSubmit={() => track("website_application_submitted")}
    >
      <input type="hidden" name="form-name" value="website-application" />
      <p className="form-honeypot"><label>Do not fill this out: <input name="bot-field" /></label></p>

      <fieldset>
        <legend><span>01</span> About you</legend>
        <div className="form-grid">
          <label>Full name *<input name="name" autoComplete="name" required /></label>
          <label>Business name *<input name="business_name" autoComplete="organization" required /></label>
          <label>Email *<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>Business location *<input name="business_location" placeholder="City, state or service area" required /></label>
          <label>Industry *<input name="industry" placeholder="HVAC, consulting, fitness…" required /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>02</span> The business</legend>
        <div className="form-grid">
          <label className="form-wide">What does your business do? *<textarea name="business_description" rows={4} required /></label>
          <label className="form-wide">What services or products do you sell? *<textarea name="offer" rows={3} required /></label>
          <label>Existing website<input name="existing_website" type="url" placeholder="https://" /></label>
          <label>Do you currently have a website? *
            <select name="has_website" required defaultValue=""><option value="" disabled>Select one</option><option>No</option><option>Yes, but it needs work</option><option>Yes, and it needs a full redesign</option></select>
          </label>
          <label className="form-wide">If you have a site, what is not working?<textarea name="not_working" rows={3} /></label>
        </div>
      </fieldset>

      <fieldset>
        <legend><span>03</span> The website</legend>
        <div className="form-grid">
          <label className="form-wide">What do you need the website to do? *<textarea name="website_needs" rows={4} required /></label>
          <label>Primary goal *
            <select name="primary_goal" required defaultValue=""><option value="" disabled>Select one</option><option>Calls</option><option>Quote requests</option><option>Appointments</option><option>Credibility</option><option>General information</option><option>Other</option></select>
          </label>
          <label>Requested timeline<select name="timeline" defaultValue=""><option value="">No fixed date</option><option>Within 30 days</option><option>1–3 months</option><option>3+ months</option></select></label>
          <label>Social profiles<input name="social_profiles" placeholder="Links or handles" /></label>
          <label>Google Business Profile<input name="google_business_profile" type="url" placeholder="https://" /></label>
          <label>Do you have a logo?<select name="has_logo" defaultValue=""><option value="">Select one</option><option>Yes</option><option>No</option><option>It needs work</option></select></label>
          <label>Do you have business photography?<select name="has_photography" defaultValue=""><option value="">Select one</option><option>Yes</option><option>No</option><option>Some</option></select></label>
          <label className="form-wide">Anything else we should know?<textarea name="additional_notes" rows={4} /></label>
        </div>
      </fieldset>

      <div className="form-submit">
        <p>Website projects are selected based on fit, scope, and available capacity. Submitting this form does not guarantee acceptance.</p>
        <button className="button" type="submit">Send application <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
