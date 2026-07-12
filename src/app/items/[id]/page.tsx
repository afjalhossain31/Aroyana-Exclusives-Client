import Link from 'next/link';
import AddToCartButton from '@/components/cart/AddToCartButton';
import ItemCard from '@/components/cards/ItemCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // ১. নির্দিষ্ট প্রোডাক্টের ডাটা আনা
  const res = await fetch(`http://127.0.0.1:5000/api/items/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Item not found or Server error!
      </div>
    );
  }

  const item = await res.json();

  // ২. Related Items এর জন্য অন্যান্য প্রোডাক্টের ডাটা আনা
  let relatedItems = [];
  try {
    const allRes = await fetch(`http://127.0.0.1:5000/api/items`, { cache: 'no-store' });
    if (allRes.ok) {
      const allData = await allRes.json();
      const itemsArray = Array.isArray(allData) ? allData : allData.items || [];
      // বর্তমান আইটেমটি বাদ দিয়ে বাকিগুলো থেকে ৪টি আইটেম নেওয়া হলো
      relatedItems = itemsArray.filter((i: any) => i._id !== id).slice(0, 4);
    }
  } catch (err) {
    console.error("Failed to fetch related items", err);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link> &gt; 
        <Link href="/explore" className="hover:text-black mx-2 transition">Explore</Link> &gt; 
        <span className="text-black font-bold mx-2">{item.title}</span>
      </nav>

      {/* Product Top Section */}
      <div className="flex flex-col md:flex-row gap-12 mb-20">
        
        {/* Left Side: Product Images (Multiple Media Support) */}
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-gray-50 rounded-2xl overflow-hidden h-[500px] border border-gray-100 shadow-sm">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
              suppressHydrationWarning
            />
          </div>
          {/* Dummy Thumbnails for "Multiple Images" requirement */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="bg-gray-100 h-24 rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:opacity-80 transition">
                <img src={item.imageUrl} alt="thumbnail" className="w-full h-full object-cover opacity-70" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Essential Info & Action Buttons */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div>
            <span className="bg-gray-100 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-200">
              {item.category || "Premium Collection"}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-gray-900 mb-4 mt-4">{item.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-gray-900">${item.price}</span>
            <span className="flex items-center text-gray-900 font-bold bg-gray-50 px-3 py-1 border border-gray-200 rounded-md shadow-sm">
              ★ 4.8 (124 Reviews)
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-8 leading-relaxed line-clamp-3">
            {item.shortDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <AddToCartButton item={item} />
            <button className="flex-1 border-2 border-gray-900 text-gray-900 py-4 rounded-lg hover:bg-gray-900 hover:text-white transition text-lg font-bold">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Separate Sections: Description, Specs, Reviews */}
      <div className="border-t border-gray-200 pt-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Overview / Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Product Overview</h3>
            <p className="text-gray-600 leading-loose text-lg whitespace-pre-line">
              {item.fullDescription || "No detailed description available for this item."}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-fit">
            <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Specifications</h3>
            <ul className="space-y-4 text-gray-600 text-sm">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-900">Material</span> <span>Premium Blend</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-900">Origin</span> <span>Imported</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-900">Fit Type</span> <span>True to Size</span>
              </li>
              <li className="flex justify-between">
                <span className="font-bold text-gray-900">Care</span> <span>Dry Clean Only</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <div className="border-t border-gray-200 pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">You May Also Like</h2>
              <p className="text-gray-500 mt-2">Discover similar premium pieces from our collection.</p>
            </div>
            <Link href="/explore" className="text-gray-900 font-bold hover:underline hidden sm:block">
              View All &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedItems.map((relatedItem: any) => (
              <ItemCard key={relatedItem._id} item={relatedItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}