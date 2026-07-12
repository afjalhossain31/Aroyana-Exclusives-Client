"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  // লগআউট ফাংশন
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("authChange"));
      router.push("/login");
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse text-gray-400 font-medium">Loading Profile...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="mb-10 text-center md:text-left border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">My Account</h1>
          <p className="text-gray-500 mt-2">Manage your premium Aroyana profile and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
              
              {/* User Avatar & Info */}
              <div className="text-center mb-8 pb-8 border-b border-gray-100">
                <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 shadow-md">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <h2 className="font-bold text-xl text-gray-900 truncate">{user.name || "Aroyana Member"}</h2>
                <p className="text-sm text-gray-500 truncate mt-1">{user.email}</p>
              </div>
              
              {/* Sidebar Menu */}
              <div className="space-y-2 flex-grow">
                <button className="w-full text-left px-5 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold border border-gray-200 transition">
                  Overview
                </button>
                <button className="w-full text-left px-5 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                  Order History
                </button>
                <button className="w-full text-left px-5 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                  Saved Items
                </button>
                <button className="w-full text-left px-5 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                  Settings
                </button>
              </div>

              {/* Logout Button */}
              <div className="pt-8 mt-4 border-t border-gray-100">
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-bold transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>

            </div>
          </div>

          {/* Main Info Section */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wide border-b border-gray-100 pb-4">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="group">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</p>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium group-hover:border-gray-300 transition">
                    {user.name || "N/A"}
                  </div>
                </div>

                <div className="group">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</p>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium group-hover:border-gray-300 transition">
                    {user.email}
                  </div>
                </div>

                <div className="group">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Membership Status</p>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium group-hover:border-gray-300 transition flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Aroyana VIP Member
                  </div>
                </div>

                <div className="group">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Primary Location</p>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium group-hover:border-gray-300 transition">
                    Dhaka, Bangladesh
                  </div>
                </div>

              </div>

              {/* Edit Profile Banner */}
              <div className="mt-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Update Profile</h4>
                  <p className="text-sm text-gray-500 mt-1">Keep your information up to date for seamless deliveries.</p>
                </div>
                <button className="whitespace-nowrap px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition shadow-sm">
                  Edit Details
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}