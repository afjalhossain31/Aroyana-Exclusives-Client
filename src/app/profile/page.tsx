"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Define the structure for the user data
interface User {
  _id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
}


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("My Details");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);



  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("authChange"));
      router.push("/login");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  // Navigation Items with inline SVGs for professional look
  const navItems = [
    { id: "overview", label: "Account Overview", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> },
    { id: "orders", label: "Order History", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> },
    { id: "transactions", label: "Transactions", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> },
    { id: "settings", label: "Settings", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">My Account</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your profile, orders, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:col-start-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-hidden sticky top-24">

              {/* Profile Brief */}
              <div className="p-8 text-center border-b border-gray-50 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-lg ring-4 ring-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-extrabold text-xl text-gray-900 capitalize">{user.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                <span className="inline-block mt-3 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Member
                </span>
              </div>

              {/* Navigation Menu */}
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${activeTab === item.id
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link href="/admin" className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 text-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-colors">
                    <span className="flex items-center gap-4">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      Admin Dashboard
                    </span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-5 py-3.5 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors mt-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] min-h-[600px]">

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Account Overview</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Display Name</p>
                      <p className="font-extrabold text-xl text-gray-900">{user.name}</p>
                    </div>
                    <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                      <p className="font-extrabold text-xl text-gray-900 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-10 p-8 bg-gray-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Exclusive Member</h4>
                      <p className="text-gray-400 text-sm">You have access to premium collections and early drops.</p>
                    </div>
                    <Link href="/explore" className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition shadow-lg whitespace-nowrap">
                      Explore New Arrivals
                    </Link>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Order History</h3>
                  <div className="space-y-4">
                    <div className="p-6 border border-gray-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg hover:shadow-gray-50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-lg text-gray-900 group-hover:text-amber-600 transition-colors">Order #AR-8829</p>
                          <p className="text-sm text-gray-500 mt-1">Placed on Oct 24, 2026</p>
                        </div>
                      </div>
                      <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                        <span className="font-black text-lg text-gray-900">$125.00</span>
                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-2 border border-emerald-100">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Transactions</h3>
                  <div className="space-y-4">

                    {[
                      { id: '#TXN-98237491', date: 'Oct 24, 2026', amount: '$125.00', card: '4242' },
                      { id: '#TXN-83746201', date: 'Oct 10, 2026', amount: '$240.50', card: '4242' }
                    ].map((txn, idx) => (
                      <div key={idx} className="p-6 border border-gray-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg hover:shadow-gray-50 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{txn.id}</p>
                            <p className="text-sm text-gray-500 mt-0.5">Paid via Stripe (Card ending in {txn.card}) • {txn.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                          <span className="font-black text-xl text-gray-900">{txn.amount}</span>
                          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-100">
                            Successful
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="animate-in fade-in duration-300">
                  <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Settings</h3>

                  {/* Settings Sub-navigation */}
                  <div className="flex space-x-8 border-b border-gray-100 mb-8">
                    {['My Details', 'Profile', 'Password'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setActiveSubTab(sub)}
                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeSubTab === sub
                          ? 'text-black'
                          : 'text-gray-400 hover:text-gray-900'
                          }`}
                      >
                        {sub}
                        {activeSubTab === sub && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-t-full"></span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Settings Forms */}
                  <div className="max-w-xl">
                    {activeSubTab === 'My Details' && (
                      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div>
                          <label className="block font-bold text-sm text-gray-900 mb-2">Display Name</label>
                          <input type="text" defaultValue={user.name} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
                        </div>
                        <div>
                          <label className="block font-bold text-sm text-gray-900 mb-2">Email Address</label>
                          <input type="email" defaultValue={user.email} disabled className="w-full p-4 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                          <p className="text-xs text-gray-500 mt-2">Email address cannot be changed currently.</p>
                        </div>
                        <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-gray-200">
                          Save Changes
                        </button>
                      </div>
                    )}

                    {activeSubTab === 'Profile' && (
                      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div>
                          <label className="block font-bold text-sm text-gray-900 mb-2">Bio / Fashion Persona</label>
                          <textarea
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            rows={5}
                            placeholder="E.g., Aspiring fashion designer and entrepreneur building the next big clothing brand..."
                          ></textarea>
                        </div>
                        <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-gray-200">
                          Update Profile
                        </button>
                      </div>
                    )}

                    {activeSubTab === 'Password' && (
                      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div>
                          <label className="block font-bold text-sm text-gray-900 mb-2">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block font-bold text-sm text-gray-900 mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
                          </div>
                          <div>
                            <label className="block font-bold text-sm text-gray-900 mb-2">Confirm Password</label>
                            <input type="password" placeholder="••••••••" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
                          </div>
                        </div>
                        <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition active:scale-95 shadow-lg shadow-gray-200">
                          Update Password
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}