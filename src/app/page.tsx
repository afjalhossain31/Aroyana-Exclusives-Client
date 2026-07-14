import Link from 'next/link';
import ItemCard from '@/components/cards/ItemCard';
import Hero from '@/components/home/Hero';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import Testimonials from '@/components/home/Testimonials';
import FAQSection from "@/components/home/FAQSection";
import "remixicon/fonts/remixicon.css";
import type { Item } from "@/types/item";
import { motion } from "framer-motion";
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let items = [];

  // try {
  //   const res = await fetch('http://127.0.0.1:5000/api/items', { cache: 'no-store' });

  try {
    const res = await fetch('http://127.0.0.1:5000/api/items', {
      cache: 'no-store', // রিয়েল-টাইম ডাটা পাওয়ার জন্য
    });

    if (res.ok) {
      const data = await res.json();
      // এখানে ডাটা চেক করছি যেন এরর না আসে
      const allItems = Array.isArray(data) ? data : (data.items ? data.items : []);
      items = allItems.slice(0, 8);
    }
  }
  catch (error) {
    console.error("Failed to fetch home page items:", error);
  }

  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">

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
          .animate-scroll-ltr { display: flex; width: max-content; animation: scroll-ltr 30s linear infinite; }
          .animate-fade-in-up { opacity: 0; animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
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


      {/* ৩. Trending Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 animate-fade-in-up delay-200 text-center md:text-left gap-4">
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
            {items.map((item: Item, idx: number) => (
              <div key={item._id} className={`animate-fade-in-up delay-${(idx + 3) * 100}`}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        )}
      </section>


      {/* ২. Featured Categories (Premium Editorial Bento Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-100">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 animate-fade-in-up delay-200">
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


      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15 border-b border-gray-100">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-black uppercase text-gray-900 mt-3">
            Why Choose Aroyana
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-5">
            Every collection is thoughtfully designed with premium craftsmanship,
            timeless elegance, and uncompromising quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="group bg-white rounded-3xl border border-gray-100 p-10 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform">
              <i className="ri-award-line"></i>
            </div>

            <h3 className="text-2xl font-black uppercase mb-4">
              Premium Quality
            </h3>

            <p className="text-gray-500 leading-7">
              Carefully selected fabrics and luxury finishing ensure every piece
              reflects exceptional craftsmanship.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white rounded-3xl border border-gray-100 p-10 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform">
              <i className="ri-truck-line"></i>
            </div>

            <h3 className="text-2xl font-black uppercase mb-4">
              Fast Delivery
            </h3>

            <p className="text-gray-500 leading-7">
              Secure nationwide delivery with careful packaging to ensure your order
              arrives safely and on time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white rounded-3xl border border-gray-100 p-10 hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-3xl mb-8 group-hover:rotate-6 transition-transform">
              <i className="ri-customer-service-2-line"></i>
            </div>

            <h3 className="text-2xl font-black uppercase mb-4">
              Trusted Service
            </h3>

            <p className="text-gray-500 leading-7">
              Our dedicated support team is always ready to provide a smooth and
              enjoyable shopping experience.
            </p>
          </div>

        </div>
      </section>


      {/* ৪. Brand Highlights */}
      {/* <section className="bg-gray-50 py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
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
      </section> */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Testimonials />
        <FeaturesGrid />
        <FAQSection />
      </section>




      {/* ৫. Brand Statistics */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-gray-100 text-center">
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
      </section> */}


      {/* ৬. Testimonials */}
      {/* <section className="bg-white py-10 border-b border-gray-100">
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
      </section> */}


      {/* ৭. FAQ Section */}
      {/* <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight text-neutral-900">Frequently Asked Questions</h2>
          <p className="text-neutral-500 mt-4 text-base">Quick answers to common inquiries regarding our premium policies.</p>
        </div>

        <div className="space-y-6">
          {[
            { q: "What is your order exchange policy?", a: "We offer completely seamless complimentary sizing updates or collection exchanges within 7 business days of delivery receipt." },
            { q: "Are custom custom-tailored sizes available?", a: "Yes, select high-end signature collections offer modular alterations. Get in touch with our live support agents for details." },
            { q: "How do I securely track my shipping updates?", a: "Upon order confirmation dispatched from our hub, an automated priority tracker link is sent via text notification." }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 animate-slide-in-left"
              style={{ animationDelay: `${idx * 200}ms` }} // একটার পর একটা আসবে
            >
              <h4 className="font-bold text-gray-900 flex items-center gap-4 text-lg">
                <span className="w-10 h-10 rounded-full bg-neutral-950 text-white flex items-center justify-center font-bold text-sm">Q</span>
                {faq.q}
              </h4>
              <p className="text-gray-500 text-sm mt-4 pl-14 leading-relaxed max-w-2xl">{faq.a}</p>
            </div>
          ))}
        </div>
      </section> */}


      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 px-8 py-20 md:px-20 shadow-2xl">

            {/* Glow Effects */}
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"></div>

            <div className="relative z-10 text-center">

              <span className="inline-block rounded-full border border-red-900 px-5 py-2 text-xs uppercase tracking-[0.35em] text-gray-200">
                Exclusive Access
              </span>

              <h2 className="mt-8 text-4xl md:text-6xl font-black uppercase leading-tight text-white">
                Join The Elite Club
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-gray-400 text-base md:text-lg leading-8">
                Become a member to receive early access to new collections,
                exclusive member-only offers, luxury style inspiration,
                and premium shopping experiences.
              </p>

              <form className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full flex-1 rounded-2xl border border-white/10 bg-white/10 px-6 py-5 text-white placeholder:text-gray-400 backdrop-blur-md outline-none transition focus:border-white"
                />

                <button
                  type="submit"
                  className="rounded-2xl bg-white px-10 py-4 font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-secondary hover:text-white"
                >
                  Subscribe →
                </button>

              </form>

              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-400">

                <div className="flex items-center gap-2">
                  ✓ Exclusive Offers
                </div>

                <div className="flex items-center gap-2">
                  ✓ Early Collection Access
                </div>

                <div className="flex items-center gap-2">
                  ✓ No Spam, Ever
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );


}