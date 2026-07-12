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

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">

            {/* ১. ইমেজ সেকশন - সবার জন্য সমান সাইজ (h-64) */}
            <div className="relative w-full h-64 bg-gray-50 overflow-hidden shrink-0">
                <img
                    src={displayItem.imageUrl}
                    alt={displayItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    suppressHydrationWarning
                />
            </div>

            {/* ২. কন্টেন্ট সেকশন - flex-grow দেওয়া হয়েছে যাতে বক্স সমান থাকে */}
            <div className="p-5 flex flex-col flex-grow">

                {/* টাইটেল এবং রেটিং - truncate দেওয়া হয়েছে যাতে এক লাইনের বেশি না যায় */}
                <div className="flex justify-between items-center mb-2 gap-3">
                    <h3 className="text-lg font-bold text-gray-900 truncate flex-1">
                        {displayItem.title}
                    </h3>
                    <span className="flex items-center text-sm font-bold bg-gray-50 px-2.5 py-1 rounded-md text-gray-700 whitespace-nowrap">
                        ★ {displayItem.rating || 5.0}
                    </span>
                </div>

                {/* ডেসক্রিপশন - min-h-[2.5rem] দেওয়া হয়েছে যাতে লেখা ছোট হলেও জায়গা সমান থাকে */}
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem]">
                    {displayItem.shortDescription}
                </p>

                {/* ৩. দাম এবং বাটন - mt-auto দেওয়া হয়েছে যাতে সবসময় কার্ডের একদম নিচে থাকে */}
                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xl font-black text-gray-900">
                        ${displayItem.price}
                    </span>

                    <Link
                        href={`/items/${displayItem._id}`}
                        className="border-2 border-gray-900 text-gray-900 bg-transparent px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                    >
                        View Details
                        {/* ছোট্ট একটি অ্যারো আইকন বাটনের সৌন্দর্য আরও বাড়িয়ে দেবে */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ItemCard;