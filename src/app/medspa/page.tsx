"use client";

import { useState, useEffect } from 'react';
import { Check, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import { MEDSPA_CONTENT, addUtm } from './constants';

// Analytics interface
declare global {
  interface Window {
    gtag?: (type: string, action: string, params?: Record<string, unknown>) => void;
    rdt?: ((eventName: string, params?: Record<string, unknown>) => void) & {
      track?: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

// Analytics helper
const track = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  
  const mapped = eventName === "select_package" ? "Lead" : "PageVisit";
  if (typeof window !== "undefined") {
    if (typeof window.rdt === "function") window.rdt(mapped, params);
    if (typeof window.rdt?.track === "function") window.rdt.track(mapped, params);
  }
};

export default function MedspaPage() {
  const [addVisuals, setAddVisuals] = useState(false);
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: ''
  });

  useEffect(() => {
    // Extract UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: urlParams.get('utm_source') || 'direct',
      utm_medium: urlParams.get('utm_medium') || 'website',
      utm_campaign: urlParams.get('utm_campaign') || 'medspa_poc',
      utm_content: urlParams.get('utm_content') || 'landing'
    });
  }, []);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fire analytics
    track('select_package', {
      tier: addVisuals ? 'poc_plus' : 'poc_video',
      value: addVisuals ? 148 : 49,
      add_visuals: addVisuals ? 1 : 0
    });
    
    // Submit form to /order with UTM preservation
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  const totalPrice = MEDSPA_CONTENT.pricing.base + (addVisuals ? MEDSPA_CONTENT.pricing.videosAddon : 0);

  return (
    <div className="min-h-screen bg-[#0c2f4a] text-[#f7f5f2]">
      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center py-6 mb-8">
            <Image
              src="/logos/ae_studios_logo.png"
              alt="Admiral Energy Studios Logo"
              width={160}
              height={160}
              priority
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {MEDSPA_CONTENT.hero.h1}
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-[#f7f5f2]/80 max-w-3xl mx-auto">
            {MEDSPA_CONTENT.hero.subhead}
          </p>

          {/* Value bullets */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 text-base">
            {MEDSPA_CONTENT.hero.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#39FF14] flex-shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleOrderSubmit} method="GET" action="/order">
            {/* Hidden UTM fields */}
            <input type="hidden" name="utm_source" value={utmParams.utm_source} />
            <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
            <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
            <input type="hidden" name="utm_content" value={utmParams.utm_content} />
            
            <div className="bg-[#0c2f4a]/50 border-2 border-[#39FF14]/30 rounded-2xl p-8 shadow-2xl">
              {/* Package Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{MEDSPA_CONTENT.package.title}</h2>
                <div className="text-4xl font-bold text-[#39FF14] mb-4">
                  ${totalPrice}
                </div>
                <p className="text-[#f7f5f2]/80">{MEDSPA_CONTENT.package.description}</p>
              </div>

              {/* Base Package Features */}
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg mb-4">What's Included:</h3>
                {MEDSPA_CONTENT.package.includes.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#39FF14] flex-shrink-0 mt-0.5" />
                    <span className="text-[#f7f5f2]/90">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Add Visuals Toggle */}
              <div className="border-t border-[#39FF14]/20 pt-6 mb-8">
                <label className="flex items-start gap-4 cursor-pointer p-4 rounded-lg bg-[#0c2f4a]/30 hover:bg-[#0c2f4a]/50 transition-colors">
                  <input
                    type="checkbox"
                    name="add_visuals"
                    value="1"
                    checked={addVisuals}
                    onChange={(e) => setAddVisuals(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-2 border-[#39FF14]/50 bg-transparent checked:bg-[#39FF14] checked:border-[#39FF14] focus:ring-2 focus:ring-[#39FF14]/50"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-lg">{MEDSPA_CONTENT.package.addon.title}</h4>
                      <span className="text-xl font-bold text-[#39FF14]">{MEDSPA_CONTENT.package.addon.price}</span>
                    </div>
                    <p className="text-[#f7f5f2]/80 text-sm mb-3">{MEDSPA_CONTENT.package.addon.description}</p>
                    <div className="space-y-1">
                      {MEDSPA_CONTENT.package.addon.includes.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-[#f7f5f2]/70">
                          <div className="w-1.5 h-1.5 bg-[#39FF14] rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </label>
              </div>

              {/* Order Button */}
              <button
                type="submit"
                className="w-full bg-[#39FF14] text-[#0c2f4a] py-4 px-8 rounded-xl text-xl font-bold hover:opacity-90 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                Order Now — ${totalPrice}
                <ArrowRight className="w-6 h-6" />
              </button>

              <div className="text-center mt-4 text-sm text-[#f7f5f2]/60">
                <Clock className="w-4 h-4 inline mr-1" />
                Delivered within 24 hours
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 py-16 bg-[#0c2f4a]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {MEDSPA_CONTENT.process.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-[#39FF14] text-[#0c2f4a] rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.step}</h3>
                <p className="text-[#f7f5f2]/80 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center border-t border-[#39FF14]/20">
        <p className="text-[#f7f5f2]/60 text-sm">
          &copy; {new Date().getFullYear()} Admiral Energy Studios. Professional AI content creation.
        </p>
      </footer>
    </div>
  );
}