"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে কার্ট ডাটা লোড করা
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Navbar-এর কার্ট কাউন্ট আপডেট করার জন্য সিগন্যাল
    window.dispatchEvent(new Event("cartChange"));
  };

  const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 min-h-screen">
      <h1 className="text-3xl font-black mb-10 text-gray-900">My Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
          <Link href="/explore" className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* কার্ট আইটেম লিস্ট */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item: any) => (
              <div key={item._id} className="flex items-center gap-6 border-b pb-6">
                <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="font-bold text-primary mt-1">${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* অর্ডার সামারি */}
          <div className="bg-gray-50 p-8 rounded-2xl h-fit border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between mb-8">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}