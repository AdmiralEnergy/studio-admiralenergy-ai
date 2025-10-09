"use client";

import { useState } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Extend window interface for analytics
declare global {
  interface Window {
    gtag?: (type: string, action: string, params?: Record<string, unknown>) => void;
    rdt?: ((eventName: string, params?: Record<string, unknown>) => void) & {
      track?: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  website: string;
  primaryService: string;
  brandColors: string;
  voiceTone: string;
  offerLine: string;
}

export default function OrderPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    website: '',
    primaryService: '',
    brandColors: '',
    voiceTone: '',
    offerLine: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add UTM parameters if available
    const urlParams = new URLSearchParams(window.location.search);
    formData.append('utm_source', urlParams.get('utm_source') || 'direct');
    formData.append('utm_medium', urlParams.get('utm_medium') || 'website');
    formData.append('utm_campaign', urlParams.get('utm_campaign') || 'medspa_accelerator');
    formData.append('utm_content', urlParams.get('utm_content') || 'order_form');
    formData.append('package', 'medspa_24hr');

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (res.ok) {
        // Fire analytics events for form submission
        if (typeof window !== 'undefined') {
          if (window.gtag) {
            window.gtag("event", "generate_lead", { method: "netlify_form", value: 249 });
          }
          if ((window as any).rdt) {
            (window as any).rdt("track", "Lead");
          }
        }
        
        // Build thank-you page URL with parameters for personalization
        const thankYouUrl = new URLSearchParams();
        thankYouUrl.set('sku', 'medspa_24hr');
        thankYouUrl.set('email', formData.get('email') as string);
        
        // Preserve UTM parameters
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');
        
        if (utmSource) thankYouUrl.set('utm_source', utmSource);
        if (utmMedium) thankYouUrl.set('utm_medium', utmMedium);
        if (utmCampaign) thankYouUrl.set('utm_campaign', utmCampaign);
        
        // Redirect to thank-you page
        window.location.href = `/thank-you?${thankYouUrl.toString()}`;
      } else {
        setIsSubmitting(false);
        alert('There was an error submitting your order. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('There was an error submitting your order. Please try again.');
    }
  };

  // Form submission now redirects to thank-you page, so no inline success state needed

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
          
          <h1 className="text-3xl font-bold mb-2">Order Your 24-Hour Content Kit</h1>
          <p className="text-[#f7f5f2]/80">
            Fill out this quick form to get started. We'll have your content ready in 24 hours.
          </p>
        </div>

        {/* Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#0c2f4a]/50 border border-[#39FF14]/20 rounded-xl p-8 space-y-6"
          name="medspa-order"
        >
          <input type="hidden" name="form-name" value="medspa-order" />
          
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
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
                placeholder="John Doe"
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-2">
              Website or Instagram Handle *
            </label>
            <input
              type="text"
              id="website"
              name="website"
              required
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
              placeholder="@yourspa or https://yourspa.com"
            />
          </div>

          {/* Primary Service */}
          <div>
            <label htmlFor="primaryService" className="block text-sm font-medium mb-2">
              Primary Service *
            </label>
            <select
              id="primaryService"
              name="primaryService"
              required
              value={formData.primaryService}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
            >
              <option value="">Select primary service</option>
              <option value="botox">Botox & Injectables</option>
              <option value="fillers">Dermal Fillers</option>
              <option value="skincare">Medical Skincare</option>
              <option value="laser">Laser Treatments</option>
              <option value="coolsculpting">CoolSculpting</option>
              <option value="facials">Medical Facials</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Brand Colors */}
          <div>
            <label htmlFor="brandColors" className="block text-sm font-medium mb-2">
              Brand Colors (Hex Codes)
            </label>
            <input
              type="text"
              id="brandColors"
              name="brandColors"
              value={formData.brandColors}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
              placeholder="#FF6B6B, #4ECDC4 (optional)"
            />
            <p className="text-xs text-[#f7f5f2]/60 mt-1">
              Leave blank to use our professional palette
            </p>
          </div>

          {/* Voice Tone */}
          <div>
            <label htmlFor="voiceTone" className="block text-sm font-medium mb-2">
              Voice & Tone *
            </label>
            <select
              id="voiceTone"
              name="voiceTone"
              required
              value={formData.voiceTone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
            >
              <option value="">Select your brand voice</option>
              <option value="professional">Professional & Medical</option>
              <option value="friendly">Friendly & Approachable</option>
              <option value="luxury">Luxury & Premium</option>
              <option value="conversational">Conversational & Relatable</option>
              <option value="confident">Confident & Bold</option>
            </select>
          </div>

          {/* One-line Offer */}
          <div>
            <label htmlFor="offerLine" className="block text-sm font-medium mb-2">
              Your Key Offer (One Line) *
            </label>
            <input
              type="text"
              id="offerLine"
              name="offerLine"
              required
              value={formData.offerLine}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-lg text-[#f7f5f2] focus:outline-none focus:border-[#39FF14] transition-colors"
              placeholder="e.g., 'New patient Botox special - $50 off first treatment'"
            />
          </div>

          {/* Logo Upload Placeholder */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Logo Upload (Optional)
            </label>
            <div className="border-2 border-dashed border-[#39FF14]/30 rounded-lg p-8 text-center">
              <Upload className="w-8 h-8 text-[#39FF14]/60 mx-auto mb-2" />
              <p className="text-sm text-[#f7f5f2]/60">
                Drag & drop your logo here, or click to browse
              </p>
              <p className="text-xs text-[#f7f5f2]/40 mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#39FF14] text-[#0c2f4a] py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing Order...' : 'Start My 24-Hour Kit - $249'}
            </button>
            
            <p className="text-xs text-[#f7f5f2]/60 text-center mt-3">
              Secure order • 24-hour delivery • One free revision included
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}