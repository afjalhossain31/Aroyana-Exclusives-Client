"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

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
    const router = useRouter();

    const displayItem = item || {
        _id: "dummy-123",
        title: "Classic Evening Gown",
        shortDescription: "A beautifully tailored evening gown perfect for special occasions.",
        price: 120,
        imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600",
        rating: 4.8
    };

    // প্রটেকশন হ্যান্ডলার: লগইন চেক করবে
    const handleProtectedAction = (action: () => void) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to continue!");
            router.push("/login");
            return;
        }
        action();
    };

    // কার্ট লজিক
    const handleAddToCart = () => {
        const userStr = localStorage.getItem("user");
        const currentUser = userStr ? JSON.parse(userStr) : null;

        const cartKey = currentUser ? `cart_${currentUser.email}` : "guest_cart";
        const currentCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

        const cartItem = {
            ...displayItem,
            name: displayItem.title,
            image: displayItem.imageUrl,
            category: "Luxury Collection"
        };

        const updatedCart = [...currentCart, cartItem];
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartChange"));
        alert(`"${displayItem.title}" has been successfully added to your cart!`);
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
            {/* ইমেজ সেকশন */}
            <div
                onClick={() => handleProtectedAction(() => router.push(`/items/${displayItem._id}`))}
                className="relative w-full h-64 bg-gray-50 overflow-hidden shrink-0 block cursor-pointer"
            >
                <img
                    src={displayItem.imageUrl}
                    alt={displayItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    suppressHydrationWarning
                />
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2 gap-3">
                    <h3 className="text-lg font-bold text-gray-900 truncate flex-1">{displayItem.title}</h3>
                    <span className="flex items-center text-sm font-bold bg-gray-50 px-2.5 py-1 rounded-md text-gray-700 whitespace-nowrap">
                        ★ {displayItem.rating || 5.0}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                    {displayItem.shortDescription}
                </p>

                <div className="flex justify-between items-center mt-auto gap-2">
                    <span className="text-xl font-black text-gray-900">${displayItem.price}</span>

                    <div className="flex items-center gap-2">
                        {/* Add to Cart Button */}
                        <button
                            onClick={() => handleProtectedAction(handleAddToCart)}
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                            <FaShoppingCart className="h-4 w-4" /> {/* ছোট আইকন */}
                            Add
                        </button>

                        {/* View Details Button */}
                        <button
                            onClick={() => handleProtectedAction(() => router.push(`/items/${displayItem._id}`))}
                            className="border-2 border-gray-900 text-gray-900 bg-transparent px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 hover:text-white transition-all active:scale-95 flex items-center justify-center"
                            title="View Details"
                        >
                            <FaArrowRight className="h-4 w-4" /> {/* ছোট আইকন */}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ItemCard;