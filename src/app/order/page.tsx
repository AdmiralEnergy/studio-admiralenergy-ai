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
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Parse URL params for package and pricing
  const addVisuals = sp?.get("add_visuals") === "1";
  const pkg: 'poc_video' | 'poc_plus' = addVisuals ? 'poc_plus' : 'poc_video';
  const price = addVisuals ? 148 : 49;

  const utm = typeof window !== 'undefined' ? window.location.search : '';

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) return;
    const max = 10 * 1024 * 1024; // 10MB
    const okTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!okTypes.includes(f.type)) {
      setError('Please upload PNG, JPG, or SVG.');
      return;
    }
    if (f.size > max) {
      setError('File too large (max 10MB).');
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    setSubmitting(true);

    // Since this is a static form submission, we'll fire analytics on the thank-you page instead
    // Form submits directly to Netlify Forms
  };

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
          action={`/__forms.html${utm}`}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          encType="multipart/form-data"
          name="order"
          className="bg-[#0c2f4a]/50 border border-[#39FF14]/20 rounded-xl p-8 space-y-6"
        >
          {/* Netlify Forms detector fields */}
          <input type="hidden" name="form-name" value="order" />
          <input type="hidden" name="package" value={pkg} />
          <input type="hidden" name="price" value={price} />
          
          {/* UTM Parameters */}
          <input type="hidden" name="utm_source" value={sp?.get("utm_source") || "direct"} />
          <input type="hidden" name="utm_medium" value={sp?.get("utm_medium") || "website"} />
          <input type="hidden" name="utm_campaign" value={sp?.get("utm_campaign") || "medspa_poc"} />
          <input type="hidden" name="utm_content" value={sp?.get("utm_content") || "order_form"} />
          
          {/* Honeypot field for spam protection */}
          <p className="hidden">
            <label>Don't fill this out: <input name="bot-field" /></label>
          </p>

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

          {/* Logo File Upload */}
          <div>
            <label htmlFor="logo" className="block text-sm font-medium mb-2">
              Logo (PNG/JPG/SVG, ≤10MB)
            </label>
            <div className="relative">
              <input
                type="file"
                id="logo"
                name="logo"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={onFileChange}
                className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#39FF14] file:text-[#0c2f4a] hover:file:bg-[#39FF14]/90"
              />
              <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#39FF14]/60 pointer-events-none" />
            </div>
            {error && <p role="alert" className="text-red-400 text-sm mt-1">{error}</p>}
            <p className="text-xs text-[#f7f5f2]/60 mt-1">
              PNG, JPG, or SVG format. Max 10MB. High-res preferred for best results.
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
            disabled={submitting || !!error}
            aria-live="polite"
            className="w-full bg-[#39FF14] text-[#0c2f4a] py-4 rounded-xl text-xl font-bold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : `Submit Order — $${price}`}
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