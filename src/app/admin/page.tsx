"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    // প্রটেকশন চেক: লগইন না থাকলে লগইন পেজে পাঠাবে
    if (!token) {
      router.push("/login");
      return;
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setAdminName(parsedUser.name || "Admin");
        
        // যদি ব্যাকএন্ডে role ম্যানেজমেন্ট থাকে, তবে নিচের কোডটি আনকমেন্ট করতে পারো:
        // if (parsedUser.role !== "admin") {
        //   alert("Access denied! Admins only.");
        //   router.push("/");
        //   return;
        // }
      } catch (e) {
        console.error("Error parsing user data");
      }
    }

    // ডাটাবেজ থেকে মোট প্রোডাক্টের সংখ্যা আনা (ড্যাশবোর্ডে দেখানোর জন্য)
    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/items", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const itemsArray = Array.isArray(data) ? data : data.items || [];
          setTotalProducts(itemsArray.length);
        }
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-bold uppercase tracking-widest">
          Loading Control Panel...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="mb-10 border-b border-gray-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Admin Control Center</h1>
            <p className="text-gray-500 mt-1">Welcome back, {adminName}. Manage your brand boutique operations.</p>
          </div>
          <span className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            System Online
          </span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Total Products */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Inventory</p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">{totalProducts} Products</h3>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">
              📦
            </div>
          </div>

          {/* Card 2: Total Orders (Dummy Stats for Premium Look) */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Orders</p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">12 Orders</h3>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">
              🛍️
            </div>
          </div>

          {/* Card 3: Total Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Revenue</p>
              <h3 className="text-3xl font-black text-gray-900 mt-2">$2,450</h3>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">
              💰
            </div>
          </div>

        </div>

        {/* Administrative Action Shortcuts */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide mb-6 border-b border-gray-100 pb-4">
            Management Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tool 1: Manage Items */}
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">Product Inventory Table</h4>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Review the deployed product list, inspect active items, or permanently remove assets from the storefront grid.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/items/manage" className="inline-block bg-black text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition">
                  Open Inventory &rarr;
                </Link>
              </div>
            </div>

            {/* Tool 2: Add Item */}
            <div className="border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">Deploy New Artifact</h4>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  Upload new luxury garments, specify customized descriptions, tag categories, and insert pricing matrix properties.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/add-item" className="inline-block border-2 border-gray-900 text-gray-900 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-900 hover:text-white transition">
                  + Add New Product
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}