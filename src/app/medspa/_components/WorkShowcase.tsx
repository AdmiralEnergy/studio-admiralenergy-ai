// src/app/medspa/_components/WorkShowcase.tsx
"use client";

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const showcaseItems = [
  {
    id: 1,
    title: "Before & After: Botox Results",
    description: "Professional video showcasing natural-looking results",
    image: "/gallery/dashboard.svg",
    alt: "Professional botox results showcase"
  },
  {
    id: 2,
    title: "Dermal Filler Campaign",
    description: "Complete social media package with 20 branded visuals",
    image: "/gallery/narrative.svg",
    alt: "Dermal filler social media campaign"
  },
  {
    id: 3,
    title: "CoolSculpting Success Story",
    description: "AI-hosted video + branded Instagram stories",
    image: "/gallery/storyboard.svg",
    alt: "CoolSculpting transformation story"
  },
  {
    id: 4,
    title: "Laser Treatment Series",
    description: "Educational content that converts browsers to bookers",
    image: "/gallery/dashboard.svg",
    alt: "Laser treatment educational series"
  },
  {
    id: 5,
    title: "Med Spa Brand Package",
    description: "Full rebrand with consistent messaging across all platforms",
    image: "/gallery/narrative.svg",
    alt: "Complete med spa branding package"
  }
];

interface WorkShowcaseProps {
  onOrderClick?: () => void;
}

export default function WorkShowcase({ onOrderClick }: WorkShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3; // Assuming 3 visible cards
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : showcaseItems.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < showcaseItems.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const handleDemoScroll = () => {
    document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="px-4 py-16 bg-[#0c2f4a]/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">See the Work</h2>
          <p className="text-xl text-[#f7f5f2]/80 mb-6 max-w-3xl mx-auto">
            30+ assets delivered in 24 hours. AI spokesperson videos + on-brand visuals 
            that turn your expertise into bookings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDemoScroll}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#39FF14] text-[#39FF14] rounded-xl font-semibold hover:bg-[#39FF14] hover:text-[#0c2f4a] transition-all"
            >
              <Play className="w-5 h-5" />
              Watch 45s Demo
            </button>
            
            <button
              onClick={onOrderClick || (() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }))}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-[#0c2f4a] rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              Order Now
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {showcaseItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-80 snap-start bg-[#0c2f4a]/50 rounded-xl border border-[#39FF14]/20 overflow-hidden group hover:border-[#39FF14]/40 transition-all"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#39FF14]/10 to-[#0c2f4a] relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2f4a]/80 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-[#f7f5f2]">{item.title}</h3>
                  <p className="text-[#f7f5f2]/70 text-sm mb-4">{item.description}</p>
                  
                  <button
                    onClick={onOrderClick}
                    className="text-[#39FF14] text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    Get Similar Results
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-full flex items-center justify-center text-[#39FF14] hover:bg-[#39FF14] hover:text-[#0c2f4a] transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-[#0c2f4a] border border-[#39FF14]/30 rounded-full flex items-center justify-center text-[#39FF14] hover:bg-[#39FF14] hover:text-[#0c2f4a] transition-all z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0c2f4a] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0c2f4a] to-transparent pointer-events-none z-10" />
        </div>

        {/* Demo Video Section */}
        <div id="demo-video" className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">See How It Works</h3>
          
          <div className="max-w-3xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-[#39FF14]/10 to-[#0c2f4a] rounded-xl border border-[#39FF14]/30 flex items-center justify-center relative overflow-hidden">
              {/* TODO: Add actual MP4 demo to /public/media/medspa-demo.mp4 */}
              {/* <video
                controls
                preload="metadata"
                className="w-full h-full object-cover rounded-xl"
                poster="/media/medspa-demo-thumbnail.jpg"
              >
                <source src="/media/medspa-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              
              {/* YouTube Embed Fallback */}
              <div className="text-center p-8">
                <Play className="w-16 h-16 text-[#39FF14] mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Demo Video Coming Soon</h4>
                <p className="text-[#f7f5f2]/70 text-sm mb-4">
                  See how we create professional AI-hosted videos for med spas
                </p>
                
                {/* Placeholder for YouTube embed */}
                <div className="aspect-video bg-black/20 rounded-lg border border-[#39FF14]/20 flex items-center justify-center">
                  <span className="text-[#39FF14]/60 text-sm">
                    YouTube Demo Placeholder
                  </span>
                </div>
                
                <p className="text-xs text-[#f7f5f2]/50 mt-4">
                  TODO: Add medspa-demo.mp4 to /public/media/ or replace with YouTube embed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}