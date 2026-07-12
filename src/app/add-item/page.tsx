"use client";
import React, { useState } from 'react';

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    category: 'Women',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // আমাদের ব্যাকএন্ড সার্ভারের API-তে ডাটা পাঠানো হচ্ছে
      const response = await fetch('http://localhost:5000/api/items/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Item successfully added to the Database!');
        // ফর্ম রিসেট করা
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          price: '',
          category: 'Women',
          imageUrl: '',
        });
      } else {
        setMessage('❌ Failed to add item. Please check your details.');
      }
    } catch (error) {
      setMessage('❌ Server connection error! Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-primary mb-2">Add New Exclusive Item</h1>
        <p className="text-gray-500 mb-8">Fill up the details to add a new dress to your store.</p>

        {message && (
          <div className={`p-4 rounded-md mb-6 font-medium ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-md focus:ring-secondary focus:outline-none" placeholder="e.g. Classic Silk Gown" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border rounded-md focus:ring-secondary focus:outline-none" placeholder="e.g. 150" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-md focus:ring-secondary focus:outline-none">
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (Optional)</label>
              <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border rounded-md focus:ring-secondary focus:outline-none" placeholder="Paste image link here" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input required type="text" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-4 py-2 border rounded-md focus:ring-secondary focus:outline-none" placeholder="A brief catchy description" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
            <textarea required rows={4} value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} className="w-full px-4 py-2 border rounded-md focus:ring-secondary focus:outline-none" placeholder="Detailed information about the dress..."></textarea>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-3 rounded-md hover:bg-gray-800 transition font-bold text-lg disabled:opacity-50">
            {loading ? 'Adding to Database...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  );
}