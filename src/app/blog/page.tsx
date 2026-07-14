"use client";

import Link from "next/link";

export default function BlogPage() {
  // ফিচারড পোস্ট (মূল আর্টিকেল)
  const featuredPost = {
    title: "The Evolution of Modern Minimalist Luxury",
    slug: "evolution-of-modern-minimalist-luxury",
    category: "New Arrivals",
    date: "July 12, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    excerpt: "Discover how the new era of fashion is leaning towards sleek, minimalist designs without compromising on the opulent feel of true luxury.",
    link: "/explore" // এটি এক্সপ্লোর পেজে নিয়ে যাবে
  };

  // 🎯 এখানে ৩টি কার্ডকে আপনার ক্যাটাগরির সাথে কানেক্ট করা হয়েছে
  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Art of Premium Gowns",
      category: "Premium Gown", // ক্যাটাগরি নাম
      date: "July 05, 2026",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600",
      excerpt: "A comprehensive guide to choosing the perfect evening gown for high-end galas and exclusive events.",
      link: "/explore?category=Premium Gown" // ডাইনামিক ক্যাটাগরি রিডাইরেক্ট
    },
    {
      id: 2,
      title: "The Heritage of Traditional Wear",
      category: "Traditional Wear", // ক্যাটাগরি নাম
      date: "June 28, 2026",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600",
      excerpt: "Discover the timeless elegance and intricate craftsmanship woven into our traditional masterpieces.",
      link: "/explore?category=Traditional Wear" // ডাইনামিক ক্যাটাগরি রিডাইরেক্ট
    },
    {
      id: 3,
      title: "Essential Luxury Bags for '26",
      category: "Luxury Bag", // ক্যাটাগরি নাম
      date: "June 20, 2026",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600",
      excerpt: "From structured leather to elegant finishes, explore the premium bags dominating this fashion season.",
      link: "/explore?category=Luxury Bag" // ডাইনামিক ক্যাটাগরি রিডাইরেক্ট
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-light selection:bg-black selection:text-white">
      
      {/* Blog Header */}
      <div className="pt-15 pb-10 text-center border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">
          The Official
        </span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-gray-900">
          Aroyana Journal
        </h1>
        <div className="w-16 h-[2px] bg-black mx-auto mb-6"></div>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
          Editorials, style guides, and exclusive insights into the world of premium fashion and modern luxury.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Featured Post (Editorial Style) */}
        <div className="mb-15">
          <Link href={featuredPost.link} className="group relative block overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-10"></div>
            <div className="h-[500px] md:h-[600px] w-full overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-16 z-20 w-full md:w-3/4 lg:w-2/3 flex flex-col justify-end h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
                  {featuredPost.category}
                </span>
                <span className="text-[10px] md:text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {featuredPost.date}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-200 leading-relaxed mb-8 text-sm md:text-base max-w-xl line-clamp-2 md:line-clamp-none">
                {featuredPost.excerpt}
              </p>
              <div className="inline-flex items-center text-xs md:text-sm font-bold uppercase tracking-widest text-white border-b-2 border-white pb-1 w-max group-hover:px-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                Explore Collection &rarr;
              </div>
            </div>
          </Link>
        </div>

        {/* Section Title */}
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-4">
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">Featured Categories</h3>
          <Link href="/explore" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors hidden sm:block">
            View All Items &rarr;
          </Link>
        </div>

        {/* 🎯 Category Grid (Clicking these goes to specific category) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <Link href={post.link} key={post.id} className="group flex flex-col h-full cursor-pointer">
              <div className="relative h-[350px] mb-6 overflow-hidden rounded-2xl bg-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
                {post.date}
              </div>
              
              <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-gray-500 transition-colors line-clamp-2">
                {post.title}
              </h4>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2 group-hover:gap-4 transition-all">
                Shop {post.category} <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-neutral-950 py-24 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm md:text-base">
            Subscribe to our newsletter for the latest editorials, exclusive collections, and inside access to Aroyana.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
              required
            />
            {/* 🎯 Button Color Changed to Secondary */}
            <button 
              type="submit"
              className="bg-secondary text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:opacity-90 hover:scale-105 transition-all duration-300 whitespace-nowrap shadow-lg shadow-secondary/30"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}