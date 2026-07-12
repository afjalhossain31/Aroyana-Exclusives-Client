import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4">AROYANA</h2>
            <p className="text-sm text-gray-400 mb-4">
              Your ultimate destination for premium and exclusive fashion. Elevating everyday style with elegance and quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-secondary transition">Home</Link></li>
              <li><Link href="/explore" className="hover:text-secondary transition">Explore Collection</Link></li>
              <li><Link href="/about" className="hover:text-secondary transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition">Contact Support</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-secondary transition">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-secondary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>Email: support@aroyana.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
            <div className="flex space-x-4">
              {/* Social Links (using text for simplicity, can be replaced with icons) */}
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-secondary text-white transition">fb</a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-secondary text-white transition">ig</a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-secondary text-white transition">tw</a>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aroyana Exclusives. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;