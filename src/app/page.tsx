import Link from 'next/link';
import ItemCard from '@/components/cards/ItemCard';

export default async function HomePage() {
  let items = [];
  
  try {
    // ব্যাকএন্ড থেকে ডাটা নিয়ে আসা হচ্ছে
    const res = await fetch('http://127.0.0.1:5000/api/items', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      // হোম পেজে দেখানোর জন্য মাত্র ৪টি প্রোডাক্ট কেটে (slice) নেওয়া হচ্ছে
      items = (data.items || []).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch home page items:", error);
  }

  return (
    <div className="bg-neutralBg min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-6">
          Aroyana Exclusives
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
          Discover premium, elegantly crafted clothing tailored just for you. Explore our latest trends and elevate your style.
        </p>
        <div className="flex gap-4">
          <Link href="/explore" className="bg-primary text-white px-8 py-3.5 rounded-md font-bold text-lg hover:bg-gray-800 shadow-md transition">
            Explore Collection
          </Link>
          <Link href="/add-item" className="bg-white border-2 border-primary text-primary px-8 py-3.5 rounded-md font-bold text-lg hover:bg-primary hover:text-white transition">
            Add New Item
          </Link>
        </div>
      </section>

      {/* Trending Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary">Trending Now</h2>
            <p className="text-gray-500 mt-2">Handpicked exclusive items from our store.</p>
          </div>
          <Link href="/explore" className="text-secondary font-bold hover:underline text-sm md:text-base">
            See All Items &rarr;
          </Link>
        </div>

        {/* Dynamic Items Grid */}
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-xl bg-white">
            No items available right now. Go to <Link href="/add-item" className="text-secondary underline">Add Item</Link> page to create one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item: any) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}