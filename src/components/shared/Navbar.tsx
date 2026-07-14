"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
// import type { Item } from "@/types/item";

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


  // কার্ট প্রটেকশন হ্যান্ডলার
  const handleCartClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();

      toast((t) => (
        <div className="flex items-center justify-between w-full gap-4">
          <span className="text-sm font-medium">Please sign in to access your cart.</span>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            ✕
          </button>
        </div>
      ), {
        style: {
          borderRadius: '10px',
          background: '#000',
          color: '#fff',
          padding: '12px 16px',
        },
      });

      router.push("/login");
    } else {
      router.push("/cart");
    }
  };


  const userInitial = userData?.name
    ? userData.name.charAt(0).toUpperCase()
    : (userData?.email ? userData.email.charAt(0).toUpperCase() : "U");

  const displayName = userData?.name || (userData?.email ? userData.email.split('@')[0] : "Profile");

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-col leading-none">
            <h1 className="text-3xl font-black tracking-[0.18em] uppercase">
              <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Aroyana</span>
            </h1>
            <span className="mt-1 text-[10px] tracking-[0.45em] uppercase text-gray-400 font-semibold">EXCLUSIVES</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/" className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-neutral-200 transition-all">Home</Link>
            <Link href="/explore" className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-neutral-200 transition-all">Explore</Link>
            <Link href="/blog" className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-neutral-200 transition-all">Blog</Link>
            <Link href="/about" className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-neutral-200 transition-all">About</Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" onClick={handleCartClick} className="relative text-gray-900 hover:text-gray-600 transition">
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
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-black text-gray-900 group-hover:bg-black group-hover:text-white transition-all">
                  {userInitial}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-black transition max-w-[150px] truncate">
                  {displayName}
                </span>
              </Link>
            ) : (
              <Link href="/login" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" onClick={handleCartClick} className="relative text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}