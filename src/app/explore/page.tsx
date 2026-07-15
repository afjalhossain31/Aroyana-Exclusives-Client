"use client";

import { useState, useEffect } from "react";
import ItemCard from "@/components/cards/ItemCard";
import type { Item } from "@/types/item";
import toast from 'react-hot-toast';

export default function ExplorePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`, { cache: "no-store" });
        const data = await res.json();
        
        // যদি ডাটাবেস থেকে ডাটা আসে কিন্তু ফিল্টারে না দেখায়, তবে কনসোলে দেখুন এখানে কী আসছে
        const itemsArray = Array.isArray(data) ? data : data.items || [];
        setItems(itemsArray);
      } catch (err) {
        console.error("Error fetching items:", err);
        toast.error("Failed to fetch items.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items
    .filter((item) => {
      // DEBUG: যদি সার্চ কাজ না করে, কনসোলে দেখুন এখানে title বা category কী আসছে
      const safeTitle = (item.title || "").toLowerCase();
      const safeCategory = (item.category || "").toLowerCase();
      
      const matchesSearch = safeTitle.includes(search.toLowerCase());
      const matchesCategory = category === "All" || safeCategory === category.toLowerCase();

      let matchesPrice = true;
      const safePrice = item.price || 0;

      if (priceRange === "under-50") matchesPrice = safePrice < 50;
      else if (priceRange === "50-150") matchesPrice = safePrice >= 50 && safePrice <= 150;
      else if (priceRange === "over-150") matchesPrice = safePrice > 150;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-white">
      <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-tight">Explore Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-gray-50 p-5 rounded-2xl border border-gray-100">
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

        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Premium Gown">Premium Gown</option>
            <option value="Luxury Bag">Luxury Bag</option>
            <option value="Traditional Wear">Traditional Wear</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm cursor-pointer"
          >
            <option value="all">All Prices</option>
            <option value="under-50">Under $50</option>
            <option value="50-150">$50 - $150</option>
            <option value="over-150">Over $150</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm cursor-pointer"
          >
            <option value="none">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border border-dashed rounded-2xl">
          No items match your criteria.
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