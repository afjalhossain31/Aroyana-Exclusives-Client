import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-wider text-secondary">
              AROYANA
            </Link>
          </div>
          
          {/* Menu Items (Logged Out Routes) */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-secondary transition">Home</Link>
            <Link href="/explore" className="hover:text-secondary transition">Explore</Link>
            <Link href="/about" className="hover:text-secondary transition">About</Link>
          </div>

          {/* Login Button */}
          <div>
            <Link 
              href="/login" 
              className="bg-secondary text-white px-5 py-2 rounded-md hover:bg-yellow-600 transition font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;