"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // কার্ট এবং অথেনটিকেশন স্টেট চেক করার লজিক
  useEffect(() => {
    const checkAuthAndCart = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    // প্রথমবার লোড হওয়ার সময় চেক করবে
    checkAuthAndCart();

    // ইভেন্ট লিসেনারগুলো (যখন লগইন/লগআউট বা কার্টে অ্যাড করা হবে তখন Navbar আপডেট হবে)
    window.addEventListener("authChange", checkAuthAndCart);
    window.addEventListener("cartChange", checkAuthAndCart);

    return () => {
      window.removeEventListener("authChange", checkAuthAndCart);
      window.removeEventListener("cartChange", checkAuthAndCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black tracking-widest text-gray-900 uppercase">Aroyana</span>
          </Link>

          {/* Desktop Menu - Common Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-black transition">Home</Link>
            <Link href="/explore" className="text-sm font-bold text-gray-600 hover:text-black transition">Explore</Link>
            <Link href="/about" className="text-sm font-bold text-gray-600 hover:text-black transition">About</Link>
            <Link href="/contact" className="text-sm font-bold text-gray-600 hover:text-black transition">Contact</Link>
            
            {/* Conditional Auth Links (Requirements: Min 5 routes if logged in) */}
            {isLoggedIn && (
              <>
                <Link href="/add-item" className="text-sm font-bold text-gray-600 hover:text-black transition">Add Item</Link>
                <Link href="/items/manage" className="text-sm font-bold text-gray-600 hover:text-black transition">Manage</Link>
              </>
            )}
          </div>

          {/* User Actions (Cart, Login/Logout) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link href="/cart" className="relative text-gray-900 hover:text-gray-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-sm font-bold text-red-600 hover:text-red-800 transition">
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-sm">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="relative text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-900 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-1 shadow-lg absolute w-full">
          <Link href="/" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50">Home</Link>
          <Link href="/explore" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50">Explore</Link>
          <Link href="/about" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50">About</Link>
          <Link href="/contact" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50">Contact</Link>
          
          {isLoggedIn && (
            <>
              <Link href="/add-item" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50">Add Item</Link>
              <Link href="/items/manage" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50">Manage Items</Link>
            </>
          )}

          <div className="pt-4 border-t border-gray-100">
            {isLoggedIn ? (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-3 rounded-md text-base font-bold text-red-600 hover:bg-red-50">
                Logout
              </button>
            ) : (
              <Link href="/login" className="block w-full text-center bg-black text-white px-5 py-3 rounded-lg text-base font-bold hover:bg-gray-800 transition">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}