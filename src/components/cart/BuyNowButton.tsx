"use client";

import { useRouter } from "next/navigation";

//any: Define the structure for the item being purchased
interface Item {
  _id: string;
  title: string;
  name?: string;
  price: number;
  imageUrl: string;
  image?: string;
}
interface BuyNowButtonProps {
  item: Item;
}

export default function BuyNowButton({ item }: BuyNowButtonProps) {
    const router = useRouter();

    const handleBuyNow = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first to proceed to checkout.");
            router.push("/login");
            return;
        }

        try {
            const singleItem = {
                name: item.title || item.name,
                price: item.price,
                image: item.imageUrl || item.image,
                quantity: 1
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: [singleItem] }),
            });

            const data = await res.json();

            if (res.ok && data.url) {
                // ৩. সরাসরি Stripe-এর পেমেন্ট পেজে রিডাইরেক্ট
                window.location.href = data.url;
            } else {
                console.error("🚨 Backend Error:", data);
                alert(`পেমেন্ট পেজ তৈরি করতে সমস্যা হয়েছে: ${data.message}`);
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("সার্ভারের সাথে কানেক্ট করা যাচ্ছে না!");
        }
    };

    return (
        <button
            onClick={handleBuyNow}
            className="flex-1 border-2 border-gray-900 text-gray-900 py-4 rounded-lg hover:bg-gray-900 hover:text-white transition text-lg font-bold active:scale-95"
        >
            Buy Now
        </button>
    );
}