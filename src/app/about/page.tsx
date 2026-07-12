import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-light">
      
      {/* ১. Minimal & Luxurious Hero Section */}
      <div className="relative h-[45vh] bg-gray-50 flex items-center justify-center border-b border-gray-100 overflow-hidden">
        {/* Local Image Path used here */}
        <img
          src="/about-hero.jpg"
          alt="Aroyana Fashion Studio"
          className="absolute inset-0 w-full h-full object-cover opacity-10 filter grayscale contrast-125"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold mb-3 block">
            The House of Luxury
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-[0.15em] mb-4">
            Our Story
          </h1>
          <div className="w-12 h-[2px] bg-gray-900 mx-auto mb-6"></div>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Redefining elegance with every thread, blending modern silhouettes with timeless luxury.
          </p>
        </div>
      </div>

      {/* ২. Main Brand Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Heritage & Vision</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                The Vision of Aroyana
              </h2>
            </div>
            
            <p className="text-gray-600 leading-loose text-base md:text-lg">
              Founded with a clear vision to revolutionize the premium fashion landscape, Aroyana stands as a symbol of uncompromising quality and sophisticated design. Guided by the creative direction of founder Nanziba Aroya, the brand focuses on crafting statement pieces that empower individuals to express their unique elegance.
            </p>
            
            <p className="text-gray-600 leading-loose text-base md:text-lg">
              Every collection is a carefully curated masterpiece. From selecting the finest imported fabrics to the meticulous attention given to stitching and finishing, we ensure that every garment bearing the Aroyana name is nothing short of perfection.
            </p>

            {/* Premium Highlights Counters */}
            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
              <div className="space-y-1">
                <h4 className="text-3xl font-black text-gray-900 tracking-tight">100%</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Quality Fabrics</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-black text-gray-900 tracking-tight">Zero</h4>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Compromise on Craft</p>
              </div>
            </div>
          </div>
          
          {/* Right Image Block (Luxury Magazine Style Layout) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gray-100 rounded-3xl translate-x-4 translate-y-4 -z-10 border border-gray-200" />
            <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              {/* Local Image Path used here */}
              <img
                src="/vision.jpg"
                alt="Fashion Design Process"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ৩. Sophisticated Call to Action (CTA) */}
      <div className="bg-gray-50/60 py-24 text-center border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-4 space-y-8">
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wider">
            Experience True Luxury
          </h3>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Step into a world of exclusive fashion curated for the modern generation. Find your next signature look.
          </p>
          <div className="pt-2">
            <Link 
              href="/explore" 
              className="inline-block border-2 border-gray-900 text-gray-900 bg-transparent px-10 py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}