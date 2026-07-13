import Link from "next/link";

export default function BlogPage() {
  const featuredPost = {
    title: "The Evolution of Modern Minimalist Luxury",
    category: "Fashion Editorial",
    date: "July 12, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000",
    excerpt: "Discover how the new era of fashion is leaning towards sleek, minimalist designs without compromising on the opulent feel of true luxury."
  };

  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Art of Evening Gowns",
      category: "Style Guide",
      date: "July 05, 2026",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600",
      excerpt: "A comprehensive guide to choosing the perfect evening gown for high-end galas and exclusive events."
    },
    {
      id: 2,
      title: "Behind the Seams: Aroyana's Artisan Process",
      category: "Behind the Brand",
      date: "June 28, 2026",
      image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=600",
      excerpt: "Take an exclusive peek into our studio and witness the meticulous craftsmanship behind every signature piece."
    },
    {
      id: 3,
      title: "Essential Luxury Accessories for Winter '26",
      category: "Trend Report",
      date: "June 20, 2026",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600",
      excerpt: "From structured leather bags to elegant silk scarves, explore the accessories dominating this winter season."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-light">
      
      {/* Blog Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[0.15em] mb-4">
          Aroyana Journal
        </h1>
        <div className="w-12 h-[2px] bg-gray-900 mx-auto mb-6"></div>
        <p className="text-gray-500 text-base max-w-xl mx-auto px-4 leading-relaxed">
          Editorials, style guides, and exclusive insights into the world of premium fashion.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Featured Post (Hero Article) */}
        <div className="mb-20">
          <Link href="#" className="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
            <div className="h-[400px] md:h-[500px] overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="flex flex-col justify-center p-10 md:p-16 bg-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-black bg-gray-100 px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {featuredPost.date}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 group-hover:text-gray-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-base">
                {featuredPost.excerpt}
              </p>
              <div className="inline-flex items-center text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 w-max group-hover:border-gray-500 transition-colors">
                Read Editorial &rarr;
              </div>
            </div>
          </Link>
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-100 pt-16 mb-12 flex justify-between items-end">
          <h3 className="text-2xl font-black uppercase tracking-wide">Latest Articles</h3>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <Link href="#" key={post.id} className="group flex flex-col h-full">
              <div className="relative h-[300px] mb-6 overflow-hidden rounded-xl border border-gray-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900 border border-gray-200 px-2 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {post.date}
                </span>
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-gray-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                {post.excerpt}
              </p>
              <div className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2 group-hover:text-gray-500 transition-colors">
                Continue Reading <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}