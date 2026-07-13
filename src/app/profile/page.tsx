"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
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

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl border text-center">
              <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4">{user.name?.charAt(0).toUpperCase()}</div>
              <h2 className="font-bold text-lg">{user.name}</h2>
            </div>

            <nav className="bg-white p-4 rounded-2xl border space-y-2">
              <Link href="/admin" className="w-full flex items-center justify-between px-5 py-3 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition">
                Admin Panel <span>&rarr;</span>
              </Link>
              {['overview', 'orders', 'settings'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-5 py-3 rounded-xl font-bold capitalize transition ${activeTab === tab ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                  {tab}
                </button>
              ))}
              {/* Logout Button moved to bottom of sidebar */}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full px-5 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition">
                  Sign Out
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white p-8 rounded-2xl border min-h-[500px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black border-b pb-4">Account Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-gray-50 rounded-xl border"><p className="text-xs font-bold text-gray-400 uppercase">Name</p><p className="font-bold">{user.name}</p></div>
                  <div className="p-5 bg-gray-50 rounded-xl border"><p className="text-xs font-bold text-gray-400 uppercase">Email</p><p className="font-bold">{user.email}</p></div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="text-2xl font-black border-b pb-4 mb-6">Order History</h3>
                <div className="p-4 border rounded-xl flex justify-between items-center"><p className="font-bold">Order #AR-8829</p><span className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold">Delivered</span></div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black border-b pb-4">Settings</h3>
                <div className="flex space-x-6 border-b">
                  {['My Details', 'Profile', 'Password'].map((sub) => (
                    <button key={sub} onClick={() => setActiveSubTab(sub)} className={`pb-2 text-sm font-bold ${activeSubTab === sub ? 'border-b-2 border-black' : 'text-gray-500'}`}>
                      {sub}
                    </button>
                  ))}
                </div>

                {activeSubTab === 'My Details' && (
                   <div className="pt-4 space-y-4">
                     <label className="block font-bold">Display Name</label>
                     <input type="text" defaultValue={user.name} className="w-full p-3 border rounded-xl" />
                     <button className="bg-black text-white px-6 py-2 rounded-xl font-bold">Save Name</button>
                   </div>
                )}

                {activeSubTab === 'Profile' && (
                   <div className="pt-4 space-y-4">
                     <label className="block font-bold">Bio/Profile Info</label>
                     <textarea className="w-full p-3 border rounded-xl" rows={4} placeholder="Write something about yourself..."></textarea>
                     <button className="bg-black text-white px-6 py-2 rounded-xl font-bold">Update Profile</button>
                   </div>
                )}

                {activeSubTab === 'Password' && (
                  <div className="space-y-4 pt-4">
                    <div><label className="block font-bold">Current password</label><input type="password" placeholder="••••••••" className="w-full p-3 border rounded-xl" /></div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><label className="block font-bold">New password</label><input type="password" placeholder="••••••••" className="w-full p-3 border rounded-xl" /></div>
                      <div><label className="block font-bold">Confirm new password</label><input type="password" placeholder="••••••••" className="w-full p-3 border rounded-xl" /></div>
                    </div>
                    <button className="bg-black text-white px-6 py-2 rounded-xl font-bold mt-4">Update password</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}