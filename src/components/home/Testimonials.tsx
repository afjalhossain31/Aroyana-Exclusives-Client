"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
  id: number;
  text: string;
  name: string;
  avatars: string[];
}

const reviews: Review[] = [
  {
    id: 1,
    text: "The team at Spacing-Tech was very helpful in providing the graphics for all of their demos. I would highly recommend this theme and support.",
    name: "Happy Customers",
    avatars: ["/avatar1.jpg", "/avatar2.jpg"],
  },
  {
    id: 2,
    text: "Outstanding quality. Delivery was surprisingly fast and the sleek minimalist packaging alone makes it feel like an ultra-premium experience.",
    name: "VIP Clients",
    avatars: ["/avatar2.jpg", "/avatar1.jpg"], // avatar3/4 না থাকলে এটা রাখো
  },
 {
    id: 3,
    text: "Excellent customer service and premium products. I will definitely shop here again and recommend it to my friends.",
    name: "Loyal Customers",
    avatars: ["/avatar2.jpg", "/avatar1.jpg"],
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-5">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <h2 className="text-4xl font-black uppercase mb-4">
          Our Satisfied Reviews
        </h2>

        <p className="text-gray-500 mb-10">
          What our clients say about us
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={reviews[index].id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-100 rounded-3xl p-8 max-w-4xl mx-auto"
          >
            <p className="text-gray-900 italic text-lg">
              "{reviews[index].text}"
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-8  mt-8 mb-15">

          <div className="flex -space-x-4">
            {reviews[index].avatars.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full object-cover border-4 border-white shadow-lg"
                priority
              />
            ))}
          </div>

          <div className="text-left">
            <h3 className="text-3xl font-black">3500+</h3>
            <p className="text-gray-500">{reviews[index].name}</p>
          </div>

        </div>

        <div className="flex py-10 justify-center gap-3">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all ${index === i
                ? "w-8 h-3 bg-black rounded-full"
                : "w-3 h-3 bg-gray-300 rounded-full"
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}