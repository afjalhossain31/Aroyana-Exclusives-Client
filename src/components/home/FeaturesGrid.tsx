"use client";

import { motion, Variants } from "framer-motion";
import type { Item } from "@/types/item";

export default function FeaturesGrid() {
  const boxes = [
    { 
      title: "Artisan Craftsmanship", 
      desc: "Meticulously handcrafted by master artisans with an unwavering focus on impeccable detail.",
      color: "bg-gradient-to-br from-indigo-900 to-purple-800" 
    },
    { 
      title: "Exclusive Collections", 
      desc: "Curated silhouettes designed for the visionary, offering unique elegance in every piece.",
      color: "bg-gradient-to-br from-rose-700 to-pink-900" 
    },
    { 
      title: "Concierge Delivery", 
      desc: "Priority white-glove shipping ensuring your selections arrive with grace and punctuality.",
      color: "bg-gradient-to-br from-slate-800 to-neutral-900" 
    },
    { 
      title: "Style Concierge", 
      desc: "Personalized styling advice provided by our fashion experts to elevate your wardrobe.",
      color: "bg-gradient-to-br from-amber-700 to-yellow-600" 
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" as any }  
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {boxes.map((box, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className={`${box.color} p-8 rounded-3xl h-64 flex flex-col items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-default text-center`}
        >
          <h3 className="text-lg font-black tracking-widest uppercase mb-3">{box.title}</h3>
          <p className="text-white/80 text-xs leading-relaxed font-light">{box.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}