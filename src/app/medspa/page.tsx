"use client";

import { useState } from 'react';
import { Check, Play, X, Star, Clock, Zap, Users } from 'lucide-react';
import Image from 'next/image';
import { MEDSPA_CONTENT, addUtm } from './constants';

// Extend window interface for analytics
declare global {
  interface Window {
    gtag?: (type: string, action: string, params?: Record<string, unknown>) => void;
    rdt?: ((eventName: string, params?: Record<string, unknown>) => void) & {
      track?: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

// Analytics helper (matches existing pattern)
const track = (
  eventName: string,
  params: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  
  // Reddit pixel
  const mapped = eventName === "select_package" ? "Lead" : "PageVisit";
  if (typeof window !== "undefined") {
    if (typeof window.rdt === "function") window.rdt(mapped, params);
    if (typeof window.rdt?.track === "function") window.rdt.track(mapped, params);
  }
};

export default function MedspaPage() {
  const [showDemo, setShowDemo] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(true);

  const handlePrimaryCTA = () => {
    track('select_package', { 
      package: 'medspa_24hr',
      value: MEDSPA_CONTENT.pricing.base,
      source: 'hero'
    });
    
    const orderUrl = addUtm('/order?sku=medspa_24hr', 'medspa');
    window.location.href = orderUrl;
  };

  const handleDemoClick = () => {
    track('video_demo_request', { content: 'medspa_demo' });
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen bg-[#0c2f4a] text-[#f7f5f2]">
      {/* Hero Section */}
      <section className="relative px-4 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-6xl mx-auto text-center">
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
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            {MEDSPA_CONTENT.hero.h1}
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-[#f7f5f2]/80 max-w-4xl mx-auto">
            {MEDSPA_CONTENT.hero.subhead}
          </p>

          {/* Value bullets */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 text-sm lg:text-base">
            {MEDSPA_CONTENT.hero.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#39FF14]" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handlePrimaryCTA}
              className="bg-[#39FF14] text-[#0c2f4a] px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105"
            >
              {MEDSPA_CONTENT.ctas.primary}
            </button>
            
            <button
              onClick={handleDemoClick}
              className="border-2 border-[#39FF14] text-[#39FF14] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#39FF14] hover:text-[#0c2f4a] transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {MEDSPA_CONTENT.ctas.secondary}
            </button>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 bg-[#0c2f4a]/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">What You Get</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {MEDSPA_CONTENT.features.map((feature, idx) => (
              <div key={idx} className="bg-[#0c2f4a] p-8 rounded-xl border border-[#39FF14]/20">
                <h3 className="text-xl font-semibold mb-4 text-[#39FF14]">
                  {feature.title}
                </h3>
                <p className="text-[#f7f5f2]/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {MEDSPA_CONTENT.process.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-[#39FF14] text-[#0c2f4a] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.step}</h3>
                <p className="text-sm text-[#f7f5f2]/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samples Grid */}
      <section className="py-16 bg-[#0c2f4a]/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Sample Results</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-[#39FF14]/20 to-[#0c2f4a] rounded-xl border border-[#39FF14]/30 flex items-center justify-center">
                <span className="text-[#39FF14]/60 text-sm">Sample Visual {i}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="aspect-video max-w-md mx-auto bg-gradient-to-br from-[#39FF14]/20 to-[#0c2f4a] rounded-xl border border-[#39FF14]/30 flex items-center justify-center">
              <span className="text-[#39FF14]/60">Sample AI Video Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Simple Pricing</h2>
          
          <div className="bg-[#0c2f4a] border border-[#39FF14]/30 rounded-xl p-8 mb-8">
            <div className="text-5xl font-bold text-[#39FF14] mb-4">
              ${MEDSPA_CONTENT.pricing.base}
            </div>
            <p className="text-xl mb-6">Complete 24-Hour Kit</p>
            
            <div className="text-left max-w-md mx-auto mb-6">
              <h4 className="font-semibold mb-3">Add-ons:</h4>
              {MEDSPA_CONTENT.pricing.addOns.map((addon, idx) => (
                <div key={idx} className="flex justify-between text-sm mb-2">
                  <span>{addon.name}</span>
                  <span>+${addon.price}</span>
                </div>
              ))}
            </div>
            
            <button
              onClick={handlePrimaryCTA}
              className="bg-[#39FF14] text-[#0c2f4a] px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all w-full"
            >
              {MEDSPA_CONTENT.ctas.primary}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0c2f4a]/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">FAQ</h2>
          
          <div className="space-y-6">
            {MEDSPA_CONTENT.faq.map((item, idx) => (
              <div key={idx} className="bg-[#0c2f4a] p-6 rounded-xl border border-[#39FF14]/20">
                <h3 className="font-semibold mb-2 text-[#39FF14]">{item.q}</h3>
                <p className="text-[#f7f5f2]/80">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your Content?</h2>
          <p className="text-xl mb-8 text-[#f7f5f2]/80">Join hundreds of medspas creating professional content without the hassle</p>
          
          <button
            onClick={handlePrimaryCTA}
            className="bg-[#39FF14] text-[#0c2f4a] px-12 py-6 rounded-xl text-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105"
          >
            Start in 2 Minutes
          </button>
          
          <div className="mt-6">
            <a 
              href="mailto:hello@admiralenergy.ai" 
              className="text-[#39FF14] hover:underline text-sm"
              onClick={() => track('contact_request', { source: 'medspa_page' })}
            >
              {MEDSPA_CONTENT.ctas.contact}
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Footer CTA */}
      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0c2f4a]/95 backdrop-blur border-t border-[#39FF14]/20 p-4 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="font-semibold">24-Hour Content Kit</div>
                <div className="text-sm text-[#f7f5f2]/70">${MEDSPA_CONTENT.pricing.base} • Ready Tomorrow</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrimaryCTA}
                className="bg-[#39FF14] text-[#0c2f4a] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                Start in 2 Minutes
              </button>
              
              <button
                onClick={() => setStickyVisible(false)}
                className="text-[#f7f5f2]/60 hover:text-[#f7f5f2] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0c2f4a] rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">30-Second Demo</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-[#f7f5f2]/60 hover:text-[#f7f5f2]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="aspect-video bg-gradient-to-br from-[#39FF14]/20 to-[#0c2f4a] rounded-lg flex items-center justify-center">
              <span className="text-[#39FF14]/60">Demo Video Placeholder (30s)</span>
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={handlePrimaryCTA}
                className="bg-[#39FF14] text-[#0c2f4a] px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all"
              >
                {MEDSPA_CONTENT.ctas.primary}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}