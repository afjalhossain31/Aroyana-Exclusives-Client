export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-4">Get In Touch</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our client concierge team is available around the clock. Reach out for styling advice, order inquiries, or custom tailoring requests.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase">Contact Information</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you have a question about an exclusive item, shipping policies, or need assistance with a return, we are here to ensure your Aroyana experience is flawless.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-200">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Headquarters</h4>
                  <p className="text-gray-600 mt-1">Dhaka, Bangladesh<br/>Available by appointment only.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-200">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Address</h4>
                  <p className="text-gray-600 mt-1">support@aroyana.com<br/>concierge@aroyana.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-200">
                  📞
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone Support</h4>
                  <p className="text-gray-600 mt-1">+880 1234 567890<br/>Mon-Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input type="text" placeholder="Order Inquiry" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black" required />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea rows={5} placeholder="How can we help you today?" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none" required></textarea>
              </div>

              <button type="button" className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-md">
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}