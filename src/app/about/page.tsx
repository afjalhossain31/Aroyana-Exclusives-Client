"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Animations Variants (টাইপ এরর ফিক্স করা হয়েছে)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-light overflow-x-hidden">
      
      {/* ১. Premium Hero with Gradient Accents */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-neutral-100 border-b border-neutral-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-500/25 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="relative z-20 text-center px-4 max-w-4xl space-y-6 mt-15">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1 }}
            className="text-xs uppercase text-amber-600 font-bold block"
          >
            Welcome to Aroyana Shop
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-neutral-900 uppercase tracking-tighter"
          >
            Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-400">Luxury</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-neutral-500 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Redefining elegance with every thread, blending modern silhouettes with timeless artistry.
          </motion.p>
        </div>
      </section>

      {/* ২. Animated Statistics Section */}
      <section className="border-b border-purple-200 bg-neutral-200 relative z-30 -mt-10 mx-4 md:mx-16 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] py-10 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-neutral-100">
          {[
            { value: "100%", label: "Premium Fabrics" },
            { value: "3500+", label: "Happy Clients" },
            { value: "0", label: "Compromise" },
            { value: "24/7", label: "Concierge Support" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-2"
            >
              <h4 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">{stat.value}</h4>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ৩. Founder Section & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-all duration-500 z-10" />
            <img
              src="/afjal-hossain.png"
              alt="Afjal Hossain - Founder"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">The Visionary</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900">
                Afjal Hossain
              </h2>
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Founder & Creative Director</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <span className="absolute -top-6 -left-4 text-6xl text-neutral-200 font-serif opacity-50">“</span>
              <p className="text-neutral-600 leading-loose text-lg md:text-xl font-light italic relative z-10 pl-6 border-l-2 border-amber-500">
                True luxury is not just about being noticed, it's about being remembered. At Aroyana, we don't just create outfits; we craft unforgettable statements of identity for the modern generation.
              </p>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-neutral-500 leading-loose text-base font-light">
              Every collection is a carefully curated masterpiece. From selecting the finest imported fabrics to the meticulous attention given to stitching and finishing, we ensure that every garment bearing the Aroyana name is nothing short of perfection.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ৪. Luxury Gallery Section */}
      <section className="bg-neutral-50 py-20 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Aesthetics</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase mt-2 text-neutral-900">The Aroyana Experience</h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
            <img src="/afjal.png" alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl overflow-hidden relative group">
            <img src="/avatar2.jpg" alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="rounded-2xl overflow-hidden relative group">
            <img src="/avatar1.jpg" alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="col-span-2 rounded-2xl overflow-hidden relative group">
            <img src="/afjal-hossain.png" alt="Gallery 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>
      </section>

      {/* ৫. Brand Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Our Principles</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase mt-2 text-neutral-900">Core Values</h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "Artisan Craft", desc: "Every stitch line and silhouette flavor reflects authentic premium couture precision." },
              { title: "Modern Silhouette", desc: "Designed for the modern visionary who demands high-end international design aesthetics." },
              { title: "Global Luxury", desc: "Curating the finest fabrics globally to ensure absolute elite comfort and style." }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white p-10 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center font-bold text-lg text-white mb-6 group-hover:scale-110 group-hover:bg-amber-600 transition-all relative z-10">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-neutral-900 relative z-10">{value.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed relative z-10">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ৬. Elegant Timeline */}
      <section className="bg-neutral-50 py-20 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Our Evolution</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase mt-2 text-neutral-900">The Journey</h2>
          </div>
          <div className="relative border-l border-neutral-200 space-y-16 pl-8 ml-4 md:ml-20">
            {[
              { year: "2024", title: "The Spark", desc: "Aroyana was envisioned in Dhaka with a core blueprint to redefine modern artisan tailoring." },
              { year: "2025", title: "Signature Drops", desc: "Launched our ultra-premium evening gown lines and modern silhouettes, receiving phenomenal responses." },
              { year: "2026", title: "The Next Era", desc: "Expanding into high-end international design systems and dynamic custom altered premium showcases." }
            ].map((time, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="relative group"
              >
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-neutral-900 ring-4 ring-white group-hover:bg-amber-500 transition-colors duration-300" />
                <span className="text-sm font-black text-amber-600 tracking-wider block mb-1">{time.year}</span>
                <h3 className="text-xl font-bold text-neutral-900 uppercase tracking-wide mb-2">{time.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">{time.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ৭. Sophisticated CTA */}
      <section className="relative py-20 text-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 space-y-8">
          <h3 className="text-3xl md:text-5xl font-black text-neutral-900 uppercase tracking-wider">
            Experience True Luxury
          </h3>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-md mx-auto font-light">
            Step into a world of exclusive fashion curated for the modern generation. Find your next signature look.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="pt-4"
          >
            <Link
              href="/explore"
              className="inline-block bg-neutral-900 text-white px-10 py-4 rounded-xl text-sm font-bold tracking-widest uppercase hover:bg-amber-600 transition-all duration-300 shadow-xl hover:shadow-amber-600/20"
            >
              Explore Collections
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}