"use client";

import { useState, useEffect } from "react";
import ItemCard from "@/components/cards/ItemCard";

export default function ExplorePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // সার্চ, ফিল্টার ও সর্টিং স্টেটসমূহ
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:5000/api/items", { cache: "no-store" });
        const data = await res.json();
        
        // ফিক্স: ডাটা সরাসরি অ্যারে না হলে data.items থেকে অ্যারেটি বের করে নেবে
        const itemsArray = Array.isArray(data) ? data : data.items || [];
        setItems(itemsArray);
        
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]); // এরর হলে খালি অ্যারে সেট করবে যাতে ম্যাপ বা ফিল্টার ক্র্যাশ না করে
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // ক্লায়েন্ট সাইড ফিল্টারিং এবং সর্টিং লজিক
  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      
      let matchesPrice = true;
      if (priceRange === "under-50") matchesPrice = item.price < 50;
      else if (priceRange === "50-150") matchesPrice = item.price >= 50 && item.price <= 150;
      else if (priceRange === "over-150") matchesPrice = item.price > 150;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-white">
      <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tight">Explore Collection</h1>

      {/* সার্চ, ফিল্টারিং ও সর্টিং বার */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-gray-50 p-5 rounded-2xl border border-gray-100">
        {/* সার্চ বার */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Search Product</label>
          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* ফিল্টার ১: ক্যাটাগরি */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Premium Gown">Premium Gown</option>
            <option value="Luxury Bag">Luxury Bag</option>
            <option value="Traditional Wear">Traditional Wear</option>
          </select>
        </div>

        {/* ফিল্টার ২: প্রাইস রেঞ্জ */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            <option value="all">All Prices</option>
            <option value="under-50">Under $50</option>
            <option value="50-150">$50 - $150</option>
            <option value="over-150">Over $150</option>
          </select>
        </div>

        {/* সর্টিং অপশন */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            <option value="none">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* প্রোডাক্ট গ্রিড এবং স্কেলিটন লোডার */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-5 space-y-4 animate-pulse">
              <div className="bg-gray-200 h-64 rounded-xl w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-dashed">
          No premium items match your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}