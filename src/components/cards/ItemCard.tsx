import Link from 'next/link';

const ItemCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      {/* Image Container */}
      <div className="relative w-full h-72 bg-gray-200 overflow-hidden">
        {/* For now we use a dummy image, later this will come from database */}
        <img
          src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600"
          alt="Premium Dress"
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-primary line-clamp-1">Classic Evening Gown</h3>
          <span className="flex items-center text-secondary text-sm font-semibold">
            ★ 4.8
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          A beautifully tailored evening gown perfect for special occasions. Made with premium imported fabric.
        </p>
        
        {/* Meta Info & Button */}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-primary">$120.00</span>
          <Link 
            href="/items/123" 
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