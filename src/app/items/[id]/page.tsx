import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // ব্যাকএন্ড থেকে আইডি দিয়ে নির্দিষ্ট প্রোডাক্টের ডাটা আনা
  const res = await fetch(`http://127.0.0.1:5000/api/items/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Item not found or Server error!
      </div>
    );
  }

  const item = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link> &gt; 
        <Link href="/explore" className="hover:text-black mx-2 transition">Explore</Link> &gt; 
        <span className="text-black font-bold mx-2">{item.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-[500px] border border-gray-200 shadow-sm">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div>
            <span className="bg-gray-100 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-200">
              {item.category || "Premium Collection"}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-black mb-4 mt-4">{item.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-black">${item.price}</span>
            <span className="flex items-center text-black font-bold bg-gray-50 px-3 py-1 border border-gray-200 rounded-md shadow-sm">
              ★ 5.0
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {item.fullDescription}
          </p>

          <div className="space-y-3 mb-10 text-gray-600 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="flex justify-between border-b border-gray-200 pb-2"><strong className="text-black">Short Info:</strong> {item.shortDescription}</p>
            <p className="flex justify-between border-b border-gray-200 pb-2"><strong className="text-black">Availability:</strong> In Stock</p>
            <p className="flex justify-between"><strong className="text-black">Fit:</strong> True to size</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {/* এখানে আমাদের নতুন Client Component বসানো হয়েছে */}
            <AddToCartButton item={item} />
            
            <button className="flex-1 border-2 border-black text-black py-4 rounded-md hover:bg-black hover:text-white transition text-lg font-bold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}