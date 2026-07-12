import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gray-900 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e07?q=80&w=2070"
          alt="Aroyana Fashion Studio"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-widest mb-4">
            Our Story
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Redefining elegance with every thread, blending modern aesthetics with timeless luxury.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">
              The Vision of Aroyana
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded with a clear vision to revolutionize the premium fashion landscape, Aroyana stands as a symbol of uncompromising quality and sophisticated design. Guided by the creative direction of founder Nanziba Aroya, the brand focuses on crafting statement pieces that empower individuals to express their unique elegance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Every collection is a carefully curated masterpiece. From selecting the finest imported fabrics to the meticulous attention given to stitching and finishing, we ensure that every garment bearing the Aroyana name is nothing short of perfection.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
              <div>
                <h4 className="text-2xl font-black text-gray-900">100%</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Premium Quality</p>
              </div>
              <div>
                <h4 className="text-2xl font-black text-gray-900">Zero</h4>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Compromise</p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1550639524-a6f58345a278?q=80&w=1000"
              alt="Fashion Design Process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-20 text-center border-t border-gray-100">
        <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">Experience The Luxury</h3>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Step into a world of exclusive fashion. Browse our latest collections and find your next signature look.
        </p>
        <Link href="/explore" className="bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition shadow-md">
          Explore Collections
        </Link>
      </div>
    </div>
  );
}