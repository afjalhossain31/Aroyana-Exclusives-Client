import Link from 'next/link';

// item prop-কে optional (?) করে দিলাম, যাতে ডাটা না দিলেও এরর না দেয়
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
  // যদি item না থাকে (যেমন হোম পেজে), তাহলে এই ডামি ডাটাটি ডিফল্ট হিসেবে দেখাবে
  const displayItem = item || {
    _id: "dummy-123",
    title: "Classic Evening Gown",
    shortDescription: "A beautifully tailored evening gown perfect for special occasions.",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600",
    rating: 4.8
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative w-full h-72 bg-gray-200 overflow-hidden">
        {/* এখন আর ক্র্যাশ করবে না, কারণ displayItem-এ সবসময় ডাটা থাকবে */}
        <img
          src={displayItem.imageUrl}
          alt={displayItem.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500" suppressHydrationWarning
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-primary line-clamp-1">{displayItem.title}</h3>
          <span className="flex items-center text-secondary text-sm font-semibold">
            ★ {displayItem.rating || 5.0}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {displayItem.shortDescription}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-primary">${displayItem.price}</span>
          <Link 
            href={`/items/${displayItem._id}`} 
            className="border border-primary text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;