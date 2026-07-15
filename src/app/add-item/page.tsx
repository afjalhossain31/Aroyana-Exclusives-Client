"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    imageUrl: "",
    category: "Premium Gown",
  });

  // ক্লায়েন্ট সাইড প্রোটেকশন
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      if (res.ok) {
        alert("Product added successfully to Aroyana Store!");
        router.push("/explore");
      } else {
        alert("Failed to add product. Please check your data.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 shadow-sm">
        <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Add Premium Item</h1>
        <p className="text-gray-500 mb-8">Fill up the form details to deploy a new product to the marketplace.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Product Title</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g., Luxury Silk Evening Dress" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="150" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black cursor-pointer">
                <option value="Premium Gown">Premium Gown</option>
                <option value="Luxury Bag">Luxury Bag</option>
                <option value="Traditional Wear">Traditional Wear</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
            <input type="url" name="imageUrl" required value={formData.imageUrl} onChange={handleChange} placeholder="https://images.unsplash.com/... or hosted link" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Short Description</label>
            <input type="text" name="shortDescription" required value={formData.shortDescription} onChange={handleChange} placeholder="A short catchy catchphrase for card view (max 100 chars)" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Detailed Description</label>
            <textarea name="fullDescription" rows={4} required value={formData.fullDescription} onChange={handleChange} placeholder="Write complete detailed descriptions, specifications, cloth material quality and style guide..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-md disabled:bg-gray-400 mt-4">
            {loading ? "Publishing Product..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
}