import Link from 'next/link';
import ItemCard from '@/components/cards/ItemCard';
import Hero from '@/components/home/Hero'; 

export default async function HomePage() {
  let items = [];
  
  try {
    // ব্যাকএন্ড থেকে ডাটা নিয়ে আসা হচ্ছে
    const res = await fetch('http://127.0.0.1:5000/api/items', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      // শুধুমাত্র প্রথম ৪টি প্রোডাক্ট দেখানো হচ্ছে
      items = (data.items || []).slice(0, 4);
    }
  } catch (error) {
    console.error("Failed to fetch home page items:", error);
  }

  return (
    <div className="bg-neutralBg min-h-screen">
      
      {/* ১. স্লাইডারসহ প্রিমিয়াম Hero সেকশন */}
      <Hero />

      {/* ২. Trending Items সেকশন */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary">Trending Now</h2>
            <p className="text-gray-500 mt-2">Handpicked exclusive items from our store.</p>
          </div>
          <Link href="/explore" className="text-secondary font-bold hover:underline text-sm md:text-base">
            See All Items &rarr;
          </Link>
        </div>

        {/* যদি আইটেম না থাকে তবে মেসেজ দেখাবে, থাকলে গ্রিড দেখাবে */}
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border border-dashed border-gray-200 rounded-xl bg-white">
            No items available right now. 
            <br />
            Go to <Link href="/add-item" className="text-secondary underline">Add Item</Link> page to create one!
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