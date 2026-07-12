import ItemCard from '@/components/cards/ItemCard';

export default async function ExplorePage() {
  // ব্যাকএন্ড থেকে সরাসরি ডাটা নিয়ে আসছি (Next.js Server Component)
// আগের কোড: const res = await fetch('http://localhost:5000/api/items', { cache: 'no-store' });
  
  // নতুন কোড:
  const res = await fetch('http://127.0.0.1:5000/api/items', { cache: 'no-store' });  const data = await res.json();
  const items = data.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Explore Collection</h1>
        <p className="text-gray-500 mt-2">Discover our exclusive range of premium clothing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters (আপাতত আগের মতোই রাখছি) */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-primary mb-4">Filters</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary">
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-gray-800 transition font-medium">
            Apply Filters
          </button>
        </div>

        {/* Product Grid (ডায়নামিক ডাটা) */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <span className="text-gray-500 font-medium">Showing {items.length} results</span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No items found. Please add some items from the Add Item page.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: any) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}