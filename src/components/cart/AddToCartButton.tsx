"use client";

export default function AddToCartButton({ item }: { item: any }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.find((i: any) => i._id === item._id);
    
    if (exists) {
      alert("This item is already in your cart!");
    } else {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Navbar আপডেট করার জন্য ইভেন্ট পাঠানো
      window.dispatchEvent(new Event("cartChange"));
      alert("Item added to cart successfully!");
    }
  };

  return (
    <button 
      onClick={addToCart}
      className="flex-1 bg-black text-white py-4 rounded-md hover:bg-gray-800 transition text-lg font-bold shadow-md"
    >
      Add to Cart
    </button>
  );
}