import Link from 'next/link';
import ItemCard from '@/components/cards/ItemCard';
import Hero from '@/components/home/Hero'; 

export default async function HomePage() {
  let items = [];
  
  try {
    // ব্যাকএন্ড থেকে ডাটা নিয়ে আসা হচ্ছে
    const res = await fetch('http://127.0.0.1:5000/api/items', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      // যদি ব্যাকএন্ড সরাসরি অ্যারে পাঠায় অথবা অবজেক্টের ভেতর items পাঠায়
      const allItems = Array.isArray(data) ? data : data.items || [];
      // শুধুমাত্র প্রথম ৪টি প্রোডাক্ট দেখানো হচ্ছে (Desktop view: 4 cards per row)
      items = allItems.slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch home page items:", error);
  }

  return (
    <div className="bg-white min-h-screen text-gray-900">
      
      {/* ১. স্লাইডারসহ প্রিমিয়াম Hero সেকশন (60-70% Height Limited) */}
      <Hero />

      {/* ২. Featured Categories (ক্যাটাগরি কালেকশন সেকশন) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight">Shop By Categories</h2>
          <p className="text-gray-500 mt-2">Explore our carefully curated luxury fashion categories.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Premium Gown", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=500", desc: "Elegant evening statements" },
            { name: "Luxury Bag", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500", desc: "Sophistication in every stitch" },
            { name: "Traditional Wear", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500", desc: "Heritage wrapped in luxury" }
          ].map((cat, idx) => (
            <Link href={`/explore?category=${cat.name}`} key={idx} className="group relative h-80 rounded-2xl overflow-hidden border border-gray-100 block shadow-sm hover:shadow-md transition">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">{cat.name}</h3>
                <p className="text-gray-300 text-sm mt-1">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৩. Trending Items সেকশন (৪টি কার্ড পারফেক্টলি এলাইনড) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-100">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">Trending Now</h2>
            <p className="text-gray-500 mt-2">Handpicked exclusive items from our latest collection.</p>
          </div>
          <Link href="/explore" className="text-black font-bold hover:underline text-sm md:text-base flex items-center gap-1">
            See All Items &rarr;
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-500 border border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <p className="mb-4 font-medium">No items available right now in the showcase.</p>
            <Link href="/add-item" className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
              Add First Item
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item: any) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* ৪. Brand Highlights / Value Proposition (আমাদের বিশেষত্ব) */}
      <section className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 space-y-3">
              <div className="text-3xl">✨</div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Premium Quality</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Crafted with the finest fabrics and materials imported worldwide to guarantee complete luxury comfort.</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="text-3xl">📦</div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Free Shipping</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Enjoy completely complimentary priority home delivery across Bangladesh on orders over $150.</p>
            </div>
            <div className="p-6 space-y-3">
              <div className="text-3xl">🔒</div>
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Secure Checkout</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Your transaction safety is guarded with top-tier modern end-to-end encrypted secure network channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ৫. Brand Statistics Section (কাউন্টার বা সংখ্যা) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-100 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl font-black text-gray-900">10k+</h3>
            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">250+</h3>
            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mt-2">Masterpiece Outfits</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">15+</h3>
            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mt-2">Global Partnerships</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-gray-900">99.4%</h3>
            <p className="text-gray-500 text-sm uppercase font-bold tracking-wider mt-2">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* ৬. Testimonials Section (কাস্টমার রিভিউ) */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Voices of Trust</h2>
            <p className="text-gray-500 mt-2">Read honest experiences shared by our global verified clientele.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Nanziba Aroya", role: "Verified Buyer", text: "The premium black evening gown fits beautifully. The structure, fabric finish, and attention to detail reflect authentic artisan luxury." },
              { name: "Sajib Hossen", role: "VIP Client", text: "Outstanding quality. Delivery was surprisingly fast and the sleek minimalist packaging alone makes it feel like an ultra-premium experience." },
              { name: "Aroya Akter", role: "Fashion Designer", text: "Aroyana brings an unmatched modern silhouette flavor to Dhaka. The stitch line precision and fit are absolutely top-tier standard." }
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <p className="text-gray-600 italic text-sm leading-relaxed">"{review.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৭. FAQ Section (সাধারণ প্রশ্নোত্তর) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase tracking-tight">Frequently Answered Qs</h2>
          <p className="text-gray-500 mt-2">Quick answers to common inquiries regarding Aroyana premium policy.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "What is your order exchange policy?", a: "We offer completely seamless complimentary sizing updates or collection exchanges within 7 business days of delivery receipt." },
            { q: "Are custom custom-tailored sizes available?", a: "Yes, select high-end signature collections offer modular alterations. Get in touch with our live support agents for details." },
            { q: "How do I securely track my shipping updates?", a: "Upon order confirmation dispatched from our hub, an automated priority tracker link is sent via text notification." }
          ].map((faq, idx) => (
            <div key={idx} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-900 flex items-center gap-2"><span>Q.</span> {faq.q}</h4>
              <p className="text-gray-600 text-sm mt-2 pl-5 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ৮. Newsletter Subscription (নিউজলেটার ইমেইল ইনপুট বক্স) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-black text-white p-10 sm:p-16 rounded-3xl space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-wider">Join The Elite Club</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">Subscribe to get exclusive first-look privileges at seasonal catalog drops, hidden discount campaigns, and member-only events.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 pt-2">
            <input type="email" placeholder="Enter your premium email address" className="flex-1 px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white" required />
            <button className="bg-white text-black px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition whitespace-nowrap">Subscribe Now</button>
          </div>
        </div>
      </section>

    </div>
  );
}