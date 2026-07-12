import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemDetailsPage({ params }: PageProps) {
  // Next.js-এর নিয়ম অনুযায়ী params আনর‍্যাপ করা
  const { id } = await params;

  // ব্যাকএন্ড থেকে আইডি দিয়ে নির্দিষ্ট প্রোডাক্টের ডাটা আনা
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
        <Link href="/" className="hover:text-secondary transition">Home</Link> &gt; 
        <Link href="/explore" className="hover:text-secondary mx-2 transition">Explore</Link> &gt; 
        <span className="text-primary mx-2 font-medium">{item.title}</span>
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
            <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-secondary/20">
              {item.category || "Premium Collection"}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-primary mb-4 mt-4">{item.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-extrabold text-primary">${item.price}</span>
            <span className="flex items-center text-secondary font-semibold bg-white px-3 py-1 border border-gray-200 rounded-md shadow-sm">
              ★ 5.0
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {item.fullDescription}
          </p>

          <div className="space-y-3 mb-10 text-gray-600 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="flex justify-between border-b border-gray-100 pb-2"><strong className="text-primary">Short Info:</strong> {item.shortDescription}</p>
            <p className="flex justify-between border-b border-gray-100 pb-2"><strong className="text-primary">Availability:</strong> In Stock</p>
            <p className="flex justify-between"><strong className="text-primary">Fit:</strong> True to size</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-white py-4 rounded-md hover:bg-gray-800 transition text-lg font-bold shadow-md">
              Add to Cart
            </button>
            <button className="flex-1 border-2 border-primary text-primary py-4 rounded-md hover:bg-primary hover:text-white transition text-lg font-bold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}