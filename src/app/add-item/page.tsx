"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // ১. পেজ লোড হওয়ার সাথে সাথে চেক করবে ইউজার লগইন করা কি না
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // টোকেন না থাকলে লগইন পেজে পাঠিয়ে দেবে
      router.push("/login");
    } else {
      // টোকেন থাকলে পেজটা দেখাবে
      setIsAuthorized(true);
    }
  }, [router]);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    imageUrl: "",
    category: "Premium Collection", // ডিফল্ট ক্যাটাগরি
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("http://127.0.0.1:5000/api/items/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Product added successfully! Redirecting..." });
        setFormData({ title: "", shortDescription: "", fullDescription: "", price: "", imageUrl: "", category: "Premium Collection" });
        
        // প্রোডাক্ট অ্যাড হওয়ার পর এক্সপ্লোর পেজে পাঠিয়ে দেবে
        setTimeout(() => {
          router.push("/explore");
        }, 1500);
      } else {
        setMessage({ type: "error", text: "Failed to add product. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error! Ensure your backend is running." });
    } finally {
      setLoading(false);
    }
  };

  // যদি লগইন করা না থাকে, তাহলে পেজ লোড হওয়ার সময় ফাঁকা দেখাবে (যাতে ফ্লিকার না করে)
  if (!isAuthorized) return null; 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-10 rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-primary mb-2">Add New Product</h2>
          <p className="text-gray-500">Expand the Aroyana Exclusives collection.</p>
        </div>

        {message.text && (
          <div className={`p-4 rounded-md mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" placeholder="e.g. Elegant Black Evening Gown" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
              <input type="number" name="price" required min="1" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" placeholder="e.g. 150" />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition cursor-pointer">
                <option value="Premium Collection">Premium Collection</option>
                <option value="Casual Wear">Casual Wear</option>
                <option value="Winter Special">Winter Special</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" placeholder="https://example.com/image.jpg (Optional)" />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
              <input type="text" name="shortDescription" required value={formData.shortDescription} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" placeholder="A brief catchphrase for the card" />
            </div>

            {/* Full Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
              <textarea name="fullDescription" required rows={4} value={formData.fullDescription} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition resize-none" placeholder="Detailed product information for the details page..."></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition shadow-md disabled:bg-gray-400">
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}