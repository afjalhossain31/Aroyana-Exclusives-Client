import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Glassmorphism Container with a unique color tint */}
      <div className="relative max-w-lg w-full bg-teal-50/50 backdrop-blur-xl border border-teal-100 shadow-2xl rounded-[40px] p-10 text-center">
        
        {/* 404 Badge with Teal tint */}
        <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-teal-200">
          <span className="text-3xl font-black text-teal-900">404</span>
        </div>

        <h1 className="text-4xl font-black text-teal-950 uppercase tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-teal-800 mb-8 leading-relaxed font-light">
          The luxury you are looking for does not exist or has been moved to a new collection.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/" 
            className="bg-teal-800 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-teal-500 transition shadow-lg"
          >
            Return Home
          </Link>
          <Link 
            href="/contact" 
            className="bg-white text-teal-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm border border-teal-200 hover:bg-teal-400 transition"
          >
            Contact Support
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-teal-700 uppercase tracking-widest mt-4">
          <Link href="/explore" className="hover:text-teal-950 transition">Explore</Link>
          <span>•</span>
          <Link href="/about" className="hover:text-teal-950 transition">About Us</Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-teal-950 transition">Our Journal</Link>
        </div>
      </div>
    </div>
  );
}