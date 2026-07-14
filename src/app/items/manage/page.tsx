"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Item } from "@/types/item";

export default function ManageItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserItems = async () => {
    setLoading(true);
    try {
      // ব্যাকএন্ড থেকে সব আইটেম রিড করা
      const res = await fetch("http://127.0.0.1:5000/api/items", { cache: "no-store" });
      const data = await res.json();
      
      // ফিক্স: ডাটা সরাসরি অ্যারে না হলে data.items থেকে অ্যারেটি বের করে নেবে
      const itemsArray = Array.isArray(data) ? data : data.items || [];
      setItems(itemsArray);
      
    } catch (err) {
      console.error(err);
      setItems([]); // এরর হলে খালি অ্যারে সেট করবে
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchUserItems();
    }
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this masterpiece?")) return;

    try {
      // 🎯 এখানেই পরিবর্তন করা হয়েছে: '/delete/' যোগ করা হয়েছে
      const res = await fetch(`http://127.0.0.1:5000/api/items/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        alert("Product removed successfully!");
        setItems(items.filter((item) => item._id !== id));
      } else {
        alert("Failed to delete the item.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Manage Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Review, observe, or remove products from the deployment list.</p>
        </div>
        <Link href="/add-item" className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition">
          + Add New Item
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 font-semibold text-gray-400 animate-pulse">Loading Inventory Assets...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed text-gray-400">
          No premium items available to manage.
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-gray-500">
                  <th className="p-5">Product Info</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition">
                    <td className="p-5 flex items-center gap-4">
                      <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover rounded-xl border border-gray-100 shrink-0" />
                      <span className="font-bold text-gray-900 truncate max-w-xs">{item.title}</span>
                    </td>
                    <td className="p-5 text-sm text-gray-600 font-medium">{item.category || "General"}</td>
                    <td className="p-5 font-black text-gray-900">${item.price}</td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <Link href={`/items/${item._id}`} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-900 hover:text-white transition">
                          View
                        </Link>
                        <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}