"use client"; // Client Component হিসেবে ডিক্লেয়ার করা হলো

import Link from 'next/link';

interface ItemProps {
    item?: {
        _id: string;
        title: string;
        shortDescription: string;
        price: number;
        imageUrl: string;
        rating?: number;
    }
}

const ItemCard = ({ item }: ItemProps) => {
    const displayItem = item || {
        _id: "dummy-123",
        title: "Classic Evening Gown",
        shortDescription: "A beautifully tailored evening gown perfect for special occasions.",
        price: 120,
        imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600",
        rating: 4.8
    };

    // ✨ Add to Cart লজিক
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // লিংক ক্লিক হওয়া থেকে আটকাতে

        const userStr = localStorage.getItem("user");
        const currentUser = userStr ? JSON.parse(userStr) : null;
        
        // ডাইনামিক কি তৈরি
        const cartKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
        
        const currentCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

        // কার্ট পেজের সাথে মিল রাখার জন্য title কে name এবং imageUrl কে image হিসেবে সেট করা হলো
        const cartItem = {
            ...displayItem,
            name: displayItem.title,
            image: displayItem.imageUrl,
            category: "Luxury Collection" // ডিফল্ট ক্যাটাগরি
        };

        const updatedCart = [...currentCart, cartItem];
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));

        // ন্যাভবার আপডেট করার সিগন্যাল
        window.dispatchEvent(new Event("cartChange"));
        
        // সাকসেস অ্যালার্ট
        alert(`"${displayItem.title}" has been successfully added to your cart!`);
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">

            {/* ১. ইমেজ সেকশন */}
            <Link href={`/items/${displayItem._id}`} className="relative w-full h-64 bg-gray-50 overflow-hidden shrink-0 block">
                <img
                    src={displayItem.imageUrl}
                    alt={displayItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    suppressHydrationWarning
                />
            </Link>

            {/* ২. কন্টেন্ট সেকশন */}
            <div className="p-5 flex flex-col flex-grow">

                {/* টাইটেল এবং রেটিং */}
                <div className="flex justify-between items-center mb-2 gap-3">
                    <Link href={`/items/${displayItem._id}`} className="text-lg font-bold text-gray-900 truncate flex-1 hover:text-gray-600 transition">
                        {displayItem.title}
                    </Link>
                    <span className="flex items-center text-sm font-bold bg-gray-50 px-2.5 py-1 rounded-md text-gray-700 whitespace-nowrap">
                        ★ {displayItem.rating || 5.0}
                    </span>
                </div>

                {/* ডেসক্রিপশন */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                    {displayItem.shortDescription}
                </p>

                {/* ৩. দাম এবং বাটন */}
                <div className="flex justify-between items-center mt-auto gap-2">
                    <span className="text-xl font-black text-gray-900">
                        ${displayItem.price}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add
                        </button>

                        {/* View Details Button */}
                        <Link
                            href={`/items/${displayItem._id}`}
                            className="border-2 border-gray-900 text-gray-900 bg-transparent px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center"
                            title="View Details"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;