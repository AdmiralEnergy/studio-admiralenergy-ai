import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Menu, ChevronLeft, ChevronRight, Check, Star, Shield, TrendingUp, Zap, Users, Clock, ArrowRight, Sparkles, Image as ImageIcon, MessageCircle } from 'lucide-react';

// Extend window interface for analytics
declare global {
  interface Window {
    gtag?: (type: string, action: string, params?: Record<string, unknown>) => void;
    rdt?: ((eventName: string, params?: Record<string, unknown>) => void) & {
      track?: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

// Strongly typed analytics helper
const track = (
  eventName: string,
  params: Record<string, unknown> = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
  if (typeof window !== "undefined" && window.rdt) {
    // Map your internal events to Reddit's expected names if needed
    const redditEventMap: Record<string, string> = {
      proposal_form_submit: "Lead",
      select_package: "AddToCart",
      purchase: "Purchase",
      outbound_fiverr_click: "Click"
    };
    const mapped = redditEventMap[eventName] ?? eventName;
    // Support either `rdt` or `rdt.track`
    if (typeof window.rdt === "function") window.rdt(mapped, params);
    if (typeof window.rdt?.track === "function") window.rdt.track(mapped, params);
  }
  console.log('📊 Analytics:', eventName, params);
};

// Gallery with categorized images
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', alt: 'Professional corporate persona', category: 'professional' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', alt: 'Confident business persona', category: 'professional' },
  { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600', alt: 'Energetic marketing persona', category: 'casual' },
  { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600', alt: 'Approachable brand face', category: 'casual' },
  { src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600', alt: 'Professional headshot style', category: 'professional' },
  { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600', alt: 'Confident persona style', category: 'professional' },
  { src: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600', alt: 'Creative vibrant persona', category: 'creative' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600', alt: 'Modern brand persona', category: 'creative' }
];

// Pricing tiers with enhanced details
const pricingTiers = [
  {
    name: 'Basic',
    subtitle: 'Simple AI Hero',
    price: 50,
    delivery: '3-day delivery',
    revisions: '1 Revision',
    tier: 'basic',
    tagline: 'Perfect for testing',
    features: [
      '1 avatar hero image + 3 poses',
      'Branded persona creation',
      'Consistent character design',
      'Fine-tuned model creation',
      '4 AI images total',
      'Social media ready'
    ]
  },
  {
    name: 'Standard',
    subtitle: 'Brand Persona Builder',
    price: 125,
    delivery: '4-day delivery',
    revisions: '2 Revisions',
    tier: 'standard',
    popular: true,
    tagline: 'Most businesses choose this',
    savings: 'Save 58%',
    features: [
      '6 images + multiple outfits',
      'PNG files + style guide',
      'Consistent character design',
      'Fine-tuned model creation',
      '9 AI images total',
      'Reusable brand assets'
    ]
  },
  {
    name: 'Premium',
    subtitle: 'Complete Influencer Kit',
    price: 250,
    delivery: '5-day delivery',
    revisions: '3 Revisions',
    tier: 'premium',
    tagline: 'Maximum value & assets',
    savings: 'Save 75%',
    features: [
      '20 professional images',
      'Extensive style guide',
      'Canva templates included',
      '10 content hooks provided',
      'Fine-tuned model creation',
      'Complete brand package'
    ]
  }
];

// Enhanced FAQ data
const faqs = [
  {
    q: 'Why order through Fiverr instead of directly?',
    a: 'Fiverr provides buyer protection, secure payments, and dispute resolution. It is the safest way to start, especially for first-time clients. Once we have worked together, you can request direct proposals for custom projects.'
  },
  {
    q: 'Do I own the rights to the AI personas?',
    a: 'Yes! You receive full commercial rights to all delivered images. Use them across any platform: social media, ads, websites, or print materials.'
  },
  {
    q: 'What if I need revisions after delivery?',
    a: 'Each package includes revisions (Basic: 1, Standard: 2, Premium: 3). Additional revisions can be purchased separately. We want you 100% satisfied with your brand persona.'
  },
  {
    q: 'How consistent will the persona look across different images?',
    a: 'We create a fine-tuned model specifically for your persona, ensuring the same face, features, and style across all images. This is what makes your AI persona truly yours.'
  },
  {
    q: 'Can I use these for Facebook and Instagram ads?',
    a: 'Absolutely. All images are optimized for social platforms and comply with advertising guidelines. We deliver in formats ready for immediate upload.'
  },
  {
    q: 'What do you need from me to get started?',
    a: 'We need your brand guidelines (colors, fonts, vibe), reference images or descriptions of your ideal persona, and your intended use cases. The more detail, the better the result.'
  },
  {
    q: 'How does this compare to hiring a photographer or model?',
    a: 'Traditional photoshoots cost $500-5000+ and require scheduling, locations, and model releases. Our AI personas deliver comparable quality in days, not weeks, at a fraction of the cost with zero scheduling hassle.'
  },
  {
    q: 'What platforms do you optimize for?',
    a: 'Instagram Reels, Facebook Ads, LinkedIn posts, YouTube thumbnails, website headers, email campaigns anywhere you need a consistent brand face.'
  }
];

// Testimonials data
const testimonials = [
  { name: 'Sarah M.', role: 'Marketing Director', text: 'Transformed our social media presence overnight. The consistency is incredible.', rating: 5 },
  { name: 'James L.', role: 'Startup Founder', text: 'Saved us thousands on photoshoots. The AI personas look completely professional.', rating: 5 },
  { name: 'Maria R.', role: 'Content Creator', text: 'Game changer for my personal brand. I use these personas across all platforms.', rating: 5 }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollCTA, setShowScrollCTA] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    use_case: '',
    timeline: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);

  // Scroll tracking for animations and sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowScrollCTA(scrollY > 800);

      // Intersection observer for fade-in animations
      const elements = document.querySelectorAll('.fade-in-section');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.85;
        if (isInView && !el.classList.contains('is-visible')) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track page view on mount
  useEffect(() => {
    track('view_home');
    // Simulate entrance animation
    setTimeout(() => {
      setIsVisible({ hero: true });
    }, 100);
  }, []);

  // Smooth scroll with offset for sticky header
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  // Handle Fiverr click with analytics
  const handleFiverrClick = (tier) => {
    track('outbound_fiverr_click', { tier, price: pricingTiers.find(t => t.tier === tier)?.price });
    track('select_package', { tier });
    window.open(`https://fiverr.com/admiral-ai-studio-${tier}`, '_blank');
  };

  // Open proposal modal
  const openProposalModal = () => {
    track('request_proposal_open');
    setContactModalOpen(true);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.use_case) errors.use_case = 'Please select a use case';
    if (!formData.timeline) errors.timeline = 'Please select a timeline';
    if (!formData.message.trim()) errors.message = 'Please describe your project';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input with live validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      track('form_validation_error', { errors: Object.keys(formErrors) });
      return;
    }

    track('proposal_form_submit', { 
      use_case: formData.use_case, 
      timeline: formData.timeline 
    });
    
    setFormSubmitted(true);
    
    setTimeout(() => {
      setContactModalOpen(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', use_case: '', timeline: '', message: '' });
      setFormErrors({});
    }, 2500);
  };

  // Gallery filtering
  const filteredImages = galleryFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === galleryFilter);

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    track('view_gallery', { image_index: index });
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  }, [lightboxIndex, filteredImages.length]);

  // Keyboard shortcuts for lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') nextLightboxImage();
        if (e.key === 'ArrowLeft') prevLightboxImage();
        if (e.key === 'Escape') closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxIndex, nextLightboxImage, prevLightboxImage, closeLightbox]);

  return (
    <div className="min-h-screen bg-[#0c2f4a] text-[#f7f5f2] font-sans antialiased">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(57, 255, 20, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(57, 255, 20, 0.6);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .gradient-text {
          background: linear-gradient(135deg, #39FF14 0%, #2dd40c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
        }

        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0c2f4a]/95 backdrop-blur-lg shadow-lg border-b border-[#39FF14]/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-xl font-bold">
                <span className="text-[#39FF14]">Admiral</span> <span className="text-[#f7f5f2]">AI Studio</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('benefits')} className="text-sm hover:text-[#39FF14] transition-colors">Benefits</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm hover:text-[#39FF14] transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('gallery')} className="text-sm hover:text-[#39FF14] transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('faq')} className="text-sm hover:text-[#39FF14] transition-colors">FAQ</button>
              <button 
                onClick={openProposalModal} 
                className="bg-[#39FF14] text-[#0c2f4a] px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
              >
                Get Started
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#f7f5f2]">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c2f4a]/98 backdrop-blur-lg border-t border-[#f7f5f2]/10 animate-fade-in-up">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left py-3 hover:text-[#39FF14] transition-colors">Benefits</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left py-3 hover:text-[#39FF14] transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-3 hover:text-[#39FF14] transition-colors">Gallery</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left py-3 hover:text-[#39FF14] transition-colors">FAQ</button>
              <button onClick={openProposalModal} className="w-full bg-[#39FF14] text-[#0c2f4a] px-5 py-3 rounded-xl font-semibold mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Sticky Scroll CTA */}
      {showScrollCTA && (
        <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
          <button 
            onClick={() => handleFiverrClick('standard')}
            className="bg-[#39FF14] text-[#0c2f4a] px-6 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform animate-pulse-glow flex items-center gap-2"
          >
            <Sparkles size={20} />
            Order Now - $125
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/5 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
              <Sparkles size={16} className="text-[#39FF14]" />
              <span className="text-sm font-medium text-[#39FF14]">AI-Powered Brand Personas</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Your Brand Needs a Face.<br />
              <span className="gradient-text">We'll Build It in Days.</span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 text-[#f7f5f2]/80 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get AI-powered brand personas with consistent character design—ready for ads, social media, and content in 3-5 days.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={() => handleFiverrClick('standard')}
                className="group bg-[#39FF14] text-[#0c2f4a] px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center justify-center gap-2"
              >
                Order on Fiverr
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="border-2 border-[#f7f5f2]/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#f7f5f2]/10 transition-all hover:border-[#39FF14]/50 flex items-center justify-center gap-2"
              >
                <ImageIcon size={20} />
                See Examples
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 bg-[#f7f5f2]/5 px-4 py-2 rounded-lg">
                <Shield size={18} className="text-[#39FF14]" />
                <span className="text-[#f7f5f2]/80">Fiverr Protected</span>
              </div>
              <div className="flex items-center gap-2 bg-[#f7f5f2]/5 px-4 py-2 rounded-lg">
                <Clock size={18} className="text-[#39FF14]" />
                <span className="text-[#f7f5f2]/80">3-5 Day Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-[#f7f5f2]/5 px-4 py-2 rounded-lg">
                <Check size={18} className="text-[#39FF14]" />
                <span className="text-[#f7f5f2]/80">Full Commercial Rights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-[#39FF14]/10 via-[#39FF14]/5 to-[#39FF14]/10 border-y border-[#39FF14]/20 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#39FF14] mb-1">500+</div>
              <div className="text-sm text-[#f7f5f2]/60">Personas Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#39FF14] mb-1">98%</div>
              <div className="text-sm text-[#f7f5f2]/60">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#39FF14] mb-1">3-5</div>
              <div className="text-sm text-[#f7f5f2]/60">Days Delivery</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#39FF14] mb-1">$0</div>
              <div className="text-sm text-[#f7f5f2]/60">Model Fees Ever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 sm:px-6 lg:px-8 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">AI Personas?</span>
            </h2>
            <p className="text-xl text-[#f7f5f2]/70 max-w-2xl mx-auto">
              Professional brand faces without the hassle, cost, or scheduling nightmares of traditional photography
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#f7f5f2]/10 to-[#f7f5f2]/5 backdrop-blur rounded-2xl border border-[#f7f5f2]/10 p-8 hover:border-[#39FF14]/50 transition-all hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-[#39FF14]/30 to-[#39FF14]/10 rounded-2xl flex items-center justify-center mb-6">
                <Check className="text-[#39FF14]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Consistent Character Design</h3>
              <p className="text-[#f7f5f2]/70 leading-relaxed">
                Same face, same style, every time. Your AI persona maintains perfect consistency across all content—impossible with stock photos or rotating models.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#f7f5f2]/10 to-[#f7f5f2]/5 backdrop-blur rounded-2xl border border-[#f7f5f2]/10 p-8 hover:border-[#39FF14]/50 transition-all hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-[#39FF14]/30 to-[#39FF14]/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-[#39FF14]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ready-to-Use Brand Templates</h3>
              <p className="text-[#f7f5f2]/70 leading-relaxed">
                Get Canva templates, style guides, and content hooks (Premium tier). Launch campaigns immediately without hiring designers or copywriters.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#f7f5f2]/10 to-[#f7f5f2]/5 backdrop-blur rounded-2xl border border-[#f7f5f2]/10 p-8 hover:border-[#39FF14]/50 transition-all hover-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-[#39FF14]/30 to-[#39FF14]/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-[#39FF14]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Platform-Optimized Output</h3>
              <p className="text-[#f7f5f2]/70 leading-relaxed">
                Images formatted for Instagram Reels, Facebook Ads, LinkedIn, YouTube thumbnails, and more. Upload and publish in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#f7f5f2]/5 to-transparent fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-[#f7f5f2]/70">Choose the package that fits your needs. All orders protected by Fiverr.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <div 
                key={tier.tier}
                className={`relative bg-[#0c2f4a] rounded-2xl border-2 p-8 transition-all hover-lift ${
                  tier.popular 
                    ? 'border-[#39FF14] shadow-[0_0_40px_rgba(57,255,20,0.3)] scale-105' 
                    : 'border-[#f7f5f2]/10 hover:border-[#39FF14]/30'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#39FF14] to-[#2dd40c] text-[#0c2f4a] px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    ⭐ MOST POPULAR
                  </div>
                )}

                {tier.savings && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold rotate-12 shadow-lg">
                    {tier.savings}
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="text-sm text-[#39FF14] font-semibold mb-2">{tier.tagline}</div>
                  <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-[#f7f5f2]/60 text-sm mb-6">{tier.subtitle}</p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold text-[#39FF14]">${tier.price}</span>
                  </div>
                  <p className="text-sm text-[#f7f5f2]/60">{tier.delivery} • {tier.revisions}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check size={20} className="text-[#39FF14] flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleFiverrClick(tier.tier)}
                  className={`w-full py-3.5 rounded-xl font-bold transition-all hover:scale-105 ${
                    tier.popular
                      ? 'bg-[#39FF14] text-[#0c2f4a] shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:shadow-[0_0_30px_rgba(57,255,20,0.6)]'
                      : 'bg-[#f7f5f2]/10 hover:bg-[#f7f5f2]/20 border border-[#f7f5f2]/20'
                  }`}
                >
                  {tier.popular ? '🚀 Get Started Now' : 'Order on Fiverr'}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#f7f5f2]/60 mb-4">Need a custom package or have questions?</p>
            <button 
              onClick={openProposalModal} 
              className="text-[#39FF14] hover:underline font-semibold inline-flex items-center gap-2"
            >
              Request a custom proposal
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See What's <span className="gradient-text">Possible</span>
            </h2>
            <p className="text-xl text-[#f7f5f2]/70 mb-8">Sample AI personas across different styles and use cases</p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {['all', 'professional', 'casual', 'creative'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setGalleryFilter(filter);
                    track('gallery_filter_change', { filter });
                  }}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    galleryFilter === filter
                      ? 'bg-[#39FF14] text-[#0c2f4a] shadow-[0_0_20px_rgba(57,255,20,0.4)]'
                      : 'bg-[#f7f5f2]/10 hover:bg-[#f7f5f2]/20 border border-[#f7f5f2]/20'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(idx)}
                className="aspect-square rounded-2xl overflow-hidden cursor-pointer group relative hover-lift"
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm font-medium">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#39FF14]/5 via-transparent to-[#39FF14]/5 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="bg-[#f7f5f2]/5 backdrop-blur rounded-2xl border border-[#f7f5f2]/10 p-8 hover:border-[#39FF14]/30 transition-all hover-lift"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#39FF14] text-[#39FF14]" />
                  ))}
                </div>
                <p className="text-[#f7f5f2]/80 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-[#f7f5f2]/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 fade-in-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            How It <span className="gradient-text">Works</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { 
                num: 1, 
                title: 'Kickoff', 
                desc: 'Share your brand guidelines, reference images, and vision. We will ask clarifying questions to nail your persona look and feel.',
                icon: MessageCircle
              },
              { 
                num: 2, 
                title: 'Design', 
                desc: 'We fine-tune a custom AI model and generate your persona across multiple poses, outfits, and scenarios based on your package.',
                icon: Sparkles
              },
              { 
                num: 3, 
                title: 'Deliver', 
                desc: 'Receive your AI persona images, style guide, and templates (depending on tier). Start using them immediately across all platforms.',
                icon: Zap
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#39FF14]/30 to-[#39FF14]/10 rounded-full flex items-center justify-center text-3xl font-bold text-[#39FF14] group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <div className="absolute -inset-4 bg-[#39FF14]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <step.icon className="w-8 h-8 text-[#39FF14] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-[#f7f5f2]/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#f7f5f2]/5 to-transparent fade-in-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details 
                key={idx} 
                className="bg-[#f7f5f2]/5 backdrop-blur rounded-2xl border border-[#f7f5f2]/10 p-6 hover:border-[#39FF14]/30 transition-all group"
              >
                <summary className="cursor-pointer font-semibold text-lg list-none flex justify-between items-center">
                  <span className="pr-8">{faq.q}</span>
                  <span className="text-[#39FF14] group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
                </summary>
                <p className="mt-4 text-[#f7f5f2]/70 leading-relaxed border-t border-[#f7f5f2]/10 pt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#39FF14]/10 via-[#39FF14]/5 to-[#39FF14]/10 border-y border-[#39FF14]/20 fade-in-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Build Your <span className="gradient-text">Brand Persona?</span>
          </h2>
          <p className="text-xl text-[#f7f5f2]/80 mb-10 leading-relaxed">
            Join hundreds of businesses using AI personas to stand out on social media and in advertising.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleFiverrClick('standard')}
              className="group bg-[#39FF14] text-[#0c2f4a] px-10 py-5 rounded-xl font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_40px_rgba(57,255,20,0.5)] flex items-center justify-center gap-2"
            >
              <Zap size={22} />
              Start Your Order Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={openProposalModal}
              className="border-2 border-[#39FF14]/50 px-10 py-5 rounded-xl font-semibold text-lg hover:bg-[#39FF14]/10 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Request Custom Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[#f7f5f2]/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-bold text-xl mb-4">
                <span className="text-[#39FF14]">Admiral</span> AI Studio
              </h3>
              <p className="text-[#f7f5f2]/70 mb-6 leading-relaxed">
                Professional AI-powered brand personas for modern businesses. Create consistent, high-quality character designs in days, not weeks.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#f7f5f2]/10 rounded-lg flex items-center justify-center hover:bg-[#39FF14]/20 transition-colors cursor-pointer">
                  <Users size={20} />
                </div>
                <div className="w-10 h-10 bg-[#f7f5f2]/10 rounded-lg flex items-center justify-center hover:bg-[#39FF14]/20 transition-colors cursor-pointer">
                  <MessageCircle size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#39FF14]">Quick Links</h4>
              <div className="space-y-3 text-sm">
                <button onClick={() => scrollToSection('pricing')} className="block hover:text-[#39FF14] transition-colors">Pricing</button>
                <button onClick={() => scrollToSection('gallery')} className="block hover:text-[#39FF14] transition-colors">Gallery</button>
                <button onClick={() => scrollToSection('faq')} className="block hover:text-[#39FF14] transition-colors">FAQ</button>
                <button onClick={openProposalModal} className="block hover:text-[#39FF14] transition-colors">Contact</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#39FF14]">Contact</h4>
              <p className="text-sm text-[#f7f5f2]/70 mb-3">studio@admiralenergy.ai</p>
              <p className="text-sm text-[#f7f5f2]/70">
                Part of <a href="https://admiralenergy.ai" className="text-[#39FF14] hover:underline font-medium">Admiral Energy</a>
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#f7f5f2]/10 text-center">
            <p className="text-sm text-[#f7f5f2]/60">
              &copy; 2025 Admiral Energy Studio. All rights reserved. 
              <span className="mx-2">•</span>
              Powered by AI innovation
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {contactModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up" 
          onClick={() => setContactModalOpen(false)}
        >
          <div 
            className="bg-[#0c2f4a] border-2 border-[#39FF14]/30 rounded-2xl max-w-lg w-full p-8 shadow-[0_0_60px_rgba(57,255,20,0.3)]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Request Custom Proposal</h3>
              <button 
                onClick={() => setContactModalOpen(false)} 
                className="text-[#f7f5f2]/60 hover:text-[#f7f5f2] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {formSubmitted ? (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="w-20 h-20 bg-[#39FF14]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-[#39FF14]" size={40} />
                </div>
                <h4 className="text-2xl font-bold mb-3">Thank You!</h4>
                <p className="text-[#f7f5f2]/70 text-lg">We will be in touch within 24 hours with your custom proposal.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f7f5f2]/5 border rounded-xl px-4 py-3 transition-all ${
                      formErrors.name 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                        : 'border-[#f7f5f2]/20 focus:ring-2 focus:ring-[#39FF14]'
                    } text-[#f7f5f2]`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f7f5f2]/5 border rounded-xl px-4 py-3 transition-all ${
                      formErrors.email 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                        : 'border-[#f7f5f2]/20 focus:ring-2 focus:ring-[#39FF14]'
                    } text-[#f7f5f2]`}
                    placeholder="john@company.com"
                  />
                  {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Use Case *</label>
                  <select 
                    name="use_case"
                    value={formData.use_case}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f7f5f2]/5 border rounded-xl px-4 py-3 transition-all ${
                      formErrors.use_case 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                        : 'border-[#f7f5f2]/20 focus:ring-2 focus:ring-[#39FF14]'
                    } text-[#f7f5f2]`}
                  >
                    <option value="">Select your primary use case...</option>
                    <option>Social Media Content</option>
                    <option>Facebook/Instagram Ads</option>
                    <option>YouTube Thumbnails</option>
                    <option>Website/Landing Pages</option>
                    <option>Email Marketing</option>
                    <option>Multiple Platforms</option>
                  </select>
                  {formErrors.use_case && <p className="text-red-400 text-xs mt-1">{formErrors.use_case}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Timeline *</label>
                  <select 
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={`w-full bg-[#f7f5f2]/5 border rounded-xl px-4 py-3 transition-all ${
                      formErrors.timeline 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                        : 'border-[#f7f5f2]/20 focus:ring-2 focus:ring-[#39FF14]'
                    } text-[#f7f5f2]`}
                  >
                    <option value="">When do you need this?</option>
                    <option>ASAP (3-5 days)</option>
                    <option>Within 2 weeks</option>
                    <option>Within a month</option>
                    <option>Just exploring</option>
                  </select>
                  {formErrors.timeline && <p className="text-red-400 text-xs mt-1">{formErrors.timeline}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Details *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full bg-[#f7f5f2]/5 border rounded-xl px-4 py-3 transition-all ${
                      formErrors.message 
                        ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                        : 'border-[#f7f5f2]/20 focus:ring-2 focus:ring-[#39FF14]'
                    } text-[#f7f5f2] resize-none`}
                    placeholder="Tell us about your brand, vision, and what you are looking for..."
                  />
                  {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
                </div>

                <button 
                  onClick={handleFormSubmit}
                  className="w-full bg-[#39FF14] text-[#0c2f4a] py-4 rounded-xl font-bold hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Submit Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <button 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white hover:text-[#39FF14] transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={36} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
            className="absolute left-6 text-white hover:text-[#39FF14] transition-colors hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={56} />
          </button>
          
          <div className="max-h-[90vh] max-w-[90vw]">
            <img 
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-sm">{filteredImages[lightboxIndex].alt}</p>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
            className="absolute right-6 text-white hover:text-[#39FF14] transition-colors hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={56} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;