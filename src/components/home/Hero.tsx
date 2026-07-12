"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
    title: "Define Your Elegance",
    subtitle: "Aroyana exclusive collections crafted for the modern visionary.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071",
    title: "Luxury in Every Thread",
    subtitle: "Experience unparalleled comfort and top-tier artisan craftsmanship.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2070",
    title: "The Ultimate Statement",
    subtitle: "Stand out with minimalist aesthetics and bold premium designs.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // অটোমেটিক স্লাইডার অ্যানিমেশন লজিক (প্রতি ৫ সেকেন্ডে চেঞ্জ হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gray-900 flex items-center justify-center">
      
      {/* 1. Background Image Slider */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            suppressHydrationWarning
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* 2. Interactive Content & CTA */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-white/80 uppercase tracking-[0.3em] text-xs font-bold mb-4 block animate-fade-in-up">
          Welcome to Aroyana
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg transition-all duration-700">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-gray-200 text-sm md:text-lg mb-10 max-w-2xl mx-auto drop-shadow-md transition-all duration-700">
          {slides[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/explore"
            className="bg-white text-black px-8 py-3.5 rounded-sm font-bold text-sm tracking-wide hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
          >
            Shop Premium
          </Link>
          <Link
            href="/explore"
            className="bg-transparent border border-white text-white px-8 py-3.5 rounded-sm font-bold text-sm tracking-wide hover:bg-white hover:text-black transition-all active:scale-95 shadow-xl"
          >
            Explore Collections
          </Link>
        </div>
      </div>

      {/* 3. Slider Navigation Dots */}
      <div className="absolute bottom-16 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 4. Visual Flow to next section (Bouncing Arrow) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </div>
  );
}