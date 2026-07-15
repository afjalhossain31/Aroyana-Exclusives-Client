"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    chartData: [
      { name: "Mon", revenue: 0 },
      { name: "Tue", revenue: 0 },
      { name: "Wed", revenue: 0 },
      { name: "Thu", revenue: 0 },
      { name: "Fri", revenue: 0 },
      { name: "Sat", revenue: 0 },
      { name: "Sun", revenue: 0 },
    ]
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats from the backend API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/analytics/stats`);
        const data = await res.json();
        if (data.success) {
          setStats({
            totalRevenue: data.totalRevenue,
            totalOrders: data.totalOrders,
            chartData: data.chartData
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row">

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Aroyana</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded-xl font-bold text-sm shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Dashboard
          </Link>
          <Link href="/add-item" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold text-sm transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add New Product
          </Link>
          <Link href="/items/manage" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold text-sm transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            Inventory
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-bold text-sm transition mt-10 border-t border-gray-100 pt-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Profile
          </Link>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Overview</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor your store's performance and inventory.</p>
          </div>

          <div className="flex gap-4">
            <Link href="/items/manage" className="bg-white border border-gray-200 text-gray-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition shadow-sm">
              Open Inventory
            </Link>
            <Link href="/add-item" className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-md flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Add Product
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                <h3 className="text-3xl font-black text-gray-900">${stats.totalRevenue.toLocaleString()}</h3>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Total Orders</p>
                <h3 className="text-3xl font-black text-gray-900">{stats.totalOrders}</h3>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Active Status</p>
                <h3 className="text-3xl font-black text-emerald-500">Online</h3>
              </div>
            </div>

            {/* Recharts Section */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
              <div className="mb-6">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Revenue Analytics</h3>
                <p className="text-sm text-gray-500 mt-1">Real-time performance of sales based on your database.</p>
              </div>

              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#000000" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', color: '#fff', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#000000"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}