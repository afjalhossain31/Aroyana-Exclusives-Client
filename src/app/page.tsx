import Link from 'next/link';
import ItemCard from '@/components/cards/ItemCard';
import Hero from '@/components/home/Hero'; 

export default async function HomePage() {
  let items = [];
  
  try {
    const res = await fetch('http://127.0.0.1:5000/api/items', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const allItems = Array.isArray(data) ? data : data.items || [];
      items = allItems.slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch home page items:", error);
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">
      
      {/* 
        ✨ Custom Animations: Framer Motion-style smooth entry effects ✨
      */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll-ltr {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-scroll-ltr {
            display: flex;
            width: max-content;
            animation: scroll-ltr 30s linear infinite;
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-400 { animation-delay: 400ms; }
          .delay-500 { animation-delay: 500ms; }
          .delay-600 { animation-delay: 600ms; }
        `
      }} />

      {/* ১. স্লাইডারসহ প্রিমিয়াম Hero সেকশন */}
      <div className="animate-fade-in-up">
        <Hero />
      </div>

      {/* ১.৫. Circle Motion / Marquee Section */}
      <div className="w-full bg-neutral-950 text-white py-3.5 overflow-hidden flex border-y border-neutral-900 animate-fade-in-up delay-100">
        <div className="animate-scroll-ltr flex items-center whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-xs font-bold tracking-[0.3em] uppercase mx-8 text-neutral-300">
                Aroyana Exclusives
              </span>
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              
              <span className="text-xs font-bold tracking-[0.3em] uppercase mx-8 text-neutral-300">
                Premium Collection
              </span>
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            </div>
          ))}
        </div>
      </div>

      {/* ২. Featured Categories (Premium Editorial Bento Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-b border-gray-100">
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-fade-in-up delay-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">The Collections</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900">Shop By Category</h2>
          </div>
          <p className="text-gray-500 mt-4 md:mt-0 text-sm md:text-base max-w-sm text-left md:text-right">
            Curated selections designed for the modern visionary. Explore our exclusive luxury lines.
          </p>
        </div>

        {/* Magazine Style Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[650px]">
          
          {/* Left Large Card - Premium Gown */}
          <div className="lg:col-span-7 h-[450px] lg:h-full animate-fade-in-up delay-300">
            <Link href="/explore?category=Premium Gown" className="group relative w-full h-full rounded-3xl overflow-hidden block shadow-sm hover:shadow-xl transition-shadow duration-500">
              <img 
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200" 
                alt="Premium Gown" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-10">
                <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">Signature Line</span>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider mb-4">Premium Gown</h3>
                <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out">
                  Explore Collection <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            
            {/* Top Right Card - Luxury Bag */}
            <div className="h-[300px] lg:h-[calc(50%-12px)] animate-fade-in-up delay-400">
              <Link href="/explore?category=Luxury Bag" className="group relative w-full h-full rounded-3xl overflow-hidden block shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800" 
                  alt="Luxury Bag" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-2">Luxury Bag</h3>
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    Shop Accessories <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom Right Card - Traditional Wear */}
            <div className="h-[300px] lg:h-[calc(50%-12px)] animate-fade-in-up delay-500">
              <Link href="/explore?category=Traditional Wear" className="group relative w-full h-full rounded-3xl overflow-hidden block shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800" 
                  alt="Traditional Wear" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-2">Traditional Wear</h3>
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    Discover Heritage <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                  </div>
                </div>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* ৩. Trending Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-14 animate-fade-in-up delay-200 text-center md:text-left gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Trending Now</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">Handpicked exclusive items from our latest collection.</p>
          </div>
          <Link href="/explore" className="group text-black font-bold text-sm md:text-base flex items-center gap-2 border-b-2 border-transparent hover:border-black pb-1 transition-all">
            See All Items 
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-gray-50 animate-fade-in-up delay-300">
            <p className="mb-4 font-medium">No items available right now in the showcase.</p>
            <Link href="/add-item" className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
              Add First Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item: any, idx: number) => (
              <div key={item._id} className={`animate-fade-in-up delay-${(idx + 3) * 100}`}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ৪. Brand Highlights */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { icon: "✨", title: "Premium Quality", desc: "Crafted with the finest fabrics imported worldwide to guarantee complete luxury comfort." },
              { icon: "📦", title: "Free Shipping", desc: "Enjoy completely complimentary priority home delivery across Bangladesh on orders over $150." },
              { icon: "🔒", title: "Secure Checkout", desc: "Your transaction safety is guarded with top-tier modern end-to-end encrypted secure networks." }
            ].map((highlight, idx) => (
              <div key={idx} className={`bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-3 transition-all duration-500 ease-out animate-fade-in-up delay-${(idx + 2) * 100}`}>
                <div className="text-4xl mb-5 transform transition-transform hover:scale-110 duration-300">{highlight.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">{highlight.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৫. Brand Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10k+", label: "Happy Customers" },
            { value: "250+", label: "Masterpiece Outfits" },
            { value: "15+", label: "Global Partnerships" },
            { value: "99.4%", label: "Satisfaction Rate" }
          ].map((stat, idx) => (
            <div key={idx} className={`animate-fade-in-up delay-${(idx + 1) * 100}`}>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-sm">{stat.value}</h3>
              <p className="text-gray-500 text-xs md:text-sm uppercase font-bold tracking-widest mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ৬. Testimonials */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 animate-fade-in-up delay-100">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Voices of Trust</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">Read honest experiences shared by our global verified clientele.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Nanziba Aroya", role: "Verified Buyer", text: "The premium black evening gown fits beautifully. The structure, fabric finish, and attention to detail reflect authentic artisan luxury." },
              { name: "Sajib Hossen", role: "VIP Client", text: "Outstanding quality. Delivery was surprisingly fast and the sleek minimalist packaging alone makes it feel like an ultra-premium experience." },
              { name: "Aroya Akter", role: "Fashion Designer", text: "Aroyana brings an unmatched modern silhouette flavor to Dhaka. The stitch line precision and fit are absolutely top-tier standard." }
            ].map((review, idx) => (
              <div key={idx} className={`bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between hover:shadow-lg hover:-translate-y-2 transition-all duration-500 animate-fade-in-up delay-${(idx + 2) * 100}`}>
                <div className="text-4xl text-gray-300 font-serif mb-4">"</div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-8 flex-grow">{review.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 tracking-wide">{review.name}</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৭. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100">
        <div className="text-center mb-14 animate-fade-in-up delay-100">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Frequently Answered Qs</h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">Quick answers to common inquiries regarding our premium policies.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "What is your order exchange policy?", a: "We offer completely seamless complimentary sizing updates or collection exchanges within 7 business days of delivery receipt." },
            { q: "Are custom custom-tailored sizes available?", a: "Yes, select high-end signature collections offer modular alterations. Get in touch with our live support agents for details." },
            { q: "How do I securely track my shipping updates?", a: "Upon order confirmation dispatched from our hub, an automated priority tracker link is sent via text notification." }
          ].map((faq, idx) => (
            <div key={idx} className={`p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-300 transition-colors duration-300 animate-fade-in-up delay-${(idx + 2) * 100}`}>
              <h4 className="font-bold text-gray-900 flex items-center gap-3 text-base">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">Q</span> 
                {faq.q}
              </h4>
              <p className="text-gray-500 text-sm mt-3 pl-9 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ৮. Newsletter Subscription */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="bg-gray-700 text-white p-10 sm:p-20 rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-fade-in-up delay-200">
          {/* Decorative Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider">Join The Elite Club</h2>
            <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              Subscribe to get exclusive first-look privileges at seasonal catalog drops, hidden discount campaigns, and member-only events.
            </p>
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 pt-4">
              <input type="email" placeholder="Enter your premium email address" className="flex-1 px-6 py-4 rounded-xl bg-neutral-900/80 border border-neutral-700 text-sm text-white focus:outline-none focus:border-white transition-colors" required />
              <button className="bg-white text-black px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}