"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // ক্লায়েন্ট সাইডে (ব্রাউজারে) লোড হওয়ার পর চেক করবে ইউজার লগইন করা আছে কি না
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        setIsLoggedIn(true);
        setUserName(JSON.parse(user).name);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    
    // অন্য ট্যাবে লগআউট বা লগইন করলেও যেন আপডেট হয়
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    // লগআউট করলে লোকাল স্টোরেজ ক্লিয়ার করে দেবো
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    router.push("/login"); // লগআউট হওয়ার পর লগইন পেজে পাঠিয়ে দেবে
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* ১. লোগো / ব্র্যান্ড নেম */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight uppercase">
              Aroyana
            </Link>
          </div>

          {/* ২. মাঝখানের মেনু আইটেমগুলো */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-primary font-medium transition">Home</Link>
            <Link href="/explore" className="text-gray-600 hover:text-primary font-medium transition">Explore</Link>
            <Link href="/add-item" className="text-gray-600 hover:text-primary font-medium transition">Add Item</Link>
          </div>

          {/* ৩. ডান দিকের লগইন/লগআউট বাটন */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* নামের ওপর ক্লিক করলে প্রোফাইল পেজে যাবে */}
                <Link 
                  href="/profile" 
                  className="text-sm font-semibold text-gray-700 hidden sm:block hover:text-secondary transition"
                >
                  Hi, {userName.split(" ")[0]}! 👋
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-md font-bold text-sm hover:bg-red-100 transition border border-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-primary font-bold transition text-sm">
                  Login
                </Link>
                <Link href="/register" className="bg-primary text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-gray-800 transition">
                  Register
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}