import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* 1. Hero Section (60-70% height requirement) */}
      <section className="relative h-[70vh] bg-primary flex items-center justify-center text-center">
        {/* Background Overlay or Image could go here */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Signature Style
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Explore the latest premium collections at Aroyana Exclusives. Designed for elegance, tailored for you.
          </p>
          <Link 
            href="/explore" 
            className="bg-secondary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Other 6 sections will be added below */}
    </div>
  );
}