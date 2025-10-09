// src/app/order/page.tsx
"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

// Analytics interface
declare global {
  interface Window {
    gtag?: (type: string, action: string, params?: Record<string, unknown>) => void;
    rdt?: ((eventName: string, params?: Record<string, unknown>) => void) & {
      track?: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

function OrderForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const addVisuals = sp?.get("add_visuals") === "1";
  const inferredPackage = addVisuals ? "poc_plus" : "poc_video";
  const price = addVisuals ? 148 : 49; // $49 base, +$99 visuals
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Ensure Netlify Forms fields are set
    data.set("form-name", "order");
    data.set("package", inferredPackage);
    
    // Add UTM parameters if available
    const utmSource = sp?.get("utm_source") || "direct";
    const utmMedium = sp?.get("utm_medium") || "website";
    const utmCampaign = sp?.get("utm_campaign") || "medspa_poc";
    const utmContent = sp?.get("utm_content") || "order_form";
    
    data.set("utm_source", utmSource);
    data.set("utm_medium", utmMedium);
    data.set("utm_campaign", utmCampaign);
    data.set("utm_content", utmContent);

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });
      
      if (res.ok) {
        // Analytics
        if (typeof window !== "undefined") {
          if (window.gtag) {
            window.gtag("event", "generate_lead", { 
              method: "netlify_form", 
              package: inferredPackage,
              value: price 
            });
          }
          if (window.rdt) {
            if (typeof window.rdt === "function") window.rdt("Lead");
            if (window.rdt.track) window.rdt.track("Lead");
          }
        }

        // Redirect to thank-you page with package info
        router.push(`/thank-you?package=${inferredPackage}&email=${data.get("email")}`);
      } else {
        setSubmitting(false);
        alert("There was a problem submitting the form. Please try again.");
      }
    } catch {
      setSubmitting(false);
      alert("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0c2f4a] text-[#f7f5f2] py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/medspa" 
            className="inline-flex items-center gap-2 text-[#39FF14] hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Medspa Page
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-[#f7f5f2]/80">
            Just a few details and we'll start creating your content. Delivered within 24 hours.
          </p>
        </div>

        {/* Package Summary */}
        <div className="mb-8 bg-[#0c2f4a]/50 border border-[#39FF14]/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between items-center">
            <span>{addVisuals ? "Clinic Video + Branded Visuals" : "Clinic Introduction Video"}</span>
            <span className="text-2xl font-bold text-[#39FF14]">${price}</span>
          </div>
          {addVisuals && (
            <div className="text-sm text-[#f7f5f2]/70 mt-2">
              Includes: AI-hosted video + 20 branded social media graphics
            </div>
          )}
        </div>

        {/* Order Form */}
        <form 
          name="order" 
          onSubmit={handleSubmit}
          className="bg-[#0c2f4a]/50 border border-[#39FF14]/20 rounded-xl p-8 space-y-6"
        >
          {/* Netlify Forms detector fields */}
          <input type="hidden" name="form-name" value="order" />
          <input type="hidden" name="package" value={inferredPackage} />

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
                placeholder="Dr. Sarah Johnson"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
                placeholder="sarah@yourspa.com"
              />
            </div>
          </div>

          {/* Clinic Info */}
          <div>
            <label htmlFor="clinic" className="block text-sm font-medium mb-2">
              Clinic/Business Name *
            </label>
            <input
              type="text"
              id="clinic"
              name="clinic"
              required
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
              placeholder="Radiant Beauty Med Spa"
            />
          </div>

          {/* Logo URL (instead of file upload for Netlify Forms compatibility) */}
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium mb-2">
              Logo URL (optional)
            </label>
            <input
              type="url"
              id="logoUrl"
              name="logoUrl"
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
              placeholder="https://yourspa.com/logo.png"
            />
            <p className="text-xs text-[#f7f5f2]/60 mt-1">
              Link to your logo file (PNG/JPG). We'll email you for file upload if needed.
            </p>
          </div>

          {/* Key Message */}
          <div>
            <label htmlFor="tagline" className="block text-sm font-medium mb-2">
              Key Message for Video *
            </label>
            <textarea
              id="tagline"
              name="tagline"
              required
              rows={3}
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors resize-none"
              placeholder="Welcome to Radiant Beauty Med Spa, where we help you look and feel your best with our advanced treatments and personalized care."
            />
          </div>

          {/* Services */}
          <div>
            <label htmlFor="services" className="block text-sm font-medium mb-2">
              Primary Services (3-5 max) *
            </label>
            <input
              type="text"
              id="services"
              name="services"
              required
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
              placeholder="Botox, Dermal Fillers, Laser Hair Removal, CoolSculpting"
            />
          </div>

          {/* Contact Preference */}
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="share_ok"
                value="yes"
                className="w-4 h-4 rounded border-2 border-[#39FF14]/50 bg-transparent checked:bg-[#39FF14] checked:border-[#39FF14]"
              />
              <span className="text-sm text-[#f7f5f2]/90">
                It's okay to contact me about this order and future services
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#39FF14] text-[#0c2f4a] py-4 rounded-xl text-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : `Start My 24-Hour Kit — $${price}`}
          </button>

          <p className="text-center text-sm text-[#f7f5f2]/60">
            Secure order • 24-hour delivery • One minor revision included
          </p>
        </form>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c2f4a] text-[#f7f5f2] flex items-center justify-center">Loading...</div>}>
      <OrderForm />
    </Suspense>
  );
}