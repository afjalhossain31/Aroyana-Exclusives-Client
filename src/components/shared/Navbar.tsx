"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const checkAuthAndCart = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const userStr = localStorage.getItem("user");
      let currentUser = null;

      if (userStr) {
        try {
          currentUser = JSON.parse(userStr);
          setUserData(currentUser);
        } catch (e) {
          console.error("Error parsing user data");
        }
      } else {
        setUserData(null);
      }

      // ✨ প্রত্যেক ইউজারের জন্য আলাদা ইউনিক কার্ট কি (Key) লজিক
      const cartKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
      const cart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      setCartCount(cart.length);
    };

    checkAuthAndCart();
    window.addEventListener("authChange", checkAuthAndCart);
    window.addEventListener("cartChange", checkAuthAndCart);

    return () => {
      window.removeEventListener("authChange", checkAuthAndCart);
      window.removeEventListener("cartChange", checkAuthAndCart);
    };
  }, []);

  const userInitial = userData?.name 
    ? userData.name.charAt(0).toUpperCase() 
    : (userData?.email ? userData.email.charAt(0).toUpperCase() : "U");

  const displayName = userData?.name || (userData?.email ? userData.email.split('@')[0] : "Profile");

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-black tracking-widest text-gray-900 uppercase">Aroyana</span>
          </Link>

          {/* Desktop Menu - Common Links including Blog */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-black transition">Home</Link>
            <Link href="/explore" className="text-sm font-bold text-gray-600 hover:text-black transition">Explore</Link>
            <Link href="/blog" className="text-sm font-bold text-gray-600 hover:text-black transition">Blog</Link>
            <Link href="/about" className="text-sm font-bold text-gray-600 hover:text-black transition">About</Link>
            <Link href="/contact" className="text-sm font-bold text-gray-600 hover:text-black transition">Contact</Link>
          </div>

          {/* User Actions (Cart, Profile/Login) */}
          <div className="hidden md:flex items-center space-x-6">
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

            {isLoggedIn ? (
              <Link href="/profile" className="flex items-center gap-2 group border-l border-gray-200 pl-6">
                <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-black text-gray-900 group-hover:bg-black group-hover:text-white transition-all">
                  {userInitial}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-black transition max-w-[100px] truncate hidden lg:block">
                  {displayName}
                </span>
              </Link>
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
          <Link href="/" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/explore" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link href="/blog" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <Link href="/about" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/contact" className="block px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          <div className="pt-4 border-t border-gray-100 mt-2">
            {isLoggedIn ? (
              <Link href="/profile" className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-bold text-gray-900 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-black">
                  {userInitial}
                </div>
                <span>My Profile</span>
              </Link>
            ) : (
              <Link href="/login" className="block w-full text-center bg-black text-white px-5 py-3 rounded-lg text-base font-bold hover:bg-gray-800 transition" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}