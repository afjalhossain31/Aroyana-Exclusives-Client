"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const images = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200"
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Automatic image change (4 second por por)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-white text-5xl md:text-7xl font-extrabold mb-6"
        >
          AROYANA EXCLUSIVES
        </motion.h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-lg">
          Discover our premium collection designed for those who appreciate elegance and style.
        </p>
        <Link 
          href="/explore"
          className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}