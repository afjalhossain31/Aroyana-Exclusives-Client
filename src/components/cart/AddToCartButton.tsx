"use client";

import { useRouter } from "next/navigation";
import type { Item } from "@/types/item";

export default function AddToCartButton({ item }: { item: Item }) {
  const router = useRouter();

  const handleAddToCart = () => {
    // ১. লগইন চেক (টোকেন যাচাই)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to add items to your cart.");
      router.push("/login");
      return;
    }

    // ২. ইউজার ডাটা চেক
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;
    
    // ৩. ডাইনামিক কি (Key) তৈরি
    const cartKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
    
    // ৪. বর্তমান কার্ট ডাটা
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    // ৫. আইটেম ফরম্যাট (Cart পেজের সাথে মিল রেখে)
    const cartItem = {
      _id: item._id,
      name: item.title,
      price: item.price,
      image: item.imageUrl,
      category: item.category || "Luxury Collection"
    };

    // ৬. সেভ করা
    const updatedCart = [...currentCart, cartItem];
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    // ৭. ন্যাভবার আপডেট
    window.dispatchEvent(new Event("cartChange"));
    
    // ৮. সরাসরি কার্ট পেজে রিডাইরেক্ট
    router.push("/cart");
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="flex-[2] bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition text-lg font-bold shadow-lg active:scale-95"
    >
      Add to Cart
    </button>
  );
}