import Link from 'next/link';
import ItemCard from '@/components/cards/ItemCard';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] bg-primary flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Elevate Your Everyday Style
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Discover the most exclusive clothing collection at Aroyana. Premium quality, unmatched elegance.
          </p>
          <Link 
            href="/explore" 
            className="bg-secondary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600 transition shadow-lg"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Free Shipping</h3>
            <p className="text-gray-500">On all orders over $100</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Premium Quality</h3>
            <p className="text-gray-500">100% authentic materials</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Secure Payments</h3>
            <p className="text-gray-500">Safe and encrypted checkout</p>
          </div>
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {['Women', 'Men', 'Accessories'].map((category) => (
            <div key={category} className="h-40 bg-primary rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-800 transition">
              <h3 className="text-2xl font-bold text-white">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Items (Core Listing / 4 Cards per row on Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Trending Now</h2>
            <p className="text-gray-500">Our most popular exclusive pieces.</p>
          </div>
          <Link href="/explore" className="text-secondary font-medium hover:underline hidden sm:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Rendering 4 dummy cards to fulfill layout requirement */}
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </section>

      {/* 5. Statistics / Highlights Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><h3 className="text-4xl font-bold text-secondary mb-2">10k+</h3><p>Happy Customers</p></div>
            <div><h3 className="text-4xl font-bold text-secondary mb-2">500+</h3><p>Exclusive Designs</p></div>
            <div><h3 className="text-4xl font-bold text-secondary mb-2">50+</h3><p>Global Brands</p></div>
            <div><h3 className="text-4xl font-bold text-secondary mb-2">24/7</h3><p>Support Ready</p></div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 italic mb-4">"Absolutely in love with the quality! The evening gown I bought fits perfectly. Aroyana Exclusives is now my go-to fashion store."</p>
            <h4 className="font-bold text-primary">- Sarah Jenkins</h4>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 italic mb-4">"Fast shipping and premium packaging. You can tell they really care about their customers and the products they deliver."</p>
            <h4 className="font-bold text-primary">- Emily R.</h4>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gray-100 p-10 rounded-2xl">
          <h2 className="text-2xl font-bold text-primary mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-500 mb-6">Get the latest updates on new collections and exclusive discounts.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-secondary"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-gray-800 transition font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}