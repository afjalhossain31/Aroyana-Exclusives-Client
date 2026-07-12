"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      // ১. টোকেন বা ইউজার ডাটা না থাকলে লগইন পেজে পাঠিয়ে দাও
      if (!token || !userData) {
        router.push("/login");
        return;
      }

      // ২. লোকাল স্টোরেজ থেকে ডাটা সেট করো
      setUser(JSON.parse(userData));
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // লোডিং স্টেটে স্পিনার দেখাবে
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-primary pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white tracking-wide">My Account</h1>
          <p className="text-gray-300 mt-2">Manage your exclusive profile and orders.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100 flex items-center space-x-4">
                <div className="w-14 h-14 bg-secondary text-primary rounded-full flex items-center justify-center text-2xl font-bold shadow-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{user?.name}</h3>
                  <p className="text-xs text-gray-500">VIP Member</p>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 bg-gray-50 text-primary font-semibold rounded-lg transition">
                  <span>👤</span> <span>Profile Info</span>
                </Link>
                <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium rounded-lg transition">
                  <span>📦</span> <span>My Orders</span>
                </Link>
                <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary font-medium rounded-lg transition">
                  <span>❤️</span> <span>Wishlist</span>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 font-medium rounded-lg transition text-left mt-4 border-t border-gray-100 pt-4">
                  <span>🚪</span> <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}