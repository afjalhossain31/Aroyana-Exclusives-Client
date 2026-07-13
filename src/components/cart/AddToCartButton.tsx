"use client";

import { useRouter } from "next/navigation";

export default function AddToCartButton({ item }: { item: any }) {
  const router = useRouter();

  const handleAddToCart = () => {
    // ১. ইউজার চেক
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;
    
    // ২. ডাইনামিক কি (Key) তৈরি
    const cartKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
    
    // ৩. বর্তমান কার্ট ডাটা
    const currentCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

    // ৪. আইটেম ফরম্যাট (Cart পেজের সাথে মিল রেখে)
    const cartItem = {
      _id: item._id,
      name: item.title,
      price: item.price,
      image: item.imageUrl,
      category: item.category || "Luxury Collection"
    };

    // ৫. সেভ করা
    const updatedCart = [...currentCart, cartItem];
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    // ৬. ন্যাভবার আপডেট
    window.dispatchEvent(new Event("cartChange"));
    
    // ৭. ✨ সরাসরি কার্ট পেজে রিডাইরেক্ট
    router.push("/cart");
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="flex-[2] bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition text-lg font-bold shadow-lg"
    >
      Add to Cart
    </button>
  );
}