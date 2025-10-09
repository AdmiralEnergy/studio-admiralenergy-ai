// src/app/thank-you/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Check, ArrowRight, Calendar, FileText } from 'lucide-react';
import Link from 'next/link';

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
const track = (
  eventName: string,
  params: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  
  // Reddit pixel - map to "Purchase" for conversion tracking
  const mapped = eventName === "order_confirmed" ? "Purchase" : "PageVisit";
  if (typeof window !== "undefined") {
    if (typeof window.rdt === "function") window.rdt(mapped, params);
    if (typeof window.rdt?.track === "function") window.rdt.track(mapped, params);
  }
};

export default function ThankYouPage() {
  const [orderPackage, setOrderPackage] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  useEffect(() => {
    // Extract URL params for tracking
    const urlParams = new URLSearchParams(window.location.search);
    const pkg = urlParams.get('package') || 'poc_video';  // poc_video or poc_plus
    const email = urlParams.get('email') || '';
    
    setOrderPackage(pkg);
    setCustomerEmail(email);
    
    // Track successful conversion
    track('order_confirmed', {
      package: pkg,
      email: email,
      value: pkg === 'poc_plus' ? 148 : 49,
      currency: 'USD'
    });
  }, []);

  // Package details for display
  const packageDetails = {
    poc_video: {
      title: "Clinic Introduction Video",
      price: 49,
      description: "Video-only ($49)",
      includes: ["45–60s AI-hosted video", "Professional script delivery", "MP4 download link"]
    },
    poc_plus: {
      title: "Video + Branded Visuals",
      price: 148,
      description: "Video + 20 Visuals ($148)",
      includes: ["45–60s AI-hosted video", "20 branded social media graphics", "Ready-to-post formats"]
    }
  };

  const currentPackage = packageDetails[orderPackage as keyof typeof packageDetails] || packageDetails.poc_video;

  const nextSteps = [
    {
      icon: FileText,
      title: "Check Your Email",
      description: "Order confirmation sent to " + (customerEmail || "your inbox"),
      timeline: "Within 5 minutes"
    },
    {
      icon: Calendar,
      title: "Project Kickoff",
      description: "Our team will contact you to finalize your brand details",
      timeline: "Within 2 hours"
    },
    {
      icon: Check,
      title: "Content Delivered",
      description: "Complete AI video + 20 visuals delivered via secure link",
      timeline: "Within 24 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link 
            href="/"
            className="text-xl font-semibold text-slate-900"
          >
            Admiral Energy Studios
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Order Confirmed! 🎉
          </h1>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Thank you for choosing Admiral Energy Studios. Your <strong>{currentPackage.description}</strong> 
            is now in production and will be delivered within 24 hours.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Package</span>
              <span className="font-medium text-slate-900">{currentPackage.title}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Includes</span>
              <div className="text-right">
                {currentPackage.includes.map((item, idx) => (
                  <div key={idx} className="text-sm text-slate-900">{item}</div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-medium text-slate-900">Total</span>
              <span className="text-xl font-bold text-slate-900">${currentPackage.price}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">What happens next?</h2>
          
          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm mb-1">{step.description}</p>
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                    {step.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Contact */}
        <div className="bg-slate-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Need Help?</h2>
          <p className="text-slate-600 mb-4">
            Our team is standing by to ensure your project goes smoothly. 
            Get in touch if you have questions or need to make changes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="mailto:studio@admiralenergy.ai?subject=Order%20Support%20-%20Medspa%20Kit"
              className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
            >
              Email Support
            </a>
            
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-white transition-colors"
            >
              Contact Page
            </Link>
          </div>
        </div>

        {/* CTA Back to Services */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">
            Interested in additional services or ongoing content support?
          </p>
          
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore More Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Admiral Energy Studios. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2">
              <Link href="/privacy" className="hover:text-slate-700 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-slate-700 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}