"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartKey, setCartKey] = useState("guest_cart");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;

    // ডাইনামিক কি সেটআপ
    const activeKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
    setCartKey(activeKey);

    const items = JSON.parse(localStorage.getItem(activeKey) || "[]");
    setCartItems(items);
  }, []);

  const removeFromCart = (indexToRemove: number) => {
    const updatedCart = cartItems.filter((_, idx) => idx !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartChange")); // ন্যাভবার আপডেট করার জন্য
  };

  const totalPrice = cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }), // কার্টের আইটেমগুলো ব্যাকএন্ডে পাঠানো হচ্ছে
      });

      const data = await res.json();

      if (data.url) {
        // Stripe-এর পেমেন্ট পেজে রিডাইরেক্ট করা
        window.location.href = data.url;
      } else {
        alert("Payment session creation failed!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-8">Your Shopping Bag</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium mb-6">Your cart is completely empty.</p>
            <Link href="/explore" className="inline-block bg-black text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image || "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=150"} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 uppercase">{item.category || "Luxury Collection"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-black text-gray-900">${item.price}</span>
                    <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:text-red-700 text-sm font-bold uppercase tracking-wider">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Balance</span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">${totalPrice.toFixed(2)}</h2>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-md"
              >
                Proceed To Checkout &rarr;
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}