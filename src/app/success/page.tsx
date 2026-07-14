"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SuccessPage() {
  // পেমেন্ট সফল হওয়ার পর লোকাল স্টোরেজের কার্ট ক্লিয়ার করার জন্য (অপশনাল কিন্তু প্রফেশনাল)
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const cartKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
    
    // কার্ট খালি করা এবং ন্যাভবার আপডেট করা
    localStorage.removeItem(cartKey);
    window.dispatchEvent(new Event("cartChange"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-100 shadow-xl text-center">
        
        {/* Success Icon Group */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 mb-6 border border-emerald-100">
          <svg 
            className="h-10 w-10 text-emerald-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="3" 
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        {/* Text Content */}
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Payment Successful
        </span>
        
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mt-4 mb-3">
          Thank You!
        </h1>
        
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Your payment has been securely processed. We are preparing your exclusive package and will send a confirmation email shortly.
        </p>

        {/* Order Details Dummy Card (Premium Look) */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100 text-left space-y-2">
          <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Status</span>
            <span className="text-emerald-600">Paid</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Delivery</span>
            <span className="text-gray-900">Standard (3-5 Days)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-black text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition shadow-md active:scale-98"
          >
            Go To Home
          </Link>
          
          <Link 
            href="/explore" 
            className="block w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-sm uppercase tracking-wider border border-gray-200 hover:bg-gray-50 transition active:scale-98"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}