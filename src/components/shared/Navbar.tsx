"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cartCount, setCartCount] = useState(0); // কার্ট কাউন্টের জন্য নতুন স্টেট

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsLoggedIn(true);
      try {
        setUserName(JSON.parse(user).name);
      } catch (e) {
        setUserName("User");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  // কার্ট আইটেম সংখ্যা আপডেট করার ফাংশন
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
  };

  useEffect(() => {
    checkAuth();
    updateCartCount();

    window.addEventListener("authChange", checkAuth);
    window.addEventListener("cartChange", updateCartCount); // কার্ট আপডেট লিসেনার
    window.addEventListener("storage", checkAuth);
    window.addEventListener("storage", updateCartCount);
    
    return () => {
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("cartChange", updateCartCount);
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight uppercase">
              Aroyana
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-primary font-medium transition">Home</Link>
            <Link href="/explore" className="text-gray-600 hover:text-primary font-medium transition">Explore</Link>
            <Link href="/add-item" className="text-gray-600 hover:text-primary font-medium transition">Add Item</Link>
          </div>

          <div className="flex items-center space-x-6">
            {/* কার্ট আইকন যোগ করা হলো */}
            <Link href="/cart" className="relative text-gray-600 hover:text-primary transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-sm font-semibold text-gray-700 hidden sm:block hover:text-secondary transition">
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